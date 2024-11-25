<template>
  <div ref="boxRef" class="box">
    {{ random }}
    <el-input v-model="val"></el-input>
  </div>
</template>

<script setup lang="ts">
  import { IPLContainerValues } from '@app/components/type';
  import { sleep, useOpen } from '@app/utils/index';
  import { useLoading } from '@app/utils/loading/index';
  import { ref, onMounted } from 'vue';

  export interface CustomAction extends IPLContainerValues {
    isAgree?: boolean;
    isReject?: boolean;
  }

  const { onConfirmEffect } = useOpen();

  const boxRef = ref();
  const val = ref('base');

  onConfirmEffect<CustomAction>(async options => {
    // eslint-disable-next-line no-console
    console.log(options);

    if (options.isAgree) {
      //
    }
    await sleep(2000);
    return { a: 123 };
  });
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

  const random = ref(Math.random());
  setInterval(() => (random.value = Math.random()), 3000);
  defineExpose({
    random,
    val,
  });
</script>

<style scoped></style>
