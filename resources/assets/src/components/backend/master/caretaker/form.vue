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
            <label class="form-label">Nama Karyawan</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.IdEmployee"
              :options="opsEmp"
              :allow-empty="false"
              placeholder="Pilih Karyawan"
              label="Employee"
              :custom-label="labelEmp"
              @input="onChangeContent"
              track-by="Employee" />
            <span class="text-danger" v-if="allErrors.IdEmployee">{{ allErrors.IdEmployee[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-3">
            <label class="form-label">Tanggal Mulai</label>
            <VueDatePicker
                v-model="field.DateStart"
                @input="onChangeContent" 
                class="mb-1"
                required 
                :format="dateFormat"
                :locale="locale"
              /> 
            <span class="text-danger" v-if="allErrors.DateStart">{{ allErrors.DateStart[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-3">
            <label class="form-label">Tanggal Selesai</label>
            <VueDatePicker
                v-model="field.DateEnd"
                @input="onChangeContent" 
                class="mb-1"
                required 
                :format="dateFormat"
                :locale="locale"
              /> 
            <span class="text-danger" v-if="allErrors.DateEnd">{{ allErrors.DateEnd[0] }}</span>
          </b-form-group>

        </b-form-row>

        <b-form-row>
        <b-form-group class="col-md-3">
            <label class="form-label">TO</label>
            <label  class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="TO" :state="allErrors.TO?false:null" v-model="field.TO" class="mb-1" readonly required />
            <span class="text-danger" v-if="allErrors.TO">{{ allErrors.TO[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-3">
            <label class="form-label">CC</label>
            <label class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.Email"
              :options="opsEmailDepart"
              :show-labels="false"
              :multiple="true"
              placeholder="Pilih Email Karyawan"
              label="Email"
              track-by="Email"
              @open = "onClickEmail"
              required
               />
               <!-- :disabled="isShow" -->
            <span class="text-danger" v-if="allErrors.Email">{{ allErrors.Email[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-6">
            <label class="form-label">Subject</label>
            <label  class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Subject" :state="allErrors.Subject?false:null" v-model="field.Subject" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Subject">{{ allErrors.Subject[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
        <b-form-group class="col-md-6">
            <label class="form-label">Content</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea rows="10" name="Content" :state="allErrors.Content?false:null" v-model="field.Content" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Content">{{ allErrors.Content[0] }}</span>
          </b-form-group>

          <!-- <b-form-group class="col-md-6">
            <label class="form-label">Tag Line</label>
            <label  class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Tag" :state="allErrors.Tag?false:null" v-model="field.Tag" @input="onChangeContent" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Tag">{{ allErrors.Tag[0] }}</span>
          </b-form-group> -->
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

import MaskedInput from 'vue-text-mask'
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import moment from 'moment'

export default {
  name: 'form-caretaker',
  metaInfo: {
    title: 'Form Caretaker'
  },
  components: {
    MaskedInput,
    VueDatePicker
  },
  data () {
    return {
      urlSubmit: '/AdminVue/caretaker-insert',
      headerCard: 'Data Caretaker',
      textBtnSubmit: 'Simpan',
      field: {
        // myFile : ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsEmp: [],
      opsEmailDepart: [],
      departemen : '',
      dateFormat: 'DD.MM.YYYY',
      locale: { lang: 'en' },
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      if(this.field.IdEmployee) {
        formData.append("IdEmployee", this.field.IdEmployee.Id)
        formData.append("IdUser", this.field.IdEmployee.IdUser)
      }
      if(this.field.DateStart) formData.append("DateStart", this.field.DateStart)
      if(this.field.DateEnd) formData.append("DateEnd", this.field.DateEnd)
      if(this.field.TO) formData.append("TO", this.field.TO)
      if(this.field.Email) formData.append("Email", JSON.stringify(this.field.Email))
      if(this.field.Subject) formData.append("Subject", this.field.Subject)
      if(this.field.Content) formData.append("Content", this.field.Content)
      if(this.field.Tag) formData.append("Tag", this.field.Tag)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-caretaker',
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
      axios.post('/AdminVue/caretaker-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        console.log(resp.data)
        this.field = resp.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getEmp () {
      axios.post('/AdminVue/caretaker-get-emp')
      .then( function (res) {
        this.opsEmp = res.data.data
        this.opsEmailDepart = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsEmp = []
      }.bind(this))
    },

    getDept () {
      axios.post('/AdminVue/caretaker-get-dept')
      .then( function (res) {
        var response = res.data.data
        Object.values(response).forEach(val => {
          this.field.Subject = 'Caretaker Head Departemen ' + val.Department
          this.departemen = val.Department
        });
        
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    onChangeContent()
    {
      if(this.field.IdEmployee !== null)
      {
        this.field.TO = this.field.IdEmployee.Email
      }
      else
      {
        this.field.TO = ''
      }

            this.field.Content = "Yth Saudara " + this.field.IdEmployee.Employee + "\n\n" +
                       "Sehubungan dengan Cuti saya pada " + moment(this.field.DateStart).format('DD.MM.YY') + " sampai "+ moment(this.field.DateEnd).format('DD.MM.YY') +
                       " maka saya menunjuk caretaker departemen saudara "+ this.field.IdEmployee.Employee +
                       " untuk menjadi pejabat sementara Departemen " + this.departemen + ".\n\n" +
                       "Terimakasih\n" +
                       "Head Dept " + this.departemen + "\n\n" 
    },

    onClickEmail() 
    {
      if (this.field.IdEmployee !== null) {
        let removeName = this.field.IdEmployee.Employee;
        this.opsEmailDepart = this.opsEmp.filter(
          (obj) => obj.Employee !== removeName
        );
      } else {
        this.opsEmailDepart = [...this.opsEmp];
      }
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-caretaker')
    },

    labelEmp ({Employee, Position}) {
      return `${Employee} — ${Position}`
    }

  },

  mounted(){
    this.getEmp()
    this.getDept()

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/caretaker-update'
        this.textBtnSubmit = 'Simpan'
      }

    }
  },  

}
</script>