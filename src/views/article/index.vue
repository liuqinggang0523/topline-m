<template>
  <div class="article-container">
    <van-nav-bar fixed @click-left="$router.back()" left-arrow title="文章详情">
      <van-icon name="ellipsis" slot="right" />
    </van-nav-bar>
        <!-- 加载中 -->
    <van-loading
      class="loading"
      color="#1989fa"
      vertical
      v-if="loading"
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{article.aut_name}}</p>
            <p class="time">{{article.pubdate | relativeTime}}</p>
          </div>
        </div>
        <van-button
          v-if="!$store.state.user||article.aut_id!==$store.state.user.id"
          class="follow-btn"
          :type="article.is_followed ? 'default' : 'info'"
          size="small"
          round
          @click="OnFollowing"
          :loading="isFollowLoading"
        >{{article.is_followed?'已关注':'+关注'}}</van-button>
      </div>
      <div class="markdown-body content" v-html="article.content"></div>
       <van-divider>正文结束</van-divider>
      <!-- 文章评论 -->
      <van-cell title="全部评论" :border="false" />
      <van-list
        v-model="comments.loading"
        :finished="comments.finished"
        finished-text="没有更多了"
        @load="onLoad">
        <comment-list
          v-for="(comment,index) in comments.list"
          :key="index"
          :comment="comment"></comment-list>
      </van-list>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
         @click="loadArticle"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow=true"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="chat-o"
        :info="comments.totalCount"
      />
      <van-icon
        color="orange"
        :name="article.is_collected?'star':'star-o'"
        @click="OnCollect"
      />
      <van-icon
        color="#e5645f"
        :name="article.attitude===-1? 'good-job-o':'good-job'"
        @click="OnAttitude"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
     <!-- 发布文章评论 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <div class="post-comment">
        <van-field
          class="post-field"
          v-model="postMessage"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <van-button size="small" type="primary" @click="addComment">发布</van-button>
      </div>
    </van-popup>
    <!-- /发布文章评论 -->
  </div>
</template>

<script>
import { getArticle, addCollect, deleteCollect, addLiking, deleteLiking } from '@/API/article'
import { addFollowing, deleteFollowing } from '@/API/user'
import { getComments, addComment } from '@/API/comment'
import CommentList from './components/commentlist'
export default {
  name: 'articlePage',
  props: {
    articleID: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    CommentList
  },
  data () {
    return {
      isPostShow: false, // 控制评论弹窗
      postMessage: '',
      loading: false,
      article: { },
      isFollowLoading: false, // 关注按钮的 loading 状态
      comments: {
        list: [],
        loading: false,
        finished: false,
        offset: null, // 请求下一页数据的页码
        totalCount: 0 // 总数据条数
      }
    }
  },
  methods: {
    async addComment () { // 发布评论
      if (!postMessage) {
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await addComment({
          target: this.articleID,
          content: this.postMessage
        })
        this.comments.list.unshift(data.data.new_obj)
        this.$toast.success('评论成功')
        this.comments.totalCount++
        this.isPostShow = false
        this.postMessage = ''
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    async OnFollowing () { // 关注操作
      this.isFollowLoading = true
      try {
        if (this.article.is_followed) {
          await deleteFollowing(this.article.aut_id)
          this.article.is_followed = false
          this.$toast.success('取消成功')
        } else {
          await addFollowing(this.article.aut_id)
          this.article.is_followed = true
          this.$toast.success('关注成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.isFollowLoading = false
    },
    async OnAttitude () { // 点赞操作
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.article.attitude === 1) {
          await deleteLiking(this.articleID)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          await addLiking(this.articleID)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    async OnCollect () {
      this.$toast.loading({
        duration: 0,
        message: '操作中...',
        forbidClick: true
      })
      try {
        if (this.article.is_collected) {
          await deleteCollect(this.articleID)
          this.article.is_collected = false
          this.$toast.success('已取消收藏')
        } else {
          await addCollect(this.articleID)
          this.article.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    async loadArticle () { // 文章详情
      this.loading = true
      const res = await getArticle(this.articleID)
      this.article = res.data.data
      this.loading = false
    },
    async onLoad () {
    // 异步更新数据
      const { data } = await getComments({
        type: 'a',
        source: this.articleID,
        offset: this.comments.offset,
        limit: 10
      })
      const { results } = data.data
      this.comments.list.push(...results)
      this.comments.totalCount = data.data.total_count
      // 加载状态结束
      this.comments.loading = false
      // 数据全部加载完成
      if (results.length) {
        this.comments.offset = data.data.last_id // 更新获取下一页数据的页码
      } else {
        this.comments.finished = true // 没有数据了，关闭加载更多
      }
    }
  },
  created () {
    this.loadArticle()
  }
}
</script>

<style lang="less" scoped>
@import "./github-markdown.css";
.article-container {
  padding: 46px 0 45px;
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  .van-icon {
    color: #fff;
  }
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
      background-color: #fff;
    .title {
      padding: 0 20px;
      padding-top: 24px;
      margin: 0;
      font-size: 20px;
      color: #3A3A3A;
    }
    .content {
      padding: 0 20px;
    }
    .author-wrap {
      padding: 20px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 5px;
        }
        .text {
          .name {
            margin: 0;
            font-size: 12px;
          }
          .time {
            margin: 0;
            font-size: 10px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
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
    .comment-icon {
      bottom: -2px;
      color:#999;
    }
    .share-icon {
      bottom: -2px;
      color: #3A3A3A;
    }
  }
  .post-comment {
    display: flex;
    align-items: flex-end;
    padding: 10px;
    .post-field {
      background: #f5f7f9;
      margin-right: 15px;
    }
  }
}
</style>
