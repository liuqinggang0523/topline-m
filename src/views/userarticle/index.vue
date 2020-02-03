<template>
  <div class="page">
    <van-nav-bar
      title="收藏/历史/作品"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <van-tabs v-model="active" color="#3196fa">
      <van-tab title="我的收藏">
        <collect-article/>
      </van-tab>
      <van-tab title="浏览历史">
        <history-article/>
      </van-tab>
      <van-tab title="我的作品">
        <user-article></user-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserArticle from './components/myarticle'
import CollectArticle from './components/article-collect'
import HistoryArticle from './components/article-history'
export default {
  name: 'MyArticle',
  components: {
    UserArticle,
    CollectArticle,
    HistoryArticle
  },
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" socped>
 .page{
   padding-top:90px;
    .van-nav-bar .van-icon{
    color: #fff;
  }
  .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
 }
</style>
