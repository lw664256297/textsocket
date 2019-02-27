/**
 * Created by bigbird on 2019/1/10.
 */

import Adminhome from '../views/adminhome.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/admin',
    name: 'adminlogin',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/admin/adminlogin.vue')
};

export const indexRouter = {
    path: '/',
    name: 'indexhome',
    component: () => import('@/views/index/indexhome.vue')
};

//多层嵌套路由
export const adminRouter = {
    path: '/adminhome',
    name: 'adminhome',
    meta:{
        requireLogin:true // 当前路由需要校验，不需要就不用写
    },
    component: Adminhome,
    //设置子路由默认
    redirect: '/adminhome/serveradmin',
    children:[
            {
                path: 'serveradmin',
                name: 'serveradmin',
                component: () => import('@/views/admin/serverAdmin.vue')
            },
            {
                path: 'useradmin',
                    name: 'useradmin',
                component: () => import('@/views/admin/useradmin.vue')
            }

        ]
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    indexRouter,
    adminRouter
];