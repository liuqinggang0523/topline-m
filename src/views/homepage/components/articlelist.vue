<template>
  <div class="article-list">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell
          v-for="(item,index) in list"
          :key="index"
          :title="item.title"
          @click="$router.push('/article/'+item.art_id)">
          <div slot="label">
            <van-grid :border="false" :column-num="3">
              <van-grid-item v-for="(img, index) in item.cover.images" :key="index">
                <van-image height="80" :src="img" />
              </van-grid-item>
            </van-grid>
            <div class="article-info">
              <span>{{ item.aut_name }}</span>
               &nbsp;&nbsp;
              <span>{{ item.comm_count }}评论</span>
               &nbsp;&nbsp;
              <span>{{ item.pubdate |formatDate}}</span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/API/article'
import { formatDate } from '@/utils/date'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      timestamp: null
    }
  },

  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  methods: {
    async onRefresh () { // 下拉刷新
      const { data } = await getArticleList({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      // 如果有最新数据，则把最新数据unshift到文章列表最前面
      const { results } = data.data
      if (results) {
        this.list.unshift(...results)
      }
      this.isLoading = false
      this.$toast(`更新了${results.length}条数据`)
    },
    async onLoad () {
      // 上拉刷新
      // 异步更新数据
      const { data } = await getArticleList({
        channel_id: this.channel.id,
        /**
         * 页面第一次加载使用Date.now(获取最新时间戳)
         * 下一页加载使用本次返回数据中的timestamp
         */
        timestamp: this.timestamp || Date.now(), // 时间戳
        with_top: 1 // 是否置顶
      })
      let res = data.data.results
      this.list.push(...res) // 把请求获取到的数据添加到数组列表中
      this.loading = false // 加载状态结束
      if (res.length) {
        // 判断数据是否加载完毕
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>
</style>
