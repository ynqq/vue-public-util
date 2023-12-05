<template>
  <div>
    <pl-button type="danger" class="w200" @click="handleClick($event, '123')">防抖按钮</pl-button>
  </div>
</template>

<script setup lang="ts">
  import { PlButton } from '@app/index';
  import { sleep } from '@app/utils/index';

  const handleClick = async (e: Event, str: string) => {
    console.log(e, str);
    await sleep(1000);
  };
</script>

<style scoped>
  .w200 {
    width: 200px;
    height: 40px;
  }
</style>
