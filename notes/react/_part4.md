## 常量

```javascript
/**
 * HTML nodeType values that represent the type of the node
 */

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;

var ROOT_ATTRIBUTE_NAME = 'data-reactroot';

```

## 基本类

### ReactRoot

![ReactRoot](../static/ReactRoot.png)

每个 ReactRoot 都有一个自有属性 _internalRoot ，是一个 FiberNode 的实例。

![fiberNode](../static/fiberRoot.png)

#### render

```javascript
ReactRoot.prototype.render = function (children, callback) {
  var root = this._internalRoot;
  var work = new ReactWork();
  callback = callback === undefined ? null : callback;
  {
    warnOnInvalidCallback(callback, 'render');
  }
  if (callback !== null) {
    work.then(callback);
  }
  updateContainer(children, root, null, work._onCommit);
  return work;
};
```

ReactRoot 的实例每次调用 render，都会注册一个 ReactWork 对象。即使是同一个实例，不同的 render 返回的 ReactWork 实例不同。也就是说，每一次 render，都由一个独一无二的 ReactWork 维护。 

`new ReactWork()`的实例，_didCommit 的初始值为false，所以`work.then(callback)` 会把 callback 放入对应 ReactWork 的回调函数列表中。



### ReactWork

![ReactWork](../static/ReactWork.png)

每一个 ReactWork 上，都有三个 **自有属性** `_callbacks` `_didCommit` `_onCommit`。

```javascript
this._callbacks = null;
this._didCommit = false;
// TODO: Avoid need to bind by replacing callbacks in the update queue with
// list of Work objects.
this._onCommit = this._onCommit.bind(this);
```

实例上自有属性 _onCommit 方法是绑定了当前实例对象的原型链 _onCommit 方法。看注释，估计未来这种绑定方法应会被替换为更合理的方法。

接下来看原型对象上的方法。

```javascript
ReactWork.prototype.then = function (onCommitonCommit) {
  if (this._didCommit) {
    onCommit();
    return;
  }
  var callbacks = this._callbacks;
  if (callbacks === null) {
    callbacks = this._callbacks = [];
  }
  callbacks.push(onCommit);
};
```

then 接收一个 onCommit 动作（函数），如果实例 _didCommit 为 true ，那么直接执行这个动作。否则把它压入对象的 _callbacks 数组。

```javascript
ReactWork.prototype._onCommit = function () {
  if (this._didCommit) {
    return;
  }
  this._didCommit = true;
  var callbacks = this._callbacks;
  if (callbacks === null) {
    return;
  }
  // TODO: Error handling.
  for (var i = 0; i < callbacks.length; i++) {
    var _callback2 = callbacks[i];
    !(typeof _callback2 === 'function') ? invariant(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', _callback2) : void 0;
    _callback2();
  }
};
```

如果实例的拥有自有方法 _onCommit ，所以实例 _onCommit 方法的触发，站在实例对象的角度。如果 _didCommit 为 true ，_onCommit 什么也不做；否则将 _didCommit 标记为 true ，表明这个对象正在进行一次 commit ，然后一个个执行 _callbacks 数组中堆积的要做的事情。因为 _callbacks里面的元素是一个个 push 进去的，所以先 push 进去的会先执行。

![work](../static/work.png)


## 方法

### getReactRootElementInContainer

```javascript
function getReactRootElementInContainer(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOCUMENT_NODE) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}
```


### container （DOM Element）的挂载点

在 container 没有挂载点的时候，登记它的挂载点

```javascript
// Initial mount
root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
```

首先确定是否强制聚合。即 forceHydrate 。render 的时候，forceHydrate 的值为 false ，所以由 shouldHydrateDueToLegacyHeuristic(container) 的结果决定。

getReactRootElementInContainer 获取 container 的 rootElement ，当且仅当 rootElement 是 DOM 元素节点并且有 ROOT_ATTRIBUTE_NAME 标识（这里的值为 `'data-reactroot'`），shouldHydrate 结果为 true。

shouldHydrate false时，清空 container 中所有符合 rootElement 的节点。

返回的挂载点是一个 ReactRoot 实例：

```javascript
  // Legacy roots are not async by default.
  var isAsync = false;
	return new ReactRoot(container, isAsync, shouldHydrate);
```

### unbatchedUpdates

全局初始化变量

```javascript
var isBatchingUpdates = false;
var isUnbatchingUpdates = false;
```

这两个变量是当前 BatchUpdates 信号灯。标识当前是否正在处理：1. 批量更新；2. 非批量更新。



```javascript
function unbatchedUpdates(fn, a) {
  if (isBatchingUpdates && !isUnbatchingUpdates) {
    isUnbatchingUpdates = true;
    try {
      return fn(a);
    } finally {
      isUnbatchingUpdates = false;
    }
  }
  return fn(a);
}
```

当且仅当 isBatchingUpdates 为 true ，isUnbatchingUpdates 为 false，unbatchedUpdates 认为当前可能要 “排队” 等非批量更新。此时把 isUnbatchingUpdates 标记为true。执行更新 `fn(a)`，无论成功或失败，最终再把 isUnbatchingUpdates 标记为 false，允许下一次非批量更新直接更新。

### updateContainer

```javascript
function updateContainer(element, container, parentComponent, callback) {
  var current = container.current;
  var currentTime = recalculateCurrentTime();
  var expirationTime = computeExpirationForFiber(currentTime, current);
  return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback);
}
```

`container.current`指什么？？？（fiber？）


```javascript
// Represents the current time in ms.
var originalStartTimeMs = now(); // 这个基本是常量，脚本第一次加载到这里的时间戳

mostRecentCurrentTimeMs; // 当前时间戳减去 originalStartTimeMs 的毫秒数。每次计算 currentTime ，该值会更新，但是这个值不是上面代码的 currentTime

// 得到 currentTime ，还需要把毫秒时间做一个转化，计算规则见函数 msToExpirationTime

```

#### computeExpirationForFiber

![expiration](../static/expiration.png)









