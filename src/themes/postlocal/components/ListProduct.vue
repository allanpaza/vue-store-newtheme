<template>
  <div class="container">
    <div class="row middle-lg center-lg" v-for="index in 2" :key="index">
      <div class="col-lg-3" v-for="index in 4" :key="index">
        <router-link :to="localizedRoute('/p/MS08/strike-endurance-tee-627/MS08')">
          <div class="box product-card mt20 start-lg start-xs">
            <div class="product-image relative bg-cl-secondary">
              <img src="../assets/product.jpg" height="224" width="224">
              <div class="product-card__store-name center-lg center-xs">
                <p>store name</p>
              </div>
            </div>
            <div class="product-card__description">
              <p class="product-card__description--price">€199.99</p>
              <p class="product-card__description--distance">Distance 1.9km</p>
              <p class="product-card__description--text">Lorem ipsum dolor sit amet, nec ut eripuit nonumes, ius eros vocibus appellantur ei. Cu nec saepe epicuri, graecis nusquam fastidii usu ut, quaestio voluptatibus has ut. Ex novum tantas torquatos sea. Usu munere similique efficiendi no.</p>
            </div>
            <div class="product-card__icon">
              <i class="material-icons">
                favorite
              </i>
            </div>
          </div>
        </router-link>
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
@import '~theme/css/abstracts/mixins/display-text';
@import '~theme/css/abstracts/mixins/display-icon';
$bg-secondary: color(secondary, $colors-background);
$border-secondary: color(secondary, $colors-border);
$color-white: color(white);
$color-black: color(black);
$theme-primary: color(primary, $colors-theme);
$theme-tertiary: color(tertiary, $colors-theme);

.product-card {
  position: relative;
  background-color: $color-white;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
  &__description {
    height: 55px;
    min-height: 55px;
    color: $color-black;
    padding-left: 10px;
    transition: 0.7s;

    @media (max-width: 767px) {
      height: 85px;
      min-height: 85px;
    }

    &--distance {
      font-size: 12px;
      color: $theme-primary;
    }
    &--price {
      font-size: 24px;
      font-weight: 600;
      text-transform: uppercase;
    }
    &--text {
      font-size: 14px;
      font-weight: 300;
      opacity: 0;
      transition: 0.6s;

      @include multiLineEllipsis($lineHeight: 1em, $lineCount: 2);

      @media (max-width: 767px) {
        opacity: 1;
      }
    }
    &--name {
      font-size: 14px;
      font-weight: 300;
      opacity: 0;
      transition: 0.6s;

      @media (max-width: 767px) {
        opacity: 1;
      }
    }
    p {
      margin: 3px 0 0 0;
    }
  }

  &__icon {
    @include addIcon($theme-primary);
  }

  &:hover &__description {
    height: 85px;
    min-height: 85px;
  }
  &__name {
    height: 55px;
    background-color:$theme-primary;
    color: $color-white;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 600;
  }
  &__store-name {
    background-color: $theme-primary;
    padding: 1px 0px;
    transform: translateY(-100%);
    position: absolute;
    height: 50px;
    width: 100%;
    opacity: 0;
    transition: 0.4s;
    backface-visibility: hidden;
  }
  &:hover &__store-name,
  &:hover &__description--text,
  &:hover &__description--name,
  &:hover &__icon {
    opacity: 1;
  }

}

.product-image {
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
    max-height: 224px;
    width: auto;
    height: auto;
    margin: auto;
    mix-blend-mode: darken;
    opacity: 0.8;
    transform: scale(1);
    transition: 0.3s opacity $motion-main, 0.3s transform $motion-main;

    &[lazy="loaded"] {
      animation: products-loaded;
      animation-duration: 0.3s;
    }

    @keyframes products-loaded {
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
