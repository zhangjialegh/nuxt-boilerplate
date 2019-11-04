<template>
  <div class="mavonEditor">
    <no-ssr>
      <mavon-editor :toolbars="markdownOption" v-model="handbook"/>
    </no-ssr>
    <nuxt-link to="/demo">预览</nuxt-link>
    <button @click="upload">发布</button>
  </div>
</template>
<script>
import marked from 'marked'
export default {
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
      },
      handbook: "#### how to use mavonEditor in nuxt.js"
    };
  },
  watch: {
    handbook (nv) {
      console.log(marked(nv))
      this.$store.commit('markdown/changeHtml', marked(nv))
    }
  },
  methods: {
    upload () {
      this.$axios({
        method: 'post',
        url: '/api/blogs/insert',
        data: {
          author: 'zjl',
          label: 'js',
          content: JSON.stringify(marked(this.handbook))
        }
      }).then(res => {
        console.log(res, 'res')
      })
    }
  }
};
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>