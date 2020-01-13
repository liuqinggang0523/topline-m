<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        shape="round"
        background="#3296fa"
        show-action
        @search="onSearch"
        @cancel="onCancel=$router.back()"
        @input="onlondSuggestion"
        @focus="isResultsShow=false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultsShow" :q="searchText"/>
    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell
        icon="search"
        v-for="item in suggestion"
        :key="item"
        >
        <span slot="title" v-html="highlight(item)"></span>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon name="delete" />
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestion } from '@/API/search'
export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索框内容
      isResultsShow: false, // 搜索结果显示状态
      suggestion: []// 搜索联想列表
    }
  },
  methods: {
    highlight (str) {
      return str.toLowerCase().replace(this.searchText.toLowerCase(), `<span style="color:red">${this.searchText}</span>`)
    },
    onSearch () {
      this.isResultsShow = true
    },
    onCancel () {

    },
    async onlondSuggestion () {
      if (!this.searchText) {
        return
      }
      const { data } = await getSuggestion(this.searchText)
      this.suggestion = data.data.options
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 54px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
