### 常量

```javascript
var NoContext = 0;
var AsyncMode = 1;
var StrictMode = 2;
var ProfileMode = 4;

var IndeterminateComponent = 0; // Before we know whether it is functional or class
var FunctionalComponent = 1;
var ClassComponent = 2;
var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
var HostComponent = 5;
var HostText = 6;
```

### FiberNode

```javascript
// Gather advanced timing metrics for Profiler subtrees.
var enableProfilerTimer = true;
```

FiberNode 构造函数如下

```javascript
function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;

  this.mode = mode;

  // Effects
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.expirationTime = NoWork;

  this.alternate = null;

  if (enableProfilerTimer) {
    this.actualDuration = 0;
    this.actualStartTime = 0;
    this.selfBaseTime = 0;
    this.treeBaseTime = 0;
  }

  {
    this._debugID = debugCounter++;
    this._debugSource = null;
    this._debugOwner = null;
    this._debugIsCurrentlyTiming = false;
    if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
      Object.preventExtensions(this);
    }
  }
}
```

其中，NoEffect NoWork debugCounter enableProfilerTimer 是一些全局标记

```javascript
// Don't change these two values. They're used by React Dev Tools.
var NoEffect = /*              */0;
```

```javascript
var NoWork = 0;
var debugCounter = 1;

// Gather advanced timing metrics for Profiler subtrees.
var enableProfilerTimer = true;
```

