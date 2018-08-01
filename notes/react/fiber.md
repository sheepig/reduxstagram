
// Represents the expiration time that incoming updates should use. (If this
// is NoWork, use the default strategy: async updates in async mode, sync
// updates in sync mode.)
var expirationContext = NoWork;
```

为即将到来的 updates 定义更新策略。

```javascript
var isWorking = false; // 
```



#### NoWork

