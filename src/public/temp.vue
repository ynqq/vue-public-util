<template>
  <Repl
    v-if="show"
    :store="store"
    class="replBox"
    :editor="CodeMirror"
    :style="css"
    v-full
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { getDefaultimports } from "@/utils";
import { ref, nextTick, shallowRef, onMounted } from "vue";
import { inBrowser } from "vitepress";

const Repl = shallowRef(null);
const CodeMirror = shallowRef(null);
let store;
onMounted(async () => {
  if (inBrowser) {
    const { Repl: ReplComponent } = await import("@vue/repl");
    CodeMirror.value = (await import("@vue/repl/codemirror-editor")).default;
    Repl.value = ReplComponent;

    store = (await import("@vue/repl")).useStore({
      builtinImportMap: ref({
        imports: getDefaultimports(),
      }),
    });
    init();
  }
});
const vFull = {
  mounted(el: HTMLDivElement) {
    const toggleEl = document.createElement("div");
    toggleEl.innerText = "全屏";
    toggleEl.className = "toggleFullScreen";
    el.querySelector(".right .tab-buttons").appendChild(toggleEl);
    let state: "big" | "small" = "small";
    toggleEl.onclick = function () {
      if (state === "small") {
        state = "big";
        el.classList.add("replFullScreen");
        toggleEl.innerText = '取消全屏'
      } else {
        state = "small";
        el.classList.remove("replFullScreen");
        toggleEl.innerText = '全屏'
      }
    };
  },
};
const props = defineProps<{
  beforeInit?: (store: any) => any;
}>();

const show = ref(false);
const init = async () => {
  await props?.beforeInit?.(store);
  await nextTick();
  show.value = true;
};

const css = `@import 'https://cdn.jsdelivr.net/npm/element-plus@latest/dist/index.css';
@import 'https://unpkg.com/vue-public-util@2.0.6/dist/style.css';`;
</script>

<style scoped>
.replBox {
  width: 100%;
  height: 600px;
}
</style>
