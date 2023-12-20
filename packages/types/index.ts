import { TLANGUAGE } from '@app/enums';
import { Ref, VNode } from 'vue';
interface IObject<K> {
  [k: string]: K;
}
type TObject = Record<string, IObject<string | TObject>>;
export interface IConfigOptions {
  /**
   * 语言种类
   */
  locel: TLANGUAGE;
  /**
   * 扩展语言包
   */
  langus?: {
    [K in TLANGUAGE]: Record<string, string | TObject>;
  };
  /**
   * loading配置
   */
  loading?: {
    /**
     * 默认loading提示文字
     * @default 正在加载，请稍后。
     */
    text?: string;
  };
}

interface IUseFun<F extends (...args: any[]) => any, D = ReturnType<F>, R = D extends Promise<any> ? D : Promise<D>> {
  (...args: Parameters<F>): R;
  /**
   * 将loading组件挂载到其他容器内
   * @param el ref<HTMLDivElement>
   * @return this
   */
  setContainer(el: Ref<HTMLDivElement>): this;
  /**
   * 停止loading
   * @return this
   */
  stop(): this;
  /**
   * 设置本次loading的文字
   * @return this
   */
  setMsg(str: string | VNode): this;
}
/**
 * 增加loading
 * @param fun 业务函数
 * @return fun {@link IUseFun}
 */
export type TUseLoading = <F extends (...args: any[]) => any>(fun: F) => IUseFun<F>;
export type ValueOf<T> = T[keyof T];
export enum EActionEnum {
  'isCreate' = '1',
  'isUpdate' = '2',
  'isCopy' = '3',
  'isView' = '4',
}
export type TOtherAction = '5' | '6' | '7' | '8' | '9' | '10';
export type TActionConfig = Record<string, TOtherAction>;
export type TActionValue<K extends string | number | symbol> = {
  [k in K]: boolean;
} & {
  isCreate: boolean;
  isUpdate: boolean;
  isCopy: boolean;
  isView: boolean;
};
