<template>
  <component
    :is="link ? 'router-link' : 'button'"
    :type="!link ? type : false"
    :to="localizedRoute(link)"
    class="no-outline button-full block brdr-none w-100 px10 py20 :bg-cl-th-secondary ripple weight-400 h4 cl-white sans-serif fs-medium"
    :class="{ 'no-underline pointer align-center border-box': link, 'disabled': disabled, 'button-disabled': disabled }"
    data-testid="subscribeSubmit"
    :disabled="disabled"
  >
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
import focusClean from 'theme/components/Theme/directives/focusClean'
export default {
  name: 'ButtonFull',
  directives: { focusClean },
  props: {
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    link: {
      type: Object,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/abstracts/colors';
@import '~theme/css/abstracts/functions/color';

$theme-primary: color(primary, $colors-theme);
$theme-tertiary: color(tertiary, $colors-theme);

  .button-full {
    background-color: $theme-primary;
    -webkit-box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  }
  .disabled {
    background-color: gray
  }
</style>
