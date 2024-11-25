import { ButtonProps } from 'element-plus';
import { ComponentInternalInstance, DefineComponent } from 'vue';
import { JSX } from 'vue/jsx-runtime';
/**
 * 按钮props
 */
export interface IPublicButtonProps extends Partial<ButtonProps> {
  /**
   * 点击按钮之后最少等待时间
   * @default 500ms
   */
  duration?: number;
  /**
   * 点击按钮时是否显示loading状态
   * @default true
   */
  showLoadingStatus?: boolean;
  /**
   * 按钮class
   * @default []
   */
  btnClass?: string[];
  /**
   *
   * 按钮点击事件
   */
  onClick?: (...args: any[]) => any;
  /**
   * class 会赋给外层的span元素
   */
  class?: any;
}
/**
 * 模态/抽屉执行子组件confirm事件时传入的参数类型
 */
export interface IPLContainerValues {
  /**
   * 是否点击的是确认按钮
   */
  isConfirm: boolean;
  /**
   * 是否点击的是取消按钮
   */
  isCancel: boolean;
  /**
   * 关闭模态/抽屉的方法
   * @returns void
   */
  close: () => Promise<void>;
}
/**
 * 模态/抽屉provide属性
 */
export interface IPLContainerProvide {
  /**
   * 显示模态/抽屉的方法
   * @returns void
   */
  show: () => Promise<void>;
  /**
   * 关闭模态/抽屉的方法
   * @returns void
   */
  close: () => Promise<void>;
  /**
   * 触发子组件的emit事件
   * @param funName emit名称
   * @param options {@link IPLContainerValues}
   * @returns Promise<D>
   */
  triggerChildEvent: <
    D,
    C extends abstract new (...args: any) => any = DefineComponent<any>,
    K extends keyof InstanceType<C> = keyof InstanceType<C>
  >(
    funName: K,
    options: Partial<IPLContainerValues>
  ) => Promise<D>;
}
/**
 * 触发模态/抽屉emit的方法
 */
export type TPLContainerTrigger = <TRD = any>(type: 'confirm' | 'cancel', data: TRD) => TRD;
export type ModalDoneFun = (cancel?: boolean) => void;
export interface IPLContainerProps {
  childFun: (options: IPLContainerValues) => any;
  onConfirm?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  /**
   * title 弹窗标题
   */
  title?: string;
  /**
   * header 弹窗标题slot
   */
  header?: (ctx: ComponentInternalInstance) => () => JSX.Element;
  /**
   * footer 弹窗标题slot
   */
  footer?: (ctx: ComponentInternalInstance) => () => JSX.Element;
  /**
   * confirmText 确定按钮文字 默认: 确定
   */
  confirmText?: string;
  /**
   * confirmProps 确定按钮props 默认: undefined
   */
  confirmProps?: Partial<ButtonProps>;
  /**
   * cancelText 取消按钮文字 默认: 取消
   */
  cancelText?: string;
  /**
   * cancelProps 确定按钮props 默认: undefined
   */
  cancelProps?: Partial<ButtonProps>;
  /**
   * hideFooter 是否隐藏底部 默认: false
   */
  hideFooter?: boolean;
  /**
   * hideHeader 是否隐藏头部 默认: false
   */
  hideHeader?: boolean;
  /**
   * isDefaultBtn [确定]是否是普通按钮 默认: false
   */
  isDefaultBtn?: boolean;
  /**
   * cancelHasEvent [关闭]按钮是否有其他事件 默认: false
   */
  cancelHasEvent?: boolean;
  beforeClose?: (done: ModalDoneFun) => void;
}

export interface IPLModalData<D> {
  data: D;
}
export interface TUseContainerFun<P, D> {
  (props: P): Promise<IPLModalData<D>>;
  show: () => void;
  hasCurrent: () => boolean;
}
export type TUseContainer<C> = <P = any, D = any>(
  Com: any,
  props: Omit<IPLContainerProps & Partial<C>, 'childFun' | 'onConfirm' | 'onCancel'>
) => TUseContainerFun<P, D>;
