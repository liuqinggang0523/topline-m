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
      <van-cell title="性别" :value="userInfo.gender===0?'男':'女'" is-link @click="isGenderShow=true"/>
      <van-cell title="生日" :value="userInfo.birthday" is-link @click="isBirthdayShow=true"/>
    </van-cell-group>
    <!-- 编辑昵称弹窗 -->
    <van-popup
      v-model="isNameShow"
      position="right"
      :style="{ width: '90%', height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
    <edit-name :name="userInfo.name" @confirm='saveName'></edit-name>
    </van-popup>
    <!-- 编辑性别弹窗 -->
    <van-action-sheet
      v-model="isGenderShow"
      :actions="actions"
      cancel-text="取消"
      @select="onGenderSelect" />
      <!-- 编辑出生年月弹窗 -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="isBirthdayShow=false"
        @confirm="onBirthdayconfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, editUserProfile } from '@/API/user'
import EditName from './comments/edit-name'
import moment from 'moment'
export default {
  name: 'UserInfo',
  components: {
    EditName
  },
  data () {
    return {
      userInfo: [],
      isNameShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ],
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  methods: {
    async onload () {
      const { data } = await getUserProfile()
      this.userInfo = data.data
    },
    async saveProfile (field, value) { // 封装一个公用的方法
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '更新中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await editUserProfile({
          [field]: value
        })
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    },
    async saveName (name) {
      await this.saveProfile('name', name)
      this.userInfo.name = name
      this.isNameShow = false
    },
    async onGenderSelect ({ value }) {
      // 请求更新
      await this.saveProfile('gender', value)
      // 更新视图
      this.userInfo.gender = value
      // 关闭上拉菜单
      this.isGenderShow = false
    },
    async onBirthdayconfirm (value) {
      value = moment(value).format('YYYY-MM-DD')
      await this.saveProfile('birthday', value)
      this.userInfo.birthday = value
      this.isBirthdayShow = false
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
