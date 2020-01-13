<template>
  <div>文章详情</div>
</template>

<script>
export default {
  name: 'articlePage',
  props: {
    articleID: {
      type: [String, Number, Object],
      required: true
    }
  }

}
</script>

<style>

</style>
