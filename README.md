# umi4 接入 lowcode-engine 方案

##### 前言：

1. 本文解决了 umi4 利用 qiankun 架构 接入 lowcode-engine 低代码引擎的一系列问题，包含但不限于 lowcode-engine issues ( [1796](https://github.com/alibaba/lowcode-engine/issues/1796 '1796') 、[1455](https://github.com/alibaba/lowcode-engine/issues/1455 '1455')、[1014](https://github.com/alibaba/lowcode-engine/issues/1014 '1014')、[423](https://github.com/alibaba/lowcode-engine/issues/423 '423') 、[1014](https://github.com/alibaba/lowcode-engine/issues/1014 '1014') ...);
2. 完善了 lowcode-engine 文档中自定义低代码组件不需要发布到 npm 的方案;
3. 实现了 umi4 接入 lowcode-engine qiankun 部署的方案;
4. 本文需要知识 node、qiankun、umi4、lowcode-engine、webpack4 && 5、nginx、docker、linux，如果不太熟悉也没关系只是过程中会有些疑问，但是不会影响最终实现;
5. 本文不会详细解释每一个报错的意思，因为需要的篇幅很长，本项目已经解决完在接入中会出现的报错和问题，大家只需要跟着这篇解决方案走，我会尽量简单化细说每一个步骤。大家可以对照方案中的代码和自己的代码排除出问题所在，或者直接基于此方案进行开发;

[TOC]

## 1. 准备工作

首先我们可以看到项目中有两个工程，其中 low-code-admin 是 umi4 项目，low-code-engine 是低代码项目，利用微前端架构 qiankun 进行接入。

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_arX-AMhD1g.png)

## 2.下载依赖

```javascript
// 项目需要跑在 8000 和 8001 端口
// 推荐包管理器 yarn，因为 low-code-engine demo 项目中有问题 pnpm 不支持
// 有 yarn.lock 锁文件，分别两个项目 yarn
// 需要 node >= 18.18.0

// ../low-code-admin
yarn && yarn dev

// ../low-code-engine
yarn && yarn dev

// 启动成功后打开 8000 端口的 low-code-admin 项目
// 第一次打开 低代码平台会有点慢需要等待 3s 左右
```

## 3. 项目展示

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_araZKRw_Iq.png)

首页

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_NIbPbLaObK.png)

低代码平台

![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_9cg3YNtdJj.png)

低代码预览

## 4. 项目部署

此项目部署直接使用 [qiankun 部署方案](https://qiankun.umijs.org/zh/cookbook#%E5%A6%82%E4%BD%95%E9%83%A8%E7%BD%B2 'qiankun 部署方案')，教程使用 场景 1：主应用和微应用部署到同一个服务器（同一个 IP 和端口）

1. 首先分别将项目打包

   ```纯文本
   // ../low-code-admin
   yarn bild

   // 部署文件在 ../low-code-admin/dist 目录中

   // ../low-code-engine
   yarn bild

   // 部署文件在 ../low-code-engine/build 目录中
   ```

2. nginx 配置（注意 我的 nginx 路径和大家的肯定是不一致的，请根据自己的安装路径进行配置）
   a) html 文件夹 放入 umi 主应用

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_KHqU36gfdJ.png)

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_2owflQwTPa.png)

   按照 qiankun 部署方案 创建 child 文件夹 放入 低代码应用

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_pxt6198hCQ.png)

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_LQon5Wya0M.png)

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

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_P0oH5fa3Su.png)

   首页

   ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_gI7gHT0e-t.png)

   低代码页面

至此 umi4 接入 lowcode-engine 开发已经部署已经介绍完成，如果不需要自定义组件，就可以点个小星星然后关闭页面了。需要自定义组件请继续往下看 : )

## 5. 自定义低代码组件开发调试和部署

1. 自定义低代码组件开发调试

   1. 启动 low-code-material

      可以看到 项目中 有 low-code-material&#x20;

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_5J7U1maoPX.png)

      ```javascript
      // 老样子进入目录使用 yarn 进行包下载以及启动项目
      yarn && lowcode:dev
      ```

      项目启动成功后会发下该项目是跑在 3333 端口的，我们并不需要打开 3333 端口。

   2. 打开 [http://localhost:8000/low-code-engine/?debug](http://localhost:8000/low-code-engine/?debug 'http://localhost:8000/low-code-engine/?debug') 页面

      我们能看到 成功注入组件的弹框，以及在 组件库中组件的展示

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_c-0H6skdG1.png)

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_Av-Q9xREoY.png)

      到这里 自定义组件已经接入进来

      后续对照文档和代码开发业务组件即可

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_cu0laJv6Vw.png)

2. 自定义低代码组件部署

   关于自定义物料官方文档在 [开发一个自定义物料](https://lowcode-engine.cn/site/docs/guide/quickStart/start#开发一个自定义物料 '开发一个自定义物料') 这里，但是官方部署中只提供了 发布到 npm 的方案，没有提供部署至自己服务器的方案，接下来我会介绍如何部署到自己的服务器上使用。

   1. 我们在 low-code-material 目录下执行 lowcode:build 进行打包
      打包完成之后会出现 build 文件夹，其中 meta.js 和 view\.js 是需要放入服务器的文件（只需要这两个）

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_f2pEqYvABf.png)

   2. meta.js 和 view\.js 放入自己的服务器

      我在 child 目录下创建了 low-code-material 目录，并且把两文件上传到 low-code-material 目录下

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_MbvbmzX2Ql.png)

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image__zKogMhTz5.png)

   3. 确定文件能访问到并且设置 cors 解决跨域问题
      确保文件能被访问

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_hStnzgS2Yw.png)

      配置 nginx 跨域

      ```nginx
        location / {
              root   /usr/share/nginx/html/lowCode;
              index  index.html index.htm;
              try_files $uri $uri/ /index.html;
      +       add_header Access-Control-Allow-Origin *;
      +       add_header Access-Control-Allow-Headers *;
      +       add_header Access-Control-Allow-Methods "GET, POST, PUT, OPTIONS";
        }
      ```

   4. 配置 low-code-engine 中的 assets.json 文件
      在 low-code-engine 项目中 src/services 下 我们能看到 assets.js 文件

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_Rgj8vpNGZE.png)

      assets copy.json 文件可以参考，主要是改 packages 部分和 components 部分

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_f30kPtIPET.png)

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_BN_WZUsVEV.png)

      192.168.200.130 这是我虚拟机服务器的地址，大家只需要吧这个地址改成自己服务器的地址，并且把 assets copy.json 改成 assets.json 重启项目即可

      此时部署已经完成

      ![](https://github.com/WHSnhcZDYRZC/umi4-lowcode-engine-solutions/blob/main/image/image_CkPvw0TZRp.png)
