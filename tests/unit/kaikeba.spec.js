import Kaikeba from '@/components/Kaikeba'
import {shallowMount} from '@vue/test-utils'

function add(num1, num2) {
    return num1 + num2
}

// 测试套件 test suite
describe('Kaikeba', () => {
    // 测试用例 test case
    it('测试add函数', () => {
        // 断言 assert
        expect(add(1, 2)).toBe(3)
        expect(add(1, 3)).toBe(4)
        expect(add(-2, 3)).toBe(1)
    })

}) 

describe('Kaikeba.vue',() => {
    //检查选项
    it('要求设置created生命周期', () => {
        expect(typeof Kaikeba.created).toBe('function')
    })
    // 检测message初始值
    it('检测message初始值vue-test', () => {
        expect(typeof Kaikeba.data).toBe('function')

        const msg = Kaikeba.data();
        expect(msg.message).toBe('vue-test')
    })

    it('检测挂载之后data是开课吧', () => {
        const wrapper = shallowMount(Kaikeba)
        
        expect(wrapper.vm.message).toBe('开课吧')
    })

    it('检测点击之后message是按钮点击', () => {
        const wrapper = shallowMount(Kaikeba)
        wrapper.find('button').trigger('click')
        expect(wrapper.vm.message).toBe('按钮点击')
        expect(wrapper.find('span').text()).toBe('按钮点击')
        expect(wrapper.find('span').html()).toBe('<span>按钮点击</span>')
    })
})