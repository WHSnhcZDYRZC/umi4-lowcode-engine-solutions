import { defineConfig } from '@umijs/max';

export default defineConfig({
  qiankun: {
    master: {},
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: ' 低代码平台',
      path: '/low-code-engine/*',
      microApp: 'low-code-engine',
      headerRender: false,
      menuRender: false,
      // hideInMenu: true,
    },
    {
      name: ' 低代码预览',
      path: '/low-code-engine-preview',
      component: './Preview',
      headerRender: false,
      menuRender: false,
      hideInMenu: true,
    },
  ],

  externals: {
    react: 'var window.React',
    'react-dom': 'var window.ReactDOM',
    'prop-types': 'var window.PropTypes',
    '@alifd/next': 'var window.Next',
    '@alilc/lowcode-engine': 'var window.AliLowCodeEngine',
    '@alilc/lowcode-editor-core':
      'var window.AliLowCodeEngine.common.editorCabin',
    '@alilc/lowcode-editor-skeleton':
      'var window.AliLowCodeEngine.common.skeletonCabin',
    '@alilc/lowcode-designer':
      'var window.AliLowCodeEngine.common.designerCabin',
    '@alilc/lowcode-engine-ext': 'var window.AliLowCodeEngineExt',
    '@ali/lowcode-engine': 'var window.AliLowCodeEngine',
    moment: 'var window.moment',
    lodash: 'var window._',
  },
  styles: [
    'https://alifd.alicdn.com/npm/@alilc/lowcode-engine@latest/dist/css/engine-core.css',
    'https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.css',
    'https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light/0.2.0/next.min.css',
    'https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@latest/dist/css/engine-ext.css',
  ],
  scripts: [
    {
      src: 'https://g.alicdn.com/code/lib/react/18.0.0/umd/react.production.min.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/code/lib/react-dom/18.0.0/umd/react-dom.production.min.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/code/lib/moment.js/2.29.1/moment-with-locales.min.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.js',
      defer: true,
    },
    {
      src: 'https://alifd.alicdn.com/npm/@alilc/lowcode-engine@latest/dist/js/engine-core.js',
      defer: true,
    },
    {
      src: 'https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@latest/dist/js/engine-ext.js',
      defer: true,
    },
  ],
  npmClient: 'yarn',
});
