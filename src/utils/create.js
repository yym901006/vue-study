import Vue from 'vue'

export default function create(Component, props) {
    // 1. 创建Component实例
    const vm = new Vue({
        render(h) {
            // 渲染函数使用
            // h === createElement
            // h(Component) => vdom
            return h(Component, {props})
        }
    }).$mount() // 先渲染不挂载

    // 方式2：Vue.extend() 返回组件构造函数
    // const Ctor = Vue.extend(Component)
    // const comp = new Ctor({propsData: props})    
    // document.body.appendChild(comp.$el)

    // 获取dom
    document.body.appendChild(vm.$el)

    // 2. 挂载
    const comp = vm.$children[0];

    // 3. 销毁
    comp.remove = () => {
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }

    return comp
}