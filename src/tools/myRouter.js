// 导入vue 
import Vue from 'vue';

// 导入路由
import VueRouter from 'vue-router';

// 组件部分
//导入首页组件
import Index from '../components/index.vue';
//导入商品详情页组件
import detail from '../components/productDetail.vue';
// 导入购物车页面组件
import ShoppingCart from '../components/shoppingCart.vue';
// 导入登录页面组件
import Login from '../components/login.vue';
// 导入订单页面组件
import order from '../components/order.vue';
// 导入支付订单组件
import PayOrder from '../components/payOrder.vue';
// 导入 订单支付页面组件
import PaySuccess from '../components/paySuccess.vue';
// 导入支付订单组件
import VipCenter from '../components/vipCenter.vue';
// 导入订单列表组件
import OrderList from '../components/orderList.vue';
// 导入订单详情页面组件
import OrderDetail from '../components/orderDetail.vue';

// 导入axios包
import axios from 'axios';
// 配置全局基地址(所有跟插件 框架相关的设置 去对应的文档找)
// 一般来说接口 是在一台服务器上的 一系列地址
// 抽取出来还有一个好处 如果服务器更换地址 只需要调整一个位置
// 生产环境地址
// axios.defaults.baseURL = 'http://111.230.232.110:8899';
//把请求数据基地址存在属性中 全局使用
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//让ajax携带cookie
// 跨域请求时 是否会携带 凭证(cookie)
axios.defaults.withCredentials=true;
// 把axios 放在vue构造函数原型对象的属性在 然后全局使用
Vue.prototype.$axios = axios;

//注册VueRouter (类似node的Express中的中间件)
Vue.use(VueRouter);

// 定义路由规则
const routes = [
    //默认打开页面显示的是首页
    {
        path: '/',
        // component: Index //传入组件对象 Index
        // 解析到 / 直接修改路由地址为 /index   这个叫 重定向 
        redirect: '/index'
    },
    // 首页规则
    {
        path: '/index',
        component: Index //传入组件对象 Index
    },
    // 商品详情页规则
    {
        path: '/detail/:id',
        component: detail //传入组件对象 detail
    },
    // 购物车页面规则
    {
        path: '/cart',
        component: ShoppingCart, //传入组件对象 ShoppingCart
        meta:{ checkLogin:true }
    },
    // 登录页面规则
    {
        path: '/login',
        component: Login //传入组件对象 login
    },
    // 订单详情页面路由
    {
      path: '/order/:ids',
      component: order,
      meta:{ checkLogin:true }
    },
    // 订单支付路由
    {
      path: '/payOrder/:orderid',
      component: PayOrder,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: { checkLogin: true }
    },
    // 订单支付成功路由
    {
      path: '/paySuccess/:id',
      component: PaySuccess,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: {
        checkLogin: true
      }
    },
    // 会员中心路由
    {
      path: '/VipCenter',
      component: VipCenter,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: {
        checkLogin: true
      }
    },
    // 订单列表路由
    {
      path: '/orderList',
      component: OrderList,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: {
        checkLogin: true
      }
    },
    // 订单详情路由
    {
      path: '/orderDetail/:id',
      component: OrderDetail,
      // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
      meta: {
        checkLogin: true
      }
    },
]

//实例化路由对象
let router = new VueRouter({
    // 传入路由规则 快速赋值 这个key 是固定的必须写 routes
    routes
})

// 导航守卫
// 增加 导航守卫(路由守卫)  相当于node-express 中的中间件， 所有路由跳转都会进过这里过滤一遍
router.beforeEach((to, from, next) => {
    // 每次过来都保存一下来时的地址
    // 提交载荷 保存数据
    // store.commit('saveFromPath',from.path);
    // console.log('to',to);
    // console.log('from',from);
    // 必须要执行 否则 不会跳转
    // next()
    // 如果访问的是 order 页面 就做登录判断
    // to.path.indexOf('/order/') != -1  indexOf() 方法 = -1 是没有 =0 是有
    // if ( to.path.indexOf('/order/') != -1 ){
    //     // 调用接口
    //     axios.get('/site/account/islogin').then( response => {
    //         // 判断是否登录 登录了才能继续访问
    //         if ( response.data.code != 'nologin' ){
    //             // 登录了 直接放走即可
    //             next();
    //         }else {
    //             // 没登录 就打回登录页
    //             next('/login');
    //         }
    //     })
    // }else {
    //     // 如果要访问的不是order页面就 直接让他访问
    //     next();
    // }

    // 使用 vue-router 路由中的  路由元信息 来做页面跳转判断( 判断哪些页面需要登录才能访问)
    if ( to.meta.checkLogin ){
        // 调用接口
        axios.get('/site/account/islogin').then( response => {
            // 判断是否登录 登录了才能继续访问
            if ( response.data.code != 'nologin' ){
                // 登录了 直接放走即可
                next();
            }else {
                // 没登录 就打回登录页
                next('/login');
            }
        })
    }else {
        next();
    }
})

// 暴露出去 把 router暴露出去了
export default router;