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
            <label class="form-label">Nama Header</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-6">
            <label class="form-label">Tanggal</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-form-datepicker locale="en"  v-model="field.Date" class="mb-1" :date-format-options="datePickerFormat" required></b-form-datepicker>
            <span class="text-danger" v-if="allErrors.Date">{{ allErrors.Date[0] }}</span>
          </b-form-group>

        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-4">
            <label class="form-label">No. Dokumen</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Number" :state="allErrors.Number?false:null" v-model="field.Number" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Number">{{ allErrors.Number[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
            <label class="form-label">No. Referensi</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="NumberRef" :state="allErrors.NumberRef?false:null" v-model="field.NumberRef" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.NumberRef">{{ allErrors.NumberRef[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
            <label class="form-label">Judul</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Title" :state="allErrors.Title?false:null" v-model="field.Title" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Title">{{ allErrors.Title[0] }}</span>
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
  name: 'form-setting-header',
  metaInfo: {
    title: 'Form Setting Header'
  },
  components: {
    
  },
  data () {
    return {
      urlSubmit: '/AdminVue/caretaker-insert',
      headerCard: 'Pengaturan Header',
      textBtnSubmit: 'Simpan',
      field: {
        // myFile : ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsEmp: []
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Name", this.field.Name)
      if(this.field.Date) formData.append("Date", this.field.Date)
      formData.append("Number", this.field.Number)
      formData.append("NumberRef", this.field.NumberRef)
      formData.append("Title", this.field.Title)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-setting-header',
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
      axios.post('/AdminVue/setting-header-edit', {
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

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-setting-header')
    }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/setting-header-update'
        this.textBtnSubmit = 'Simpan'
      }

    }
  },  

}
</script>