import ModalCom from './index.vue';
import { genAppContainer } from '../util';
import { DialogProps } from 'element-plus';

export const usePlModal = genAppContainer<DialogProps>(ModalCom);
