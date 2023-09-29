<template>
    <div>
  
      <b-card :header="headerCard" header-tag="h4" class="mb-4">
  
        <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
          <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
          {{alertNotif}}
        </div>
  
        <form method="POST" @submit.prevent="submitForm()">
          <b-form-row>
            <b-form-group class="col-md-12">
              <label class="form-label">No. NOD</label>
              <b-input name="Number" :state="allErrors.Number?false:null" v-model="field.Number" class="mb-1" readonly required />
              <span class="text-danger" v-if="allErrors.Number">{{ allErrors.Number[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-12">
              <label class="form-label">Deviation</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-textarea name="Description" :state="allErrors.Deviation?false:null" v-model="field.Deviation" class="mb-1" required />
              <span class="text-danger" v-if="allErrors.Deviation">{{ allErrors.Deviation[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-12">
            <label class="form-label">Pilih Team Room Chat</label>
            <label class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.IdTeam"
              :options="opsTypeTeam"
              :show-labels="false"
              placeholder="Pilih Team"
              :multiple="true"
              label="namepublisher"
              track-by="namepublisher"
              required
            />
            <!-- <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.IdTeam"
              :options="opsTypeTeam"
              :show-labels="false"
              placeholder="Pilih Team"
              :multiple="true"
              label=""
              track-by=""
              required
              :disabled="isShow" /> -->
            <span class="text-danger" v-if="allErrors.IdTeam">{{ allErrors.IdTeam[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-12">
              <label class="form-label">Topik Pertanyaan</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-textarea name="Question" :state="allErrors.Question?false:null" v-model="field.Question" class="mb-1" required />
              <span class="text-danger" v-if="allErrors.Question">{{ allErrors.Question[0] }}</span>
            </b-form-group>
          </b-form-row>
          <b-form-group class="col-md-12">
            <label class="form-label">Tanggal / Waktu</label>
            <!-- v-if="isShow == false" -->
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <!-- :disabled="isShow" -->
            <VueDatePicker
              v-model="field.Date"
              class="mb-1"
              required 
              :format="dateFormat"
              :locale="locale"
            /> 
          </b-form-group>
          <b-form-row>
            <b-form-group class="col-md-6">
                <label class="form-label">Mulai Jam</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <!-- :disabled="isShow" -->
                <masked-input type="text" class="form-control" placeholder="Contoh 4 digit : 09:00"
                    v-model="field.StartTime"
                    :guide="false"
                    :mask="[/\d/, /\d/, '.', /\d/, /\d/]" 
                />
            </b-form-group>
            <b-form-group class="col-md-6">
                <label class="form-label">Akhir Jam</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <!-- :disabled="isShow" -->
                <masked-input type="text" class="form-control" placeholder="Contoh 4 digit : 09:00"
                    v-model="field.EndTime"
                    :guide="false"
                    :mask="[/\d/, /\d/, '.', /\d/, /\d/]" 
                />
            </b-form-group>
            </b-form-row>
  
          <b-form-row>
            <b-form-group class="col-md-6"></b-form-group>
            <b-form-group class="col-md-6">
              <b-btn type="submit" variant="primary" class="float-right ml-2">Kirim</b-btn>
              <b-btn type="button" variant="secondary" @click="backIndex()" class="float-right">Kembali</b-btn>
            </b-form-group>
          </b-form-row>
        </form>
        
      </b-card>
  
    </div>
  </template>
  
<script>

import MaskedInput from 'vue-text-mask'
import moment from 'moment'
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'

  export default {
    name: 'form-question-nod-report',
    metaInfo: {
      title: 'Form Question NOD'
    },
    components: {
        VueDatePicker,
        MaskedInput
    },
    data () {
      return {
        urlSubmit: '/AdminVue/question-nod-report-insert',
        headerCard: 'Request Pertanyaan Laporan NOD',
        textBtnSubmit: 'Simpan',
        field: {
          Number: '',
          Description: '',
          EventFile: [],
          DescriptionCaretaker: '',
          Date: moment(new Date()).format('YYYY-MM-DD'),
          StartTime: '09:00',
          EndTime: '16:00'
        },
        allErrors: [],
        isNotif: false,
        isEdit: false,
        alertNotif: '',
        opsTypeTeam: [],
        alertVariant: 'alert-dark-danger',
        isCaretaker: false,
        dateFormat: 'DD.MM.YYYY',
        locale: { lang: 'en' }
      }
    },
    methods: {
      submitForm () {
        this.showLoading()
        const formData = new FormData()
        formData.append("Id", this.field.Id)
        formData.append("Number", this.field.Number)
        formData.append("Deviation", this.field.Deviation)
        formData.append("IdTeam", JSON.stringify(this.field.IdTeam))
        formData.append("Question", this.field.Question)
        if(this.field.Date) formData.append("Date", this.field.Date)
        if(this.field.StartTime) formData.append("StartTime", this.field.StartTime)
        if(this.field.EndTime) formData.append("EndTime", this.field.EndTime)

        // if(this.isCaretaker) formData.append("DescriptionCaretaker", this.field.DescriptionCaretaker)
  
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
  
        axios.post(this.urlSubmit, formData, config)
        .then( function (res) {
          var resp = res.data
  
          if(resp.status){
  
            this.$router.push({
              name: 'nod/data-nod-report',
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
          this.field.Number = resp.data
        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.isNotif = true
          this.alertNotif = 'Invalid Server Side!'
          this.alertVariant = 'alert-dark-danger'
        }.bind(this))
      },

      getPublisher (Id) {
      axios.post('/AdminVue/nod-report-get-publisher',{
        Id:Id,
      })
      .then( function (res) {
        if(res.data.status == false)
        {
            this.opsTypeTeam = []    
        }
        else
        {
            this.opsTypeTeam = res.data.data
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsTypeTeam = []
      }.bind(this))
    },
  
  
      backIndex() {
        this.$router.push('/RoleAdmin/nod/data-nod-report')
      }
  
    },
  
    mounted(){
      this.getPublisher(this.$route.params.Id)
      if(this.$route.params.Id){
        var Id = this.$route.params.Id
        // this.isCaretaker = this.$route.params.isCaretaker
        this.getData(Id)
        this.field.Id = Id
      }
    },
  
  }
  </script>