<template>
  <div class="continaer">
    <van-nav-bar
      title="登录"
    />
      <van-field
      v-model="user.mobile"
      required
      label="手机号"
      left-icon="phone-o"
      placeholder="请输入手机号"
      >
      </van-field>
      <van-field
      v-model="user.code"
      required
      label="密码"
      left-icon="envelop-o"
      placeholder="请输入验证码"
      >
        <van-count-down
        v-if="isShow"
        :time="1000*60"
        format="ss s"
        slot="button"
        @finish="isShow=false"/>
        <van-button slot="button" size="small" type="primary" v-else @click="getCode">发送验证码</van-button>
      </van-field>
    <div class="btn">
      <van-button type="info" class="login-btn" @click="Login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, sendCode } from '@/API/user'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isShow: false // 控制倒计时是否显示
    }
  },
  methods: {
    async getCode () {
      await sendCode()
      this.isShow = true// 点击发送验证码按钮显示倒计时
    },
    async Login () {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      try {
        let res = await login(this.user)
        this.$toast.success('登录成功')
        console.log(res)
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scope>
  .btn{
    padding:20px;
    .login-btn{
      width: 100%;
    }
  }
</style>
