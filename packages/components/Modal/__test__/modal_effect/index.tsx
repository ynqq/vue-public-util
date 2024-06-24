import { EActionEnum, OmitRequired, PlButton, useOpen, usePlModal } from '@app/index';
import Com from './com.vue';
import { IComProps, IComValues } from './type';
import { ComponentInternalInstance } from 'vue';

const headerFun = (ctx: ComponentInternalInstance) => {
  return () => {
    const { runInstanceExpose, getChildExpose } = useOpen(false, ctx);

    const childExpose = getChildExpose<InstanceType<typeof Com>>();

    const handleSave = async () => {
      return runInstanceExpose({});
    };

    return (
      <div>
        {childExpose.value.inputVal === '1' ? (
          <PlButton class={'save-button'} type="primary" onClick={handleSave}>
            保存
          </PlButton>
        ) : null}
      </div>
    );
  };
};

export const showAddModel = (props: OmitRequired<IComProps, 'action'>) => {
  props.action = props.action || EActionEnum.isCreate;
  return usePlModal<IComProps, IComValues>(Com, {
    title: 'title',
    header: headerFun,
  })(props as IComProps);
};
