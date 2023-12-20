# vue-public-util
- vue + element-plus 一些工具

### 安装方式

```bash
npm install vue-public-util
```

### 使用方式

```ts
import 'vue-public-util/dist/style.css';
import VPU, { setPlugins } from 'vue-public-util';
...
// 设置插件
setPlugins([
    pinia,
    VXETable,
    router,
    {
        install: (app) => {
            app.use(ElementPlus, {
                locale: zhCn, // element语言包
            })
        },
    },
])
app.use(VPU)
```

### 组件

- PlButton
  ```html
  <pl-button type="danger" class="w200" @click="handleClick($event, '123')">防抖按钮</pl-button>
  ```
  ```ts
  const handleClick = async (e: Event, str: string) => {
    await sleep(1000);
  };
  ```

### 方法

- usePlDrawer
  - 函数方式调用抽屉组件
- usePlModal
  - 函数方式调用模态组件
- useLoading
  - 自动开启/关闭加载状态
    ```ts
    const drawerRef = ref<HTMLDivElement>();
    const submitAction = useLoading(async data => {
      await submit(data);
    });
    submitAction.setContainer(drawerRef).setMsg('正在保存中,请稍后...');
    const onClick = () => {
      submitAction({ a: 1 });
    };
    ```
- useFetchOnce

  - 用于一些需要请求接口的字典组件，组件被同时创建 n 次，接口只会执行一次。

    ```ts
    import { useFetchOnce } from 'vue-public-util';

    const { fetch } = useFetchOnce({
      name: '组件name',
      query: fetchFun,
    });

    const fetchData = async () => {
      const data = await fetch();
      list.value = data.map(item => ({
        label: item.label,
        value: item.id,
      }));
    };
    ```

- useAction
  - 用来判断当前页面/组件的操作类型
  - 内置 4 种类型：
    ```ts
    export enum EActionEnum {
      'isCreate' = '1',
      'isUpdate' = '2',
      'isCopy' = '3',
      'isView' = '4',
    }
    export type TOtherAction = '5' | '6' | '7' | '8' | '9' | '10';
    ```
    ```ts
      const { isCreate, isDelete } = useAction(action.value, {isDelete: '5'})
    ```

### 更新日志

- 2023/12/20 1.2.7
  - A 增加useAction

- 2023/12/14
  - A 增加显示模态/抽屉事件
  - U 模态/抽屉 取消时可以传入自定义数据
- 2023/12/11
  - F 修复模态/模态卸载时 dom 未删除和未执行组件的销毁事件
- 2023/12/08
  - A 增加注释
  - A 增加模态/抽屉取消时异常捕获
