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
      />
    </form>
    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell icon="search" title="单元格" />
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell title="历史记录">
      <van-icon name="delete" />
      <span>全部删除</span>
      &nbsp;&nbsp;
      <span>完成</span>
    </van-cell>
    <van-cell-group>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- 下拉列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item"
        :title="item"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'searchPage',
  data () {
    return {
      searchText: '', // 搜索框内容
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onSearch () {

    },
    onCancel () {

    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
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
