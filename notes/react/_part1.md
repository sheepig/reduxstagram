## startinig fresh

[Symbol](http://es6.ruanyifeng.com/#docs/symbol)

### node_modules 中的 react

开发环境中引入的是 react.development.js，整个文件最终 module.exports 一个如下的对象。

```javascript
var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  createRef: createRef,
  Component: Component,
  PureComponent: PureComponent,

  createContext: createContext,
  forwardRef: forwardRef,

  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
  unstable_Profiler: REACT_PROFILER_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

module.exports = react;
```


### Component

```javascript
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

Component.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === 'object' ||
      typeof partialState === 'function' ||
      partialState == null,
    'setState(...): takes an object of state variables to update or a ' +
      'function which returns an object of state variables.',
  );
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

```

这里 emptyObject 是用 Object.freeze 冻结的一个空对象

```javascript
const emptyObject = {};
if (__DEV__) {
  Object.freeze(emptyObject);
}
```

Component 是个构造函数。原型上挂了 setState，forceUpdate等方法。继承于 Component (`class App extends Component{ ... }`) 的新类，实例上将挂上 props, context, refs, updater 等。

![Main](../static/App.png)

![Main](../static/component.png)

#### Component.prototype

 - Component.prototype.setState
 - Component.prototype.forceUpdate


invariant 对传入的 partialState 进行判断，如果 partialState 不是 Object，Function 或 null 中任一类型，就会 threw Error，内容就是后续的一串 `setState(...): ...`。

在组件还未 mounted 之前调用这两个方法，则打出 warning

















