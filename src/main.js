// 导入vue
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';
//导入App根组件 (最外边的组件)
import App from './App.vue';
//导入首页组件
import Index from './components/index.vue';
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
