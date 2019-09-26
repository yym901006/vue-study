<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <!-- 错误信息 -->
        <p v-if="error">{{error}}</p>
    </div>
</template>

<script>
    import Schema from 'async-validator'

    export default {
        inject: ['form'],
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String
            }
        },
        data() {
            return {
                error: ''
            }
        },
        mounted () {
            this.$on('validate', () => {
                this.validate()
            });
        },
        methods: {
            validate() {
                // 做校验
                // 1.获取数值和规则
                const value = this.form.model[this.prop]
                const rule = this.form.rules[this.prop]
                // 2.创建校验规则
                const schema = new Schema({[this.prop]: rule})
                // 校验返回Promise
                return schema.validate({[this.prop]: value}, errors => {
                    if (errors) {
                        // 有错
                        this.error = errors[0].message;
                    } else {
                        this.error = ''
                    }
                })
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>