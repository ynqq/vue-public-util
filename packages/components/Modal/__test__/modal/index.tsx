import { EActionEnum, OmitRequired, usePlModal } from '@app/index';
import Com from './com.vue';
import { IComProps, IComValues } from './type';

export const showAddModel = (props: OmitRequired<IComProps, 'action'>) => {
  props.action = props.action || EActionEnum.isCreate;
  return usePlModal<IComProps, IComValues>(Com, {
    title: 'title',
  })(props as IComProps);
};
