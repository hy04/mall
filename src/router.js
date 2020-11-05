import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
// import Product from './pages/product'
// import Detail from './pages/detail'
// import Cart from './pages/cart'
// import Order from './pages/order'
// import OrderConfirm from './pages/orderConfirm'
// import OrderList from './pages/orderList'
// import OrderPay from './pages/orderPay'
// import AliPay from './pages/alipay'
// import Login from './pages/login'


Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            name:'home',
            component:Home,
            redirect:'/index',
            children:[
                {
                    path:'/index',
                    name:'index',
                    component:Index,
                },{
                    path:'/product/:id',
                    name:'product',
                    component:resolve => require(['./pages/product.vue'],resolve),//路由懒加载 方法一
                },{
                    path:'/detail/:id',
                    name:'detail',
                    component:resolve => require(['./pages/detail.vue'],resolve),
                },

            ]
        },
        {
            path:'/login',
            name:'login',
            component:() => import('./pages/login.vue'),//路由懒加载 方法二 es7语法 需要安装插件 @babel/plugin-syntax-dynamic-import
        },
        {
            path:'/cart',
            name:'cart',
            component:() => import('./pages/cart.vue'),
        },
        {
            path:'/order',
            name:'order',
            component:() => import('./pages/order.vue'),
            children:[
                {
                    path:'list',
                    name:'order-list',
                    component:() => import('./pages/orderList.vue'),
                },{
                    path:'confirm',
                    name:'order-confirm',
                    component:() => import('./pages/orderConfirm.vue'),
                },{
                    path:'pay',
                    name:'order-pay',
                    component:() => import('./pages/orderPay.vue'),
                },{
                    path:'alipay',
                    name:'alipay',
                    component:() => import('./pages/alipay.vue'),
                },

            ]
        },
    ]
});
