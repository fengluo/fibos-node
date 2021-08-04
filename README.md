# fibos-node

## docker 构建
```
docker build -t fibos-node .
```

## docker 运行

环境变量
* P2P_PEER_ADDRESS P2P 地址，多地址使用「,」相连
* PRODUCER_ACCOUNT BP账户名
* PRODUCER_PUBLIC_KEY BP 公钥
* PRODUCER_PRIVATE_KEY BP 私钥

容器节点数据位置
* /blockData/data

HTTP 端口
* 8870

P2P 端口
* 9870

如果没有没有传入 BP 账户的账户名和公私钥，producer 模块将不会加载。该节点将以普通节点运行。

BP节点示例，实际使用按需修改参数
```
docker run -v ~/blockData/data:/blockData/data -p 8870:8870 -p 9870:9870 -e P2P_PEER_ADDRESS=192.168.1.1:9870,192.168.1.2:9870 -e PRODUCER_ACCOUNT=tttttestbp1 -e PRODUCER_PUBLIC_KEY=aaaaaaaa -e PRODUCER_PRIVATE_KEY=bbbbb --name fibos-node fibos-node
```
## 其他

关于 BP 注册参考文档：

https://dev.fo/zh-cn/guide/node-nodesnet#%E4%BD%BF%E7%94%A8-Producer-%E8%BA%AB%E4%BB%BD%E5%8F%91%E8%B5%B7%E6%B3%A8%E5%86%8C%E7%94%B3%E8%AF%B7