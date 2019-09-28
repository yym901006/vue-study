<template>
  <div class="hello" @click="saySth2Bro">
    <h1>{{ msg }}</h1>
    <p>{{$attrs.foo}}</p>
    <p>{{xx}}</p>
    <p>{{something}}</p>
    <p>
      <slot></slot>
    </p>
    <p>
      <slot name="content" :xx="xx"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  inject: ["something"],
  props: {
    msg: String
  },
  data() {
    return {
      xx: "x"
    };
  },
  mounted() {
    // 通过共同父组件做中介
    this.$parent.$on("foo", comp => {
      if (comp !== this) {
        console.log("foo~~");
      }
    });
    // setTimeout(() => {
    //   // 父组件派发消息可以在所有兄弟内监听
    //   this.$parent.$emit('foo', this)
    // }, 1000);
  },
  methods: {
    saySth2Bro() {
      // 父组件派发消息可以在所有兄弟内监听
      this.$parent.$emit("foo", this);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
