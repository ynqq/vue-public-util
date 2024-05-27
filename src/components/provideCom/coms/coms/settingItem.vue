<template>
  <div>
    <el-form>
      <el-form-item label="宽度">
        <el-input-number v-model="currentData.width"></el-input-number>
      </el-form-item>
      <el-form-item label="高度">
        <el-input-number v-model="currentData.height"></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { useProvideEffect } from '@app/utils';
  import { DataItem } from '../type';
  import { ElMessage } from 'element-plus';
  import { ref } from 'vue';
  const props = defineProps<{
    data: DataItem;
  }>();

  const { regCheckEffect, regDataEffect } = useProvideEffect();

  const currentData = ref(props.data);

  regCheckEffect(() => {
    if (!currentData.value.width) {
      ElMessage.warning('请输入宽度');
      return false;
    }
    if (!currentData.value.height) {
      ElMessage.warning('请输入高度');
      return false;
    }

    return true;
  });

  regDataEffect(() => {
    return { ...currentData.value };
  });
</script>

<style scoped></style>
