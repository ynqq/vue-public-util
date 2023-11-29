<template>
  <div ref="boxRef" class="box">asd</div>
</template>

<script setup lang="ts">
  import { IPLContainerValues } from '@app/components/type';
  import { sleep } from '@app/utils/index';
  import { useLoading } from '../../../packages/utils/loading/index';
  import { ref, onMounted } from 'vue';

  const boxRef = ref();

  const confirm = async (options: IPLContainerValues) => {
    console.log(options);
    await sleep(1000);
    await options.close();
    return { a: 123 };
  };

  const init = useLoading(async (str: string) => {
    await sleep(10000);
    console.log(str);
  }).setContainer(boxRef);
  onMounted(() => {
    init('');
  });
  defineExpose({
    confirm,
  });
</script>

<style scoped></style>
