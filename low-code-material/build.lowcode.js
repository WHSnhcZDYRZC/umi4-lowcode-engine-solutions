const { library } = require('./build.json');

module.exports = {
  alias: {
    '@': './src',
  },
  plugins: [
    [
      '@alifd/build-plugin-lowcode',
      {
        library,
        engineScope: "@alilc"
      },
    ],
    [
      '@alilc/build-plugin-alt',
      {
        type: 'component',
        inject: true,
        library,
        // 配置要打开的页面，在注入调试模式下，不配置此项的话不会打开浏览器
        // 支持直接使用官方 demo 项目：https://lowcode-engine.cn/demo/index.html
        openUrl: 'http://localhost:8001/index.html?debug',
      },
    ],
  ],
};
