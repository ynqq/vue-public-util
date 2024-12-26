<template>
  <div></div>
</template>

<script setup lang="ts">
  import { useOpen } from '@app/utils';

  const { onShowEffect, onClosedEffect } = useOpen();

  onShowEffect(() => {
    console.log('child1 show');
  });

  onClosedEffect(() => {
    console.log('child1 closed');
  });
</script>

<style scoped></style>
