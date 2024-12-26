<template>
  <div>
    <pl-button type="danger" @click="handleDestory">销毁</pl-button>
    <pl-button type="danger" class="w200" @click="handleClick($event, '123')">防抖按钮</pl-button>
    <pl-button type="danger" class="w200" @click="handleClick2($event, '123')">防抖按钮</pl-button>
  </div>
</template>

<script setup lang="ts">
  import { EActionEnum, PlButton } from '@app/index';
  import { sleep } from '@app/utils/index';
  import { demo, showAddModal, showEditModal } from './modal/util';
  import { onBeforeUnmount } from 'vue';

  demo();

  const handleClick = async (e: Event, str: string) => {
    try {
      const ops = await showEditModal({ num: 1, action: EActionEnum.isUpdate });
      // eslint-disable-next-line no-console
      console.log(ops.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, '???');
    }
  };

  const handleClick2 = async (e: Event, str: string) => {
    try {
      const ops = await showAddModal({ num: 1 });
      // eslint-disable-next-line no-console
      console.log(ops.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, '???');
    }
  };

  const handleDestory = () => {
    showEditModal.destroy();
  };
  onBeforeUnmount(() => {
    showEditModal.destroy();
  });
</script>

<style scoped>
  .w200 {
    width: 200px;
    height: 40px;
  }
</style>
