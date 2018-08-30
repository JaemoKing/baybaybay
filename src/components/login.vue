<template>
<div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <el-input v-model.trim="name" placeholder="请输入用户名"></el-input>
                        <br>
                        <br>
                        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
                        <br>
                        <br>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" @click="login" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>

    export default {
        name: 'login',
        data: function (){
            return {
                name: '',
                password: ''
            }
        },

        // 事件
        methods: {
            // 登录
            login (){
                // 设置进度条的颜色 尺寸
                this.$Loading.config({
                    color: "#3eaf7c",
                    failedColor: "red",
                    height: 5
                });
                // 显示进度条
                this.$Loading.start();

                // 获取用户名
                // 获取密码
                // 提交用户名密码 获取登陆结果
                this.$axios.post("/site/account/login", {
                    user_name: this.name,
                    password: this.password
                }).then( response => {
                    // console.log(response);
                    // 登录成功关闭进度条
                    this.$Loading.finish();
                    // 根据状态码判断是否登录成功 然后在返回到来时的页面
                    if ( response.data.status == 0 ){
                        // 登录成功
                        // 用 提交载荷 修改vuex中的isLogin状态
                        this.$store.commit('changeLoginStatus',true);
                        //跳转回你来时的页面
                        this.$router.push(this.$store.state.fromPath);
                    }
                }).catch( response => {
                    // 显示错误状态的进度条
                    this.$Loading.error();
                })
            }
        }
    }
</script>

<style>

</style>

