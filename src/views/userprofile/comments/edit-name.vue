<template>
 <div class="edit-name">
  <van-nav-bar
      title="编辑昵称"
      right-text="确定"
      @click-right="$emit('confirm',message)"
    />
    <van-field
      class="field"
      :value="name"
      @input="message=$event"
      rows="2"
      autosize
      type="textarea"
      maxlength="20"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      message: ''
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__text{
    color:#fff;
  }
}
.field {
  background: #fff;
  /deep/ .van-cell__value {
    background: #f5f5f5;
    padding: 10px;
  }
}
</style>
