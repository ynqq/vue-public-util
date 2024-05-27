<template>
  <div>
    <el-form>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { useProvideEffect } from '@app/utils';
  import { ElMessage } from 'element-plus';
  import { reactive } from 'vue';
  const { regCheckEffect, regDataEffect } = useProvideEffect();
  const form = reactive({
    name: '',
  });

  regCheckEffect(() => {
    if (form.name === '') {
      ElMessage.warning('请输入姓名');
      return false;
    }
    return true;
  });

  regDataEffect(() => {
    return {
      name: form.name,
    };
  });
</script>

<style scoped></style>
