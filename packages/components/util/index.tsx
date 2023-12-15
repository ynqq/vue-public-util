import { createApp, ref } from 'vue';
import { TUseContainer, TUseContainerFun } from '../type';
import { getPlugins } from '@app/utils/plugin';
import { DataUtil, install, sleep } from '@app/index';
import { CANCEL_ERROR } from '@app/enums';

export function genAppContainer<C>(ModalCom: any): TUseContainer<C> {
  return (Com, modalProps) => {
    let current: any;
    const currentFun: TUseContainerFun<any, any> = (props: any) => {
      return new Promise((resolve, reject) => {
        try {
          const childRef = ref();
          const containerRef = ref();
          current = containerRef;
          const destroy = async () => {
            try {
              current = null;
              await sleep(400);
              app.unmount();
              parent.remove();
            } catch (error) {
              //
            }
          };
          const app = createApp({
            provide: {
              childRef,
            },
            render() {
              return (
                <ModalCom
                  ref={containerRef}
                  {...modalProps}
                  childFun={async (...args: any[]) => {
                    return await childRef.value.confirm(...args);
                  }}
                  onConfirm={(data: any) => {
                    resolve({ data });
                    destroy();
                  }}
                  onCancel={(error: any) => {
                    reject(DataUtil.isUndefined(error) ? CANCEL_ERROR : error);
                    destroy();
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
    currentFun.show = function () {
      if (this.hasCurrent()) {
        current.value.show();
      }
    };
    currentFun.hasCurrent = () => {
      return current ? !!current.value : false;
    };
    return currentFun;
  };
}
