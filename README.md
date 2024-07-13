# umi4 接入 lowcode-engine 方案

## 1. 准备工作

首先我们可以看到项目中有两个工程，其中 low-code-admin 是 umi4 项目，low-code-engine 是低代码项目，利用微前端架构 qiankun 进行接入。

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_XmmegBRm1n.png)

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

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_QFKxqfXWtZ.png)

首页

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_SsdlZZs9kO.png)

低代码平台

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_FxJ9Ueyn4K.png)

低代码预览

## 4. 项目部署

此项目部署直接使用 [qiankun 部署方案](https://qiankun.umijs.org/zh/cookbook#%E5%A6%82%E4%BD%95%E9%83%A8%E7%BD%B2 "qiankun 部署方案")，教程使用 场景 1：主应用和微应用部署到同一个服务器（同一个 IP 和端口）

1. 首先分别将项目打包
   ```纯文本
   // ../low-code-admin
   yarn bild

   // 部署文件在 ../low-code-admin/dist 目录中

   // ../low-code-engine
   yarn bild

   // 部署文件在 ../low-code-engine/build 目录中
   ```
2. nginx 配置（注意 我的nginx 路径和大家的肯定是不一致的，请根据自己的安装路径进行配置）
   a) html 文件夹 放入 umi 主应用

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_1SJZe4CpTz.png)

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_z3uApcUj69.png)

   按照 qiankun 部署方案 创建 child 文件夹 放入 低代码应用

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_N6Zv64wg_Y.png)

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_pLbzkFVfxm.png)

   b) nginx conf 配置
   ```nginx
   server {
       listen       80;
       listen  [::]:80;
       server_name  localhost;

       #access_log  /var/log/nginx/host.access.log  main;

       location / {
           root   /usr/share/nginx/html/lowCode;
           index  index.html index.htm;
           try_files $uri $uri/ /index.html;
       }
       
       # ...
   ```
3. 项目配置完成 重启 nginx&#x20;
4. 效果展示

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_ZHA2OEeQoN.png)

   首页

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_93PLoM5zu5.png)

   低代码页面

## 5. 自定义低代码组件以及调试和部署...

如果此方案对于大家有用，请帮助我点亮小星星，让我有动力更新 : )，谢谢大家！
