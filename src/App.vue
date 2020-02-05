<template>
  <div id="app">
    <!-- 跟路由出口 -->
    <!-- 组件缓存 -->
    <keep-alive :include="$store.state.cachePage">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      cachePage: ['TabBar']
    }
  }
}
</script>

<style scoped>

</style>>
