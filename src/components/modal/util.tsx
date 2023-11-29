import { usePLModal } from '@app/components/Modal/util';
import Modal from './modal.vue';
import { Ref, inject } from 'vue';
import { IPLContainerProvide } from '@app/components/type';

const headerFun = () => {
  return () => {
    const close = inject<IPLContainerProvide['close']>('close');
    const triggerChildEvent = inject<IPLContainerProvide['triggerChildEvent']>('triggerChildEvent');
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
            close && close();
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

export const showAddModal = usePLModal(Modal, {
  title: 'asd',
  // confirmText: '等等',
  // cancelText: '关闭',
  cancelProps: {
    type: 'danger',
  },
  confirmProps: {
    type: 'danger',
  },
  cancelHasEvent: true,
  header: headerFun,
  showClose: false,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  // footer: footerFun,
  // hideFooter: true,
  // hideHeader: true,
});
