<template>
  <div class="container">
    <div class="row middle-lg center-lg middle-xs center-xs">
      <div class="col-lg-4" v-for="index in 3" :key="index">
        <div class="store-card mt20">
          <div class="store-image relative bg-cl-secondary">
            <img src="../assets/store.png" height="195" width="195">
          </div>
          <div class="store-card__name">
            <p>Store Name</p>
          </div>
          <div class="row m5">
            <div class="col-lg-4 col-xs-4">
              <img src="../assets/product.jpg" height="70" width="70">
            </div>
            <div class="col-lg-4 col-xs-4">
              <img src="../assets/product.jpg" height="70" width="70">
            </div>
            <div class="col-lg-4 col-xs-4">
              <img src="../assets/product.jpg" height="70" width="70">
            </div>
          </div>
          <div class="store-card__description">
            <p>Distance: 2.7km</p>
          </div>
          <div class="store-card__description--shop-now">
            <p>shop now!</p>
          </div>
          <div class="store-card__icon">
            <i class="material-icons">
              style
            </i>
          </div>
        </div>
      </div>
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
@import '~theme/css/base/animations';
@import '~theme/css/abstracts/mixins/display-icon';

$bg-secondary: color(secondary, $colors-background);
$border-secondary: color(secondary, $colors-border);
$color-white: color(white);
$theme-primary: color(primary, $colors-theme);
$theme-tertiary: color(tertiary, $colors-theme);

.store-card {
  position: relative;
  font-size: 24px;
  font-weight: 600;
  background-color: $bg-secondary;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);

  &__description {
    color: $theme-primary;
    padding: 10px 0;
    transition: 0.7s;
    p {
      margin: 0;
    }
    &--shop-now {
      text-transform: uppercase;
      display: none;
      padding: 10px 0;
      color: $theme-primary;
      background-color: $theme-tertiary;
      p {
        margin: 0;
      }
    }
  }

  &__name {
    padding: 10px 0;
    background-color: $theme-primary;
    color: $color-white;
    text-transform: uppercase;
    p {
      margin: 0;
    }
  }

  &__icon {
    @include addIcon($theme-primary);
  }

  &:hover {
    .store-card__name{
      color: $theme-primary;
      background-color: $theme-tertiary;
    }
    .store-card__description--shop-now {
      display: block;
    }
    .store-card__description {
      display: none;
    }
    .store-card__icon {
      opacity: 1;
    }
  }
}

.store-image {
  width: 100%;
  overflow: hidden;
  max-height: 300px;

  &:hover {
    img {
      opacity: 1;
      transform: scale(1.1);
    }

    &.sale::after,
    &.new::after {
      opacity: 0.8;
    }
  }

  img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    mix-blend-mode: darken;
    opacity: 0.8;
    transform: scale(1);
    transition: 0.3s opacity $motion-main, 0.3s transform $motion-main;

    &[lazy="loaded"] {
      animation: stores-loaded;
      animation-duration: 0.3s;
    }

    @keyframes stores-loaded {
      from {
        opacity: 0;
      }

      to {
        opacity: 0.8;
      }
    }
  }

  &.sale {
    &::after {
      @extend %label;
      content: 'Sale';
    }
  }

  &.new {
    &::after {
      @extend %label;
      content: 'New';
    }
  }
}

%label {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: $bg-secondary;
  text-transform: uppercase;
  color: $color-white;
  font-size: 12px;
}
</style>
