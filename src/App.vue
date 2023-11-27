<template>
  <div>
    <Btn />
    <pl-button type="primary" @click="handleShowModal">显示Modal</pl-button>
  </div>
</template>

<script setup lang="ts">
  import Btn from './components/btn.vue';
  import { showAddModal } from './components/modal/util';

  const handleShowModal = async () => {
    const ops = await showAddModal({});
    console.log(ops);
  };
</script>

<style scoped></style>
