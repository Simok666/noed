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
              <label class="form-label">Tanggal</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <!-- <b-form-datepicker
                locale="en"
                v-model="field.Date"
                class="mb-1"
                :date-format-options="datePickerFormat"
                required
                :date-disabled-fn="dateDisabled"
              ></b-form-datepicker> -->
              <VueDatePicker
                v-model="field.Date"
                class="mb-1"
                required
                :date-disabled-fn="dateDisabled"
                :format="dateFormat"
                :locale="locale"
              />
              <span class="text-danger" v-if="allErrors.Date">{{ allErrors.Date[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-6">
              <label class="form-label">Nama Hari Libur</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-input name="dayoff"
                v-model="field.NameDayOff"
                class="mb-1"
                required
              ></b-input>
              <span class="text-danger" v-if="allErrors.NameDayOff">{{ allErrors.NameDayOff[0] }}</span>
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

  import { VueDatePicker } from '@mathieustan/vue-datepicker'
  import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
  
  export default {
    name: 'form-day-off',
    metaInfo: {
      title: 'Form Data Day Off'
    },
    components: {
      VueDatePicker
    },
    
    links: {
      pagination: {
        // pagination information
      }
    },
  
    data () {
      return {
  
        urlSubmit: '/AdminVue/day-off-insert',
        headerCard: 'Pengaturan Hari Libur',
        textBtnSubmit: 'Simpan',
        field: {
          // myFile : ''
        },
        allErrors: [],
        isNotif: false,
        alertNotif: '',
        alertVariant: 'alert-dark-danger',
        opsEmp: [],
        dateFormat: 'DD.MM.YY',
        locale: { lang: 'en' }
  
      }
    },
    methods: {
  
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        const weekday = date.getDay()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6
      },
  
      submitForm () {
        const formData = new FormData()
        formData.append("Id", this.field.Id)
        if(this.field.Date) formData.append("Date", this.field.Date)
        if(this.field.NameDayOff) formData.append("NameDayOff", this.field.NameDayOff)
  
  
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
  
        axios.post(this.urlSubmit, formData, config)
        .then( function (res) {
          var resp = res.data
  
          if(resp.status){
  
            this.$router.push({
              name: 'master/data-day-off',
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
        axios.post('/AdminVue/day-off-edit', {
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
        this.$router.push('/RoleAdmin/master/form-day-off')
      }
  
    },
  
    mounted(){
      this.isNotifExist()
      if(this.$route.params.isFormEdit){
        var Id = this.$route.params.Id
        if(Id){
          this.getData(Id)
          this.field.Id = Id
          this.urlSubmit = '/AdminVue/day-off-update'
          this.textBtnSubmit = 'Simpan'
        }
  
      }
    },  
  
  }
  </script>