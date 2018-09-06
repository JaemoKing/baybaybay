// 导入 vue
import Vue from 'vue';

// 导入vuex 整合 Vuex 统一进行数据管理
import Vuex from 'vuex'
//注册 vuex
Vue.use(Vuex);
//实例化一个仓库用来保存数据
// 创建store仓库 实例化vue的时候要传入store这个仓库对象
const store = new Vuex.Store({
    // state 这里存的是我们的数据
    state: {
        // count: 998
        cartData: JSON.parse(window.localStorage.getItem('goodKey')) || {},
        // 是否已登录 false 未登录 true 已登录
        isLogin: false,
        // 过来时的地址
        // fromPath: ''
    },
    // 这个是暴露的修改方法
    mutations: {
        //每次触发数字+1
        // increment(state,n) {
        //     state.count += n;
        // }
        // 增加购物车数据获取到 id 以及 数量
        //传入的数据是一个对象 格式 {goodId:商品id,goodNum:商品数量}
        addGoods(state, goodInfo) {
            // 保存数据只有用[]中括号对象取值的方法 才可以传入变量 用 .语法 取的是固定的属性只， 取动态的属性值要用[]中括号才能取
            if ( state.cartData[goodInfo.goodId] == undefined ){
                // 传过来的id不存在 就新增这个id作为属性
                // 直接增加这个属性即可
                // state.cartData[goodInfo.goodId] = goodInfo.goodNum;
                // 为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
                Vue.set(state.cartData, goodInfo.goodId, goodInfo.goodNum);
            }else {
                // 传过来的id 已经存在 就累加
                state.cartData[goodInfo.goodId] += goodInfo.goodNum;
            }
        },

        //增加一个 修改 的方法  逻辑是 直接把传入的 数量 替换掉默认的数量 约定格式 格式为：{goodId:商品id,goodNum:商品数量}
        updateGoodsNum(state,goodInfo){
            // 直接替换即可
            state.cartData[goodInfo.goodId] = goodInfo.goodNum;
        },

        // 增加一个 删除 的方法
        // goodId 就是商品id
        deleteGood(state,goodId){
            // 如何删除对象中的属性
            // delete 删除对象中的属性
            // delete state.cartData[goodId];
            // 使用上边的delete删除对象中的属性 可以删除 但是不能触发视图更新(就是页面上的数据删除后不会改变)
            // 需要调用 Vue.delete方法才可以删除的同时让视图更新
            Vue.delete(state.cartData,goodId);
        },

        // 切换登录状态
        changeLoginStatus (state,isLogin){
            state.isLogin = isLogin;
        },

        // 增加一个保存 来时地址的方法
        saveFromPath (state,fromPath){
            // 在导航守卫中使用提交载荷调用这个函数把路径传过来即可
            state.fromPath = fromPath;
        }
    }, 
    
    // vuex 中的计算属性是 getters 和vue中的计算属性 computed 用法是一样的 区别就是两个名字不一样而已
    getters: {
        goodsCount: state => {
            // 临时num
            let num = 0;
            // 判断是否登录 根据登录状态显示或隐藏购物车数组
                //循环数据对象
                for ( const key in state.cartData ){
                    // console.log(key);
                    //累加数字 得到总数
                    num += state.cartData[key];
                }
            
            // 返回总数
            // console.log(num)
            return num;
        }
    }
});

// 浏览器关闭或者刷新 保存到本地存储
window.onbeforeunload = function (){
    window.localStorage.setItem('goodKey',JSON.stringify(store.state.cartData));
}

// 把store暴露出去
export default store;