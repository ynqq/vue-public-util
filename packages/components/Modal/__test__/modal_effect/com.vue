<template>
  <div ref="boxRef" class="box">
    <div class="title">{{ title }}</div>
    <input v-model="inputVal" type="text" class="inputEl" />
  </div>
</template>

<script setup lang="ts">
  import { sleep, useLoading, useOpen } from '@app/utils/index';
  import { ref, onMounted, h } from 'vue';
  import { IComProps } from './type';

  defineProps<IComProps>();

  const { onConfirmEffect } = useOpen();

  const boxRef = ref();
  const inputVal = ref('');

  onConfirmEffect(async () => {
    await sleep(100);
    return { inputVal: inputVal.value };
  });

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
    inputVal,
  });
</script>

<style scoped></style>
