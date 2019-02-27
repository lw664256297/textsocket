import Vue from 'vue'
import App from './App.vue'

//路由
import {router} from './router/index';
//状态值
import store from './store';
//ui框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
  router: router,
  store:store,
  render: h => h(App),
}).$mount('#app');
