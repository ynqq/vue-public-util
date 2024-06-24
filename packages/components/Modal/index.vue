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
  import { IPLContainerProps } from '@app/components/type';
  import VuePublicButton from '@app/components/Button/index.vue';
  import { useOpenHooks } from '@app/components/util/openHooks';

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

  const {
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
  } = useOpenHooks(props, emit);

  defineExpose({
    show,
  });
</script>

<style scoped lang="scss">
  .pl-default-btn {
    margin-right: 10px;
  }
</style>
