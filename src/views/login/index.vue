<template>
  <div class="continaer">
    <van-nav-bar
      title="登录"
    />
    <ValidationObserver ref="myForm">
      <ValidationProvider name="手机号" rules="required|mobile">
        <van-field
        v-model="user.mobile"
        label="手机号"
        left-icon="phone-o"
        placeholder="请输入手机号"
        >
        </van-field>
      </ValidationProvider>
      <ValidationProvider  name="验证码" rules="required|code">
        <van-field
        v-model="user.code"
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
      </ValidationProvider>
    </ValidationObserver>
    <div class="btn">
      <van-button type="info" class="login-btn" @click="Login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, sendCode } from '@/API/user'
import { validate } from 'vee-validate'
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
      const { mobile } = this.user // 1：获取手机号
      // 2. 校验手机号是否有效
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 如果验证失败，提示错误消息，停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      // 验证成功发送验证码
      try {
        await sendCode(mobile)
        this.isShow = true// 显示倒计时
      } catch (err) {
        this.isShow = false
        if (err.response.status === 429) {
          this.$toast('不要频繁发送验证码')
          return
        }
        this.$toast('发送失败')
      }
    },
    async Login () {
      // 表单验证
      const success = await this.$refs.myForm.validate()
      if (!success) {
        setTimeout(() => {
          const errors = this.$refs.myForm.errors
          // forEach 无法停止
          // find 方法会遍历数组，对每个元素执行方法中的条件判定
          const item = Object.values(errors).find(item => item[0])
          // 找到第1个有错误的字段并弹出提示
          // for (let key in errors) {
          //   const item = errors[key]
          //   if (item[0]) {
          //     this.$toast(item[0])
          //     return
          //   }
          // }
          this.$toast(item[0])
        }, 100)
        return
      }
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      try {
        let res = await login(this.user)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('/')
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
