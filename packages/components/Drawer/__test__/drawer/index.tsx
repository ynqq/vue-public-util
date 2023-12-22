import { EActionEnum, OmitRequired, usePlDrawer } from '@app/index';
import Com from './com.vue';
import { IComProps, IComValues } from './type';

export const showAddDrawer = (props: OmitRequired<IComProps, 'action'>) => {
  props.action = props.action || EActionEnum.isCreate;
  return usePlDrawer<IComProps, IComValues>(Com, {
    title: 'title',
  })(props as IComProps);
};
