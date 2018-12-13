<template>
  <div id="product" class="bg-cl-white">
    <breadcrumbs
      class="p20"
      :routes="breadcrumbs.routes"
      :active-route="breadcrumbs.name" />
    <section class="bg-cl-secondary px20 product-top-section">
      <div class="container">
        <section class="row m0 between-xs">
          <div class="col-xs-12 col-md-6 center-xs middle-xs image">
            <product-gallery
              :gallery="gallery"
              :offline="offlineImage"
              :configuration="configuration"
              :product="product"
            />
          </div>
          <div class="col-xs-12 col-md-5 data">
            <h1 class="mb20 mt0 cl-mine-shaft product-name" data-testid="productName" itemprop="name">
              {{ product.name | htmlDecode }}
            </h1>
            <div class="mb20 uppercase cl-secondary">
              sku: {{ product.sku }}
            </div>
            <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
              <meta itemprop="priceCurrency" :content="currentStore.i18n.currencyCode">
              <meta itemprop="price" :content="parseFloat(product.priceInclTax).toFixed(2)">
              <div
                class="mb40 price serif"
                v-if="product.type_id !== 'grouped'"
              >
                <div
                  class="h3 cl-secondary"
                  v-if="product.special_price && product.priceInclTax && product.originalPriceInclTax"
                >
                  <span class="h2 cl-mine-shaft weight-700">
                    {{ product.priceInclTax * product.qty | price }}
                  </span>&nbsp;
                  <span class="price-original h3">
                    {{ product.originalPriceInclTax * product.qty | price }}
                  </span>
                </div>
                <div
                  class="h2 cl-mine-shaft weight-700"
                  v-if="!product.special_price && product.priceInclTax"
                >
                  {{ product.priceInclTax * product.qty | price }}
                </div>
              </div>
              <div
                class="cl-primary variants"
                v-if="product.type_id =='configurable' && !loading"
              >
                <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
                  {{ product.errors | formatProductMessages }}
                </div>
                <div
                  class="h5"
                  v-for="(option, index) in product.configurable_options"
                  v-if="(!product.errors || Object.keys(product.errors).length === 0) && Object.keys(configuration).length > 0"
                  :key="index"
                >
                  <div class="variants-label" data-testid="variantsLabel">
                    {{ option.label }}
                    <span class="weight-700">
                      {{ configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()].label }}
                    </span>
                  </div>
                  <div class="row top-xs m0 pt15 pb40 variants-wrapper">
                    <div v-if="option.label == 'Color'">
                      <color-selector
                        v-for="(c, i) in options.color"
                        :key="i"
                        :id="c.id"
                        :label="c.label"
                        context="product"
                        code="color"
                        :class="{ active: c.id == configuration.color.id }"
                      />
                    </div>
                    <div class="sizes" v-else-if="option.label == 'Size'">
                      <size-selector
                        v-for="(s, i) in options.size"
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        code="size"
                        class="mr10 mb10"
                        :class="{ active: s.id == configuration.size.id }"
                        v-focus-clean
                      />
                    </div>
                    <div :class="option.attribute_code" v-else>
                      <generic-selector
                        v-for="(s, i) in options[option.attribute_code]"
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        :code="option.attribute_code"
                        class="mr10 mb10"
                        :class="{ active: s.id == configuration[option.attribute_code].id }"
                        v-focus-clean
                      />
                    </div>
                    <router-link
                      to="/size-guide"
                      v-if="option.label == 'Size'"
                      class="
                        p0 ml30 inline-flex middle-xs no-underline h5
                        action size-guide pointer cl-secondary
                      "
                    >
                      <i class="pr5 material-icons">accessibility</i>
                      <span>
                        {{ $t('Size guide') }}
                      </span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <product-links
              v-if="product.type_id =='grouped' && !loading"
              :products="product.product_links"
            />
            <product-bundle-options
              v-if="product.bundle_options && product.bundle_options.length > 0 && !loading"
              :product="product"
            />
            <product-custom-options
              v-else-if="product.custom_options && product.custom_options.length > 0 && !loading"
              :product="product"
            />
            <div class="row m0 mb15" v-if="product.type_id !== 'grouped' && product.type_id !== 'bundle'">
              <div>
                <label class="qty-label flex" for="quantity">{{ $t('Quantity') }}</label>
                <input
                  type="number"
                  min="0"
                  class="m0 no-outline qty-input py10 brdr-cl-primary bg-cl-transparent h4"
                  id="quantity"
                  focus
                  v-model="product.qty"
                >
              </div>
            </div>
            <div class="row m0">
              <add-to-cart
                :product="product"
                class="col-xs-12 col-sm-4 col-md-6"
              />
            </div>
            <div class="row py40 add-to-buttons">
              <div class="col-xs-6 col-sm-3 col-md-6">
                <button
                  @click="isOnWishlist ? removeFromWishlist(product) : addToWishlist(product)"
                  class="
                    p0 inline-flex middle-xs bg-cl-transparent brdr-none
                    action h5 pointer cl-secondary
                  "
                  type="button"
                  data-testid="addToWishlist"
                >
                  <i class="pr5 material-icons">{{ favoriteIcon }}</i>
                  <template v-if="!isOnWishlist">
                    {{ $t('Add to favorite') }}
                  </template>
                  <template v-else>
                    {{ $t('Remove') }}
                  </template>
                </button>
              </div>
              <div class="col-xs-6 col-sm-3 col-md-6">
                <button
                  @click="isOnCompare ? removeFromList('compare') : addToList('compare')"
                  class="
                    p0 inline-flex middle-xs bg-cl-transparent brdr-none
                    action h5 pointer cl-secondary
                  "
                  type="button"
                  data-testid="addToCompare"
                >
                  <i class="pr5 material-icons">compare</i>
                  <template v-if="!isOnCompare">
                    {{ $t('Add to compare') }}
                  </template>
                  <template v-else>
                    {{ $t('Remove from compare') }}
                  </template>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

    <section class="container px15 pt50 pb35 cl-accent details bg-cl-white">
      <h2 class="h3 m0 mb10 serif lh20 details-title">
        {{ $t('Product details') }}
      </h2>
      <div
        class="h4 details-wrapper"
        :class="{'details-wrapper--open': detailsOpen}"
      >
        <div class="row between-md m0">
          <div class="col-xs-12 col-sm-6">
            <div
              class="lh30 h5"
              itemprop="description"
              v-html="product.description"
            />
          </div>
          <div class="col-xs-12 col-sm-5">
            <ul class="attributes p0 pt5 m0">
              <product-attribute
                :key="attr.attribute_code"
                v-for="attr in customAttributes"
                :product="product"
                :attribute="attr"
                empty-placeholder="N/A"
              />
            </ul>
          </div>
          <div
            class="details-overlay"
            @click="showDetails"
          />
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// Here we are importing Core Page module responsible for business logic injection
import Product from '@vue-storefront/core/pages/Product'
import VueOfflineMixin from 'vue-offline/mixin'
import Breadcrumbs from 'theme/components/Breadcrumbs.vue'
import ProductGallery from 'theme/components/Product/ProductGallery'
import GenericSelector from 'theme/components/Filters/GenericSelector'
import ColorSelector from 'theme/components/Filters/ColorSelector.vue'
import SizeSelector from 'theme/components/Filters/SizeSelector.vue'
import AddToCart from 'theme/components/Product/AddToCart.vue'
import focusClean from 'theme/components/Theme/directives/focusClean'
import ProductAttribute from 'theme/components/Product/ProductAttribute.vue'

export default {
  components: {
    Breadcrumbs,
    ProductGallery,
    GenericSelector,
    ColorSelector,
    SizeSelector,
    AddToCart,
    ProductAttribute
  },
  data () {
    return {
      detailsOpen: false
    }
  },
  directives: { focusClean },
  computed: {
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    }
  },
  methods: {
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    }
  },
  // Here we are injecting core Product Page business logic (you can find it under core/pages/Product.vue)
  // You can find the docs for Product Page here: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/core/ProductPage.md
  mixins: [Product, VueOfflineMixin]
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
    margin: 15px 0;
    padding: 15px 0 0 15px;
  }
}

.qty-input {
  border: 0;
  border-bottom: 2px solid #bdbdbd;
  border-right: 2px solid #bdbdbd;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    opacity: 1;
    width: 20px;
  }
}

.price-original {
  text-decoration: line-through;
}
</style>
