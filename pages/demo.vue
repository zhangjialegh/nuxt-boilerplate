<template>
<main class="row content__page">
    <article class="column large-full entry format-standard" v-html="detail.content">
    </article>
</main>
</template>
<script>
export default {
  layout: 'blog',

  asyncData({ $axios, query }) {
    return $axios({
      method: "get",
      url: "/api/blogs/detail",
      params: {
        id: query.id
      }
    }).then(res => {
      return {
        detail: res.data
      };
    });
  }
}
</script>