## 常量

### RESERVED_PROPS

```javascript
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
```

“预留的props”，主要在遍历 config 的时候，跳过这些属性。

## 功能函数

### hasValidRef

```javascript
function hasValidRef(config) {
	// ...
}
```
以下情况返回 true：

 - config 有 **自有属性** `ref`，且该 `ref` 属性的访问器属性（get）上没有 isReactWarning 属性。
 - config 的 `ref` 不为 undefined

### hasValidKey

```javascript
function hasValidKey(config) {
	// ...
}
```

返回true情况和上一个函数一样，区别只是 `ref` 换成了 `key`


