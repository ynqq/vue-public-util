<template>
  <div>asd</div>
</template>

<script setup lang="ts">
  import { IPLContainerValues } from '@app/components/type';
  import { sleep } from '@app/utils/index';

  const confirm = async (options: IPLContainerValues) => {
    console.log(options);
    await sleep(3000);
    await options.close();
    return { a: 123 };
  };
  defineExpose({
    confirm,
  });
</script>

<style scoped></style>
