<template>
  <span class="pl-btn-box" :class="[spanClass]" @click="handleStopPropagation">
    <ElButton v-bind="otherAttrs" :loading="loading" :class="['pl-btn', ...btnClass]" @click="handleClick">
      <slot></slot>
    </ElButton>
  </span>
</template>

<script setup lang="ts">
  import { ElButton } from 'element-plus';
  import { ref } from 'vue';
  import { IPublicButtonProps } from '@app/components/type';

  defineOptions({
    name: 'PlButton',
  });

  const props = withDefaults(defineProps<IPublicButtonProps>(), {
    duration: 500,
    btnClass: () => [],
    showLoadingStatus: true,
  });

  const { onClick, class: spanClass, duration, showLoadingStatus, btnClass, ...otherAttrs } = props;

  const loading = ref(false);
  let handling = false;
  const handleStopPropagation = (e: Event) => {
    e.stopImmediatePropagation();
  };
  const handleClick = async (e: Event) => {
    if (handling || loading.value) {
      return;
    }
    handling = true;
    const nowTime = Date.now();
    if (showLoadingStatus) {
      loading.value = true;
    }
    try {
      onClick && (await (onClick as Function)(e));
    } catch (error) {
      //
    } finally {
      handling = false;
    }
    if (showLoadingStatus) {
      setTimeout(() => {
        loading.value = false;
      }, Math.max(duration - (Date.now() - nowTime), 0));
    }
    e.stopPropagation();
    e.preventDefault();
  };
</script>

<style scoped lang="scss">
  .pl-btn-box {
    display: inline-block;
  }
  .pl-btn {
    height: 100%;
    width: 100%;
  }
</style>
