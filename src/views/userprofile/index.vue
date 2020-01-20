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
      <van-cell title="昵称" :value="userInfo.name" is-link @click="isNameShow=true"/>
      <van-cell title="介绍" value="hello world" is-link />
      <van-cell title="性别" :value="userInfo.gender?'男':'女'" is-link />
      <van-cell title="生日" :value="userInfo.birthday" is-link />
    </van-cell-group>
    <!-- 编辑昵称弹窗 -->
    <van-popup
      v-model="isNameShow"
      position="right"
      :style="{ width: '90%', height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
    <edit-name :name="userInfo.name" @confirm='onSave'></edit-name>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, editUserProfile } from '@/API/user'
import EditName from './comments/edit-name'
export default {
  name: 'UserInfo',
  components: {
    EditName
  },
  data () {
    return {
      userInfo: [],
      isNameShow: false
    }
  },
  methods: {
    async onload () {
      const { data } = await getUserProfile()
      this.userInfo = data.data
    },
    async onSave (name) {
      try {
        await editUserProfile({
          name
        })
        this.$toast.success('修改成功')
        this.onload()
        this.isNameShow = false
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  },
  created () {
    this.onload()
  }
}
</script>

<style lang="less" scoped>
  /deep/ .van-icon-cross{
    color:#fff;
  }
  .user-profile{
    .van-icon-arrow-left{
      color: #fff;
    }
  }
</style>
