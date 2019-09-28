let Vue;

// 声明Router类
export default class KVueRouter {
    // 1. 解析route配置，生成map
    constructor(options) {
        this.$options = options;
        this.routeMap = {};

        // url响应化处理：只要url变化，用到url的组件就会重新render
        // vue-router跟Vue强耦合，只能用于vue
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }

    // 声明初始化函数
    init() {
        // 1. 事件监听
        this.bindEvents();

        // 2. 路由映射操作
        this.createRouteMap();

        // 3. 组件声明和注册
        this.initComponent();
    }

    // 做路由映射
    createRouteMap(){
        this.$options.routes.forEach(item => {
            this.routeMap[item.path] = item;
        })
    }

    // 监听hashchange
    bindEvents(){
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))
    }

    onHashChange() {
        // #/index
        this.app.current = window.location.hash.slice(1) || '/'
    }
    
    initComponent(){
        // router-link
        // <router-link to="/">abc</router-link>
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                // return <a href={this.to}>{this.$slots.default}</a>
                // h(tag, data, children)
                // this是组件实例
                return h('a', {attrs: {href: '#'+this.to}}, [this.$slots.default])
            }
        })
        // router-view
        Vue.component('router-view', {
            render: (h) => {
                // 拿出要渲染的组件
                // this希望是Router实例
                const component = this.routeMap[this.app.current].component;
                return h(component)
            }
        })
    }

}

// 实现插件
// 插件接收Vue构造函数
KVueRouter.install = function (_Vue) {
    Vue = _Vue; // 保存Vue构造函数，就可以方便使用了
    // console.log(this);
    
    // 混入：执行挂载操作
    Vue.mixin({
        beforeCreate() {
            // 只有根组件执行一次
            if (this.$options.router) {
                // 这里this是vue实例
                Vue.prototype.$router = this.$options.router;
                // 执行初始化
                this.$options.router.init();
            }
        }
    })
}