import { ButtonProps } from 'element-plus';
import { DefineComponent } from 'vue';
export interface IPublicButtonProps {
  duration?: number;
  showLoadingStatus?: boolean;
  btnClass?: string[];
}
export interface IPLContainerValues {
  isConfirm: boolean;
  isCancel: boolean;
  close: () => Promise<void>;
}
export interface IPLContainerProvide {
  close: () => Promise<void>;
  triggerChildEvent: <
    D,
    C extends abstract new (...args: any) => any = DefineComponent<any>,
    K extends keyof InstanceType<C> = keyof InstanceType<C>
  >(
    funName: K,
    options: Partial<IPLContainerValues>
  ) => Promise<D>;
}
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
  header?: () => () => JSX.Element;
  /**
   * footer 弹窗标题slot
   */
  footer?: () => () => JSX.Element;
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
export type TUseContainer<C> = <P = any, D = any>(
  Com: any,
  props: Omit<IPLContainerProps & Partial<C>, 'childFun' | 'onConfirm' | 'onCancel'>
) => (props: P) => Promise<IPLModalData<D>>;
