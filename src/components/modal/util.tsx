// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import Modal, { CustomAction } from './modal.vue';
import { ComponentInternalInstance, Ref, inject } from 'vue';
import { IPLContainerProvide } from '@app/components/type';
// import { usePlModal } from '../../../';
import { usePlModal } from '../../../packages/components/Modal/util';
import { useOpen } from '@app/utils';

const headerFun = (ctx: ComponentInternalInstance) => {
  return () => {
    const { runInstanceExpose, runInstanceClose, getChildExpose } = useOpen(false, ctx);

    const childExpose = getChildExpose<InstanceType<typeof Modal>>();

    const onConfirm = async () => {
      await runInstanceExpose<CustomAction>({ isConfirm: true });
    };

    const onAgree = async () => {
      await runInstanceExpose<CustomAction>({ isAgree: true });
    };

    const onReject = async () => {
      await runInstanceExpose<CustomAction>({ isReject: true });
    };

    return (
      <div>
        {childExpose.value.random}
        {childExpose.value.val === '1' ? (
          <pl-button type="primary" onClick={onConfirm}>
            确定
          </pl-button>
        ) : null}
        <pl-button type="primary" onClick={onAgree}>
          同意
        </pl-button>
        <pl-button type="primary" onClick={onReject}>
          驳回
        </pl-button>
        <pl-button type="danger" onClick={runInstanceClose}>
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
            // eslint-disable-next-line no-console
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
