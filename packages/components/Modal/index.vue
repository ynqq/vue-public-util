<template>
  <ElDialog
    v-bind="otherAttrs"
    v-model="visible"
    :title="hideHeader ? undefined : title"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :before-close="handleBeforeClose"
    @close="handleClose"
  >
    <template v-if="!hideHeader && HeaderCom" #header>
      <HeaderCom />
    </template>
    <slot></slot>
    <template v-if="!hideFooter" #footer>
      <template v-if="!FooterCom">
        <VuePublicButton type="primary" class="pl-default-btn" v-bind="confirmProps" @click="handleConfirm">
          {{ confirmText || $t('confirm') }}
        </VuePublicButton>
        <VuePublicButton v-bind="cancelProps" @click="handleCancel">
          {{ cancelText || $t('cancel') }}
        </VuePublicButton>
      </template>
      <FooterCom v-else />
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import { ElDialog } from 'element-plus';
  import { IPLContainerProps, IPLContainerProvide, IPLContainerValues, ModalDoneFun, TPLContainerTrigger } from '@app/components/type';
  import VuePublicButton from '@app/components/Button/index.vue';
  import { sleep } from '@app/utils';
  import { ref, onMounted, nextTick, useAttrs, provide, inject, Ref } from 'vue';

  defineOptions({
    name: 'PlModal',
  });
  const emit = defineEmits<{
    confirm: [any];
    cancel: [];
  }>();
  const props = withDefaults(defineProps<IPLContainerProps>(), {
    closeOnClickModal: false,
    closeOnPressEscape: false,
  });

  const { ...otherAttrs } = useAttrs();
  const { hideFooter, hideHeader, childFun, title, header, footer, cancelHasEvent, confirmText, confirmProps, cancelProps, cancelText, beforeClose } =
    props;
  const HeaderCom = header ? header() : null;
  const FooterCom = footer ? footer() : null;

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
        childFun && (data = await childFun(getChildOptions({ isConfirm: true })));
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
          childFun && (data = await childFun(getChildOptions({ isCancel: true })));
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
</script>

<style scoped lang="scss">
  .pl-default-btn {
    margin-right: 10px;
  }
</style>
