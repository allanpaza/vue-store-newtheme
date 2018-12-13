<template>
  <footer class="row footer mt20 middle-lg middle-xs center-xs center-lg">
    <div class="col-lg-4 col-xs-12">
      <div class="box">Footer</div>
    </div>
    <div class="col-lg-4 col-xs-12">
      <div class="box">Footer</div>
    </div>
    <div class="col-lg-4 col-xs-12">
      <div class="box">Footer</div>
    </div>
  </footer>
</template>

<script>
import Footer from '@vue-storefront/core/components/blocks/Footer/Footer'
import CurrentPage from 'theme/mixins/currentPage'
export default {
  mixins: [Footer, CurrentPage],
  components: {
  }
}
</script>

<style lang="scss">
@import '~theme/css/abstracts/colors';
@import '~theme/css/abstracts/functions/color';
$color-white: color(white);
$theme-primary: color(primary, $colors-theme);
.footer {
  height: 100px;
  color: $color-white;
  background-color: $theme-primary;
}
</style>
