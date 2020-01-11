<template>
  <div class="homePage">
    <van-nav-bar fixed title="首页" />
    <!-- 频道列表组件 -->
    <van-tabs animated color="#3196fa" :duration="0.6" class="nav">
      <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
      <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">
        <!-- 文章列表组件 -->
        <article-list :channel="channel" />
      </van-tab>
    </van-tabs>
    <van-popup v-model="isChannelEditShow"
      round
      position="bottom"
      :style="{ height: '90%' }"
      close-icon-position="top-left"
      closeable
    >
    <channels-edit :user-channels="userChannels"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/API/user'
import ArticleList from './components/articlelist'
import ChannelsEdit from './components/channeledit'
export default {
  name: 'HomePage',
  components: { ArticleList,
    ChannelsEdit },
  props: {},
  data () {
    return {
      isChannelEditShow: false, // 弹窗是否打开
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
.homePage {
  padding-top: 90px;
  padding-bottom: 100px;
  .wap-nav{
    position: fixed;
    right: 0;
    background-color: #fff;
    font-size:24px;
    line-height: 44px;
  }
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
