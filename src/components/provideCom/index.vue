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

  const { runCheck, runData } = useProvideEffect(true);

  const handleSubmit = async () => {
    const validate = await runCheck();
    console.log(validate);

    if (!validate) return;
    const data = await runData();
    console.log(data);
  };
</script>

<style scoped></style>
