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
            <label class="form-label">Kota / Kabupaten</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-6">
            <label class="form-label">Provinsi</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.IdProvince"
              :options="opsProvince"
              :allow-empty="false"
              placeholder="Pilih Provinsi"
              label="Province"
              track-by="Province" />
            <span class="text-danger" v-if="allErrors.IdProvince">{{ allErrors.IdProvince[0] }}</span>
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
  name: 'form-city',
  metaInfo: {
    title: 'Form Kota / Kabupaten'
  },
  components: {
    
  },
  data () {
    return {
      urlSubmit: '/AdminVue/city-insert',
      headerCard: 'Form / Create Data Kota / Kabupaten',
      textBtnSubmit: 'Simpan',
      field: {
        // myFile : ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsProvince: []
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Name", this.field.Name)
      if(this.field.IdProvince) formData.append("IdProvince", this.field.IdProvince.Id)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-city',
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
      axios.post('/AdminVue/city-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getProvince () {
      axios.post('/AdminVue/city-get-province')
      .then( function (res) {
        this.opsProvince = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsProvince = []
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-city')
    },

    convertSelectBox ({ Province, Id }) {
      return `${Province}`
    }

  },

  mounted(){

    this.getProvince()

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/city-update'
        this.headerCard = 'Form / Edit Data Kota / Kabupaten'
        this.textBtnSubmit = 'Simpan'
      }

    }
  },  

}
</script>