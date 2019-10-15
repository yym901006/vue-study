<template>
  <div id="app">
    <nav>
      <router-link to="/">
        <svg-icon icon-class="wx"></svg-icon>
        home
      </router-link>
      <router-link to="/about">
        <svg-icon icon-class="qq"></svg-icon>
        about</router-link>
    </nav>
    <router-view></router-view>
    <!-- <KFormTest></KFormTest> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" foo="foo" ref="hw" />
    <HelloWorld>
      <template v-slot:default>abc</template>
      <template v-slot:content="slotProps">content...{{slotProps.xx}}</template> -->
      <!-- <template v-slot:content="{xx}">content...{{xx}}</template> -->
    <!-- </HelloWorld> -->
    <!-- 组件通信 -->
    <!-- <Communicate></Communicate> -->
    <!-- 插槽 -->
    <!-- <SlotTest></SlotTest> -->
    <!-- 递归 -->
    <!-- <Recursion></Recursion> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Communicate from "@/components/communicate";
import SlotTest from "@/components/slots";
import Recursion from "@/components/recursion";
import KFormTest from "@/components/form";

export default {
  name: "app",
  provide() {
    return {
      something: "something"
    };
  },
  components: {
    HelloWorld,
    Communicate,
    SlotTest,
    Recursion,
    KFormTest
  },
  mounted() {
    // this.$refs.hw.xx = "xxx";
    // this.$children[0].xx = "xxxxx";
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
