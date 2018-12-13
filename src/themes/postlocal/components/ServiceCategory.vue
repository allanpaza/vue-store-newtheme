<template>
  <div class="row categories middle-lg center-lg middle-xs center-xs">
    <div class="categories__item col-lg-2 col-xs-4" v-for="index in 6" :key="index">
      <i class="material-icons">
        dehaze
      </i>
      <div class="box">category {{ index }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss">
@import '~theme/css/abstracts/colors';
@import '~theme/css/abstracts/functions/color';
$color-white: color(white);
$theme-primary: color(primary, $colors-theme);
$theme-tertiary: color(tertiary, $colors-theme);

.categories {
  background-color: $theme-primary;
  &__item {
    padding: 20px;
    color: $color-white;
    transition: 0.3s;
  }
  &__item:hover {
    background-image: url(../assets/frontstore.jpg);
    background-size: cover;
    background-position: center;
    opacity: 0.5;
  }
  &__item:hover .box{
    opacity: 1;
  }
}
</style>
