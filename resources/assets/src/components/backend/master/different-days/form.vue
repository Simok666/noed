<template>
    <div>
  
      <b-card :header="headerCard" header-tag="h4" class="mb-4">
  
        <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
          <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
          {{alertNotif}}
        </div>
  
        <form method="POST" @submit.prevent="submitForm()">
          <b-form-row>
            <b-form-group class="col-md-4">
              <label class="form-label">Name</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-input name="name" :state="allErrors.name?false:null" v-model="field.name" class="mb-1" required />
              <span class="text-danger" v-if="allErrors.name">{{ allErrors.name[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-4">
              <label class="form-label">number differents day</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-input name="different_days" :state="allErrors.different?false:null" v-model="field.different" class="mb-1" required/>
              <span class="text-danger" v-if="allErrors.different">{{ allErrors.different[0] }}</span>
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
    name: 'form-unit-location',
    metaInfo: {
      title: 'Form Lokasi Kejadian'
    },
    components: {
      
    },
    data () {
      return {
        urlSubmit: '/AdminVue/different-days-insert',
        headerCard: 'Diff Days',
        textBtnSubmit: 'Simpan',
        field: {},
        allErrors: [],
        isNotif: false,
        alertNotif: '',
        alertVariant: 'alert-dark-danger',
      }
    },
    methods: {
      submitForm () {
        const formData = new FormData()
        formData.append("id", this.field.Id)
        formData.append("name", this.field.name)
        formData.append("different", this.field.different)
  
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
  
        axios.post(this.urlSubmit, formData, config)
        .then( function (res) {
          var resp = res.data
  
          if(resp.status){
  
            this.$router.push({
              name: 'master/data-different-days',
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
        axios.post('/AdminVue/different-days-edit', {
          Id:Id,
        })
        .then( function (res) {
          var resp = res.data
          this.field = resp.data
          this.field.Id = resp.data.id
          this.field.different = resp.data.different_days
        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.isNotif = true
          this.alertNotif = 'Invalid Server Side!'
          this.alertVariant = 'alert-dark-danger'
        }.bind(this))
      },
  
      backIndex() {
        this.$router.push('/RoleAdmin/master/data-different-days')
      }
  
    },
  
    mounted(){
  
      if(this.$route.params.isFormEdit){
        var Id = this.$route.params.Id
        
        if(Id){
          this.getData(Id)
          this.field.Id = Id
          this.urlSubmit = '/AdminVue/different-days-update'
          this.textBtnSubmit = 'Simpan'
        }
  
      }
    },  
  
  }
  </script>