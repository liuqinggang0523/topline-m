<template>
  <div class="homePage">
    <van-nav-bar />
    <van-tabs animated color="#3196fa" :duration="0.6">
      <van-tab :title="item.name" v-for="item in userChannels" :key="item.id">{{item.name}}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/API/user'
export default {
  data () {
    return {
      userChannels: []
    }
  },
  methods: {
    async getUserChannels () {
      let res = await getUserChannels()
      console.log(res)
      this.userChannels = res.data.data.channels
    }
  },
  created () {
    this.getUserChannels()
  }
}
</script>

<style>
</style>
