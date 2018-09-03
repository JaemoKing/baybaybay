<template>
    <div>
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
                                <li class="active">
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
                    <div class="cart-box">
                        <!-- status-icon 让输入框的后面 有提示图标 -->
                        <el-form status-icon :model="orderForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <!-- 上面的一堆 个人信息输入 -->
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input v-model="orderForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="">
                                        <!-- 使用data中的数据 设置为初始值 -->
                                        <v-distpicker  @selected="selected"
                                            :province="orderForm.area.province.value" 
                                            :city="orderForm.area.city.value" 
                                            :area="orderForm.area.area.value">
                                        </v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="orderForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="orderForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话">
                                        <el-input v-model="orderForm.phone" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="email">
                                        <el-input v-model="orderForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input v-model="orderForm.post_code" style="width:500px"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- 单选框 -->
                                        <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio>
                                        <span style="color:#666">手续费:0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- 单选框 -->
                                        <el-radio @change="expressChange(20)" v-model="orderForm.express_id" label="1">顺丰快递(20元)</el-radio>
                                        <el-radio @change="expressChange(10)" v-model="orderForm.express_id" label="2">圆通快递(10元)</el-radio>
                                        <el-radio @change="expressChange(8)"  v-model="orderForm.express_id" label="3">韵达快递(8元)</el-radio>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in message" :key="item.id">
                                            <td width="68">
                                                <!-- <a target="_blank" href="/goods/show-89.html"> -->
                                                <router-link :to="'/detail'+item.id"></router-link>
                                                    <img :src="item.img_url" class="img">
                                                <!-- </a> -->
                                            </td>
                                            <td>
                                                <!-- <a target="_blank" href="/goods/show-89.html">小米（Mi）小米Note 16G双网通版</a> -->
                                                <router-link :to="'/detail/'+item.id">{{item.title}} </router-link>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{ item.buycount }}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{ item.totalamount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <el-form-item label="订单备注(100字符以内)" prop="message">
                                                <el-input type="textarea" resize="none" :row="2" v-model="orderForm.message" style="width:500px"></el-input>
                                            </el-form-item>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{ totalCount }}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{ orderForm.goodsAmount }}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ orderForm.expressMoment }}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <!-- <a class="btn button" href="/cart.html">返回购物车</a> -->
                                            <router-link to="/cart">返回购物车</router-link>
                                            <a id="btnSubmit" class="btn submit" @click="sureOrder" >确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
// 导入 省市区联动插件
import VDistpicker from "v-distpicker";
export default {
  // 省市级联动组件
  components: { VDistpicker },
  name: "order",
  // 方法
  methods: {
    // 省市区联动select框中值改变时触发这个方法 并且把下拉框中改变后的值传进来
    selected(value) {
      //   console.log(value);
      this.orderForm.area = value;
    },

    // 价格改变 选中不同快递时 价格会改变 然后触发这个方法
    expressChange(price) {
      // 拿到改变后的价格赋值个 data属性中的快递费用属性
      this.orderForm.expressMoment = price;
    },

    // 提交订单
    sureOrder() {
      // 调用接口提交订单
      this.$axios
        .post("site/validate/order/setorder", this.orderForm)
        .then(response => {
          // 获取订单id
          let orderid = response.data.message.orderid;
          // 带着订单id去支付页面
          this.$router.push("/payOrder/" + orderid);

          // 提交订单之后删除购物车数据
          this.message.forEach(v => {
            // 删除 vuex 中的数据  删除购物车数据的方法在全局已经写好 只需要用提交载荷调用删除方法 然后传入要删除的数据id即可
            this.$store.commit("deleteGood", v.id);
          });
        });
    }
  },

  //   页面创建就去获取商品数据
  created() {
    // 保存传递拖来的 商品id
    this.orderForm.goodsids = this.$route.params.ids;
    // 调用接口请求数据
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
      .then(response => {
        // 计算总金额
        let total = 0;
        // 准备 商品id对象
        let cargoodsobj = {};
        // 拼接数据 因为请求回来的数据没有商品数量 所以这里我们要手动拼接
        // 遍历数据拿到商品数量进行拼接赋值
        response.data.message.forEach(v => {
          // 修改数量
          v.buycount = this.$store.state.cartData[v.id];
          // 计算每件商品的总金额 直接给每个元素对象中添加一个 总金额属性
          v.totalamount = v.buycount * v.sell_price;
          // 计算所有商品的总金额
          total += v.totalamount;
          // 给商品id对象增加键值对
          cargoodsobj[v.id] = v.buycount;
        });
        //赋值数据
        this.message = response.data.message;
        // console.log(this.message)
        // 把总金额赋值到数据中
        this.orderForm.goodsAmount = total;
        // 添加到 orderForm中即可
        this.orderForm.cargoodsobj = cargoodsobj;
      });
  },

  // 计算属性
  computed: {
    // 总数量
    totalCount() {
      let totalCount = 0;
      // 遍历存数据的数组拿到 商品数量
      this.message.forEach(v => {
        totalCount += v.buycount;
      });
      // 返回得到的商品总数量
      return totalCount;
    }
  },

  data: function() {
    // 自定义验证的规则 手机号验证
    var checkMobile = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error("年龄不能为空"));
      //   }
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        //   callback(new Error("请输入数字值"));
        // } else {
        //   if (value < 18) {
        //     callback(new Error("必须年满18岁"));
        //   } else {
        //     callback();
        //   }
        // }
        // 定义正则规则
        let exec = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (exec.test(value) == true) {
          // 正确的时候干的事情
          callback();
        } else {
          callback(new Error("你的手机号不对"));
        }
      }, 500);
    };
    // 邮箱
    var checkEmail = (rule, value, callback) => {
      // 如果value 不为空 格式验证
      // console.log(value);
      if (value.trim().length != 0) {
        // 验证
        // 邮箱的正则
        let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (exec.test(value.trim()) == true) {
          callback();
        } else {
          callback(new Error("请输入正确邮箱"));
        }
      } else {
        callback();
      }
    };
    // 邮编
    var checkPostCode = (rule, value, callback) => {
      if (value.trim().length != 0) {
        // 验证
        // 邮箱的正则
        let exec = /^[1-9]\d{5}(?!\d)$/;
        if (exec.test(value.trim()) == true) {
          callback();
        } else {
          callback(new Error("请输入正确邮编"));
        }
      } else {
        callback();
      }
    };
    return {
      orderForm: {
        goodsAmount: 0, // 总金额
        expressMoment: 20, // 快递费
        accept_name: "云卷云舒看天", // 收货人姓名,
        // 省市区
        area: {
          province: { code: "440000", value: "广东省" },
          city: { code: "440300", value: "深圳市" },
          area: { code: "440306", value: "宝安区" }
        },
        address: "中粮商务公园", // 详细地址
        mobile: "18888888888", // 手机号
        phone: "", // 联系电话
        email: "fyy@163.com", // 邮箱
        post_code: "518300", // 邮编
        payment_id: "6", // 支付方式
        express_id: "1", // 快递方式 1 顺丰 2 圆通 3 韵达
        message: "快点发货,不要用三通一达,记得信息要保密哦",
        goodsids: "", //购买的商品id,
        cargoodsobj: {}, // 购买的商品 id 跟件数的关系
        phone: "1008611" // 联系电话
      },

      // 服务器返回的商品数据
      message: [],

      rules: {
        //   需要跟字段相对应
        accept_name: [
          // required 是否必须  message 提示消息 trigger 触发的方式
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          // min 最短 max 最长 少数民族
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        // 地址的验证规则
        address: [
          {
            required: true,
            message: "请输入地址,没有我送给谁呀",
            trigger: "blur"
          }
        ],
        // 手机号验证
        mobile: [{ validator: checkMobile, trigger: "blur" }],
        // 邮箱验证
        email: [{ validator: checkEmail, trigger: "blur" }],
        // 邮编验证
        post_code: [{ validator: checkPostCode, trigger: "blur" }]
      }
    };
  }
};
</script>
<style>
</style>

