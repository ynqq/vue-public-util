<template>
  <div class="select-box">
    <div v-for="item in list" :key="item.value" class="item">{{ item.label }}</div>
  </div>
</template>

<script setup lang="ts">
  import { sleep, useFetchOnce } from '@app/index';
  import { ref } from 'vue';
  import { fetchAction, getNum } from './api';

  const props = defineProps<{
    time: number;
  }>();

  const { fetch } = useFetchOnce({ name: 'comName', query: fetchAction });
  const list = ref<{ label: string; value: string }[]>([{ label: 'a', value: 'a' }]);
  const fetchList = async () => {
    const { data } = await fetch(3, props.time);
    list.value = data;
  };
  fetchList();
  const next = async () => {
    await sleep(props.time);
  };
  defineExpose({ next, getNum });
</script>

<style scoped></style>
