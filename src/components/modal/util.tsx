// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Modal, { CustomAction } from './modal.vue';
import { Ref, inject } from 'vue';
import { IPLContainerProvide, TPLContainerTrigger } from '@app/components/type';
// import { usePlModal } from '../../../';
import { usePlModal } from '../../../packages/components/Modal/util';

const headerFun = () => {
  return () => {
    // 关闭弹窗事件 不会进入inject状态
    const close = inject<IPLContainerProvide['close']>('close');
    // 触发业务组件expose的方法
    const triggerChildEvent = inject<IPLContainerProvide['triggerChildEvent']>('triggerChildEvent');
    // 触发弹窗组件的emit事件
    const triggerEmit = inject<TPLContainerTrigger>('triggerEmit');

    // 执行业务组件的confirm事件
    const triggerEvent = async (options: CustomAction) => {
      const data = await triggerChildEvent!('confirm', options as any);
      triggerEmit('confirm', data);
    };

    const onConfirm = async () => {
      await triggerEvent({ isConfirm: true });
    };

    const onCancel = async () => {
      await close();
      triggerEmit('cancel', null);
    };

    const onAgree = async () => {
      await triggerEvent({ isAgree: true });
    };
    const onReject = async () => {
      await triggerEvent({ isReject: true });
    };

    return (
      <div>
        <pl-button type="primary" onClick={onConfirm}>
          确定
        </pl-button>
        <pl-button type="primary" onClick={onAgree}>
          同意
        </pl-button>
        <pl-button type="primary" onClick={onReject}>
          驳回
        </pl-button>
        <pl-button type="danger" onClick={onCancel}>
          取消
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

export const showAddModal = usePlModal<{ num: number }, { data: number }>(Modal, {
  title: 'asd',
  width: '1000px',
  header: headerFun,
  showClose: false,
  footer: footerFun,
});

// usePlModal<Props, Response>(ChildCom, options)
export const showNormalModal = usePlModal<{ num: number }, { data: number }>(Modal, {
  title: '标题',
  width: '800px',
});
