<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="俺也是有底线的"
  @load="onLoad"
  >
 <van-cell
  v-for="(item,index) in list"
  :key="index"
  :title="item.title"
  @click="$router.push({
        name: 'article',
        params: {
          articleId: article.art_id.toString()
        }
      })">
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
      <span>{{ item.pubdate | relativeTime}}</span>
    </div>
  </div>
</van-cell>
  </van-list>
</template>

<script>
import { getUserArctile } from '@/API/user.js'
export default {
  name: 'UserArctile',
  data () {
    return {
      list: [],
      finished: false,
      loading: false,
      page: 1, // 当前页码
      per_page: 10// 每页条数
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getUserArctile({
        page: this.page,
        per_page: this.per_page
      })
      console.log(data)
      this.list.push(...data.data.results)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (data.data.results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
