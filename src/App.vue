<template>
  <div>
    <PlButton @click="handleKeyChange">change</PlButton>
    <PlButton @click="handleKeyChange2">change2</PlButton>
    {{ divKey }}
    <div :key="divKey">
      <div v-for="item in list" :key="item.key" class="keyItem">{{ item.value }}</div>
    </div>
    <ProvideCom />
    <Btn />
    <div type="primary" @click="handleShowModal">显示Modal</div>
    <div type="primary" @click="handleShowModal2">显示Modal2</div>
    <pl-button type="primary" @click="handleShowDrawer">显示Drawer</pl-button>
    <Demo />
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
  import { getCurrentInstance } from 'vue';
  import Btn from './components/btn.vue';
  import { showAddModal } from './components/modal/util';
  import Demo from './demo';
  import { ref } from 'vue';
  import ProvideCom from './components/provideCom/index.vue';

  console.log(getCurrentInstance());
  (getCurrentInstance() as any).a = 123;

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

  const list = [...new Array(10)].map((_, index) => ({
    key: index,
    value: 'zhi' + index,
  }));
  const divKey = ref(1);
  const handleKeyChange = () => {
    const allKeys = document.querySelectorAll('.keyItem');
    allKeys[2].before(allKeys[5]);
    divKey.value = divKey.value + 1;
  };
  const handleKeyChange2 = () => {
    divKey.value = divKey.value + 1;
  };
</script>

<style scoped></style>
