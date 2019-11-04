<template>
<main class="row content__page">
    <article class="column large-full entry format-standard" v-html="html">
    </article>
</main>
</template>
<script>
export default {
  layout: 'blog',
  computed: {
    html () {
      return this.$store.state.markdown.html
    }
  }
}
</script>