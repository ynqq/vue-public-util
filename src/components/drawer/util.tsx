// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Modal from './modal.vue';
import { Ref, inject } from 'vue';
import { IPLContainerProvide, TPLContainerTrigger } from '@app/components/type';
import { usePlDrawer } from '../../../packages/components/Drawer/util';

const headerFun = () => {
  return () => {
    const close = inject<IPLContainerProvide['close']>('close');
    const triggerChildEvent = inject<IPLContainerProvide['triggerChildEvent']>('triggerChildEvent');
    const triggerEmit = inject<TPLContainerTrigger>('triggerEmit');
    return (
      <div>
        <pl-button
          type="primary"
          onClick={async () => {
            const data = await triggerChildEvent!<{}, typeof Modal>('confirm', { isCancel: true });
            console.log(data);
          }}
        >
          触发子组件confirm
        </pl-button>
        <pl-button
          type="danger"
          onClick={async () => {
            close && (await close());
            triggerEmit('cancel');
          }}
        >
          关闭
        </pl-button>
      </div>
    );
  };
};
const footerFun = () => {
  return () => {
    const close = inject<IPLContainerProvide['close']>('close');
    const childRef = inject<Ref<InstanceType<typeof Modal>>>('childRef');
    return (
      <div>
        <pl-button
          type="primary"
          onClick={async () => {
            console.log(childRef!.value);
          }}
        >
          关闭
        </pl-button>
        <pl-button
          type="danger"
          onClick={async () => {
            close && close();
          }}
        >
          关闭
        </pl-button>
      </div>
    );
  };
};

export const showAddDrawer = usePlDrawer(Modal, {
  title: 'asd',
  // confirmText: '等等',
  // cancelText: '关闭',
  direction: 'btt',
  size: '100%',
  // cancelProps: {
  //   type: 'danger',
  // },
  // confirmProps: {
  //   type: 'danger',
  // },
  cancelHasEvent: true,
  // header: headerFun,
  showClose: false,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  // footer: footerFun,
  // hideFooter: true,
  // hideHeader: true,
});
