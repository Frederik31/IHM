<template>
  <header class="main-header">
    <!-- Logo -->
    <a href="/" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>UTC</b></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Planning</b>UTC</span>
    </a>

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Notifications: style can be found in dropdown.less -->
          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning">{{ notificationsCount }}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have {{ notificationsCount }} notifications</li>
              <li>
                <!-- inner menu: contains the actual data -->
                <ul class="menu" id="alerts" name="alerts">
                  <li v-for="dt in donnee">
                    <a href="#">
                      <i class="fa fa-warning text-yellow"></i>{{ dt.texte }}
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer"><a href="#">View all</a></li>
            </ul>
          </li>
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu" v-if="!loading">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <span class="hidden-xs">{{ currentUser.fullname }}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <p>
                  {{ currentUser.fullname }} - {{ currentUser.role }}
                  <small>{{ currentUser.createdAt }}</small>
                </p>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-right">
                  <a href="/logout" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { services } from './vuex/api'
// import global from './util/globalApp'

export default {
  name: 'va-navibar',
  data () {
    return {
      notificationsCount: null,
      donnee: null,
      // currentUser: null,
      loading: true
    }
  },
  props: {
    currentUser: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'unreadMessagesCount',
      'unreadNotificationsCount',
      'remainTasksCount'
    ])
  },
  created () {
    this.loading = true
    // this.currentUser = global.currentUser

    services.alertapi.getAlerts()
    .then((response) => {
      console.log(response.data)
      const jsondata = response.data
      this.donnee = jsondata
      this.notificationsCount = jsondata.length
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      this.loading = false
    }) /*
    services.pseudoapi.getPseudo()
    .then((response) => {
      console.log(response.data)
      this.currentUser = response.data
      global.role = this.currentUser.role
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      this.loading = false
    }) */
  }

}

</script>
