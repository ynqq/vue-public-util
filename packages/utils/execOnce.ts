/**
 * 缓存&&延迟执行
 * @param options 函数配置对象
 * @returns 函数配置的key以及返回值
 */
export const useExecOnUse = <O extends Record<string, any>, T extends { [k in keyof O]: () => O[k] } = { [k in keyof O]: () => O[k] }>(
  options: T
): {
  (): O;
  reset: (fn?: () => void) => void;
} => {
  const cache = new Map<keyof O, O[keyof O]>();
  const obj: O = {} as O;
  const handler = () => {
    const a = new Proxy(obj, {
      get(_target, key: string) {
        if (cache.has(key as keyof O)) {
          return cache.get(key as keyof O);
        }
        const val = options[key]();
        cache.set(key as keyof O, val);
        return val;
      },
    });
    return a;
  };
  handler.reset = (fn?: () => void) => {
    try {
      fn && fn();
    } catch (error) {
      //
    }
    cache.clear();
  };
  return handler;
};
