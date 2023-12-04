import { createApp, ref } from 'vue';
import { TUseContainer } from '../type';
import { getPlugins } from '@app/utils/plugin';
import { install } from '@app/index';

export function genAppContainer<C>(ModalCom: any): TUseContainer<C> {
  return (Com, modalProps) => {
    return props => {
      return new Promise((resolve, reject) => {
        try {
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
                  onConfirm={(data: any) => {
                    resolve({ data });
                  }}
                  onCancel={(data: any) => {
                    reject(data);
                  }}
                >
                  <Com ref={childRef} {...props} />
                </ModalCom>
              );
            },
          });
          const plugins = getPlugins();
          const parent = document.createElement('div');
          document.body.appendChild(parent);
          parent.className = 'p-l-container';

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
}
