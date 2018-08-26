// 导入vue
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';
//导入App根组件 (最外边的组件)
import App from './App.vue';
//导入首页组件
import Index from './components/index.vue';
//导入商品详情页组件
import detail from './components/productDetail.vue';
//引入 elementUi 插件
import ElementUI from 'element-ui';
//引入 elementUi 插件 css文件
import 'element-ui/lib/theme-chalk/index.css';
//导入 懒加载 vue-lazy插件
import VueLazyload from 'vue-lazyload'
//导入 iview 插件  返回顶部 吸顶效果
import iView from 'iview';
//导入 iview 插件 css文件
import 'iview/dist/styles/iview.css';

//注册VueRouter (类似node的Express中的中间件)
Vue.use(VueRouter);
// 注册 ElementUI
Vue.use(ElementUI);
//注册 vue-lazy懒加载
Vue.use(VueLazyload, {
    preLoad: 1.3,
    //错误
    // error: 'dist/error.png',
    //加载中
    // loading: 'dist/loading.gif', //这个读取不到懒加载图片的路径要用 require
    //图片也要当模块导入
    loading: require('./assets/img/loadingDog.gif'),
    attempt: 1
});

// 注册 iview 插件
Vue.use(iView);

// 因为多个页面都需要用到过滤器 所以就把过滤器写在main.js 中写成全局过滤器 这样项目中的所有文件都可以使用这个过滤器
// 注册 全局过滤器
// 依赖于 moment.js 所以先导入moment.js包
import moment from 'moment';
// 注册
Vue.filter('filterDate', function (value){
    return moment(value).format('YYYY年MM月DD日')
})

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
        component: detail //传入组件对象 Index
    }
]

//实例化路由对象
let router = new VueRouter({
    // 传入路由规则 快速赋值 这个key 是固定的必须写 routes
    routes
})

//挂载到 Vue实例上

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    //路由对象
    router
}).$mount('#app')
