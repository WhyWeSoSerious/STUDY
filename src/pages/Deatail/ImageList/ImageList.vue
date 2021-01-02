<template>
   <swiper :options="swiperOptions">
    <swiper-slide v-for="(img, index) in imgList" :key="img.id">
      <img :src="img.imgUrl" :class="{active:index===defaultIndex}" @click="changeDefaultIndex(index)" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>

  import Swiper from 'swiper'
  import "swiper/css/swiper.css";

  export default {
    name: "ImageList",
    props:['imgList'],
    data() {
      
      return {
        defaultIndex:0,
         swiperOptions: {
        // direction: 'horizontal', // 水平切换选项
        // loop: true, // 循环模式选项
        // autoplay: { // 自动轮播
        //   delay: 4000,
        //   disableOnInteraction: false, // 用户操作后是否停止自动轮播
        // }, 
        // 如果需要分页器
        // pagination: {
        //   el: '.swiper-pagination',
        // },
        // 如果需要前进后退按钮
        //todo   一次显示五张图片
        slidesPerView:5,
        //todo   一次移动张数
        slidesPerGroup:3,
        //todo 这是两个移动旋钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
      }
    },
    methods: {
      //todo 这个是向zoom传参数
      changeDefaultIndex(index){
        this.defaultIndex = index;
        this.$bus.$emit('syncDefaultIndex',index)
      }
    },
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>