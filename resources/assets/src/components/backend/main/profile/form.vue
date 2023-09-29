<template>
  <div>

    <b-card :header="headerCard" header-tag="h4" class="mb-4">

      <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
        <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
        {{alertNotif}}
      </div>

      <form method="POST" @submit.prevent="submitForm()">
        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Upload Foto</label>
            <file-pond
              name="myFile"
              ref="pondMyFile"
              label-idle="Klik untuk mencari atau Taruh file disini..."
              :allow-multiple="false"
              @updatefiles="handleFile"
              :files="field.myFile"
              accepted-file-types="image/jpeg, image/png"/>
          </b-form-group>

          <b-form-group class="col-md-6">
            <label class="form-label">Nama Lengkap</label>
            <b-input name="EmpName" :state="allErrors.EmpName?false:null" v-model="field.EmpName" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.EmpName">{{ allErrors.EmpName[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">NIP</label>
            <b-input name="NIP" :state="allErrors.NIP?false:null" v-model="field.NIP" class="mb-1" type="number" />
            <span class="text-danger" v-if="allErrors.NIP">{{ allErrors.NIP[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Nomor HP</label>
            <b-input name="CellPhone" :state="allErrors.CellPhone?false:null" v-model="field.CellPhone" class="mb-1" type="number" required />
            <span class="text-danger" v-if="allErrors.CellPhone">{{ allErrors.CellPhone[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Password Lama</label>
            <label class="form-label float-right text-primary">*Isi jika ingin merubah Password</label>
            <b-input name="OldPassword" :state="allErrors.OldPassword?false:null" v-model="field.OldPassword" class="mb-1" type="password" />
            <span class="text-danger" v-if="allErrors.OldPassword">{{ allErrors.OldPassword[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Password Baru</label>
            <label class="form-label float-right text-primary">*Isi jika ingin merubah Password</label>
            <b-input name="NewPassword" :state="allErrors.NewPassword?false:null" v-model="field.NewPassword" class="mb-1" type="password" />
            <span class="text-danger" v-if="allErrors.NewPassword">{{ allErrors.NewPassword[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Konfirmasi Password Baru</label>
            <label class="form-label float-right text-primary">*Isi jika ingin merubah Password</label>
            <b-input name="ConfirmPassword" :state="allErrors.ConfirmPassword?false:null" v-model="field.ConfirmPassword" class="mb-1" type="password" />
            <span class="text-danger" v-if="allErrors.ConfirmPassword">{{ allErrors.ConfirmPassword[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6"></b-form-group>
          <b-form-group label="" class="col-md-6">
            <b-btn type="submit" variant="primary" class="float-right ml-2">Simpan</b-btn>
            <b-btn type="button" variant="secondary" @click="backIndex()" class="float-right">Kembali</b-btn>
          </b-form-group>
        </b-form-row>
      </form>
      
    </b-card>

  </div>
</template>

<script>

export default {
  name: 'form-profile',
  metaInfo: {
    title: 'Form Edit Profile'
  },
  components: {

  },
  data () {
    return {
      urlSubmit: '/AdminVue/profile-update',
      headerCard: 'Ubah Data Profile',
      textBtnSubmit: 'Simpan',
      field: {
        myFile : ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger'
    }
  },
  methods: {
    submitForm () {
      if(this.field.myFile.length==0) this.field.myOldFile = ''

      const formData = new FormData()
      formData.append("Id", this.$route.params.Id)
      formData.append("EmpName", this.field.EmpName)
      formData.append("NIP", this.field.NIP)
      formData.append("CellPhone", this.field.CellPhone)
      formData.append("OldPassword", this.field.OldPassword)
      formData.append("NewPassword", this.field.NewPassword)
      formData.append("ConfirmPassword", this.field.ConfirmPassword)
      formData.append("File", this.field.myFile[0])
      formData.append("OldFile", this.field.myOldFile)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){
          this.$store.replaceState({ savedUserProfile: {} })
          this.$router.push({
            name: 'main/profile',
            params: {
              isNotif: true,
              gNotif: 'notifications-success',
              tNotif: this.textBtnSubmit+' Data Sukses',
              txNotif: 'Simpan Data Sukses!',
            }
          })

        }else{
          this.isNotif = true
          this.alertNotif = resp.message
          this.alertVariant = 'alert-dark-danger'
          this.allErrors = resp.validation
          this.scrollTop(0, 1000)
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getData (Id) {
      axios.post('/AdminVue/profile-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        this.field.myFile = process.env.BASE_URL + this.field.Photo
        this.field.myOldFile = this.field.Photo
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/main/profile')
    },

    handleFile: function(files) {
      this.field.myFile = files.map(files => files.file)
    }
  },

  mounted(){
    var Id = this.$route.params.Id
    if(Id) {
      this.getData(Id)
      // this.field.Id = Id
    }
  } 

}
</script>