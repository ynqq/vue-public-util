<template>
  <div>
    <SelectCom v-for="(_, index) in childs" :key="index" :time="time" />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { sleep } from '@app/index';
  import SelectCom from './select.vue';
  import { ref } from 'vue';
  import { getNum } from './api';
  const childs = ref<number[]>([]);
  const time = 500;

  const next = async () => {
    await sleep(time);
  };

  const setNums = (num: number) => {
    childs.value = childs.value.concat([...new Array(num)]);
  };

  defineExpose({
    setNums,
    childs,
    next,
    getNum,
  });
</script>

<style scoped></style>
