<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- 放大镜效果 -->
                            </div>
                            <div class="goods-spec">
                                <h1>{{ goodsinfo.title }}</h1>
                                <p class="subtitle">{{ goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{ goodsinfo.goods_no }}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{ goodsinfo.market_price }}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{ goodsinfo.sell_price }}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- 计数器 -->
                                                <el-input-number size="small" v-model="buyCount" @change="buyCountChange" :min="0" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{ goodsinfo.stock_quantity }}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <!-- tab区域 -->
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=false" :class="{selected:!showDiscuss}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;"  @click="showDiscuss=true" :class="{selected:showDiscuss}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            
                            <!-- 商品内容 -->
                            <div class="tab-content entry" v-show="showDiscuss==false" v-html="goodsinfo.content">
                            </div>
                            <!-- 商品评论 -->
                            <div class="tab-content" v-show="showDiscuss==true">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:58:59</span>
                                                </div>
                                                <p>testtesttest</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:59:36</span>
                                                </div>
                                                <p>很清晰调动单很清晰调动单</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/90" class="">
                                                <img :src="item.img_url">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">{{ item.title }}</a>
                                            <span>{{ item.add_time | filterDate }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- iview插件 返回顶部 -->
        <BackTop></BackTop>
    </div>
</template>

<script>
//导入axios   axios不是插件所以不用use注册
import axios from "axios";

export default {
  name: "detail",
  data: function() {
    return {
      productId: "",
      goodsinfo: {}, // 商品信息
      hotgoodslist: [], // 热卖列表
      imglist: [], // 图片列表
      buyCount: 0, // 购买数量
      showDiscuss: false // tab栏切换
    };
  },

  //事件
  methods: {
    buyCountChange() {}
  },
  //生命周期函数 生命周期钩子
  //当前这个vue组件还没有实例化出来话 那些 data methods 都是没有的
  // beforeCreate() {
  //     // console.log(this.$route.params);
  //     // console.log(this.$route.params.id);
  //     this.productId = this.$route.params.id;
  // },
  //created 是组件注册完成之后执行的 所以在他里边发送请求
  created() {
    // 保存id
    this.productId = this.$route.params.id;
    //发送ajxa 请求获取数据
    axios
      .get(
        `http://47.106.148.205:8899/site/goods/getgoodsinfo/${this.productId}`
      )
      .then(response => {
        // console.log(response);
        // 保存起来
        this.goodsinfo = response.data.message.goodsinfo;
        this.hotgoodslist = response.data.message.hotgoodslist;
        this.imglist = response.data.message.imglist;
      });
  }
};
</script>

<style>
/* 设置商品内容板块图片样式*/
.tab-content img {
  display: block;
  width: 100%;
}
</style>

