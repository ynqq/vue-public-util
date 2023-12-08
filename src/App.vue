<template>
  <div>
    <Btn />
    <div type="primary" @click="handleShowModal">显示Modal</div>
    <pl-button type="primary" @click="handleShowDrawer">显示Drawer</pl-button>
  </div>
</template>

<script setup lang="ts">
  import Btn from './components/btn.vue';
  import { showAddModal } from './components/modal/util';
  import { showAddDrawer } from './components/drawer/util';

  const handleShowModal = async () => {
    const ops = await showAddModal({});
    console.log(ops);
  };
  const handleShowDrawer = async () => {
    try {
      const ops = await showAddDrawer({});
      console.log(ops);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<style scoped></style>
