/**
 * Created by bigbird on 2019/1/10.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import qs from 'qs';

Vue.use(Vuex);
const store = new Vuex.Store({
    //状态值
    state: {
        HTTPURL:"http://127.0.0.1:8080",
        TCPURL:"http://127.0.0.1:8000"
    },
    //事件
    mutations: {
        //
    },
    //ajax请求
    actions: {

    },

});

export  default store;