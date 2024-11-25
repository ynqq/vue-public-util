<template>
  <div>
    <input v-model="form.name" class="provide-name-input" />
  </div>
</template>

<script setup lang="ts">
  import { useProvideEffect } from '@app/utils';
  import { ElMessage } from 'element-plus';
  import { reactive } from 'vue';
  const { onCheckEffect, onDataEffect } = useProvideEffect();
  const form = reactive({
    name: '',
  });

  onCheckEffect(() => {
    if (form.name === '') {
      // eslint-disable-next-line no-console
      console.log('基础信息校验不通过');

      ElMessage.warning('请输入姓名');
      return false;
    }
    // eslint-disable-next-line no-console
    console.log('基础信息校验通过');
    return true;
  });

  onDataEffect(() => {
    return {
      name: form.name,
    };
  });
</script>

<style scoped></style>
