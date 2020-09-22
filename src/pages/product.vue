<template>
  <div>
      <ProductParam>
        <template v-slot:buy>
          <button class="btn">立即购买</button>
        </template>
      </ProductParam>
      <div class="h">123</div>
      <div class="h">123</div>
      <div class="h">123</div>
      <div class="h">123</div>
      <div class="h">123</div>
      <div class="h">123</div>
      <div class="h">123</div>
      <div class="h">123</div>
      <div class="h">123</div>
  </div>
</template>

<script>
import ProductParam from './../components/ProductParam'
export default {
    name:'product',
    components:{
      ProductParam
    }
}
</script>

<style lang="scss" scoped>
  .h{
      height: 150px;
      background-color: green;
    }
  button{
    margin-left: 10px;
  }

</style>