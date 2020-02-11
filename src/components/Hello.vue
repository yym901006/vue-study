<template>
  <div>
    <!-- 新增特性 -->
    <p>
      <input type="text" @keydown.enter="addFeature" />
    </p>
    <!-- ts特性列表 -->
    <ul>
      <li v-for="feature in features" :key="feature">{{feature}}</li>
      <li>特性总数：{{count}}</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Hello extends Vue {
  // 属性就是data
  features: string[] = [];

  // 函数直接作为回调
  addFeature(e: KeyboardEvent) {
    // target类型EventTarget
    const inp = e.target as HTMLInputElement;
    this.features.push(inp.value);
    inp.value = "";
  }

  // 如果和生命周期钩子同名，就是生命周期
  created() {
    this.features = ["类型注解", "编译型语言"];
  }

  // 存取器用于计算属性
  get count() {
    return this.features.length
  }
}
</script>

<style scoped>
</style>