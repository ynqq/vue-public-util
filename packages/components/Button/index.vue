<template>
  <span class="pl-btn-box" :class="[spanClass]" @click="handleStopPropagation">
    <ElButton v-bind="otherAttrs" :loading="loading" :class="['pl-btn', ...btnClass]" @click="handleClick">
      <slot></slot>
    </ElButton>
  </span>
</template>

<script setup lang="ts">
  import { ElButton } from 'element-plus';
  import { ref, toRefs } from 'vue';
  import { IPublicButtonProps } from '@app/components/type';
  import { useRefProps } from '@app/components/util/openHooks';

  defineOptions({
    name: 'PlButton',
  });

  const props = withDefaults(defineProps<IPublicButtonProps>(), {
    duration: 500,
    btnClass: () => [],
    showLoadingStatus: true,
  });

  const { onClick: _onClick, class: spanClass, duration, showLoadingStatus, btnClass, ..._otherProps } = toRefs(props);

  const otherAttrs = useRefProps(_otherProps);

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
    if (showLoadingStatus.value) {
      loading.value = true;
    }
    try {
      props.onClick && (await (props.onClick as Function)(e));
    } catch (error) {
      //
    } finally {
      handling = false;
    }
    if (showLoadingStatus.value) {
      setTimeout(() => {
        loading.value = false;
      }, Math.max(duration.value - (Date.now() - nowTime), 0));
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
