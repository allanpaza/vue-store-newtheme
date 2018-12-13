<template>
  <div id="home">
    <main-slider />
    <service-category />
    <list-product />

    <div class="row mt20">
      <div class="stores-banner col-lg-12 col-xs-12">
        <img src="../assets/stores.png" alt="">
      </div>
    </div>

    <list-store />

  </div>
</template>

<script>
import MainSlider from 'theme/components/MainSlider/MainSlider'
import ServiceCategory from 'theme/components/ServiceCategory'
import ListProduct from 'theme/components/ListProduct'
import ListStore from 'theme/components/ListStore'
export default {
  components: {
    MainSlider,
    ServiceCategory,
    ListProduct,
    ListStore
  }
}
</script>

<style scoped>

</style>
