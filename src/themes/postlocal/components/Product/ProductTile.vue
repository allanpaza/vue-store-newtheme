<template>
  <div class="product-tile">
    <!-- Pass product object to this component -->
    <div class="box product-card mt10 start-lg start-xs">
      <div class="product-image relative bg-cl-secondary">
        <router-link
          :to="localizedRoute({
            name: product.type_id + '-product',
            params: {
              parentSku: product.parentSku ? product.parentSku : product.sku,
              slug: product.slug,
              childSku: product.sku
            }
          })"
        >
          <transition appear>
            <img
              :alt="product.name"
              :src="thumbnailObj.loading"
              v-lazy="thumbnailObj"
              height="224"
              width="224">
          </transition>
        </router-link>
        <div class="product-card__store-name center-lg center-xs">
          <p>store name</p>
        </div>
      </div>

      <!-- Main product information, you can find the rest under 'product' property passed -->

      <div class="product-card__description">
        <p class="product-card__description--price">
          <span v-if="product.special_price && parseFloat(product.special_price) > 0"
          >
            {{ product.priceInclTax | price }}
          </span>
          <span class="price-original" v-if="product.special_price && parseFloat(product.originalPriceInclTax) > 0">
            {{ product.originalPriceInclTax | price }}
          </span>
          <span v-if="!product.special_price && parseFloat(product.priceInclTax) > 0">
            {{ product.priceInclTax | price }}
          </span>
        </p>
        <p class="product-card__description--distance">Distance 1.9km</p>
        <p class="product-card__description--name">{{ product.name | htmlDecode }}</p>
      </div>
      <div class="product-card__icon">
        <i class="material-icons">
          favorite
        </i>
      </div>
    </div>
    <add-to-cart :product="product" />
  </div>
</template>

<script>
import ProductTile from '@vue-storefront/core/components/ProductTile'
import AddToCart from 'theme/components/Product/AddToCart'
export default {
  mixins: [ProductTile],
  components: { AddToCart }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/abstracts/colors';
@import '~theme/css/abstracts/functions/color';

$theme-primary: color(primary, $colors-theme);
$theme-tertiary: color(tertiary, $colors-theme);

.price-original {
  text-decoration: line-through;
  font-size: 14px;
  font-weight: 400;
  color: $theme-tertiary;
}
</style>
