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







