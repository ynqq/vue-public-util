import { clearQueryData, getRouterFromPlugins } from '@app/utils/index';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

type TRouterEvents = (to?: RouteLocationNormalized, from?: RouteLocationNormalized, next?: NavigationGuardNext) => void;

const routerEvents: TRouterEvents[] = [];

export const onRouterChange = (fun: TRouterEvents) => {
  routerEvents.push(fun);
};

/**
 * @TODO 自动对路由参数编/解码
 */
export const useRouterEncoded = () => {
  //
};

/**
 * 监听路由变化
 */
export const listenRouter = () => {
  const router = getRouterFromPlugins();
  if (router) {
    onRouterChange(() => {
      clearQueryData();
    });
    router.beforeEach((to, from, next) => {
      routerEvents.forEach(fun => {
        try {
          fun && fun(to, from, next);
        } catch (error) {
          //
        }
      });
      next();
    });
  }
};
