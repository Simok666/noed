<template>
  <b-navbar toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x">

    <!-- Brand demo (see demo.css) -->
    <b-navbar-brand to="/" class="app-brand demo d-lg-none py-0 mr-4">
      <span class="app-brand-logo demo bg-light" style="width: 45px; height: 45px;">
        <img :src="`${publicUrl}clouds/backend/files/images/logo-icon.png`" alt="Treenear" width="30px">
      </span>
      <span class="app-brand-text demo font-weight-normal ml-2">e - DMS</span>
    </b-navbar-brand>

    <!-- Sidenav toggle (see demo.css) -->
    <b-navbar-nav class="layout-sidenav-toggle d-lg-none align-items-lg-center mr-auto" v-if="sidenavToggle">
      <a class="nav-item nav-link px-0 mr-lg-4" href="javascript:void(0)" @click="toggleSidenav">
        <i class="ion ion-md-menu text-large align-middle" />
      </a>
    </b-navbar-nav>

    <b-navbar-toggle target="app-layout-navbar"></b-navbar-toggle>

    <b-collapse is-nav id="app-layout-navbar">
      <!-- Divider -->
      <hr class="d-lg-none w-100 my-2">

      <b-navbar-nav class="align-items-lg-center">
        <!-- Search -->
        <!-- <label class="nav-item navbar-text navbar-search-box p-0 active">
          <i class="ion ion-ios-search navbar-icon align-middle"></i>
          <span class="navbar-search-input pl-2">
            <input type="text" class="form-control navbar-text mx-2" placeholder="Search..." style="width:200px">
          </span>
        </label> -->
      </b-navbar-nav>

      <b-navbar-nav class="align-items-lg-center ml-auto">
        <b-nav-item-dropdown no-caret :right="!isRtlMode" class="demo-navbar-notifications mr-lg-3">
          <template slot="button-content">
            <i class="ion ion-md-notifications-outline navbar-icon align-middle"></i>
            <span class="badge badge-primary badge-dot indicator"></span>
            <span class=" align-middle">&nbsp; Chat Notifications</span>
          </template>
          
          <div class="bg-primary text-center text-white font-weight-bold p-3">
            4 New Notifications
          </div>
          <b-list-group flush>
            <b-list-group-item href="javascript:void(0)" class="media d-flex align-items-center">
              <div class="ui-icon ui-icon-sm ion ion-md-home bg-secondary border-0 text-white"></div>
              <div class="media-body line-height-condenced ml-3">
                <div class="text-dark">Login from 192.168.1.1</div>
                <div class="text-light small mt-1">
                  Aliquam ex eros, imperdiet vulputate hendrerit et.
                </div>
                <div class="text-light small mt-1">12h ago</div>
              </div>
            </b-list-group-item>
          </b-list-group>

          <a href="javascript:void(0)" class="d-block text-center text-light small p-2 my-1">Show all notifications</a>
        </b-nav-item-dropdown>

        <!-- <b-nav-item-dropdown no-caret :right="!isRtlMode" class="demo-navbar-messages mr-lg-3">
          <template slot="button-content">
            <i class="ion ion-ios-mail navbar-icon align-middle"></i>
            <span class="badge badge-primary badge-dot indicator"></span>
            <span class="d-lg-none align-middle">&nbsp; Messages</span>
          </template>

          <div class="bg-primary text-center text-white font-weight-bold p-3">
            4 New Messages
          </div>
          <b-list-group flush>
            <b-list-group-item href="javascript:void(0)" class="media d-flex align-items-center">
              <img :src="`${publicUrl}img/avatars/6-small.png`" class="d-block ui-w-40 rounded-circle" alt>
              <div class="media-body ml-3">
                <div class="text-dark line-height-condenced">Sit meis deleniti eu, pri vidit meliore docendi ut.</div>
                <div class="text-light small mt-1">
                  Mae Gibson &nbsp;·&nbsp; 58m ago
                </div>
              </div>
            </b-list-group-item>
          </b-list-group>

          <a href="javascript:void(0)" class="d-block text-center text-light small p-2 my-1">Show all messages</a>
        </b-nav-item-dropdown> -->

        <!-- Divider -->
        <!-- <div class="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">|</div> -->

        <b-nav-item-dropdown :right="!isRtlMode" class="demo-navbar-user">
          <template slot="button-content">
            <span class="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
              <img :src="`${publicUrl}${UserPhoto}`" id="img-UserPhoto" alt class="d-block ui-w-30 rounded-circle">
              <span id="span-UserName" class="px-1 mr-lg-2 ml-2 ml-lg-0">{{ UserName }}</span>
            </span>
          </template>

          <b-dropdown-item to="/RoleAdmin/main/profile"><i class="ion ion-ios-person text-lightest"></i> &nbsp; My Profile</b-dropdown-item>
          <b-dropdown-item to="/RoleAdmin/main/profile"><i class="ion ion-md-settings text-lightest"></i> &nbsp; Edit Profile</b-dropdown-item>
          <b-dd-divider />
          <b-dropdown-item to="" v-on:click.native="logoutUser()">
            <i class="ion ion-ios-log-out text-danger"></i> &nbsp; Log Out
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'app-layout-navbar',

  props: {
    sidenavToggle: {
      type: Boolean,
      default: true,
    }
  },

  data () {
    return {
      field: {
        UserPhoto: 'clouds/backend/files/images/users/user-default.png',
        UserName: 'User Default',
      }
    }
  },

  methods: {
    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },

    getLayoutNavbarBg () {
      return this.layoutNavbarBg
    },

    getDataUser () {
      var dataUser = window.localStorage.getItem('user')
      var dataUser = dataUser ? JSON.parse(dataUser) : null
      if(dataUser!=null) {
        this.UserPhoto = dataUser.Photo
        this.UserName = dataUser.EmpName
      }else {
        this.UserPhoto = 'clouds/backend/files/images/users/user-default.png'
        this.UserName = 'User Default'
      }
    },
  },

  created(){
    this.getDataUser()
  }

}
</script>
