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
import { showAddModel } from "./util.ts";
import { ref } from "vue";

const count = ref(0);
const handleClick = async () => {
  count.value++;
  const res = await showAddModel({
    title: "asdasda",
  });
  console.log(res);
};
</script>

<style scoped></style>
