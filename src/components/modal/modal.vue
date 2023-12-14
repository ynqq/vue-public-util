<template>
  <div ref="boxRef" class="box">
    asd
    <el-input v-model="val"></el-input>
  </div>
</template>

<script setup lang="ts">
  import { IPLContainerValues } from '@app/components/type';
  import { sleep } from '@app/utils/index';
  import { useLoading } from '../../../packages/utils/loading/index';
  import { ref, onMounted, onUnmounted } from 'vue';

  const boxRef = ref();
  const val = ref('base');

  const confirm = async (options: IPLContainerValues) => {
    console.log(options);
    await sleep(1000);
    await options.close();
    return { a: 123 };
  };

  const init = useLoading(async (str: string) => {
    await sleep(1000);
    console.log(str);
    return str;
  }).setContainer(boxRef);
  // .setMsg(h('div', {}, ['asd']));
  onMounted(() => {
    init('');
  });
  onUnmounted(() => {
    console.log('??un');
  });
  defineExpose({
    confirm,
  });
</script>

<style scoped></style>
