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
    try {
      const ops = await showAddModal({});
      console.log(ops);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<style scoped></style>
