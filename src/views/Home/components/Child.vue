<template>
  <div>
    <h3>Home</h3>
    <SelectCom v-for="(_, index) in list" :key="index" :time="500" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import SelectCom from '@app/utils/__test__/fetch/select.vue';
  const list = ref([...new Array(10).fill('')]);
</script>

<style scoped></style>
