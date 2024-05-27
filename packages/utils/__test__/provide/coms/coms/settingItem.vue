<template>
  <div>
    <input v-model="currentData.width" class="provide-width" />
    <input v-model="currentData.height" class="provide-height" />
  </div>
</template>

<script setup lang="ts">
  import { useProvideEffect } from '@app/utils';
  import { DataItem } from '../type';
  import { ElMessage } from 'element-plus';
  import { ref } from 'vue';
  const props = defineProps<{
    data: DataItem;
  }>();

  const { regCheckEffect, regDataEffect } = useProvideEffect();

  const currentData = ref(props.data);

  regCheckEffect(() => {
    if (!currentData.value.width) {
      ElMessage.warning('请输入宽度');
      return false;
    }
    if (!currentData.value.height) {
      ElMessage.warning('请输入高度');
      return false;
    }

    return true;
  });

  regDataEffect(() => {
    return { ...currentData.value };
  });
</script>

<style scoped></style>
