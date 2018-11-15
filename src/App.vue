<template>
  <div id="app">
    <div class="wrapper">
      <va-navibar :currentUser="currentUser"></va-navibar>
      <va-slider :slideMenuItems="slideMenuItems"></va-slider>
      <va-content-wrap></va-content-wrap>
      <Modal></Modal>
    </div>
  </div>
</template>

<script>
import VANaviBar from 'NaviBar.vue'
import VASlider from 'Slider.vue'
import VAContentWrap from 'ContentWrap.vue'
import Modal from './components/Modal.vue'
import store from './vuex/store.js'
import slideMenuItems from './lib/slideMenuItems.js'
import slideMenuItemsUser from './lib/slideMenuItemsUser.js'
import global from './util/globalApp'
import { services } from './vuex/api'

export default {
  name: 'app',
  data () {
    return {
      slideMenuItems: slideMenuItemsUser,
      currentUser: ''
    }
  },
  created () {
    services.pseudoapi.getPseudo()
    .then((response) => {
      console.log(response.data)
      this.currentUser = response.data
      global.currentUser = this.currentUser
      var role = global.currentUser.role
      if (role === 'admin') {
        this.slideMenuItems = slideMenuItems
      } else {
        this.slideMenuItems = slideMenuItemsUser
      }
    })
    .catch((error) => {
      console.error(error)
    })
  },
  components: {
    'va-navibar': VANaviBar,
    'va-slider': VASlider,
    'va-content-wrap': VAContentWrap,
    Modal
  },
  store
}
</script>

<style>

</style>
