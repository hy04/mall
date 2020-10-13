import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'//把作用域对象挂载到vue实例中，方便我们用this去调用
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'//引入element-ui
import 'element-ui/lib/theme-chalk/index.css'//一定要引入样式，否则不生效
import store from './store'
import router from './router'

//import env from './env'
const mock = false;//mock开关
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
  let path=location.hash;//获取当前地址
  if(res.status==0){
    return res.data;
  }else if(res.status==10){
    if(path!='#/index'){//除了首页，其他页面需要登陆才能查看
      window.location.href='/#/login';
    }
    return Promise.reject(res);
  }else{
    Message.warning(res.msg);
    return Promise.reject(res);
  }
});


Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
});
Vue.prototype.$message = Message;//把 elementui插件扩展到vue原型中去后，就可以全局使用了

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
