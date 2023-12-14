<template>
  <div>
    <Btn />
    <div type="primary" @click="handleShowModal">显示Modal</div>
    <div type="primary" @click="handleShowModal2">显示Modal2</div>
    <pl-button type="primary" @click="handleShowDrawer">显示Drawer</pl-button>
  </div>
</template>

<script setup lang="ts">
  import Btn from './components/btn.vue';
  import { showAddModal } from './components/modal/util';
  import { showAddDrawer } from './components/drawer/util';

  const handleShowModal = async () => {
    try {
      const ops = await showAddModal({ num: 1 });
      console.log(ops.data);
    } catch (error) {
      console.log(error, '???');
    }
  };
  const handleShowModal2 = () => {
    if (showAddModal.hasCurrent()) {
      showAddModal.show();
    }
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
