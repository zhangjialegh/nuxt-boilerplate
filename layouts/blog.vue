<template>
  <div direction="horizontal" class="s-wrap site-wrapper">
    <header class="s-header">
      <div class="header__top">
        <div class="header__logo">
          <a href class="site-logo">
            <img src="/images/logo.svg" alt="Homepage" />
          </a>
        </div>
        <div class="header__search">
          <form role="search" method="get" class="header__search-form" action="#">
            <label>
              <span class="hide-content">Search for:</span>
              <input
                type="search"
                class="header__search-field"
                placeholder="Type Keywords"
                value
                name="s"
                title="Search for:"
                autocomplete="off"
              />
            </label>
            <input type="submit" class="header__search-submit" value="Search" />
          </form>

          <a href="#0" title="Close Search" class="header__search-close">Close</a>
        </div>
        <a href="#0" class="header__search-trigger"></a>
        <a href="#0" class="header__menu-toggle">
          <span>Menu</span>
        </a>
      </div>
      <nav class="header__nav-wrap">
        <ul class="header__nav">
          <li class="current">
            <a href="index.html" title>Home</a>
          </li>
          <li class="has-children">
            <a href="#0" title>Categories</a>
            <ul class="sub-menu">
              <li>
                <a href="category.html">Lifestyle</a>
              </li>
              <li>
                <a href="category.html">Health</a>
              </li>
              <li>
                <a href="category.html">Family</a>
              </li>
              <li>
                <a href="category.html">Management</a>
              </li>
              <li>
                <a href="category.html">Travel</a>
              </li>
              <li>
                <a href="category.html">Work</a>
              </li>
            </ul>
          </li>
          <li class="has-children">
            <a href="#0" title>Blog Posts</a>
            <ul class="sub-menu">
              <li>
                <a href="single-video.html">Video Post</a>
              </li>
              <li>
                <a href="single-audio.html">Audio Post</a>
              </li>
              <li>
                <a href="single-gallery.html">Gallery Post</a>
              </li>
              <li>
                <a href="single-standard.html">Standard Post</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="styles.html" title>Styles</a>
          </li>
          <li>
            <a href="page-about.html" title>About</a>
          </li>
          <li>
            <a href="page-contact.html" title>Contact</a>
          </li>
        </ul>
        <!-- end header__nav -->

        <ul class="header__social">
          <li class="ss-facebook">
            <a href="https://facebook.com/">
              <span class="screen-reader-text">Facebook</span>
            </a>
          </li>
          <li class="ss-twitter">
            <a href="#0">
              <span class="screen-reader-text">Twitter</span>
            </a>
          </li>
          <li class="ss-dribbble">
            <a href="#0">
              <span class="screen-reader-text">Dribbble</span>
            </a>
          </li>
          <li class="ss-pinterest">
            <a href="#0">
              <span class="screen-reader-text">Behance</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <div class="s-content">
      <nuxt />
    </div>
    <footer class="s-footer">
      <div class="row">
        <div class="column large-full footer__content">
          <div class="footer__copyright">
            <span>
              © Copyright Typerite 2019 - More Templates
              <a href="http://www.cssmoban.com/" target="_blank" title="模板之家">模板之家</a> - Collect from
              <a href="http://www.cssmoban.com/" title="网页模板" target="_blank">网页模板</a>
            </span>
            <span>Design by styleshout</span>
          </div>
        </div>
      </div>
      <back-to-top/>
    </footer>
  </div>
</template>
<script>
import BackToTop from '@/components/BackToTop'
export default {
  components: {BackToTop}
};
</script>
<style>
*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
}
</style>
