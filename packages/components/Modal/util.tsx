import { getPlugins } from '@app/utils/plugin';
import { createApp, ref } from 'vue';
import ModalCom from './index.vue';
import { TUseContainer } from '../type';
import { install } from '@app/index';

export const usePLModal: TUseContainer = (Com, modalProps) => {
  return props => {
    return new Promise((resolve, reject) => {
      try {
        const plugins = getPlugins();
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        parent.className = 'p-l-container';
        const childRef = ref();

        const app = createApp({
          provide: {
            childRef,
          },
          render() {
            return (
              <ModalCom
                {...modalProps}
                childFun={async (...args: any[]) => {
                  return await childRef.value.confirm(...args);
                }}
                onConfirm={data => {
                  resolve(data);
                }}
                onCancel={data => {
                  reject(data);
                }}
              >
                <Com ref={childRef} {...props} />
              </ModalCom>
            );
          },
        });
        plugins.forEach(plugin => {
          app.use(plugin);
        });
        install(app);
        app.mount(parent);
      } catch (error) {
        reject(error);
      }
    });
  };
};
