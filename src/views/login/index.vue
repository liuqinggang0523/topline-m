<template>
  <div class="continaer">
    <van-nav-bar
      title="登录"
    />
    <van-cell-group>
      <van-field
      v-model="user.mobile"
      required
      label="手机号"
      left-icon="phone-o"
      placeholder="请输入手机号"
      />
      <van-field
      v-model="user.code"
      required
      label="密码"
      left-icon="envelop-o"
      placeholder="请输入验证码"
      />
    </van-cell-group>
    <div class="btn">
      <van-button type="info" class="login-btn">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
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
