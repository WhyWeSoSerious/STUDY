<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(shopCart,index) in ShopCarList" :key="shopCart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="shopCart.isChecked" @click="updataOne(shopCart)" />
          </li>
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl" />
            <div class="item-msg">
             {{shopCart.skuName}}
            </div>
          </li>
          
          <li class="cart-list-con4">
            <span class="price">{{shopCart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="ChangeShopCarList(shopCart,-1,true)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="shopCart.skuNum"
              minnum="1"
              class="itxt"
               @change="ChangeShopCarList(shopCart,$event.target.value*1,false)"
            />
            <a href="javascript:void(0)" class="plus"  @click="ChangeShopCarList(shopCart,+1,true)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{shopCart.cartPrice * shopCart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteOne(shopCart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{checkedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "ShopCart",
 
  mounted(){
      this.getCartList()
    },
  methods:{
    // todo  获得购物车列表
   getCartList(){
        this.$store.dispatch('getShopCarList')
      },
    //todo 增加或删除购物车
  async ChangeShopCarList(shopCart,disNum,flag){//?  传入3个参数 单个的商品，改变的数量，区分是点的+-还是那个input
     if(!flag){
          //针对输入的数据是最终的商品数量，我们得转化为变化的量
          if(disNum > 0){
            disNum = disNum - shopCart.skuNum
          }else{
            disNum = 1 - shopCart.skuNum
          }
        }else{
          //针对点击+-的数据，传递过来的就是变化的量
          if(disNum + shopCart.skuNum <= 0){
            disNum = 1 - shopCart.skuNum
          }
        }
    try {//?发送请求，携带一个对象
      await this.$store.dispatch('addOrUpdateCart',{skuId:shopCart.skuId,skuNum:disNum})
      alert ('修改数量成功');
            console.log({skuId:shopCart.skuId,disNum})

       this.getCartList()
    } catch (error) {
      alert(error.message)
    }
  },
  //todo 更新购物车
  async updataOne(shopCart){
    try {
      await this.$store.dispatch('updataCartChecked',{skuId:shopCart.skuId,isChecked:shopCart.isChecked?0:1})
      alert('修改状态成功')
    } catch (error) {
      alert(error.message)
    }
  },
  //todo 删除单个购物车
  async deleteOne(shopCart){
    try {
       await this.$store.dispatch('deleteCart',shopCart.skuId)
          alert('删除成功')
          this.getCartList()
    } catch (error) {
       alert(error.message)
    }
  },
 //todo  删除多个
 async deleteAll(){
        try {
          await this.$store.dispatch('deleteCartAll')
          alert('删除多个成功')
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }
        
      }
    },

  
  computed: {
    ...mapState({
      ShopCarList:state=>state.ShopCar.ShopCarList||[]
    }),
     //todo 全部的金额
    allMoney(){
     
      return this.ShopCarList.reduce((prev,item)=>{
        if(item.isChecked){
          prev+=item.cartPrice*item.skuNum
        }return prev
      },0)
    },
    //todo 已经选择的数字
    checkedNum(){
        return this.ShopCarList.reduce((prev,item) => {
          if(item.isChecked){
            prev += item.skuNum
          }
          return prev
        },0)
      },
    //todo 更新全部
    isChecked:{
      get(){
        return this.ShopCarList.every(item=>item.isChecked)
      },
      async set(val){
        try {
           const result = await this.$store.dispatch('updataAllChecked',val?1:0);
             this.getCartList()
        } catch (error) {
         alert(error.message)
        }
      }
    }
  }
  
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>