<template>
  <div>
    {{ count }}
    <PlButton type="primary" @click="handleClick">asd</PlButton>
    <ElButton type="primary">asd</ElButton>
  </div>
</template>

<script setup lang="ts">
import { PlButton } from "vue-public-util";
import { ElButton } from "element-plus";
import { ref } from "vue";

const count = ref(0);
const handleClick = () => {
  count.value++;
};
</script>

<style scoped></style>
