<template>
    <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="tmpl routeanimate">
                            <div class="section">
                                <div class="location">
                                    <span>当前位置：</span>
                                    <a href="/index.html">首页</a> &gt;
                                    <a href="#/site/member/center" class="">会员中心</a>&gt;
                                    <a href="#/site/member/orderlist" class="router-link-exact-active ">我的订单</a>
                                </div>
                            </div>
                            <div class="section clearfix">
                                <div class="left-260">
                                    <div class="bg-wrap">
                                        <div class="avatar-box">
                                            <a href="/user/center/avatar.html" class="img-box">
                                                <!-- <i class="iconfont icon-user-full"></i> -->
                                                <img src="../assets/img/1.jpg" alt="">
                                            </a>
                                            <h3>

                                                Jaemo

                                            </h3>
                                            <p>
                                                <b>注册会员</b>
                                            </p>
                                        </div>
                                        <div class="center-nav">
                                            <ul>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-order"></i>
                                                        <span>订单管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <a href="#/site/member/orderlist" class="router-link-exact-active ">
                                                                <i class="iconfont icon-arrow-right"></i>交易订单</a>
                                                        </p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-user"></i>
                                                        <span>账户管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                        </p>
                                                        <p>
                                                            <a href="javascript:void(0)">
                                                                <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-auto">
                                    <div class="bg-wrap" style="min-height: 765px;">
                                        <div class="sub-tit">
                                            <ul>
                                                <li class="selected">
                                                    <a href="/user/order-list.html">交易订单</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- element ui 分页器 -->
                                        <el-pagination
                                            style="margin-left:50px;"
                                            @size-change="sizeChange"
                                            @current-change="currentChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[5, 10, 15, 26]" 
                                            :page-size="pageSize" 
                                            layout="total, sizes, prev, pager, next, jumper" 
                                            :total="totalcount">
                                        </el-pagination>
                                        <div class="table-wrap">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                                                <tbody>
                                                    <tr>
                                                        <th width="16%" align="left">订单号</th>
                                                        <th width="10%">姓名</th>
                                                        <th width="12%">订单金额</th>
                                                        <th width="11%">下单时间</th>
                                                        <th width="10%">状态</th>
                                                        <th width="12%">操作</th>
                                                    </tr>
                                                    <tr v-for="(item, index) in message" :key="item.id">
                                                        <td>{{ item.order_no }}</td>
                                                        <td align="left">{{ item.accept_name == '' ? '匿名用户' : item.accept_name }}</td>
                                                        <td align="left">
                                                            <strong style="color: red;">￥{{ item.real_amount }}</strong>
                                                            <br> 在线支付
                                                        </td>
                                                        <!-- 使用filterDate过滤器 同时传入 参数
                                                            需求同步修改  main.js中的过滤器的定义
                                                        -->
                                                        <td align="left">{{ item.payment_time | filterDate('YYYY-MM-DD HH:mm:ss') }}</td>
                                                        <td align="left">
                                                            {{ item.statusName }}
                                                        </td>
                                                        <td align="left">
                                                            <!-- <a href="#/site/member/orderinfo/12" class="">查看订单</a> -->
                                                            <router-link :to="'/orderDetail/'+item.id">查看订单</router-link>

                                                            <!-- <a href="#/site/goods/payment/12" class="">|去付款</a> -->
                                                            <router-link v-if="item.status==1" :to="'/payOrder/'+item.id">去付款</router-link>
                                                            
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="page-foot">
                                                
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
        name: 'orderList',
        data: function (){
            return {
                pageIndex: 1, // 页码
                pageSize: 10, // 页容量
                message: [],  // 订单列表数据
                totalcount: 0 // 列表总条数
            };
        },

        // 事件 方法
        methods: {
            // 获取当前页面数据方法
            getOrderList (){
                this.$axios.get(`site/validate/order/userorderlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                .then( response => {
                    // console.log(response);
                    // 拿到数据后 赋值给message数组存起来
                    this.message = response.data.message;
                    // 把数据总条数赋值给 totalcount 存起来
                    this.totalcount = response.data.totalcount;
                });
            },

            // 获取到被点击的页码 然后重新请求数据
            currentChange (index){
                // console.log(index);
                // 把获取到的页码赋值给 pageIndex
                this.pageIndex = index;
                // 调用查询数据的方法重新渲染页面
                this.getOrderList();
            },

            // 获取到选择的 页容量 然后重新请求数据
            sizeChange (size){
                // console.log(size);
                // 修改页容量之后应该默认回到第一页 所以 给pageIndex 重新赋值
                this.pageIndex = 1;
                // 把获取到的页容量赋值给 pageSize
                this.pageSize = size;
                // 调用查询数据的方法重新渲染页面
                this.getOrderList();
            },
        },

        // 生命周期函数 vue创建完成后 请求数据渲染页面
        created() {
            // 调用请求数据的方法
            this.getOrderList();
        },
    }
</script>

<style>
/* 标题区域 */
.sub-tit {
  padding-top: 0;
}
/* 头像高度 */
.avatar-box {
  height: auto;
}
td {
  height: 60px;
}
td a{
    display: block;
}
</style>

