<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      console.log("全局校验");
      // 1. 获取校验项
      // Promise 数组
      const tasks = this.$children
        .filter(item => item.prop) // 只留下拥有prop属性的FormItem
        .map(item => item.validate());
      //   2.判断所有输入项全部通过
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>