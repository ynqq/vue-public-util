<template>
  <div>
    <h3>Home</h3>
    <el-button type="primary" @click="handleToggle">toggle</el-button>
    <SelectCom v-for="(_, index) in list" :key="index" :time="500" />
    <Child v-if="showChild" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import SelectCom from '@app/utils/__test__/fetch/select.vue';
  import Child from './components/Child.vue';
  const list = ref([...new Array(10).fill('')]);

  const showChild = ref(false);
  const handleToggle = () => {
    showChild.value = !showChild.value;
  };
</script>

<style scoped></style>
