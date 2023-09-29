<template>
  <div>
    <div class="media align-items-center py-3 mb-3">
      <img :src="`${publicUrl}${field.Photo}`" alt="" class="d-block ui-w-100 rounded-circle">
      <div class="media-body ml-4">
        <h4 class="font-weight-bold mb-0">{{field.EmpName}}</h4>
        <div class="text-muted mb-2">{{field.Department}}</div>
        <b-btn @click="editData()" variant="primary" size="sm">Ubah Profil</b-btn>&nbsp;
        <template v-if="typeUser==1 || typeUser==8"><label class="switcher">
          <input type="checkbox" class="switcher-input" v-model="isLock" v-on:change="lockApp">
          <span class="switcher-indicator">
            <span class="switcher-yes"><span class="ion ion-md-checkmark"></span></span>
            <span class="switcher-no"><span class="ion ion-md-close"></span></span>
          </span>
          <span class="switcher-label">Kunci Aplikasi</span>
        </label> </template>
        <template v-else>
          <b-btn variant="default" size="sm">Profile</b-btn>&nbsp;
          <b-btn variant="default icon-btn" size="sm"><i class="ion ion-md-mail"></i></b-btn>
        </template>
      </div>
    </div>
    <b-card no-body>
      <hr class="border-light m-0">
      <b-card-body>

        <table class="table user-view-table m-0">
          <tbody>
            <tr>
              <td><strong>Nama Lengkap</strong></td>
              <td>: {{field.EmpName}}</td>
            </tr>
            <tr>
              <td><strong>NIP</strong></td>
              <td>: {{field.NIP}}</td>
            </tr>
            <tr>
              <td><strong>Nomor HP</strong></td>
              <td>: {{field.CellPhone}}</td>
            </tr>
            <tr>
              <td><strong>Departemen</strong></td>
              <td>: {{field.Department}}</td>
            </tr>
            <tr>
              <td><strong>Posisi</strong></td>
              <td>: {{field.Position}}</td>
            </tr>
            <tr>
              <td><strong>Nama User</strong></td>
              <td>: {{field.UserName}}</td>
            </tr>
            <tr>
              <td><strong>Terakhir Diubah</strong></td>
              <td>: {{field.UpdateAt}}</td>
            </tr>
          </tbody>
        </table>
      </b-card-body>
    </b-card>

  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/users.scss" lang="scss"></style>

<script>
import Vue from 'vue'
import moment from 'moment'
import MaskedInput from 'vue-text-mask'

export default {
  name: 'profile',
  metaInfo: {
    title: 'Profile'
  },

  data () {
    return {
      field: {
        Photo: 'clouds/backend/files/images/users/user-default.png'
      },

      isLock: false,
      typeUser: 0

    }
  },

  methods: {

    getData() {
      var savedUserProfile = this.$store.state.savedUserProfile
      var lengthObject = Object.keys(savedUserProfile).length
      
      if (lengthObject) {
        this.field = savedUserProfile
        window.localStorage.setItem('user', JSON.stringify(savedUserProfile))
      } else {
        axios.post('/AdminVue/profile')
        .then( function (res) {
          var resp = res.data
          this.field = resp.data
          this.$store.commit('updateUserProfile', resp.data)

          window.localStorage.setItem('user', JSON.stringify(resp.data))
          var elmName = document.getElementById('span-UserName')
          var elmPhoto = document.getElementById('img-UserPhoto')

          elmName.innerHTML = resp.data.EmpName
          elmPhoto.src = this.publicUrl+resp.data.Photo

        }.bind(this))
        .catch( function (e) {
          console.log(e)
        }.bind(this))
      }

      axios.post('/AdminVue/profile-get-lock-apps')
      .then( function (res) {
        var data = res.data.data
        if(data=='ADMIN') this.isLock = true
        else this.isLock = false

        this.typeUser = res.data.TypeUser

      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))

    },

    editData () {
      // this.$router.push('/main/form-profile')
      this.$router.push({
        name: 'main/form-profile',
        params: {
          Id: this.field.id,
        }
      })
    },

    lockApp () {
      this.showLoading()
      axios.post('/AdminVue/profile-lock-apps', {
        Status: this.isLock
      })
      .then( function (res) {
        this.hideLoading()
        var status = res.data.status
        if(status) {
          Vue.swal({
            icon: 'success',
            text: res.data.message
          })
        } else {
          Vue.swal({
            icon: 'error',
            text: res.data.message
          })
        }
      }.bind(this))
      .catch( function (e) {
        this.hideLoading()
        console.log(e)
        Vue.swal({
          icon: 'error',
          text: 'Kunci Aplikasi Gagal, Invalid!'
        })
      }.bind(this))
    }


  },

  mounted(){
    this.getData()
  },
}
</script>