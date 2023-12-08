import ModalCom from './index.vue';
import { genAppContainer } from '../util';
import { DialogProps } from 'element-plus';

/**
 * 生成一个模态组件函数
 * @example
 * ```ts
 * // util.tsx
 * import { usePlModal } from 'vue-public-util'
 * import Modal from './modal.vue';
 * export const showAddModal = usePlModal<Props, ReturnData>(Modal, {
 *   title: '标题',
 * });
 * // app.vue
 * const {}: ReturnData = await showAddModal(props)
 * ```
 */
export const usePlModal = genAppContainer<DialogProps>(ModalCom);
