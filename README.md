# umi4 接入 lowcode-engine 方案（如果对你有帮助请帮我点一个 星星哦，我很需要 ：） ）

## 1. 准备工作

首先我们可以看到项目中有两个工程，其中 low-code-admin 是 umi4 项目，low-code-engine 是低代码项目，利用微前端架构 qiankun 进行接入。

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_0z3N5AzLIt.png)

## 2.下载依赖

```javascript
// 项目需要跑在 8000 和 8001 端口
// 推荐包管理器 yarn，因为 low-code-engine demo 项目中有问题 pnpm 不支持
// 有 yarn.lock 锁文件，分别两个项目 yarn
// 需要 node >= 18.18.0

// ../low-code-admin
yarn && yarn dev

// ../low-code-engine
yarn && yarn start

// 启动成功后打开 8000 端口的 low-code-admin 项目
// 第一次打开 低代码平台会有点慢需要等待 3s 左右
```

## 3. 项目展示

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_5Y00bALhGC.png)

首页

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_O_oQ7C71Q-.png)

低代码平台

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_hYZL9WncWm.png)

低代码预览
