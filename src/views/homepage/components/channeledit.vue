<template>
  <div class="channels-edit">
    <van-cell title="我的频道" :border="false">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <van-button
        slot="right-icon"
        size="mini"
        round
        type="danger"
        @click="isEditShow=!isEditShow"
      >{{isEditShow?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel,index) in userChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onUserChannelClick(index)"
      >
        <van-icon
          v-show="isEditShow"
          class="close-icon"
          slot="icon"
          name="close"
        />
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in remainingChannels"
        :key="channel.id"
        :text="channel.name"
        @click="addChannel(channel)"
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
      list: [], // 所有频道
      isEditShow: false // 是否编辑状态
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  methods: {
    onUserChannelClick (index) {
      if (this.isEditShow) { // 判断是编辑状态还是未编辑状态
        this.userChannels.splice(index, 1)
      }
    },
    async onlondChannels () { // 所有频道
      const { data } = await getChannelsList()
      this.list = data.data.channels
    },
    addChannel (channel) { // 点击将推荐频道添加到我的频道列表中
      this.userChannels.push(channel)
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
  /deep/.van-grid-item__content{
      position: relative;
     .van-grid-item__icon-wrapper{
        position: absolute;
        top: -12px;
        right: -5px;
        .close-icon{
          font-size: 18px;
        }
      }
    }
  }
</style>
