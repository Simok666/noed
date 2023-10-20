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
              <label class="form-label">No. NOD</label>
              <b-input name="Number" :state="allErrors.Number?false:null" v-model="field.Number" class="mb-1" readonly required />
              <span class="text-danger" v-if="allErrors.Number">{{ allErrors.Number[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-6">
              <label class="form-label">Koreksi</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-textarea name="Description" :state="allErrors.Description?false:null" v-model="field.Description" class="mb-1" required />
              <span class="text-danger" v-if="allErrors.Description">{{ allErrors.Description[0] }}</span>
            </b-form-group>
          </b-form-row>
  
          <b-form-row>
            <b-form-group class="col-md-6"></b-form-group>
            <b-form-group class="col-md-6">
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
    name: 'form-correction-nod-report',
    metaInfo: {
      title: 'Form Correction Verifikasi CAPA'
    },
    components: {
    },
    data () {
      return {
        urlSubmit: '/AdminVue/nod-verifikasi-capa-correction-data',
        headerCard: 'Perbaikan Correction Verifikasi CAPA',
        textBtnSubmit: 'Simpan',
        field: {
          Number: '',
          Description: '',
          EventFile: [],
          DescriptionCaretaker: ''
        },
        allErrors: [],
        isNotif: false,
        isEdit: false,
        alertNotif: '',
        alertVariant: 'alert-dark-danger',
      }
    },
    methods: {
      submitForm () {
        this.showLoading()
        const formData = new FormData()
        formData.append("Id", this.field.Id)
        formData.append("Number", this.field.Number)
        formData.append("Description", this.field.Description)
  
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
  
        axios.post(this.urlSubmit, formData, config)
        .then( function (res) {
          var resp = res.data
  
          if(resp.status){
  
            this.$router.push({
              name: 'nod/master-verifikasi-capa',
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
          this.hideLoading()
        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.isNotif = true
          this.alertNotif = 'Invalid Server Side!'
          this.alertVariant = 'alert-dark-danger'
          this.scrollTop(0, 1000)
          this.hideLoading()
        }.bind(this))
      },
  
      getData (Id) {
        axios.post('/AdminVue/correction-nod-report-create', {
          Id:Id,
        })
        .then( function (res) {
          var resp = res.data
          this.field.Number = resp.data.NODNumber

        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.isNotif = true
          this.alertNotif = 'Invalid Server Side!'
          this.alertVariant = 'alert-dark-danger'
        }.bind(this))
      },
  
      backIndex() {
        this.$router.push('/RoleAdmin/nod/master-verifikasi-capa')
      }
  
    },
  
    mounted(){
  
      if(this.$route.params.Id){
        var Id = this.$route.params.Id
        this.isCaretaker = this.$route.params.isCaretaker
        this.getData(Id)
        this.field.Id = Id
      }
    },
  
  }
  </script>