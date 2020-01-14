<template>
  <div class="homePage">
    <!-- <van-nav-bar fixed title="首页">
     <van-icon
        name="search"
        slot="right"
        class="search"
        @click="$router.push('/search')"/>
    </van-nav-bar> -->
    <div class="nav-bar">
      <van-button
        class="search-btn"
        round
        type="info"
        size="small"
        icon="search"
        @click="$router.push('/search')"
        >搜索</van-button>
    </div>
    <!-- 频道列表组件 -->
    <van-tabs animated
      color="#3196fa"
      :duration="0.6"
      class="nav"
      v-model="active">
      <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
      <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">
        <!-- 文章列表组件 -->
        <article-list :channel="channel"/>
      </van-tab>
    </van-tabs>
    <van-popup
      v-model="isChannelEditShow"
      round
      position="bottom"
      :style="{ height: '90%' }"
      close-icon-position="top-left"
      closeable
    >
      <channels-edit
        :user-channels="userChannels"
        v-model="active"
        @close="isChannelEditShow=false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/API/user'
import ArticleList from './components/articlelist'
import ChannelsEdit from './components/channeledit'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  components: { ArticleList, ChannelsEdit },
  props: {},
  data () {
    return {
      active: 0, // 默认某一个频道被激活的下标，也就是控制激活哪一个频道的标签页
      isChannelEditShow: false, // 弹窗是否打开
      userChannels: []
    }
  },
  methods: {
    async getUserChannels () {
      let channels = []
      const localUserChannels = getItem('user-channels') // 获取本地存储的频道信息
      if (localUserChannels) {
        channels = localUserChannels // 有则使用,没有使用接口的
      } else {
        let res = await getUserChannels()
        channels = res.data.data.channels
      }
      this.userChannels = channels
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
  .nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    height: 46px;
    background-color: #3196fa;
    z-index: 1;
    .search-btn {
      background-color: #5babfb;
      width: 80%;
    }
  }
  .wap-nav {
    position: fixed;
    right: 0;
    background-color: #fff;
    font-size: 24px;
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
