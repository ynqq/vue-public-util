<template>
  <div>
    <Btn />
    <div type="primary" @click="handleShowModal">显示Modal</div>
    <div type="primary" @click="handleShowModal2">显示Modal2</div>
    <pl-button type="primary" @click="handleShowDrawer">显示Drawer</pl-button>
    <Demo />
  </div>
</template>

<script setup lang="ts">
  import Btn from './components/btn.vue';
  import { showAddModal } from './components/modal/util';
  import Demo from './demo';
  import { ref } from 'vue';

  const tableData = ref([
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]);

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
    tableData.value[0].name = Math.random() + '';
  };
</script>

<style scoped></style>
