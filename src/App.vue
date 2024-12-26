<template>
  <div>
    <Btn v-if="showBtn" />
  </div>
</template>

<script setup lang="ts">
  import { getCurrentInstance } from 'vue';
  import Btn from './components/btn.vue';
  import { ref } from 'vue';

  (getCurrentInstance() as any).a = 123;

  const showBtn = ref(true);
</script>

<style scoped></style>
