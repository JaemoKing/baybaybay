<template>
    <div class="center">
        <div class="el-row">
            <div class="el-col el-col-24">
                <div class="comp">
                    <div class="goodsinfo routeanimate">
                        <div class="section">
                            <div class="location">
                                <span>当前位置：</span>
                                <router-link to="/index">首页&gt;</router-link>  
                                <a href="javascript:;">支付中心</a>
                            </div>
                        </div>
                        <div class="section">
                            <div class="wrapper">
                                <div class="bg-wrap">
                                    <div class="nav-tit pay">
                                        <a href="javascript:;" class="selected">支付中心</a>
                                    </div>
                                    <div class="msg-tips">
                                        <div class="icon">
                                            <i class="iconfont icon-check"></i>
                                        </div>
                                        <div class="info">
                                            <strong>订单已支付成功！</strong><span><span style='color:yellowgreen;font-size:30px'>{{time}}</span>秒后去会员中心</span>
                                            <p>您可以点击这里进入
                                                <router-link to="/vipCenter" style="font-size:30px">会员中心</router-link>
                                            <p>如有其它问题，请立即与我们客服人员联系。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'paySuccess',
    data:function(){
        return {
            time:5,
            // 定义定时器
            insterId: 0
        }
    },
    // mounted 声明周期函数 是在页面渲染出来之后执行的
    mounted(){
        // 定时器 间隔为 1秒 5秒后跳转到会员中心
        this.insterId = setInterval( () => {
            //组件中的
            this.time--;
            // 判断
            if ( this.time == 0 ){
                // time = 0 就清除定时器
                clearInterval( this.insterId );
                // 跳转页面
                // this.$router.push('/VipCenter');
                // 返回上一页 上上一页
                // this.$router.go(-2); -1 上一页 -2 上上页
                // 直接跳转到 订单详情页
                this.$router.push('/orderDetail/'+this.$route.params.id);
            }
        }, 1000)
    },

    // 生命周期函数(钩子函数) 组件销毁后执行(也就是离开当前组件后执行)
    destroyed() {
        clearInterval( this.insterId );
    },
};
</script>
<style>
</style>


