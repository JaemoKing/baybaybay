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
                                <ProductZoomer v-if="images.normal_size!=0" :base-images="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
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
                                                <button @click="cartAdd" class="add">加入购物车</button>
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
                                                <textarea v-model.trim="commentInfo" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" @click="submitCommit" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <!-- 没有评论就显示暂无评论 -->
                                        <p v-show="comments.length == 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{ item.user_name }}</span>
                                                    <span>{{ item.reply_time | filterDate }}</span>
                                                </div>
                                                <p>{{ item.content }}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- iview 插件 分页组件 -->
                                        <Page 
                                            :total="100" show-elevator show-sizer placement="top" 
                                            :page-size-opts="[10,15,20,25,30]"
                                            @on-change="pageChange"
                                            @on-page-size-change="pageSizeChange"
                                        />
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
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                           <router-link :to="'/detail/'+item.id">{{ item.title }}</router-link>
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
        <!-- 移动的小图片 -->
        <img v-if="imglist.length!=0" class="moveImg" style="display:none" :src="imglist[0].original_path" alt="">
    </div>
</template>

<script>
// 导入 jq
import $ from "jquery";

export default {
  name: "detail",
  data: function() {
    return {
      productId: "",
      goodsinfo: {}, // 商品信息
      hotgoodslist: [], // 热卖列表
      imglist: [], // 图片列表
      buyCount: 0, // 购买数量
      showDiscuss: false, // tab栏切换
      // 放大镜设置
      zoomerOptions: {
        zoomFactor: 2, // 放大倍数
        pane: "container-round", // container-round 小放大镜
        hoverDelay: 300,
        namespace: "zoomer",
        move_by_click: true, // true 点击切换
        scroll_items: 7,
        choosed_thumb_border_color: "yellowgreen" // 框的颜色
      },
      // 放大镜
      // 轮播图用的图片 默认的数据格式 不支持
      // 这里的数据 需要在接口调用完毕之后 才能够获取
      images: {
        normal_size: []
      },

      //分页页码 默认为 1
      pageIndex: 1,
      //分页 页容量
      pageSize: 10,
      //评论总条数
      totalCount: 0,
      //评论数据
      comments: [],
      // 评论内容 数据双向绑定
      commentInfo: ""
    };
  },

  //事件
  methods: {
    buyCountChange() {},

    //封装 获取id 根据id 请求数据的方法
    getProductDetail() {
      // 保存id this.$route.params 对象是自动生成的对象 传递的参数数据都在他里边
      this.productId = this.$route.params.id;
      //发送ajxa 请求获取数据
      this.$axios
        .get(`site/goods/getgoodsinfo/${this.productId}`)
        .then(response => {
          // console.log(response);
          // 保存起来
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;

          //处理放大镜数据
          let temArr = [];
          this.imglist.forEach((v, i) => {
            // v和i 的位置不能写反 第一个是v第二个是i
            temArr.push({
              id: v.id,
              url: v.original_path
            });
          });
          //把临时数组赋值给存图片数据的数组
          this.images.normal_size = temArr;
        });
    },

    // 获取评论数据
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.productId}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          // console.log(response);
          //把获取到的数据 赋值给存评论数据的数组
          this.comments = response.data.message;
          //把获取到的总数据条数赋值给 totalCount
          this.totalCount = response.data.totalcount;
        });
    },
    // 页码改变
    pageChange(page) {
      this.pageIndex = page;
      // 页码改变时 重新获取数据即可
      this.getComments();
    },

    // 页容量改变 自动触发 页码改变 把页码改为1
    // 如果当前页码就是1 不会触发 pageChange
    pageSizeChange(size) {
      this.pageSize = size;
      // 当页码为1时 就重新获取数据
      if (this.pageIndex == 1) {
        this.getComments();
      }
    },

    //点击提交按钮发表评论
    submitCommit() {
      // 判断输入内容是否为空
      if (this.commentInfo == "") {
        // 为空 直接给弹窗提示
        this.$Message.error(
          "哥们,写点啥呗, 程序员不想理你 并且抛出了一个异常!!"
        );
        // 停止执行代码
        return;
      }
      // 提交评论 把评论内容添加到数据库 然后局部刷新页面
      this.$axios
        .post(`site/validate/comment/post/goods/${this.productId}`, {
          commenttxt: this.commentInfo
        })
        .then(response => {
          // console.log(response);
          //提示用户提交成功
          this.$Message.success(response.data.message);
          //提交成功后局部刷新数据 把刚提交的数据渲染在页面
          this.getComments();
          // 清空文本框
          this.commentInfo = "";
        });
    },
    // 加入购物车的逻辑
    // 使用jq来实现
    cartAdd() {
        // 判断 商品数量不能为0 提示用户
        if ( this.buyCount == 0 ){
            this.$Message.error('哥们,买点呗,不买怎么加入购物车？你彪啊！');
            //停止执行下边的代码
            return;
        } 
        // 获取加入购物车按钮的位置  offset() 方法直接获取到按钮的X,Y坐标
        let cartOffset = $(".add").offset();
        //   console.log(cartOffset);
        // 获取购物车位置
        let targetOffset = $(".icon-cart").offset();
        //   console.log(targetOffset);
        // 使用动画的方式 移动图片
        // 移动到按钮位置 显示出来 动画移动到目标位置
        $(".moveImg")
          .stop()
          .show()
          .addClass("move")
          .css(cartOffset)
          .animate(targetOffset, 1000, function() {
            $(this)
              .hide()
              .removeClass("move");
          });
        // 动画完结以后
        // 	隐藏图片
        // 	增加购物车中的显示内容

        // 测试 增加数据
        // this.$store.commit("increment", 1);
        this.$store.commit('addGoods',{
            goodId: this.productId,
            goodNum: this.buyCount
        })
    }
  },

  //生命周期函数 生命周期钩子
  // beforeCreate 是当前这个vue组件还没有实例化出来话 那些 data methods 都是没有的
  // beforeCreate() {
  //     // console.log(this.$route.params);
  //     // console.log(this.$route.params.id);
  //     this.productId = this.$route.params.id;
  // },
  //created 是组件注册完成之后执行的 所以在他里边发送请求
  created() {
    this.getProductDetail();
    // 获取评论
    this.getComments();
  },

  // watch 监测 id的变化  根据id变化 然后获得变化后的id去请求数据 渲染页面
  watch: {
    $route(val, oldVal) {
      // 在根据id请求数据之前先清空之前的商品图片，因为插件没有写这个效果所以要手动强制清除
      // 强制让数组长度 = 0 数组为空长度就=0
      this.images.normal_size = [];
      //调用根据id请求数据的方法
      this.getProductDetail();
    }
  }
};
</script>

<style lang="less">
/* 设置商品内容板块图片样式*/
.tab-content img {
  display: block;
  width: 100%;
}
/* 放大镜相关样式 */
.pic-box {
  width: 395px;
}
/* 放大镜相关样式 */
.pic-box {
  width: 395px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items: center;
  }
}

// 移动图片的样式
.moveImg {
  position: absolute;
  width: 50px;
  //   display: none;
  // top:0;
  // left:0;
}
.moveImg.move {
  transition: transform 1s, opacity 1s;
  opacity: 0.5;
  transform: scale(0.2) rotate(7200deg);
}
</style>

