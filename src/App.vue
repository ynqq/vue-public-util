<template>
  <div>
    <button @click="toggle">toggle</button>
    <Btn v-if="showBtn" />
    <Demo v-if="showDemo" @close="showDemo = false" />
  </div>
</template>

<script setup lang="ts">
  import { getCurrentInstance } from 'vue';
  import Btn from './components/btn.vue';
  import { ref } from 'vue';
  import Demo from './components/demo.vue';

  (getCurrentInstance() as any).a = 123;

  const showBtn = ref(true);

  const showDemo = ref(false);
  const toggle = () => {
    showDemo.value = !showDemo.value;
  };
</script>

<style scoped></style>
