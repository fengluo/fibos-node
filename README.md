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

节点数据位置
* /blockData/data

HTTP 端口
* 8870

P2P 端口
* 9870

如果没有没有传入 BP 账户的账户名和公私钥，producer 模块将不会加载。该节点将以普通节点运行。

BP节点示例：
```
docker run -v ~/blockData/data:/blockData/data -p 8870:8870 -p 9870:9870 -e P2P_PEER_ADDRESS=192.168.1.1:9870,192.168.1.2:9870 -e PRODUCER_ACCOUNT=tttttestbp1 -e PRODUCER_PUBLIC_KEY=aaaaaaaa -e PRODUCER_PRIVATE_KEY=bbbbb --name fibos-node fibos-node
```