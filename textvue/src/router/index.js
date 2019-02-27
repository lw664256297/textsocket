/**
 * Created by bigbird on 2019/1/10.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import {routers} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    //mode: 'history',
    routes: routers
    //base: process.env.BASE_URL
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin)){  // 判断该路由是否需要登录权限
        if (sessionStorage.getItem('loginInfo') === "0") {  // 判断当前用户的登录信息loginInfo是否存在
            next();
        } else {
            next({
                path: '/'
            })
        }
    }else {
        next();
    }

});