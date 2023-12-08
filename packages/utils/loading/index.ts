import { Ref, VNode, h, isVNode, render } from 'vue';
import loadingConfig from './loading.config';
import { TUseLoading } from '@app/types';
import { DataUtil } from '../data';
import { getConfigLoading } from '../config';
const createSpinner = () => {
  return h(
    'div',
    {
      class: loadingConfig.spinner.className,
    },
    [h('div'), h('div'), h('div'), h('div')]
  );
};

const createSpinnerText = (msg: string | VNode) => {
  const textBox = document.createElement('div');
  loadingConfig.message.className.forEach(item => {
    textBox.classList.add(item);
  });
  if (DataUtil.isString(msg)) {
    textBox.innerText = msg;
  } else if (isVNode(msg)) {
    render(msg, textBox);
  }
  return textBox;
};

const createLoading = (parentEl: Ref<HTMLDivElement>, msg: string | VNode) => {
  const parentBox = parentEl?.value?.parentElement?.parentElement;
  const parentClasses = parentBox?.classList;
  let root = document.body;

  if (parentClasses) {
    loadingConfig.includesClass.forEach(name => {
      if (parentClasses.contains(name)) {
        root = parentBox!;
      }
    });
  }

  const parent = document.createElement('div');
  parent.className = loadingConfig.className;
  const spinner = createSpinner();
  const spinnerText = createSpinnerText(msg);
  render(spinner, parent);
  parent.appendChild(spinnerText);
  root.appendChild(parent);
  return parent;
};

/**
 * 函数执行时增加loading
 * @param fun 业务函数
 * @return fun {@link IPLModalData}
 * @example
 * ```ts
 * const drawerRef = ref<HTMLDivElement>()
 * const submitAction = useLoading(async () => {})
 * submitAction.setContainer(drawerRef).setMsg('正在保存中,请稍后...')
 * ...
 * const submit = async () => { await submitAction() }
 * ```
 */
export const useLoading: TUseLoading = (fun => {
  let parentEl: Ref<HTMLDivElement>;
  let loadingEl: HTMLDivElement;
  let loadingMessage: string | VNode = getConfigLoading()?.text || loadingConfig.message.info;
  const result = async (...args: any[]) => {
    loadingEl = createLoading(parentEl, loadingMessage);
    try {
      const data = await fun(args);
      return data;
    } finally {
      loadingEl.remove();
    }
  };
  result.setContainer = (el: Ref<HTMLDivElement>) => {
    parentEl = el;
    return result;
  };
  result.stop = () => {
    loadingEl?.remove();
    return result;
  };
  result.setMsg = (str: string | VNode) => {
    loadingMessage = str;
    return result;
  };
  return result;
}) as TUseLoading;
