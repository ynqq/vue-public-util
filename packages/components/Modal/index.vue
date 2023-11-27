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
          {{ confirmText }}
        </VuePublicButton>
        <VuePublicButton v-bind="cancelProps" @click="handleCancel">
          {{ cancelText }}
        </VuePublicButton>
      </template>
      <FooterCom v-else />
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import { ElDialog } from 'element-plus';
  import { IPLContainerProps, IPLContainerProvide, IPLContainerValues, ModalDoneFun } from '@app/components/type';
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
    confirmText: '确定',
    cancelText: '取消',
  });

  const { ...otherAttrs } = useAttrs();
  const { hideFooter, hideHeader, childFun, title, header, footer, cancelHasEvent, confirmText, confirmProps, cancelProps, cancelText, beforeClose } =
    props;
  const HeaderCom = header ? header() : null;
  const FooterCom = footer ? footer() : null;

  const visible = ref(false);
  let handing = false;

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

  const close: IPLContainerProvide['close'] = async () => {
    visible.value = false;
    await sleep(300);
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
        handing = false;
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
          handing = false;
        }
        return;
      }
      await close();
      emit('cancel');
    }
  };
  const handleClose = () => {
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
        handing = false;
      }
    }
  };
  provide('close', close);
  provide('triggerChildEvent', triggerChildEvent);
</script>

<style scoped lang="scss">
  .pl-default-btn {
    margin-right: 10px;
  }
</style>
