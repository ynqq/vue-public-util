import { sleep, useOpen } from '@app/utils';
import { ref, onMounted, nextTick, inject, Ref, provide, useAttrs, getCurrentInstance, computed } from 'vue';
import { ModalDoneFun, IPLContainerProvide, IPLContainerValues, TPLContainerTrigger, IPLContainerProps } from '../type';
import { TOpenBucketType } from '@app/types';

export const useOpenHooks = (props: IPLContainerProps, emit: any) => {
  const { ...otherAttrs } = useAttrs();
  const { hideFooter, hideHeader, childFun, title, header, footer, cancelHasEvent, confirmText, confirmProps, cancelProps, cancelText, beforeClose } =
    props;
  const instance = getCurrentInstance();
  const { runConfirm, checkIsReg, onExposeEffect, onCloseEffect } = useOpen(true);

  const HeaderCom = header ? header(instance!) : null;
  const FooterCom = footer ? footer(instance!) : null;

  const visible = ref(false);
  let handing = false;
  let isCloseEvent = false;

  const checkHandling = () => {
    if (handing) {
      return false;
    }
    handing = true;
    return true;
  };

  const handleBeforeClose = (done: ModalDoneFun) => {
    if (handing) {
      return;
    }
    if (beforeClose) {
      beforeClose(done);
    } else {
      done();
    }
  };

  const setHanding = async () => {
    await sleep(400);
    handing = false;
  };
  // close 不能触发cancel事件
  const close: IPLContainerProvide['close'] = async () => {
    isCloseEvent = true;
    visible.value = false;
    setHanding();
    await sleep(300);
    isCloseEvent = false;
  };
  const show: IPLContainerProvide['show'] = async () => {
    visible.value = true;
  };
  const getChildOptions = (options: Partial<IPLContainerValues>) => {
    return {
      close,
      isConfirm: false,
      isCancel: false,
      ...options,
    };
  };

  const handleConfirm = async () => {
    if (checkHandling()) {
      try {
        let data;
        const params = getChildOptions({ isConfirm: true });
        if (checkIsReg(TOpenBucketType.confirm)) {
          data = await runConfirm()!(params);
          await params.close();
        } else {
          childFun && (data = await childFun(params));
        }
        emit('confirm', data);
      } finally {
        setHanding();
      }
    }
  };

  const handleCancel = async () => {
    if (checkHandling()) {
      if (cancelHasEvent) {
        try {
          let data;
          const params = getChildOptions({ isCancel: true });
          if (checkIsReg(TOpenBucketType.confirm)) {
            data = await runConfirm()!(params);
            await params.close();
          } else {
            childFun && (data = await childFun(params));
          }
          emit('confirm', data);
        } finally {
          setHanding();
        }
        return;
      }
      await close();
      emit('cancel');
    }
  };
  const handleClose = () => {
    if (isCloseEvent) {
      return;
    }
    emit('cancel');
  };

  // 注册一些事件 可以在 自定义header/footer直接调用
  onExposeEffect(async (options: Record<string, any>) => {
    if (checkHandling()) {
      try {
        let data;
        const params = getChildOptions(options);
        if (checkIsReg(TOpenBucketType.confirm)) {
          data = await runConfirm()!(params);
          await params.close();
        } else {
          childFun && (data = await childFun(params));
        }
        emit('confirm', data);
      } finally {
        setHanding();
      }
    }
  });
  onCloseEffect(async () => {
    if (checkHandling()) {
      await close();
      emit('cancel');
    }
  });

  onMounted(() => {
    nextTick(() => {
      visible.value = true;
    });
  });
  const childRef = inject<Ref<any>>('childRef')!;
  const triggerChildEvent: IPLContainerProvide['triggerChildEvent'] = async (funName, options) => {
    if (checkHandling()) {
      try {
        const data = await childRef.value[funName](getChildOptions(options));
        return data;
      } finally {
        setHanding();
      }
    }
  };
  const triggerEmit: TPLContainerTrigger = (type, data) => {
    if (data) {
      emit(type as 'confirm', data);
    } else {
      emit(type as 'cancel');
    }
    return data;
  };
  provide('show', show);
  provide('close', close);
  provide('triggerEmit', triggerEmit);
  provide('triggerChildEvent', triggerChildEvent);
  return {
    otherAttrs,
    hideFooter,
    hideHeader,
    title,
    confirmText,
    confirmProps,
    cancelText,
    cancelProps,
    visible,
    HeaderCom,
    FooterCom,
    handleBeforeClose,
    handleConfirm,
    handleCancel,
    handleClose,
    show,
  };
};

/**
 * toRefs(props)处理为响应式
 * @param props props
 * @returns 解包后的props
 */
export const useRefProps = (props: Record<string, Ref>) => {
  return computed(() => {
    const attrs: { [k in keyof typeof props]: (typeof props)[k]['value'] } = {} as {
      [k in keyof typeof props]: (typeof props)[k]['value'];
    };
    Object.keys(props).forEach(key => {
      const k = key as keyof typeof props;
      Object.assign(attrs, {
        [k]: props[k].value,
      });
    });
    return attrs;
  });
};
