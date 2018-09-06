// 导入vue
import Vue from 'vue';
// 导入自己封装的路由
import router from './tools/myRouter';
// 导入抽取好的第三方包
import './tools/libs';
//导入 vuex ( 仓库 )
import store from './tools/myVuex';

// 导入路由
// import VueRouter from 'vue-router';
//导入App根组件 (最外边的组件)
import App from './App.vue';
//导入首页组件
// import Index from './components/index.vue';
//导入商品详情页组件
// import detail from './components/productDetail.vue';
// 导入购物车页面组件
// import ShoppingCart from './components/shoppingCart.vue';
// 导入登录页面组件
// import Login from './components/login.vue';
// 导入订单页面组件
// import order from './components/order.vue';
// 导入支付订单组件
// import PayOrder from './components/payOrder.vue';
// 导入 订单支付页面组件
// import PaySuccess from './components/paySuccess.vue';
// 导入支付订单组件
// import VipCenter from './components/vipCenter.vue';
// 导入订单列表组件
// import OrderList from './components/orderList.vue';
// 导入订单详情页面组件
// import OrderDetail from './components/orderDetail.vue';

// //引入 elementUi 插件
// import ElementUI from 'element-ui';
// //引入 elementUi 插件 css文件
// import 'element-ui/lib/theme-chalk/index.css';
// //导入 懒加载 vue-lazy插件
// import VueLazyload from 'vue-lazyload'
// //导入 iview 插件  返回顶部 吸顶效果
// import iView from 'iview';
// //导入 iview 插件 css文件
// import 'iview/dist/styles/iview.css';

//注册VueRouter (类似node的Express中的中间件)
// Vue.use(VueRouter);
// 注册 ElementUI
// Vue.use(ElementUI);
// //注册 vue-lazy懒加载
// Vue.use(VueLazyload, {
//     preLoad: 1.3,
//     //错误
//     // error: 'dist/error.png',
//     //加载中
//     // loading: 'dist/loading.gif', //这个读取不到懒加载图片的路径要用 require
//     //图片也要当模块导入
//     loading: require('./assets/img/loadingDog.gif'),
//     attempt: 1
// });

// // 注册 iview 插件
// Vue.use(iView);

// 导入axios包
// import axios from 'axios';
//把请求数据基地址存在属性中 全局使用
// axios.defaults.baseURL = 'http://47.106.148.205:8899';
//让ajax携带cookie
// 跨域请求时 是否会携带 凭证(cookie)
// axios.defaults.withCredentials=true;
// 把axios 放在vue构造函数原型对象的属性在 然后全局使用
// Vue.prototype.$axios = axios;


// 因为多个页面都需要用到过滤器 所以就把过滤器写在main.js 中写成全局过滤器 这样项目中的所有文件都可以使用这个过滤器
// 注册 全局过滤器
// 依赖于 moment.js 所以先导入moment.js包
import moment from 'moment';
// 注册
Vue.filter('filterDate', function (value,formatStr) {
    // console.log(formatStr);
    // 如果传入了格式化字符串 就用传入的字符串来格式化 否则就用手动输入的字符串来格式件
    if ( formatStr != undefined ){
        return moment(value).format(formatStr)
    }else {
        // 没有传入个格式化字符串 就用 默认的
        return moment(value).format('YYYY年MM月DD日')
    }
})

// //放大镜 插件
// import ProductZoomer from 'vue-product-zoomer';
// // 注册放大镜组件
// Vue.use(ProductZoomer);

// 导入vuex 整合 Vuex 统一进行数据管理
// import Vuex from 'vuex'
// //注册 vuex
// Vue.use(Vuex);
// //实例化一个仓库用来保存数据
// // 创建store仓库 实例化vue的时候要传入store这个仓库对象
// const store = new Vuex.Store({
//     // state 这里存的是我们的数据
//     state: {
//         // count: 998
//         cartData: JSON.parse(window.localStorage.getItem('goodKey')) || {},
//         // 是否已登录 false 未登录 true 已登录
//         isLogin: false,
//         // 过来时的地址
//         // fromPath: ''
//     },
//     // 这个是暴露的修改方法
//     mutations: {
//         //每次触发数字+1
//         // increment(state,n) {
//         //     state.count += n;
//         // }
//         // 增加购物车数据获取到 id 以及 数量
//         //传入的数据是一个对象 格式 {goodId:商品id,goodNum:商品数量}
//         addGoods(state, goodInfo) {
//             // 保存数据只有用[]中括号对象取值的方法 才可以传入变量 用 .语法 取的是固定的属性只， 取动态的属性值要用[]中括号才能取
//             if ( state.cartData[goodInfo.goodId] == undefined ){
//                 // 传过来的id不存在 就新增这个id作为属性
//                 // 直接增加这个属性即可
//                 // state.cartData[goodInfo.goodId] = goodInfo.goodNum;
//                 // 为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
//                 Vue.set(state.cartData, goodInfo.goodId, goodInfo.goodNum);
//             }else {
//                 // 传过来的id 已经存在 就累加
//                 state.cartData[goodInfo.goodId] += goodInfo.goodNum;
//             }
//         },

//         //增加一个 修改 的方法  逻辑是 直接把传入的 数量 替换掉默认的数量 约定格式 格式为：{goodId:商品id,goodNum:商品数量}
//         updateGoodsNum(state,goodInfo){
//             // 直接替换即可
//             state.cartData[goodInfo.goodId] = goodInfo.goodNum;
//         },

//         // 增加一个 删除 的方法
//         // goodId 就是商品id
//         deleteGood(state,goodId){
//             // 如何删除对象中的属性
//             // delete 删除对象中的属性
//             // delete state.cartData[goodId];
//             // 使用上边的delete删除对象中的属性 可以删除 但是不能触发视图更新(就是页面上的数据删除后不会改变)
//             // 需要调用 Vue.delete方法才可以删除的同时让视图更新
//             Vue.delete(state.cartData,goodId);
//         },

//         // 切换登录状态
//         changeLoginStatus (state,isLogin){
//             state.isLogin = isLogin;
//         },

//         // 增加一个保存 来时地址的方法
//         saveFromPath (state,fromPath){
//             // 在导航守卫中使用提交载荷调用这个函数把路径传过来即可
//             state.fromPath = fromPath;
//         }
//     }, 
    
//     // vuex 中的计算属性是 getters 和vue中的计算属性 computed 用法是一样的 区别就是两个名字不一样而已
//     getters: {
//         goodsCount: state => {
//             // 临时num
//             let num = 0;
//             // 判断是否登录 根据登录状态显示或隐藏购物车数组
//                 //循环数据对象
//                 for ( const key in state.cartData ){
//                     // console.log(key);
//                     //累加数字 得到总数
//                     num += state.cartData[key];
//                 }
            
//             // 返回总数
//             // console.log(num)
//             return num;
//         }
//     }
// });

// 浏览器关闭或者刷新 保存到本地存储
// window.onbeforeunload = function (){
//     window.localStorage.setItem('goodKey',JSON.stringify(store.state.cartData));
// }

// 定义路由规则
// const routes = [
//     //默认打开页面显示的是首页
//     {
//         path: '/',
//         // component: Index //传入组件对象 Index
//         // 解析到 / 直接修改路由地址为 /index   这个叫 重定向 
//         redirect: '/index'
//     },
//     // 首页规则
//     {
//         path: '/index',
//         component: Index //传入组件对象 Index
//     },
//     // 商品详情页规则
//     {
//         path: '/detail/:id',
//         component: detail //传入组件对象 detail
//     },
//     // 购物车页面规则
//     {
//         path: '/cart',
//         component: ShoppingCart, //传入组件对象 ShoppingCart
//         meta:{ checkLogin:true }
//     },
//     // 登录页面规则
//     {
//         path: '/login',
//         component: Login //传入组件对象 login
//     },
//     // 订单详情页面路由
//     {
//       path: '/order/:ids',
//       component: order,
//       meta:{ checkLogin:true }
//     },
//     // 订单支付路由
//     {
//       path: '/payOrder/:orderid',
//       component: PayOrder,
//       // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
//       meta: { checkLogin: true }
//     },
//     // 订单支付成功路由
//     {
//       path: '/paySuccess/:id',
//       component: PaySuccess,
//       // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
//       meta: {
//         checkLogin: true
//       }
//     },
//     // 会员中心路由
//     {
//       path: '/VipCenter',
//       component: VipCenter,
//       // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
//       meta: {
//         checkLogin: true
//       }
//     },
//     // 订单列表路由
//     {
//       path: '/orderList',
//       component: OrderList,
//       // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
//       meta: {
//         checkLogin: true
//       }
//     },
//     // 订单详情路由
//     {
//       path: '/orderDetail/:id',
//       component: OrderDetail,
//       // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
//       meta: {
//         checkLogin: true
//       }
//     },
// ]

//实例化路由对象
// let router = new VueRouter({
//     // 传入路由规则 快速赋值 这个key 是固定的必须写 routes
//     routes
// })

// 增加 导航守卫(路由守卫)  相当于node-express 中的中间件， 所有路由跳转都会进过这里过滤一遍
// router.beforeEach((to, from, next) => {
//     // 每次过来都保存一下来时的地址
//     // 提交载荷 保存数据
//     // store.commit('saveFromPath',from.path);
//     // console.log('to',to);
//     // console.log('from',from);
//     // 必须要执行 否则 不会跳转
//     // next()
//     // 如果访问的是 order 页面 就做登录判断
//     // to.path.indexOf('/order/') != -1  indexOf() 方法 = -1 是没有 =0 是有
//     // if ( to.path.indexOf('/order/') != -1 ){
//     //     // 调用接口
//     //     axios.get('/site/account/islogin').then( response => {
//     //         // 判断是否登录 登录了才能继续访问
//     //         if ( response.data.code != 'nologin' ){
//     //             // 登录了 直接放走即可
//     //             next();
//     //         }else {
//     //             // 没登录 就打回登录页
//     //             next('/login');
//     //         }
//     //     })
//     // }else {
//     //     // 如果要访问的不是order页面就 直接让他访问
//     //     next();
//     // }

//     // 使用 vue-router 路由中的  路由元信息 来做页面跳转判断( 判断哪些页面需要登录才能访问)
//     if ( to.meta.checkLogin ){
//         // 调用接口
//         axios.get('/site/account/islogin').then( response => {
//             // 判断是否登录 登录了才能继续访问
//             if ( response.data.code != 'nologin' ){
//                 // 登录了 直接放走即可
//                 next();
//             }else {
//                 // 没登录 就打回登录页
//                 next('/login');
//             }
//         })
//     }else {
//         next();
//     }
// })


//挂载到 Vue实例上

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    //路由对象
    router,
    // 仓库对象 实行的名字也叫 store es6快速赋值写法
    store,

    // 实例化vue前就做登录状态判断 如果登录就做登录状态保持刷新之后还是登录状态
    // vue实例化前 用 beforeCreate 声明周期函数 他是在vue注册之前触发的
    beforeCreate (){
        // 请求登录接口 获取登录状态还判断是否登录成功 然后修改登录状态 那么刷新后登录状态就能保持不会要重新登录
        this.$axios.get('/site/account/islogin').then( response => {
            // 根据返回数据判断是否登录成功  返回 logined 登录成功
            if ( response.data.code == 'logined' ){
                // 登录成功
                // 修改登录状态 做登录状态保持
                // store.state.isLogin = true;
                // 修改vuex仓库中的状态
                store.commit('changeLoginStatus',true);
            }else {
                // 没有登录 不用做处理  
            }
        })
    }

}).$mount('#app')