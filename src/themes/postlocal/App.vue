<template>
  <div id="app">
    <Main-header />
    <sidebar-menu/>
    <!-- <Microcart /> -->
    <router-view />
    <main-footer/>
  </div>
</template>

<script>
import Header from 'theme/components/Header'
import Microcart from 'theme/components/Microcart/Microcart'
import Head from 'theme/resource/head'
import SidebarMenu from 'theme/components/SidebarMenu/SidebarMenu.vue'
import MainFooter from 'theme/components/Footer.vue'

export default {
  components: {
    // Place main website components here (eg. overlay, header, footer, side menus)
    // Other components should be placed in pages they are displayed in
    MainHeader: Header,
    Microcart,
    SidebarMenu,
    MainFooter
  },
  metaInfo: Head
}
</script>

<style lang="scss" src="./css/main.scss">

</style>
