<template>
    <div>   
        <div class="header">
            <!-- 1.0 导航栏头部 -->
            <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <span>黑马买买买</span>
                    <a target="_blank" href="#"></a>
                    <a target="_blank" href="#"></a>
                </div>
                <div id="menu" class="right-box">
                    <!-- 没登录 -->
                    <span v-show="$store.state.isLogin==false">
                        <!-- <a href="" class="">登录</a> -->
                        <router-link to="/login">登录</router-link>
                        <strong>|</strong>
                        <!-- 没有注册接口 就不用改注册 -->
                        <a href="" class="">注册</a>
                        <strong>|</strong>
                    </span>
                    <span v-show="$store.state.isLogin==true">
                        <!-- <a href="" class="">会员中心</a> -->
                        <router-link to="/vipCenter">会员中心</router-link>
                        <strong>|</strong>
                        <a @click="logout">退出</a>
                        <strong>|</strong>
                    </span>
                    <!-- <a href="" class=""> -->
                    <router-link to="/cart">
                        <i class="iconfont icon-cart"></i>购物车(
                        <span id="shoppingCartCount">
                            <span>{{$store.getters.goodsCount}}</span>
                        </span>)
                    </router-link>
                        <!-- </a> -->
                </div>
            </div>
            </div>

            <!-- 2.0 导航条 -->
            <div class="head-nav">
            <div class="section">
                <div id="menu2" class="nav-box menuhd">
                    <ul>
                        <li class="index">
                            <router-link to="/index">
                                <span class="out" style="top: 0px;">首页</span>
                            </router-link>
                        </li>
                        <li class="news">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">每日精选</span>
                            </a>
                        </li>
                        <li class="photo">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">秒杀专区</span>
                            </a>
                        </li>
                        <li class="video">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">黑马超市</span>
                            </a>
                        </li>
                        <li class="down">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">会员权益</span>
                            </a>
                        </li>
                        <li class="goods">
                            <a href="" class="">
                                <span class="out" style="top: 0px;">购物商城</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="search-box">
                    <div class="input-box">
                        <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                    </div>
                    <a href="javascript:;">
                        <i class="iconfont icon-search"></i>
                    </a>
                </div>
            </div>
            </div>
        </div>
        <!-- 路由出口 路由匹配到的组件将渲染在这里 视图出口  组件出口 -->
        <router-view></router-view>
        <!-- 底部 -->
        <div class="footer">
            <div class="section">
                <div class="foot-nav">
                    <a href="">关于我们</a>
                    <strong>|</strong>
                    <a href="">联系我们</a>
                    <strong>|</strong>
                    <a href="">联系客服</a>
                    <strong>|</strong>
                    <a href="">合作招商</a>
                    <strong>|</strong>
                    <a href="">商家帮助</a>
                    <strong>|</strong>
                    <a href="">营销中心</a>
                    <strong>|</strong>
                    <a href="">隐私政策</a>
                </div>
                <div class="foot-box">
                    <div class="copyright">
                        <p>版权所有 黑马买买买 </p>
                        <p>公司地址： 联系电话：</p>
                        <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                    </div>
                    <div class="service">
                        <p>周一至周日 9:00-24:00</p>
                        <a href="#">
                            <i class="iconfont icon-phone"></i>在线客服</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹出的 那个 模态框 -->
        <Modal v-model="isShow" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>确定要退出？</span>
          </p>
          <div style="text-align:center">
            <p>退出之后要重新登录哟！你记得密码么？</p>
          </div>
          <div slot="footer" style="display:flex;justify-content: center">
            <Button type="success" size="large"   @click="sureExit">确认</Button>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <Button type="error" size="large"   @click="isShow=false">取消</Button>
          </div>
        </Modal>
    </div>
</template>

<script>
    // 导入 jq包
    import $ from 'jquery';
    //复制jq插件js代码
    $(document).ready(function() {
        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function() {
            $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
        });

        $("#menu2 li a").hover(
            function() {
              $(".out", this).stop().animate({ top: "48px" }, 300); // move down - hide
              $(".over", this).stop().animate({ top: "0px" }, 300); // move down - show
            },
            function() {
              $(".out", this).stop().animate({ top: "0px" }, 300); // move up - show
              $(".over", this).stop().animate({ top: "-48px" }, 300); // move up - hide
            }
        );
    });

export default {
  name: "container",
  data: function (){
      return {
          isShow: false
      }
  },

  // 事件
  methods: {
      logout(){
        // 根据模态框提示 决定是否退出
        this.isShow = true;
      },

      // 取消退出的逻辑
      sureExit (){
          // 点击取消按钮 先关闭模态框
          this.isShow = false;
          // 调用退出接口 退出成功后修改 vuex的数据
          this.$axios.get("site/account/logout").then((response) => {
              // 退出成功后修改 vuex实例化仓库中的 isLogin 为 false false就是未登录状态
              // 根据状态码判断是否退出成功
              if ( response.data.status == 0 ){
                  // 退出成功 用提交载荷 修改vuex 仓库中isLogin的状态为false
                  this.$store.commit('changeLoginStatus',false);
                  // 能不能获取到当前所处的路由
                  // 可以通过 this.$route 获取到 当前的路由地址 进而判断是否为订单页
                  // 但是这么做不合理 因为后期还有 很多需要登陆的页面 如果写死判断 后期需要频繁的调整这里的逻辑
                  // 直接一劳永逸 去 首页 或者是登录页
                  // console.log(this.$router);
                  // console.log( this.$route);
                  this.$router.push('/index');
              }
          })
      }
  }
};
</script>

<style>
/* 导入css文件 */
@import url("./assets/statics/site/css/style.css");
/* 导入jq插件css文件 */
@import url("./assets/lib/css/style.css");
</style>
