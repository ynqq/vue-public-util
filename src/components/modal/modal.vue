<template>
  <div ref="boxRef" class="box">
    <el-input v-model="val"></el-input>
  </div>
</template>

<script setup lang="ts">
  import { IPLContainerValues } from '@app/components/type';
  import { sleep } from '@app/utils/index';
  import { useLoading } from '@app/utils/loading/index';
  import { ref, onMounted } from 'vue';

  export interface CustomAction extends IPLContainerValues {
    isAgree: boolean;
    isReject: boolean;
  }

  const boxRef = ref();
  const val = ref('base');

  // 执行确定的回调事件 默认是: 确定 取消
  const confirm = async (options: IPLContainerValues) => {
    if (options.isConfirm) {
      // 可以通过options 判断是哪种操作
    }
    await sleep(1000);
    // 需要手动执行close事件来关闭模态
    await options.close();
    /**
     * 返回值可以在外部直接获取到
     * @example
     * const ops = await showAddModal({ num: 1 });
     * console.log(ops.data); // data = { a: 123 }
     */
    return { a: 123 };
  };
  // 自定义确定的事件类型, 可以在自定义header或footer中使用
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const _confirm2 = async (options: CustomAction) => {
    if (options.isAgree) {
      // 可以通过options 判断是哪种操作
    }
    await sleep(1000);
    await options.close();
    return { a: 123 };
  };

  const init = useLoading(async (str: string) => {
    await sleep(1000);
    return str;
  }).setContainer(boxRef);
  onMounted(() => {
    init('');
  });
  // 必须要暴露confirm事件
  defineExpose({
    confirm,
  });
</script>

<style scoped></style>
