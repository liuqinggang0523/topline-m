<template>
  <div class="user-profile">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
          width="30"
          height="30"
          round
          :src="userInfo.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="userInfo.name" is-link />
      <van-cell title="介绍" value="hello world" is-link />
      <van-cell title="性别" :value="userInfo.gender?'男':'女'" is-link />
      <van-cell title="生日" :value="userInfo.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile } from '@/API/user'
export default {
  name: 'UserInfo',
  data () {
    return {
      userInfo: []
    }
  },
  methods: {
    async onload () {
      const { data } = await getUserProfile()
      console.log(data)
      this.userInfo = data.data
    }
  },
  created () {
    this.onload()
  }
}
</script>

<style lang="less" scoped>
  .user-profile{
    .van-icon-arrow-left{
      color: #fff;
    }
  }
</style>
