## startinig fresh

[Symbol](http://es6.ruanyifeng.com/#docs/symbol)


`import React, {Component} from 'react'` 时候，发生了什么？

import 的 React 对象上挂了一大堆属性和方法，主要关注一下 Component

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

### Component.prototype

 - Component.prototype.setState
 - Component.prototype.forceUpdate


invariant 对传入的 partialState 进行判断，如果 partialState 不是 Object，Function 或 null 中任一类型，就会 threw Error，内容就是后续的一串 `setState(...): ...`。

在组件还未 mounted 之前调用这两个方法，则打出 warning

### React.Children

```javascript
import {forEach, map, count, toArray, only} from './ReactChildren';

const React = {
  Children: {
    map,
    forEach,
    count,
    toArray,
    only,
  },
// ...
}
```















