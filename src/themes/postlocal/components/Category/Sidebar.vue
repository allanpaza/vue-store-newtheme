<template>
  <div class="sidebar">
    <!-- You can define active filters in your config file -->
    <h4>
      {{ $t('Filter') }}
    </h4>

    <h5 class="location">
      Showing results from <span class="location__city">Dublin</span>
    </h5>
    <div v-for="(filter, filterIndex) in filters"
         :key="filterIndex" v-if="filter.length">
      <h5>
        {{ $t(filterIndex + '_filter') | uppercase }}
      </h5>

      <div v-if="filterIndex==='color'">
        <color-selector
          context="category"
          :attribute_code="color"
          code="color"
          v-for="(color, index) in filter"
          :key="index"
          :id="color.id"
          :label="color.label"
        />
      </div>
      <div v-else-if="filterIndex==='size'">
        <size-selector
          context="category"
          :attribute_code="size"
          code="size"
          class="mr10 mb10"
          v-for="(size, index) in filter"
          :key="index"
          :id="size.id"
          :label="size.label"
        />
      </div>
      <div v-else-if="filterIndex==='price'">
        <price-selector
          context="category"
          :attribute_code="price"
          class="price-select mb10 block"
          code="price"
          v-for="(price, index) in filter"
          :key="index"
          :id="price.id"
          :from="price.from"
          :to="price.to"
          :content="price.label"
          :label="price.label"
        />
      </div>
      <div v-else>
        <generic-selector
          context="category"
          :attribute_code="filter.attribute_code"
          :code="filterIndex"
          v-for="(option, index) in filter"
          :key="index"
          class="mr10 mb10"
          :id="option.id"
          :label="option.label"
        />
      </div>
      <!-- add the custom controls to other available filters set in config.products.defaultFilters; must be numeric field in ES
      <div v-if="filters.erin_recommends && filters.erin_recommends.length">
        <h5>
          {{ $t('Erin recommends') }}
        </h5>
        <div
          class="size-select mr10 mb10"
          v-for="(er, index) in filters.erin_recommends"
          :key="index"
          :id="er.id"
          :label="er.label"
        >{{ er.label }}</div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import Sidebar from '@vue-storefront/core/components/blocks/Category/Sidebar'

import ColorSelector from '../Filters/ColorSelector'
import PriceSelector from '../Filters/PriceSelector'
import SizeSelector from '../Filters/SizeSelector'
import GenericSelector from '../Filters/GenericSelector'

export default {
  components: {
    ColorSelector,
    PriceSelector,
    GenericSelector,
    SizeSelector
  },
  mixins: [Sidebar]
}
</script>
<style lang="scss" scoped>
@import '~theme/css/abstracts/colors';
@import '~theme/css/abstracts/functions/color';
$theme-primary: color(primary, $colors-theme);
  .location{
    font-weight: 400;
    &__city {
      font-weight: 700;
      color: $theme-primary;
      cursor: pointer;
    }
  }
</style>
