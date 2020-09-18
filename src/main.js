import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'//把作用域对象挂载到vue实例中，方便我们用this去调用
import VueLazyLoad from 'vue-lazyload'
import router from './router'
//import env from './env'
const mock = true;//mock开关
if(mock){
  require('./mock/api');
}

//根据前端的跨域方式做调整  /api/a/b=>/a/b
axios.defaults.baseURL='/api';
axios.defaults.timeout=8000;
//根据环境变量获取不同的请求地址
//axios.defaults.baseURL=env.baseURL;
//接口错误拦截
axios.interceptors.response.use(function(response){
  let res=response.data;
  if(res.status==0){
    return res.data;
  }else if(res.status==10){
    window.location.href='/#/login';
  }else{
    alert(res.msg);
  }
});


Vue.use(VueAxios,axios);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
