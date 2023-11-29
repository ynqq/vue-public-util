import { Ref, createApp, h } from 'vue';
import loadingConfig from './loading.config';
import { TUseLoading } from '@app/types';
const createSpinner = () => {
  return createApp({
    render() {
      return h(
        'div',
        {
          class: ['pl-loading-spinner'],
        },
        [h('div'), h('div'), h('div'), h('div')]
      );
    },
  });
};

const createLoading = (parentEl: Ref<HTMLDivElement>) => {
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
  parent.className = 'pl-loading-box';
  const spinner = createSpinner();
  spinner.mount(parent);
  root.appendChild(parent);
  return parent;
};

export const useLoading: TUseLoading = (fun => {
  let parentEl: Ref<HTMLDivElement>;
  const result = async (...args: any[]) => {
    const loadingEl = createLoading(parentEl);
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
  return result;
}) as TUseLoading;
