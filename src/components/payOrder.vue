<template>
    <div class="pay-order">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{ orderInfo.order_no }}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{ orderInfo.accept_name }}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{ orderInfo.area }}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{ orderInfo.mobile }}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{ orderInfo.order_amount }} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{ orderInfo.message }}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <!-- <canvas width="300" height="300"></canvas> -->
                                    <!-- 付款二维码 -->
                                    <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+$route.params.orderid" :options="{ size: 200 }"></qrcode>
                                </div>
                            </div>
                            <input type="button" value="跳转到支付页" @click="goPayOrder">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 导入 二维码模块
import VueQrcode from "@xkeshi/vue-qrcode";
// 注册二维码组件 全局注册
// Vue.component(VueQrcode.name, VueQrcode);
export default {
    name:"payOrder",
    data: function (){
        return {
            orderInfo: {}
        }
    },

    // 注册二维码组件 局部注册
    components: {
        //   对象的属性名 默认不支持 使用 对象取值的方式来赋值
        // ES6中有这个语法
        [VueQrcode.name] : VueQrcode
    },

    // 生命周期函数
    created() {
        // vue创建完成后请求数据渲染页面
        this.$axios.get(`site/validate/order/getorder/${this.$route.params.orderid}`)
        .then( response => {
            this.orderInfo = response.data.message[0];
        });
        // 用定时器的方式 轮询 查询是否支付订单 过几秒就请求一次问一次是否支付成功 成功就跳转页面否则留在当前页面
        let interId = setInterval( () => {
            // 发送请求
            this.$axios.get(`site/validate/order/getorder/${this.$route.params.orderid}`)
            .then( response => {
                // console.log( response );
                // 判断 状态为 2 就是支付成功
                if ( response.data.message[0].status == 2 ){
                    // 支付成功 提示用户
                    this.$Message.success('付款成功！等发货吧！');
                    // 付款成功后过一段时间跳转到 下一页 用定时器
                    setTimeout( () => {
                        this.$router.push('/paySuccess/'+this.$route.params.orderid);
                    },500);
                    // 付款成功后清除定时器
                    clearInterval( interId );
                }else {
                    // 没有付款成功 什么事都不做留在当前页面
                }
            })
        }, 1000)
    },

    // 方法
    methods: {
        goPayOrder (){
            //   直接跳转到这个页面 进行支付 不是用axios调用接口
            // 直接打开一个新的窗口 完成支付
            window.open(
                "http://47.106.148.205:8899/site/validate/pay/alipay/" +
                this.$route.params.orderid
            )
        }
    }
};
</script>
<style>
    .pay-order{
        min-height:750px;
    }
</style>


