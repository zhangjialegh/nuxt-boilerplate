<template>
  <div class="masonry-wrap">
    <div
      class="masonry"
      v-masonry
      origin-left="true"
      transition-duration="1s"
      column-width=".grid-sizer"
      item-selector=".masonry__brick"
    >
      <div class="grid-sizer"></div>
      <article class="masonry__brick entry" :class="{'format-standard': item.cover,'format-quote': !item.cover}" v-for="(item, index) in articles" :key="item.id+''+index">
        <div class="entry__thumb" v-if="item.cover">
          <nuxt-link to="/standard" class="entry__thumb-link">
            <img
              :src="item.cover"
              :alt="item.cover"
            />
          </nuxt-link>
        </div>
        <div class="entry__text" :class="{entry_hover: !item.cover}">
          <div class="entry__header">
            <h2 class="entry__title">
              <a href>{{item.title}}</a>
            </h2>
            <div class="entry__meta">
              <span class="entry__meta-cat">
                <a href v-for="(lab, i) in item.label.split(',').slice(0,2)" :key="lab+i">{{lab}}</a>
              </span>
              <span class="entry__meta-date">
                <a href>{{item.createdAt}}</a>
              </span>
            </div>
          </div>
          <div class="entry__excerpt">
            <p>{{sliceSummary(item.summary, item.cover)}}...</p>
          </div>
        </div>
      </article>
      <!-- <article class="masonry__brick entry format-quote">
        <div class="entry__thumb">
          <blockquote>
            <p>{{item.summary}}</p>
            <cite>{{item.author}}</cite>
          </blockquote>
        </div>
      </article>
      <article class="masonry__brick entry format-link">
        <div class="entry__thumb">
          <div class="link-wrap">
            <h2>Powerful web & Wordpress hosting. Guaranteed. Starting at $2.59/mo!</h2>
          </div>
        </div>
      </article> -->
    </div>
  </div>
</template>

<script>
export default {
  layout: "blog",
  asyncData({ $axios }) {
    return $axios({
      method: "get",
      url: "/api/blogs/list",
      params: {
        page: 1,
        limit: 20
      }
    }).then(res => {
      return {
        articles: res.data
      };
    });
  },
  methods: {
    sliceSummary(content, cover = false) {
      const rand = Math.random() * 50 + (cover ? 50 :100)
      return content.slice(0, rand)
    }
  }
};
</script>
