interface IUseFetchOnceQueryData {
  pending: null | boolean;
  queue: ((...args: any[]) => any)[];
  result?: any;
  failData?: any;
}
const queryData = new Map<string, IUseFetchOnceQueryData>();

export const deleteQueryData = (name: string) => {
  queryData.delete(name);
};
export const setQueryData = (name: string, value: IUseFetchOnceQueryData) => {
  queryData.set(name, value);
  return getQueryData(name)!;
};
export const getQueryData = (name: string) => {
  return queryData.get(name);
};
export const clearQueryData = () => {
  queryData.clear();
};
