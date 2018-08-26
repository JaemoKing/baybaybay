<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{ item.title }}</span>
                                        <p>
                                            <span v-for="itemSon in item.subcates" :key="itemSon.id">
                                                {{ itemSon.title }}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{ item.title }}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="itemSon in item.subcates" :key="itemSon.id" href="/goods/43.html">{{ itemSon.title }}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel>
                                <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                    <img :src="item.img_url" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--右边-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{ index + 1 }}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{ item.title }}</a>
                                    <span>{{ item.add_time | filterDate }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in message" :key="item.catetitle">
            <div class="main-tit">
                <h2>{{ item.catetitle }}</h2>
                <p>
                    <a v-for="itemSon in item.level2catelist" :key="itemSon.subcateid" href="/goods/43.html">{{ itemSon.subcatetitle }}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemSon in item.datas" :key="itemSon.artID">
                            <router-link :to="'/detail/'+itemSon.artID">
                                <div class="img-box">
                                    <!-- 懒加载 -->
                                    <!-- <img :src="itemSon.img_url"> 用懒加载要用 v-lazy 指令替代src属性-->
                                    <img v-lazy="itemSon.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{ itemSon.artTitle }}</h3>
                                    <p class="price">
                                        <b>{{ itemSon.sell_price }}</b>元</p>
                                    <p>
                                        <strong>库存 {{ itemSon.stock_quantity }}</strong>
                                        <span>市场价：
                                            <s>{{ itemSon.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 导入 axios
import axios from "axios";

export default {
  //设置名字
  name: "index",
  data: function() {
    return {
      catelist: [], //分类列表数据
      sliderlist: [], // 轮播图数据
      toplist: [], //右边商品数据
      message: [] // 手机数码
    };
  },

  //生命周期函数 (生命周期钩子函数)
  //创建之前
  //   beforeCreate() {
  //       console.log(this);
  //   },

  //创建完毕
  created() {
    // 发送请求获取 轮播图 置顶 分类导航 数据
    axios
      .get("http://47.106.148.205:8899/site/goods/gettopdata/goods")
      .then(response => {
        //   console.log(response)
        //把获取到的数据设置给 当前这个组件的 data属性
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
        //打印数据
        console.log(this.sliderlist);
      });

    // 发送请求获取 商品列表数据
    axios
      .get("http://47.106.148.205:8899/site/goods/getgoodsgroup")
      .then(response => {
        //   console.log(response);
        this.message = response.data.message;
      });
  },
    
    // 因为多个页面都需要用到过滤器 所以就把过滤器写在main.js 中写成全局过滤器 这样项目中的所有文件都可以使用这个过滤器
//   //过滤器(管道符)  用来过滤日期从而获得我们需要的日期
//   filters: {
//     // 过滤日期
//     filterDate(value) {
//       // 返回过滤好的日期
//       return moment(value).format("YYYY年MM月DD日");
//     }
//   }
};
</script>

<style>
.el-carousel {
  height: 100%;
}
.el-carousel__container {
  height: 100% !important;
}
.banner-img img {
    display: block;
    height: 100%;
}
.el-carousel__button {
    background-color: hotpink!important;
    opacity: .2;
}
</style>


