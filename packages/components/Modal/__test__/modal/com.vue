<template>
  <div ref="boxRef" class="box">
    <div class="title">{{ title }}</div>
    <input v-model="inputVal" type="text" class="inputEl" />
  </div>
</template>

<script setup lang="ts">
  import { IPLContainerValues } from '@app/components/type';
  import { sleep, useLoading } from '@app/utils/index';
  import { ref, onMounted, h } from 'vue';
  import { IComProps } from './type';

  defineProps<IComProps>();

  const boxRef = ref();
  const inputVal = ref('');

  const confirm = async (options: IPLContainerValues) => {
    await sleep(100);
    await options.close();
    return { inputVal: inputVal.value };
  };

  const init = useLoading(async (str: string) => {
    await sleep(3000);
    return str;
  })
    .setContainer(boxRef)
    .setMsg(h('div', {}, ['asd']));
  onMounted(() => {
    init('');
  });
  defineExpose({
    confirm,
  });
</script>

<style scoped></style>
