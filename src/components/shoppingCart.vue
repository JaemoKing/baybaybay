<template>
<div v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,.5)">
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="message.lenght == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" ></el-switch>
                                    </td>
                                    <td><img style="width:65px;" :src="item.img_url" alt=""></td>
                                    <td>{{ item.title }}</td>
                                    <td>{{ item.sell_price }}</td>
                                    <td>
                                        <!-- 直接 min="0" 解析出来是字符串 所以要绑定 -->
                                        <!-- 
                                            如果要保留原始形参 并且额外的增加一个自定义实参 
                                            用 $event 他是来保留事件参数的 写法是固定的 然后在他后边增加自定义实参
                                        -->
                                        <el-input-number size="mini" :min='0' :max="item.max" @change="numChange($event,item.id)" v-model="item.buycount"></el-input-number>
                                    </td>
                                    <td>{{ item.buycount * item.sell_price }}</td>
                                    <td>
                                        <el-button @click="delOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{ totalCount }}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{ totalPrice }}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                                <button class="button">继续购物</button>
                            </router-link>
                            <button class="submit" @click="checkAndSubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
</div>
</template>

<script>
export default {
  name: "shoppingCart",
  data: function() {
    return {
      // 存数据的数组
      message: [],
      // 是否在加载中
      loading: false
    };
  },

  // 生命周期函数( 钩子函数 )
  created() {
    // 准备数据 id1,id2,id3
    // console.log(this.$store.state.cartData);
    // 定义一个变量存数据
    let cartData = this.$store.state.cartData;
    // 定义一个变量 一会儿拼接数据用
    let ids = "";
    // 遍历存数据的对象 获取到请求数据需要的id
    for (const key in cartData) {
      ids += key;
      ids += ",";
    }
    //去掉最后一个 逗号  第二个参数 -1 的意思是 从最后一个元素开始 -2 是从倒数第二个开始
    ids = ids.slice(0, -1);

    // 调用数据接口
    this.$axios
      .get(`/site/comment/getshopcargoods/${ids}`)
      .then(response => {
        // console.log(response);
        // 因为服务器返回的数据没有 数量 所以我们要自行拼接数量
        response.data.message.forEach(v => {
            // console.log(v.id);
          // 获取 vuex 中 id对应的值
          v.buycount = cartData[v.id];
          // 设置是否被选中
          v.selected = true; // true 为选中状态
          // 根据商品id 发送请求获取库存量 赋值给 max
          this.$axios.get(`site/goods/getgoodsinfo/${v.id}`).then( resSon => {
            //   console.log( response.data.message.goodsinfo.stock_quantity );
            // 给每个元素添加一个max属性并且把库存量赋值给max属性
            v.max = resSon.data.message.goodsinfo.stock_quantity;
          })
        });
        // 再赋值给 message 即可
        this.message = response.data.message;
      })
      .catch(err => {
        console.log("出错啦！");
      });
  },

  // 计算属性
  computed: {
      // 总金额
      totalPrice (){
          // 定义一个变量来存总金额
          let totalPrice = 0;
          // 总金额 += 商品单价 X 商品数量
          this.message.forEach( v => {
              // 判断 商品是否为选中状态 如果是选中状态就计算选中状态商品的总金额
              if ( v.selected ){
                  // 累加 商品价格 得到总金额
                totalPrice += v.sell_price * v.buycount;
              }
          });
          // 把计算得到的总金额返回
          return totalPrice;
      },

    // 总个数
    totalCount (){
        // 定义一个变量来存总个数
        let totalCount = 0;
        this.message.forEach( v => {
            // 判断  如果为选中状态就把选中的个数累加
            if ( v.selected ){
                // 累加 得到总个数 这里会变成字符串拼接 所以转为整数然后在累加 parseInt() 方法转为整数
                totalCount += parseInt( v.buycount );
            }
        });
        // 返回得到的总个数
        return totalCount;
    }
  },

  // 事件
  methods: {
      // 修改购买数量的方法
      numChange (num,id){
        //   console.log(num,id);
        // 调用 仓库对象的方法commit() 也叫提交载荷 
        this.$store.commit('updateGoodsNum', {
            goodId: id,
            goodNum: num
        })
      },

      // 删除数据的方法
      delOne(id){
          // 调用仓库对象的方法commit() 也叫提交载荷  这里是删除 vuex 中的
          this.$store.commit('deleteGood', id) //删除只需要一个id就可以了所以就直接传个id 不用传入一个对象
          // 页面中并没有删除 所以要删除数组中与要删除id对应的那条数据
          this.message.forEach( (v,i) => {
              // 判断 要删除的id 与数组中的那条数据的id一致  如果一致就删除这条数据
              if ( v.id == id ){
                  this.message.splice(i,1);
              }
          })
      },

      // 点击结算 验证是否登录 和 跳转结算页面
      checkAndSubmit (){
          // 判断  根据总金额 判断用户是否选择了商品进行结算 
          if ( this.totalCount == 0 ){
              // 给用户提示
              this.$Message.error('请选择要结算的商品，商品数量不能等于0，不然你结算个毛啊！');
              //停止执行下边的代码
              return;
          }

          //获取到选中商品的id
          let ids = '';
          this.message.forEach( v => {
              ids += v.id;
              ids += ',';
          });
          // 因为拼接完之后最后一个元素是个逗号 所以要把逗号截取掉
          ids = ids.slice(0,-1);
        //   console.log(ids);
          // 拿到要选中的商品的id后 就通过路由跳转到 order 订单页面
          // vue中使用路由的 this.$router.push(`/order/${ids}`) 方法来跳转页面 跳转到时候拼接上需要传递的参数
          this.$router.push(`/order/${ids}`); 

        // 使用上边的代码结合 main.js 中的导航守卫来做 登录判断 下边的代码可以注释掉了
        //-----------------------------------------------------------------------------------------------
        //   // 弹窗提示 loading框 在请求数据前开启loading弹窗提示
        //   this.loading = true;
        //   //根据后台提供的验证登录接口请求 来判断
        //   this.$axios.get('site/account/islogin').then( response => {
        //     //   console.log(response);
        //     setTimeout(() => {
        //         // 拿到数据之后 关闭loading 弹窗提示
        //         this.loading = false;
        //         //  判断是否登录 
        //         if ( response.data.code == 'nologin' ){
        //             // 没有登录  跳转到登录页面
        //             this.$router.push('/login');
        //         }else {
        //             // 登录  跳转到结算页面 
        //             this.$router.push('/order');
        //         }
        //     },1000);
        //   })
      }
  }
};
</script>

<style>
</style>


