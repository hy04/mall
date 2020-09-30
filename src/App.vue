<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//import storage from './storage'

export default {
  name: 'App',
  components: {

  },
  data(){
    return{
      res:{}
    }
  },
  mounted(){
  //本地加载请求静态json文件的形式
  //   this.axios.get('/mock/user/login.json').then((res)=>{
  //     this.res=res;
  //  })

  //通过easy-mock平台实现数据mock
  //  this.axios.get('/mock/user/login.json').then((res)=>{
  //     this.res=res;
  //  });
   //本地集成mockjs实现数据mock
  //   this.axios.get('/user/login').then((res)=>{
  //     this.res=res;
  //  });
    this.getUser();
    this.getCartCount();
  },
  methods:{
    getUser(){
      //给res默认值，避免在res获取不到的时候报错
      this.axios.get('/user').then((res={})=>{
        //save to vuex
        this.$store.dispatch('saveUserName',res.username);
      })
    },
    getCartCount(){
      //给res默认值，避免在res获取不到的时候报错
      this.axios.get('/carts/products/sum').then((res=0)=>{
        //save to vuex
        this.$store.dispatch('saveCartCount',res);
      })
    }
  }
}
</script>

<style lang="scss">
  @import './assets/scss/reset.scss';
  @import './assets/scss/config.scss';
  @import './assets/scss/button.scss';
</style>


