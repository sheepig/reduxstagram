## ReactDom

```javascript
var ReactDom = {
	createPortal: createPortal,
	findDOMNode: function(componentOrElement) {...},
	hydrate: function(element, container, callback) {...},
	render: function(element, container, callback) {...},
	unstable_renderSubtreeIntoContainer: function(parentComponent, element, containerNode, callback) {...},
	unmountComponentAtNode: function (container) {...}
	// ...
}
```

### render

```javascript
render: function (element, container, callback) {
    return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
	}

function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
	// ...
}
```

组件挂载、更新都是通过 legacyRenderSubtreeIntoContainer 方法。

1. 参数校验：container 是否是一个 DOM element
2. 获取 container._reactRootContainer ，（？？挂载点）定义为 root。
3. 如果获取不到，会基于当前 container 寻找挂载点，并且将这个挂载点登记 `root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)`。源码标记这一步为 `initial mount`。下一步，非批量更新，我们常见的`ReactDom.render(</>, ducument.getElementById('root'))` 中，父组件为 null ，所以会调用 root 的 legacy_renderSubtreeIntoContainer 方法（记住 root 是一个 ReactRoot 实例）。否则 root.render 。
4. 
