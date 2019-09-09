<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <side-menu></side-menu>
    <div class="main-container">
      <Bread></Bread>
      <Breadcrumb></Breadcrumb>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import SideMenu from '@/components/SideMenu'
import Sidebar from '@/components/Sidebar'
import Bread from '@/components/Bread.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  components: {
    SideMenu,Sidebar,Bread,Breadcrumb
  },
}
</script>