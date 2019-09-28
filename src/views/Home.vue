<template>
  <div class="home">
    <div>冲啊，手榴弹扔了{{$store.state.count}}个</div>
    <!-- <div>冲啊，手榴弹扔了{{$store.state.a.count}}个</div> -->
    <button @click="add">扔一个</button>
    <button @click="asyncAdd">蓄力扔一个</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    add() {
      this.$store.commit("increment");
      // 即使action执行同步代码返回的结果依然是promise
      // this.$store.dispatch("a/increment").then(result => {
      //   if (!result) {
      //     alert("投掷失败！没货啦");
      //   }
      // });
    },
    asyncAdd() {
      this.$store.dispatch("asyncAdd")
      // this.$store.dispatch("a/asyncIncrement").then(result => {        
      //   if (!result) {
      //     alert("投掷失败！没货啦");
      //   }
      // });
    } 
  }
}
</script>
