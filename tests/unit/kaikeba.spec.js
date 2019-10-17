import {mount} from '@vue/test-utils'
import Kaikeba from '@/components/Kaikeba'

describe('测试Kaikeba组件', () => {
    it('mount之后测试data是开课吧', () => {
        const wrapper = mount(Kaikeba)
        expect(wrapper.find('span').text()).toBe('开课吧')
       
    })

    it('按钮点击之后', () => {
        const wrapper = mount(Kaikeba)
        wrapper.find('button').trigger('click')
        expect(wrapper.vm.message).toBe('按钮点击')
        expect(wrapper.find('span').html()).toBe('<span>按钮点击</span>')
       
    })
})