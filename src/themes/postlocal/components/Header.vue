<template>
  <header class="header h-auto">
    <div class="header__row h-auto row center-lg center-xs middle-xs middle-lg">
      <div class="col-xs-3 hidden-md">
        <button
          type="button"
          class="bg-cl-transparent brdr-none inline-flex"
          @click="openSidebarMenu"
          :aria-label="$t('Open menu')"
          data-testid="menuButton"
        >
          <i class="material-icons right-icons--item">
            dehaze
          </i>
        </button>
      </div>
      <div class="col-lg-3 col-xs-9">
        <div class="box">
          <img src="../assets/logo.png" :alt="$t('Logo')">
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row search h-auto">
          <select class="hidden-xs col-lg-3" id="search__category" name="category">
            <option value="All">All Services</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
          </select>
          <input ref="search" id="search" class="col-xs-9 col-lg-8 search__input"
                 :placeholder="$t('Type what you are looking for...')"
                 type="text">
          <i class="col-xs-3 col-lg-1 material-icons search__icon">
            search
          </i>
        </div>
      </div>
      <div class="col-lg-3 hidden-xs">
        <div class="right-icons middle-lg">
          <i class="material-icons right-icons--item">
            account_circle
          </i>
          <i class="material-icons right-icons--item">
            shopping_cart
          </i>
          <i class="material-icons right-icons--item">
            favorite
          </i>
          <i class="material-icons right-icons--item">
            compare
          </i>
        </div>
      </div>
    </div>

    <div class="header__menu h-auto row center-lg bottom-lg uppercase py5">
      <div class="col-lg-2">
        <div class="box">
          Categories >
        </div>
      </div>
      <div class="col-lg-2">
        <div class="box">
          Popular
        </div>
      </div>
      <div class="col-lg-2">
        <div class="box">
          Close to You
        </div>
      </div>
      <div class="col-lg-2">
        <div class="box">
          Stores
        </div>
      </div>
      <div class="header__menu--your-store col-lg-2">
        <div class="box">
          Your Store Here!
        </div>
      </div>
    </div>

  </header>
</template>

<script>
import HamburgerIcon from '@vue-storefront/core/components/blocks/Header/HamburgerIcon'

export default {
  mixins: [HamburgerIcon]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/abstracts/colors';
@import '~theme/css/abstracts/functions/color';
$bg-primary: color(primary, $colors-background);
$bg-secondary: color(secondary, $colors-background);
$bg-tertiary: color(secondary, $colors-background);
$border-secondary: color(tertiary, $colors-background);
$color-white: color(white);
$theme-primary: color(primary, $colors-theme);
$theme-tertiary: color(tertiary, $colors-theme);

.h-auto{
    @media (max-width: 767px) {
      height: auto;
    }
}

.header {
  height: 100px;
  background-color: $bg-primary;
  &__row {
    height: 70px;
  }
  &__menu {
    height: 30px;
    font-size: 14px;
    @media screen and (max-width:768px) {
      display: none;
    }
    &--your-store {
      color: $theme-primary;
    }
  }
}

.search {
  height: 50px;
  &__icon {
    background-color: $theme-primary;
    color: $color-white;
    align-items: center;
    justify-content: center;
    border: none;
    display: flex;
    border-bottom: 2px solid $theme-tertiary;
    border-right: 2px solid $theme-tertiary;
    cursor: pointer;

     &:hover {
       background-color: $bg-tertiary;
       color: $theme-primary;
     }

      @media (max-width: 767px) {
        height: 50px;
      }
  }
  &__input {
    border: none;
    border-bottom: 2px solid $theme-tertiary;
    padding-left: 10px;
    outline: none;

    @media (max-width: 767px) {
      border: 2px solid $theme-tertiary;
      height: 50px;
    }
  }
  select {
    padding: 0;
    margin: 0;
    border: none;
    border-bottom: 2px solid $theme-tertiary;
    border-right: 2px solid $theme-tertiary;
    box-sizing: border-box;
  }
}

.right-icons {
  height: 50px;
  width: 100%;
  display: flex;
  &--item {
    font-size: 35px;
    color: $theme-tertiary;
    margin-left: 6%;
    cursor: pointer;
    &:hover {
      color: $theme-primary;
    }
  }
}
</style>
