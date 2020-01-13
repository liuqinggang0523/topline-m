<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        shape="round"
        background="#3296fa"
        show-action
        @search="onSearch(searchText)"
        @cancel="onCancel=$router.back()"
        @input="OnlondSuggestion"
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
        @click="onSearch(item)"
        >
        <span slot="title" v-html="highlight(item)"></span>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isDeleteShow">
          <span @click="searchHistories=[]">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow=false">完成</span>
        </template>
        <van-icon name="delete" v-else @click="isDeleteShow=true"/>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item,index) in searchHistories"
        :key="index"
        @click="onSearch(item)">
        <van-icon name="close"
          @click="searchHistories.splice(index,1)"
          v-show="isDeleteShow">
        </van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestion } from '@/API/search'
import { setItem, getItem } from '@/utils/storage'
import { debounce } from 'lodash'
export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索框内容
      isResultsShow: false, // 搜索结果显示状态
      suggestion: [], // 搜索联想列表,
      isDeleteShow: false,
      searchHistories: getItem('searc-histories') || []
    }
  },
  watch: {
    searchHistories (newValue) {
      setItem('searc-histories', newValue)
    }
  },
  methods: {
    highlight (str) {
      return str.toLowerCase().replace(this.searchText.toLowerCase(), `<span style="color:#3196fa">${this.searchText}</span>`)
    },
    onSearch (q) {
      /**
       * q:文本框数据本身,联想建议文本,或者历史记录文本
       * 修改搜索框文本内容
       */
      this.searchText = q
      const index = this.searchHistories.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.searchText)
      // 记录搜索记录
      this.isResultsShow = true
    },
    onCancel () {

    },
    OnlondSuggestion: debounce(async function () {
      if (!this.searchText) {
        return
      }
      const { data } = await getSuggestion(this.searchText)
      this.suggestion = data.data.options
    }, 500)
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
