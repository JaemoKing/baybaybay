// 导入vue
import Vue from 'vue';

//引入 elementUi 插件
import ElementUI from 'element-ui';
// 注册 ElementUI
Vue.use(ElementUI);
//引入 elementUi 插件 css文件
import 'element-ui/lib/theme-chalk/index.css';

//导入 懒加载 vue-lazy插件
import VueLazyload from 'vue-lazyload';
//注册 vue-lazy懒加载
Vue.use(VueLazyload, {
    preLoad: 1.3,
    //错误
    // error: 'dist/error.png',
    //加载中
    // loading: 'dist/loading.gif', //这个读取不到懒加载图片的路径要用 require
    //图片也要当模块导入
    loading: require('../assets/img/loadingDog.gif'),
    attempt: 1
});

//导入 iview 插件  返回顶部 吸顶效果
import iView from 'iview';
//导入 iview 插件 css文件
import 'iview/dist/styles/iview.css';
// 注册 iview 插件
Vue.use(iView);

//放大镜 插件
import ProductZoomer from 'vue-product-zoomer';
// 注册放大镜组件
Vue.use(ProductZoomer);