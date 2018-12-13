<template>
  <div class="sort-by mr20">
    <select
      name="sortby"
      v-model="sortby"
      @change="changeOrder">
      <option selected="selected" disabled value="">{{ $t('Sort By') }}</option>
      <option v-for="(option, label) in sortByAttribute" :disabled="sortby === option" :value="option" :key="option" >{{ $t(label) }}</option>
    </select>
  </div>
</template>

<script>
import SortBy from '@vue-storefront/core/components/SortBy'
export default {
  mixins: [SortBy]
}
</script>
<style lang="scss" scoped>
@import '~theme/css/base/typography';
@import '~theme/css/abstracts/colors';
@import '~theme/css/abstracts/functions/color';

$theme-primary: color(primary, $colors-theme);
$theme-tertiary: color(tertiary, $colors-theme);

.sort-by {
    height: 50px;
    width: 200px;
    display: inline-flex;
    position: relative;
    border: none;
    border-bottom: 2px solid $theme-tertiary;
    border-right: 2px solid $theme-tertiary;
    select {
        padding: 10px 0;
        font-size: 14px;
        border: none;
        width: 100%;
        border-radius: 0;
        background-color: transparent;
        margin-right: 0;
    }
}
@media (max-width: 770px) {
  .sort-by {
    width: 100%;
    border: none;
    height: 100%;
    select {
      font-size: 20px;
    }
  }
}
</style>
