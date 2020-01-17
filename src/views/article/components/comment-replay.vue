<template>
   <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title='`${comment.reply_count}条回复`'></van-nav-bar>
    <!-- /导航栏 -->
    <!-- 当前评论项 -->
    <comment-list :comment="comment" />
    <!-- /当前评论项 -->
    <van-divider>所有回复</van-divider>
    <!-- 评论的回复列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="俺也是有底线的"
        @load="onLoad"
      >
        <comment-list
          :comment="item"
          v-for="(item,index) in list"
          :key="index" />
      </van-list>
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
     <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow=true"
      >写评论</van-button>
      <van-icon
        color="#e5645f"
        name="good-job"
      />
    </div>
    <!-- /底部 -->
      <!-- 发布回复 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <!--
        value
        input
       -->
      <reply-comment
        v-model="postMessage"
        @click-post="onPost"
      />
    </van-popup>
    <!-- /发布回复 -->
  </div>
</template>

<script>
import CommentList from './commentlist'
import { getComments, addComment } from '@/API/comment'
import ReplyComment from './reply-comment'
export default {
  components: {
    CommentList,
    ReplyComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleID: {
      type: [Object, String, Number],
      required: true
    }
  },
  data () {
    return {
      postMessage: '',
      isPostShow: false,
      list: [],
      loading: false,
      offset: null,
      finished: false
    }
  },
  methods: {
    async onPost () {
      const postMessage = this.postMessage
      // 非空校验
      if (!postMessage) {
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        // 2. 请求提交
        const { data } = await addComment({
          target: this.comment.com_id.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: postMessage, // 评论内容
          art_id: this.articleID.toString() // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        // 关闭发布评论的弹层
        this.isPostShow = false
        // 将最新发布的评论展示到列表的顶部
        this.list.unshift(data.data.new_obj)
        // 更新文章评论的回复总数量
        this.comment.reply_count++
        // 清空文本框
        this.postMessage = ''
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    },
    async onLoad () {
      // 异步更新数据
      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset,
        limit: 10
      })
      const { results } = data.data

      this.list.push(...results)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
 .comment-reply{
   padding-bottom: 44px;
 }
 .footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .write-btn {
    width: 160px;
  }
  .van-icon {
    font-size: 20px;
  }
}
</style>
