<template>
  <!-- <div class="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" :style="`background-image: url('${publicUrl}clouds/backend/files/images/bg-login.jpg');`"> -->
  <div class="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" style="background: white; ">
    <div class="ui-bg-overlay bg-dark opacity-25"></div>

    <div class="authentication-inner py-5">

      <b-card no-body>
        <div class="p-4 p-sm-5">
          <!-- Logo -->
          <!-- <div class="d-flex justify-content-center align-items-center pb-2 mb-4">
            <img :src="`${publicUrl}clouds/backend/files/images/Logo_WB.png`" alt="Treenear Vue" width="240px">
          </div> -->
          <!-- / Logo -->

          <h2 class="text-center font-weight-bold mb-4 text-danger" >Verifikasi</h2>

          <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
            <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
            {{alertNotif}}
          </div>

          <!-- Form -->
          <form @submit.prevent="VerificationCode()">
            <b-form-group label="Kode Verifikasi">
              <b-input type="number" ref="codeauth" v-model="credentials.codeauth" required />
            </b-form-group>
            <!-- <b-form-group>
              <div slot="label" class="d-flex justify-content-between align-items-end">
                <div>Password</div>
                
              </div>
              <b-input type="password" v-model="credentials.password" required />
            </b-form-group> -->

            <div class="">
              <!-- <b-check v-model="credentials.rememberMe" class="m-0">Remember me</b-check> -->
              <b-btn type="submit" variant="primary" style="width:100%">Verifikasi</b-btn>
            </div>
          </form>
          <!-- / Form -->
        </div>
        <b-card-footer class="py-3 px-4 px-sm-5">
          <div class="text-center text-muted">
            <span class="font-weight-bolder">Treenear</span> © {{ momentYear() }} All rights reserved.
            <!-- Don't have an account yet? <a href="javascript:void(0)">Sign Up</a> -->
          </div>
        </b-card-footer>
      </b-card>

    </div>
  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/authentication.scss" lang="scss"></style>

<script>
export default {
  name: 'pages-login',
  metaInfo: {
    title: 'Forgot Password'
  },
  data: () => ({
    isNotif: false,
    alertNotif: '',
    alertVariant: 'alert-dark-success',
    credentials: {
      codeauth: '',
      AuthCode:'',
      IdEmployee:'',
      rememberMe: true
    }
  }),

  methods: {
    VerificationCode() {
      let data = {
        codeauth: this.credentials.codeauth,
        AuthCode: this.credentials.AuthCode,
        IdEmployee: this.credentials.IdEmployee
      }
      this.showLoading()
      axios.post('/AdminVue/verification-code', data)
        .then(({data}) => {
        //   window.localStorage.setItem('CodeAuth',data.CodeAuth)
          this.$router.push({
            name: 'main/reset-password',
            params: {
              isForgot:true,
              IdEmployee:data.dataUser.IdEmployee
            }
          });
          this.hideLoading()
        })
        .catch(({response}) => {
          this.$Progress.fail()
          setTimeout(() => this.$swal('Code Auth', response.data.message), 500)
          this.hideLoading()
        })
    }
  },

  mounted () {
    if(this.$route.params.isForgot){
      this.credentials.IdEmployee = this.$route.params.IdEmployee
      this.credentials.AuthCode = this.$route.params.AuthCode
      this.isNotif = true
      this.alertNotif = 'Pengiriman Code Verifikasi Sukses Silahkan Check Email Anda!'
    }
    this.$refs.codeauth.$el.focus()
  }

}
</script>
