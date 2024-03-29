<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status==20">
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <el-pagination
            class="pagination"
            background
            layout="prev,pager,next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
          >
          </el-pagination>
          <div class="load-more" v-if="false">
            <el-button type="primary" :loading="buttonLoading" @click="loadMore">加载更多</el-button>
          </div>
          <div class="scroll-more"
            v-if="false"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="true"
            infinite-scroll-distance="410"
          >
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
          </div>
          <no-data v-if="!loading && list.length==0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import OrderHeader from './../components/OrderHeader';
  import Loading from './../components/Loading';
  import NoData from './../components/NoData';
  import { Pagination, Button } from 'element-ui';
  import infiniteScroll from 'vue-infinite-scroll';
  export default{
    name:'order-list',
    components:{
      OrderHeader,
      Loading,
      NoData,
      [Pagination.name]:Pagination,
      [Button.name]:Button
    },
    directives:{
      infiniteScroll
    },
    data(){
      return {
        list:[],
        pageSize:10,
        pageNum:1,
        total:0,
        buttonLoading:false,//button 的加载
        loading:true,//等待的加载控制
        busy:false,//滚动加载是否触发
        showButton:true,//是否显示加载更多按钮
      }
    },
    mounted(){
      this.getOrderList();
    },
    methods:{
      getOrderList(){
        this.buttonLoading = true;
        this.busy = true;
        this.axios.get('/orders',{
          params:{
            pageNum:this.pageNum,
            pageSize:5
          }
        }).then((res)=>{
          this.loading = false;//接口返回结果后 动画关闭
          this.buttonLoading = false;//button加载动画关闭
          // this.list = this.list.concat(res.list);
          this.list = res.list;
          this.total = res.total;
          this.busy = false;
          this.showButton = res.hasNextPage;
        }).catch(()=>{
          this.loading = false;//出错后动画也要关闭
          this.buttonLoading = false;//button加载动画关闭
        })
      },
      goPay(orderNo){
        //三种路由跳转方式
        //this.$router.push('/order/pay')
        // this.$router.push({
        //   name:'order-pay',
        //   params:{
        //     orderNo:orderNo
        //   }
        // })
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo
          }
        })
      },
      //第一种方法 分页器
      handleChange(pageNum){
        this.pageNum = pageNum;
        this.getOrderList();
      },
      //第二种方法 加载更多按钮
      loadMore(){
        this.pageNum++;
        this.getOrderList();
      },
      //第三种方法 滚动加载 通过npm插件 实现
      scrollMore(){
        this.busy = true;
        setTimeout(() => {
          this.pageNum++;
          this.getList();
        }, 500);
      },
      //专门为scrollmore
      getList(){
        this.loading = true;
        this.axios.get('/orders',{
          params:{
            pageNum:this.pageNum,
            pageSize:10
          }
        }).then((res)=>{
          this.list = this.list.concat(res.list);
          this.loading = false;
          if(res.hasNextPage){
            this.busy = false;
          }else{
            this.busy = true;
          }
        })
      },
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .pagination{
          text-align: right;
        }
        .load-more,.scroll-more{
          text-align: center;
        }
      }
    }
  }
  //最简单覆盖elementui 组件颜色的方法
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #FF6600;
  }
  .el-button--primary{
    background-color: #FF6600;
    border-color:#FF6600;
  }
</style>