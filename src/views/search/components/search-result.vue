<template>
  <div class="search-results">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>
<script>
import { getSearchResults } from '@/API/search'
export default {
  name: 'SearchResult',
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      // 获取数据
      const { data } = await getSearchResults({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      const { results } = data.data
      this.list.push(...results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
