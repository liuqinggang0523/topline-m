<template>
  <div class="channels-edit">
    <van-cell title="我的频道" :border="false">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <van-button slot="right-icon" size="mini" round type="danger">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in userChannels"
        :key="channel.id"
        :text="channel.name"
      />
    </van-grid>
    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in remainingChannels"
        :key="channel.id"
        :text="channel.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannelsList } from '@/API/channels'
export default {
  name: 'ChannelsEdit',
  data () {
    return {
      list: []
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  methods: {
    async onlondChannels () {
      const { data } = await getChannelsList()
      this.list = data.data.channels
      console.log(this.list)
    }
  },
  computed: {
    remainingChannels () {
      const channels = []
      this.list.forEach(item => {
        if (!this.userChannels.find(element => element.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  created () {
    this.onlondChannels()
  }
}
</script>

<style lang="less" scoped>
  .channels-edit{
    padding: 40px 0;
  }
</style>
