<template>
  <nav class="layout-footer footer" :class="getLayoutFooterBg()">
    <div class="container-fluid d-flex flex-wrap justify-content-between text-center container-p-x pb-3">
      <!-- <div class="pt-3">
        <span class="footer-text font-weight-bolder">Treenear</span> © {{ momentYear() }} All rights reserved.
      </div>
      <div>
        <a href="http://treenear.com" target="_blank" class="footer-link pt-3">About Us</a>
        <a href="http://treenear.com" target="_blank" class="footer-link pt-3 ml-4">Help</a>
        <a href="http://treenear.com" target="_blank" class="footer-link pt-3 ml-4">Contact</a>
        <a href="http://treenear.com" target="_blank" class="footer-link pt-3 ml-4">Terms &amp; Conditions</a>
      </div> -->
    </div>
  </nav>
</template>

<script>

export default {
  name: 'app-layout-footer',

  methods: {
    getLayoutFooterBg () {
      return `bg-${this.layoutFooterBg}`
    }
    
  }
}
</script>
