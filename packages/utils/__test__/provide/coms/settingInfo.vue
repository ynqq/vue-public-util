<template>
  <div>
    <div v-for="(item, index) in list" :key="item.id">
      <SettingItem :data="item" />
      <PlButton type="primary" class="provide-add" @click="handleAdd(index)">add</PlButton>
      <PlButton type="danger" class="provide-remove" @click="handleReduce(index)">remove</PlButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import SettingItem from './coms/settingItem.vue';
  import { DataItem } from './type';
  import { useProvideEffect } from '@app/utils';
  import { PlButton } from '@app/index';

  let num = 0;
  const { regCheckEffect, regDataEffect, runCheck, runData } = useProvideEffect(true);

  const list = ref<DataItem[]>([]);

  const getBaseData = (): DataItem => ({
    id: ++num,
    width: 0,
    height: 0,
  });

  const handleAdd = (index: number) => {
    list.value.splice(index + 1, 0, getBaseData());
  };
  const handleReduce = (index: number) => {
    list.value.splice(index, 1);
  };

  regCheckEffect(() => {
    return runCheck();
  });

  regDataEffect(async () => {
    const data = await runData<DataItem>('array');
    return {
      settingData: data,
    };
  });

  const init = () => {
    list.value = [getBaseData()];
  };
  init();
</script>

<style scoped></style>
