import { TLANGUAGE } from '@app/enums';
import { Ref, VNode } from 'vue';
interface IObject<K> {
  [k: string]: K;
}
type TObject = Record<string, IObject<string | TObject>>;
export interface IConfigOptions {
  locel: TLANGUAGE;
  langus?: {
    [K in TLANGUAGE]: Record<string, string | TObject>;
  };
  loading?: {
    text?: string;
  };
}

interface IUseFun<F extends (...args: any[]) => any, D = ReturnType<F>, R = D extends Promise<any> ? D : Promise<D>> {
  (...args: Parameters<F>): R;
  setContainer(el: Ref<HTMLDivElement>): this;
  stop(): this;
  setMsg(str: string | VNode): this;
}
export type TUseLoading = <F extends (...args: any[]) => any>(fun: F) => IUseFun<F>;
