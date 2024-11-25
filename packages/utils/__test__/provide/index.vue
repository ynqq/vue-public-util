<template>
  <div>
    <BaseInfo />
    <SettingInfo />
    <PlButton type="primary" @click="handleSubmit">提交</PlButton>
  </div>
</template>

<script setup lang="ts">
  import { useProvideEffect } from '@app/utils';
  import BaseInfo from './coms/baseInfo.vue';
  import SettingInfo from './coms/settingInfo.vue';
  import { PlButton } from '@app/index';
  import { DataResult } from './coms/type';

  const { runCheck, runData } = useProvideEffect(true);

  const handleSubmit = async () => {
    const validate = await runCheck();
    if (!validate) return;
    const data = await runData<DataResult>();
    return data;
  };
  defineExpose({
    handleSubmit,
  });
</script>

<style scoped></style>
