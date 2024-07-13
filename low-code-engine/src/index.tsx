import './public-path';
import { init, plugins, destroy } from '@alilc/lowcode-engine';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';
import EditorInitPlugin from './plugins/plugin-editor-init';
import UndoRedoPlugin from '@alilc/lowcode-plugin-undo-redo';
import ZhEnPlugin from '@alilc/lowcode-plugin-zh-en';
import CodeGenPlugin from '@alilc/lowcode-plugin-code-generator';
import DataSourcePanePlugin from '@alilc/lowcode-plugin-datasource-pane';
import SchemaPlugin from '@alilc/lowcode-plugin-schema';
import CodeEditorPlugin from '@alilc/lowcode-plugin-code-editor';
import ManualPlugin from '@alilc/lowcode-plugin-manual';
import InjectPlugin from '@alilc/lowcode-plugin-inject';
import SimulatorResizerPlugin from '@alilc/lowcode-plugin-simulator-select';
import ComponentPanelPlugin from '@alilc/lowcode-plugin-components-pane';
import DefaultSettersRegistryPlugin from './plugins/plugin-default-setters-registry';
import LoadIncrementalAssetsWidgetPlugin from './plugins/plugin-load-incremental-assets-widget';
import SaveSamplePlugin from './plugins/plugin-save-sample';
import PreviewSamplePlugin from './plugins/plugin-preview-sample';
import CustomSetterSamplePlugin from './plugins/plugin-custom-setter-sample';
import SetRefPropPlugin from '@alilc/lowcode-plugin-set-ref-prop';
import LogoSamplePlugin from './plugins/plugin-logo-sample';
import SimulatorLocalePlugin from './plugins/plugin-simulator-locale';
import lowcodePlugin from './plugins/plugin-lowcode-component';
import appHelper from './appHelper';
import ReactDOM from 'react-dom';
import './global.scss';
import { useEffect } from 'react';

async function registerPlugins() {
  await plugins.register(InjectPlugin);

  await plugins.register(EditorInitPlugin, {
    scenarioName: 'general',
    displayName: '综合场景',
    info: {
      urls: [
        {
          key: '设计器',
          value: 'https://github.com/alibaba/lowcode-demo/tree/main/demo-general',
        },
        {
          key: 'fusion-ui 物料',
          value: 'https://github.com/alibaba/lowcode-materials/tree/main/packages/fusion-ui',
        },
        {
          key: 'fusion 物料',
          value:
            'https://github.com/alibaba/lowcode-materials/tree/main/packages/fusion-lowcode-materials',
        },
      ],
    },
  });

  // 设置内置 setter 和事件绑定、插件绑定面板
  await plugins.register(DefaultSettersRegistryPlugin);

  await plugins.register(LogoSamplePlugin);

  await plugins.register(ComponentPanelPlugin);

  await plugins.register(SchemaPlugin, { isProjectSchema: true });

  await plugins.register(ManualPlugin);

  // 注册回退/前进
  await plugins.register(UndoRedoPlugin);

  // 注册中英文切换
  await plugins.register(ZhEnPlugin);

  await plugins.register(SetRefPropPlugin);

  await plugins.register(SimulatorResizerPlugin);

  await plugins.register(LoadIncrementalAssetsWidgetPlugin);

  // 插件参数声明 & 传递，参考：https://lowcode-engine.cn/site/docs/api/plugins#%E8%AE%BE%E7%BD%AE%E6%8F%92%E4%BB%B6%E5%8F%82%E6%95%B0%E7%89%88%E6%9C%AC%E7%A4%BA%E4%BE%8B
  await plugins.register(DataSourcePanePlugin, {
    importPlugins: [],
    dataSourceTypes: [
      {
        type: 'fetch',
      },
      {
        type: 'jsonp',
      },
    ],
  });

  await plugins.register(CodeEditorPlugin);

  // 注册出码插件
  await plugins.register(CodeGenPlugin);

  await plugins.register(SaveSamplePlugin);

  await plugins.register(PreviewSamplePlugin);

  await plugins.register(CustomSetterSamplePlugin);

  // 设计器区域多语言切换
  await plugins.register(SimulatorLocalePlugin);

  await plugins.register(lowcodePlugin);
}

const Main = () => {
  const _init = async () => {
    if (!plugins.has('LowcodePluginInjectAlt')) {
      await registerPlugins();
    } else {
      // 容错方案，因为重复注册 plugins.delete 没办法解决
      // 如果项目要求比较高，可以 加入 loading 效果解决闪动问题
      window.location.reload();
    }

    init(document.getElementById('hy-low-code-container')!, {
      locale: 'zh-CN',
      enableCondition: true,
      enableCanvasLock: true,
      // 默认绑定变量
      supportVariableGlobally: true,
      requestHandlersMap: {
        fetch: createFetchHandler(),
      },
      simulatorUrl: [
        'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/css/react-simulator-renderer.css',
        'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/js/react-simulator-renderer.js',
      ],
    });
  }

  useEffect(() => {
    _init();
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
      id="hy-low-code-container"
    />
  );
};

if (!(window as any).__POWERED_BY_QIANKUN__) {
  ReactDOM.render(<Main />, document.getElementById('lce-container'));
}

export async function bootstrap() {
  console.log('react app bootstraped');
}

export async function mount(props: any) {
  ReactDOM.render(
    <Main />,
    props.container
      ? props.container.querySelector('#lce-container')
      : document.getElementById('lce-container'),
  );
}

export async function unmount(props: any) {
  ReactDOM.unmountComponentAtNode(
    props.container
      ? props.container.querySelector('#lce-container')
      : document.getElementById('lce-container'),
  );
}

export async function update(props: any) {
  console.log('update props', props);
}
