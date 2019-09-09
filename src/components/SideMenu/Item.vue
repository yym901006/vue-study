<template>
  <li v-if="!model.hidden">
    <div @click="toggle">
      <svg-icon v-if="hasIcon" :icon-class="model.meta.icon"></svg-icon>

      <!-- 标题 -->
      <span v-if="isFolder">
        <span v-if="hasTitle">{{model.meta.title}}</span>
        [{{open ? '-' : '+'}}]
      </span>
      <!-- 如果是叶子节点 -->
      <router-link v-else :to="resolvePath(model.path)">{{model.meta.title}}</router-link>
    </div>

    <!-- 递归子Item -->
    <ul v-if="isFolder" v-show="open">
      <item
        v-for="route in model.children"
        :model="route"
        :key="route.path"
        :base-path="resolvePath(model.path)"
      ></item>
    </ul>
  </li>
</template>

<script>
import path from "path";
export default {
  name: "Item",
  props: {
    model: Object,
    basePath: {
      type: String,
      default: ""
    }
  },
  computed: {
    hasIcon() {
      return this.model.meta && this.model.meta.icon;
    },
    hasTitle() {
      return this.model.meta && this.model.meta.title;
    },
    isFolder() {
      return this.model.children && this.model.children.length;
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>