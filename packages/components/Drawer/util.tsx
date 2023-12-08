import DrawerCom from './index.vue';
import { genAppContainer } from '../util';
import { DrawerProps } from 'element-plus';

/**
 * 生成一个抽屉组件函数
 * @example
 * ```ts
 * // util.tsx
 * import { usePlDrawer } from 'vue-public-util'
 * import Drawer from './drawer.vue';
 * export const showAddDrawer = usePlDrawer<Props, ReturnData>(Drawer, {
 *   title: '标题',
 * });
 * // app.vue
 * const {}: ReturnData = await showAddDrawer(props)
 * ```
 */
export const usePlDrawer = genAppContainer<DrawerProps>(DrawerCom);
