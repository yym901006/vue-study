<template>
  <div class="app-wrapper">
    <!-- 导航菜单 -->
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <Bread></Bread>
      <Breadcrumb></Breadcrumb>
      <router-view />
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar'
import Bread from '@/components/Bread'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Sidebar,Bread,Breadcrumb
  },
}
</script>