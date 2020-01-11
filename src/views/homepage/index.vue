<template>
  <div class="homePage">
    <van-nav-bar/>
    <!-- 频道列表组件 -->
    <van-tabs animated color="#3196fa" :duration="0.6" class="nav">
      <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">
        <!-- 文章列表组件 -->
        <ArticleList :channel="channel"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/API/user'
import ArticleList from './components/articlelist'
export default {
  name: 'HomePage',
  components: { ArticleList },
  props: {},
  data () {
    return {
      userChannels: []
    }
  },
  methods: {
    async getUserChannels () {
      let res = await getUserChannels()
      this.userChannels = res.data.data.channels
    }
  },
  created () {
    this.getUserChannels()
  }
}
</script>

<style lang="less" scoped>
// .homePage {
//   padding-top: 90px;
//   padding-bottom: 50px;
//   .nav {
//     position: fixed;
//     top: 46px;
//     left: 0;
//     right: 0;
//     z-index: 1;
//   }
// }
</style>
