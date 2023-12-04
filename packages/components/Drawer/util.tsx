import DrawerCom from './index.vue';
import { genAppContainer } from '../util';
import { DrawerProps } from 'element-plus';

export const usePlDrawer = genAppContainer<DrawerProps>(DrawerCom);
