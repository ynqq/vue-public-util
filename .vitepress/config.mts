import { defineConfig, Plugin } from "vitepress";
import fs from "node:fs";
import path from "node:path";

const replaceVueCode = (options: { css: string[] }): Plugin => {
  return {
    name: "vitepress-replace-vue-code-plugin",
    transform(code, id) {
      const { css } = options
      const cssStr = css.map((url) => `@import url("${url}");`).join('')
      if (/src\/.*\.md$/.test(id)) {
        const dir = path.dirname(id);
        const replaceFiles = code.match(/__REPLACE__[\.\/\w]+/g);
        if (replaceFiles) {
          replaceFiles.forEach((match) => {
            const file = path.resolve(dir, match.replace("__REPLACE__", ""));
            let demoCode = fs.readFileSync(file, "utf-8");
            if(file.endsWith('.vue')){
              const match = demoCode.match(/<style.*?>/)
              if(match?.[0]){
                demoCode = demoCode.replace(match[0], `${match[0]}${cssStr}`)
              }
            }
            code = code.replace(match, demoCode);
          });
        }
        return code;
      }
    },
  };
};

// https://vitepress.dev/reference/site-config
const base = "/vue-public-util"
export default defineConfig({
  base: base,
  vite: {
    ssr: {
      noExternal: ["@vue/repl"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
    },
    plugins: [
      replaceVueCode({
        css: [
          "https://cdn.jsdelivr.net/npm/element-plus@latest/dist/index.css",
          "https://unpkg.com/vue-public-util@2.0.6/dist/style.css",
          `${base}/repl.css`
        ],
      }),
    ],
  },
  title: "components docs",
  description: "components docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "PlButton", link: "/src/comps/pl-button/index.md" },
          { text: "PlModel", link: "/src/comps/pl-model/index.md" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
