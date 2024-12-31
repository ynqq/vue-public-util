import { createApp, ref } from 'vue';
import { IPLModalData, TUseContainer, TUseContainerFun } from '../type';
import { getPlugins } from '@app/utils/plugin';
import { DataUtil, install, sleep } from '@app/index';
import { CANCEL_ERROR } from '@app/enums';

export function genAppContainer<C>(ModalCom: any): TUseContainer<C> {
  return (Com, modalProps) => {
    let current: any,
      _resolve: ((value: IPLModalData<any> | PromiseLike<IPLModalData<any>>) => void) | null,
      _reject: ((reason?: any) => void) | null,
      destroyFun: (destroy?: boolean) => Promise<void>;
    const currentFun: TUseContainerFun<any, any> = (props: any) => {
      return new Promise((resolve, reject) => {
        try {
          _resolve = resolve;
          _reject = reject;
          if (current) {
            current.value.show();
            return;
          }
          const childRef = ref();
          const containerRef = ref();
          current = containerRef;
          destroyFun = async (destroy?: boolean) => {
            try {
              if (!destroy && modalProps.forever) {
                return;
              }
              console.log('des');
              _resolve = null;
              _reject = null;
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
                    _resolve && _resolve({ data });
                    destroyFun();
                  }}
                  onCancel={(error: any) => {
                    _reject && _reject(DataUtil.isUndefined(error) ? CANCEL_ERROR : error);
                    destroyFun();
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
    currentFun.destroy = () => destroyFun(true);
    currentFun.hasCurrent = () => {
      return current ? !!current.value : false;
    };
    return currentFun;
  };
}
