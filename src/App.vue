<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
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

export default {
  name: "app",
  components: {
    HelloWorld,
    Communicate,
    SlotTest,
    Recursion
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
