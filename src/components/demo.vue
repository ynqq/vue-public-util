<template>
  <ElDialog :model-value="true" @close="$emit('close')">
    <Modal />
  </ElDialog>
</template>

<script setup lang="ts">
  import Modal from './modal/modal.vue';
</script>

<style scoped></style>
