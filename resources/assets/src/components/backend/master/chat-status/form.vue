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
                <label class="form-label">Status</label>
                <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-textarea name="status" :state="allErrors.Status?false:null" v-model="field.Status" class="mb-1" required :readonly="isShow" />
                <span class="text-danger" v-if="allErrors.Status">{{ allErrors.Status[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-6">
                <label class="form-label">Deskripsi</label>
                <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-textarea name="Incident" :state="allErrors.Descriptions?false:null" v-model="field.Descriptions" class="mb-1" required :readonly="isShow" />
                <span class="text-danger" v-if="allErrors.Descriptions">{{ allErrors.Descriptions[0] }}</span>
            </b-form-group>
          </b-form-row>

          <b-form-row>
            <b-form-group class="col-md-6"></b-form-group>
            <b-form-group label="" class="col-md-6">
              <b-btn v-if="isShow == false" type="submit" variant="primary" class="float-right ml-2">Simpan</b-btn>
              <b-btn type="button" variant="secondary" @click="backIndex()" class="float-right">Kembali</b-btn>
            </b-form-group>
          </b-form-row>
        </form>
        
      </b-card>
  
    </div>
  </template>
  
  <script>
  
  import moment from 'moment'
  import MaskedInput from 'vue-text-mask'
  
  export default {
    name: 'form-noe-report',
    metaInfo: {
      title: 'Form NOE Report'
    },
    components: {

    },
    data () {
      return {
        urlSubmit: '/AdminVue/master-chat-status-insert',
        headerCard: 'Form Chat Status',
        textBtnSubmit: 'Simpan',
        field: {},
        allErrors: [],
        isNotif: false,
        isEdit: false,
        alertNotif: '',
        alertVariant: 'alert-dark-danger',
        valStatus: 0,
        isShow: false,
        isButton: false,
        show: true,
      }
    },

    methods: {
      submitForm () {
        this.showLoading()
        const formData = new FormData()
        
        formData.append("Id", this.field.Id)
        formData.append("Status", this.field.Status)
        formData.append("Descriptions", this.field.Descriptions)
  
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
  
        axios.post(this.urlSubmit, formData, config)
        .then( function (res) {
          this.hideLoading()
          var resp = res.data
  
          if(resp.status){
  
            this.$router.push({
              name: 'master/data-chat-status',
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
          this.scrollTop(0, 1000)
          this.hideLoading()
        }.bind(this))
      },
  
      getData (Id) {
        axios.post('/AdminVue/master-chat-status-edit', {
          Id:Id,
        })
        .then( function (res) {
          var resp = res.data
          this.field = resp.data
          
          this.field.Id = resp.data.id
          this.field.Status = resp.data.status  
          this.field.Descriptions = resp.data.descriptions  

        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.isNotif = true
          this.alertNotif = 'Invalid Server Side!'
          this.alertVariant = 'alert-dark-danger'
        }.bind(this))
      },
  
  
      backIndex() {
        this.$router.push('/RoleAdmin/master/data-chat-status')
      },
  
    },
  
    mounted(){
  
  
      if(this.$route.params.isFormEdit){
        var Id = this.$route.params.Id
        this.isEdit = true
        if(Id){
          this.getData(Id)
          this.field.Id = Id
          this.urlSubmit = '/AdminVue/master-chat-status-update'
          this.textBtnSubmit = 'Simpan'
        }
      }
      if(this.$route.params.isShow){
        
        this.isShow = this.$route.params.isShow
        var Id = this.$route.params.Id
        if(Id){
          this.getData(Id)
          this.field.Id = Id
        }
      }
    },
  
  }
  </script>