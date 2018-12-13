<template>
  <div id="category bg-cl-secondary">
    <!-- You can find everything in 'category' object -->
    <breadcrumbs
      class="p20"
      :routes="breadcrumbs.routes"
      :active-route="category.name" />
    <div class="row sort-row bg-cl-primary">
      <div class="col-lg-6 col-xs-6">
        <h1 class="category-title"> {{ category.name }} </h1>
      </div>
      <div class="sort-row__select col-xs-6 col-lg-6 end-lg"><SortBy /></div>
    </div>
    <div class="row">
      <button
        class="filter-button no-outline button-full block brdr-none w-100 px10 py20 :bg-cl-th-secondary ripple weight-400 h4 cl-white sans-serif fs-medium mobile-filters-button"
        @click="openFilters"
      >
        {{ $t('Filters') }} <i class="material-icons">arrow_forward</i>
      </button>
      <div class="col-md-3 start-xs category-filters bg-cl-secondary">

        <Sidebar :filters="filters.available"/>
      </div>
      <div class="col-md-3 start-xs mobile-filters" v-show="mobileFilters">
        <div class="close-container absolute w-100">
          <i class="material-icons p15 close cl-accent" @click="closeFilters">close</i>
        </div>
        <sidebar class="mobile-filters-body" :filters="filters.available"/>
      </div>
      <div class="col-md-9">
        <div class="row listing">
          <div v-if="isCategoryEmpty" class="col-lg-12 col-xs-12">
            <h4 data-testid="noProductsInfo">{{ $t('No products found!') }}</h4>
            <p>{{ $t('Please change Your search criteria and try again. If still not finding anything relevant, please visit the Home page and try out some of our bestsellers!') }}</p>
          </div>
          <product-tile v-for="product in products" :product="product" :key="product.name" class="col-md-3 col-sm-4 col-xs-12"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from '@vue-storefront/core/pages/Category'
import Sidebar from 'theme/components/Category/Sidebar'
import Breadcrumbs from 'theme/components/Breadcrumbs.vue'
import SortBy from 'theme/components/Filters/SortBy'
import ProductTile from 'theme/components/Product/ProductTile' // Component to display small product tile

export default {
  // Here we are injecting core Category Page business logic (you can find it under core/pages/Product.vue)
  // You can find the docs for Category Page here: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/core/CategoryPage.md
  data () {
    return {
      lazyLoadProductsOnscroll: true,
      mobileFilters: false
    }
  },
  components: {
    ProductTile,
    Sidebar,
    Breadcrumbs,
    SortBy
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    return new Promise((resolve, reject) => {
      store.state.category.current_product_query = Object.assign(store.state.category.current_product_query, { // this is just an example how can you modify the search criteria in child components
        sort: 'updated_at:desc'
        // searchProductQuery: builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 }) // this is an example on how to modify the ES query, please take a look at the @vue-storefront/core/helpers for refernce on how to build valid query
      })
      resolve()
    })
  },
  methods: {
    openFilters () {
      this.mobileFilters = true
    },
    closeFilters () {
      this.mobileFilters = false
    }
  },
  mixins: [Category]
}
</script>
<style lang="scss" scoped>
@import '~theme/css/abstracts/colors';
@import '~theme/css/abstracts/functions/color';
$color-primary: color(primary);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-white: color(white);
$bg-secondary: color(secondary, $colors-background);

.breadcrumbs {
  background-color: $color-primary;
  color: $color-white;
  @media (max-width: 767px) {
    margin: 0;
    display: none;
  }
}

  .listing {
    margin-right: 5px;
    margin-bottom: 10px;
      @media (max-width: 767px) {
        margin: 0;
    }
  }

  .category-filters {
    width: 242px;
    padding: 20px 20px 20px 35px;
  }

  .mobile-filters {
    display: none;
    overflow: auto;
  }

  .mobile-filters-button {
    display: none;
  }

  .mobile-sorting {
    display: none;
  }

  .category-title {
    line-height: 65px;
    margin: 0;
    padding: 0 0 0 25px;
  }

  @media (max-width: 64em) {
    .products-list {
      max-width: 530px;
    }
  }

  @media (max-width: 770px) {
    .category-title {
      margin: 0;
      font-size: 36px;
    }

    .products-list {
      width: 100%;
      max-width: none;
    }

    .mobile-filters {
      display: block;
    }

    .mobile-filters-button {
      display: block;
    }

    .sorting {
      display: none;
    }

    .mobile-sorting {
      display: block;
    }

    .category-filters {
      display: none;
    }

    .product-listing {
      justify-content: center;;
    }

    .mobile-filters {
      position: fixed;
      background-color: #F2F2F2;
      z-index: 5;
      padding: 0 40px;
      left: 0;
      width: 100vw;
      height: 100vh;
      top: 0;
      box-sizing: border-box;
    }

    .mobile-filters-body {
      padding-top: 50px;
    }
  }

  .close-container {
    left: 0;
  }

  .close {
    margin-left: auto;
  }

  .sort-row {
    height: 70px;
    &__select {
      margin-top: 10px;
      @media (max-width: 770px) {
        margin: 0;
      }
    }
  }

  .filter-button {
    background-color: $color-primary;
    i {
      position: absolute;
    }
  }
</style>
