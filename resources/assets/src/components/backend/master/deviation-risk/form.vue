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
            <label class="form-label">Nilai</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Value" :state="allErrors.Value?false:null" type="number" min="1" max="100" v-model="field.Value" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Value">{{ allErrors.Value[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Pertanyaan</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="Question" :state="allErrors.Question?false:null" v-model="field.Question" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Question">{{ allErrors.Question[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Penilaian Risiko Deviasi</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="RiskAssesment" :state="allErrors.RiskAssesment?false:null" v-model="field.RiskAssesment" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.RiskAssesment">{{ allErrors.RiskAssesment[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Item</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <!-- <b-input name="AssesmentGroup" :state="allErrors.AssesmentGroup?false:null" v-model="field.AssesmentGroup" class="mb-1" required /> -->
            <multiselect
              v-model="field.AssesmentGroup"
              :options="opsGroup"
              :allow-empty="false"
              placeholder="Pilih Assesment Group"
              selectLabel=""
              deselectLabel=""
              label="text"
              track-by="text" />
            <span class="text-danger" v-if="allErrors.AssesmentGroup">{{ allErrors.AssesmentGroup[0] }}</span>
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
  name: 'form-deviation-risk',
  metaInfo: {
    title: 'Form Deviation Penilaian Risiko Deviasi'
  },
  components: {
    
  },
  data () {
    return {
      urlSubmit: '/AdminVue/deviation-risk-insert',
      headerCard: 'Penilaian Risiko Deviasi',
      textBtnSubmit: 'Simpan',
      field: {},
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsGroup:[
        {'value':'SEVERITY','text':'SEVERITY'},
        {'value':'PROBABILITY','text':'PROBABILITY'},
        {'value':'DETECTABILITY','text':'DETECTABILITY'}
      ],
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Value", this.field.Value)
      formData.append("Question", this.field.Question)
      formData.append("RiskAssesment", this.field.RiskAssesment)
      if(this.field.AssesmentGroup) formData.append("AssesmentGroup", this.field.AssesmentGroup.value)

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-deviation-risk',
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
      axios.post('/AdminVue/deviation-risk-edit', {
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
      this.$router.push('/RoleAdmin/master/data-deviation-risk')
    }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/deviation-risk-update'
        this.textBtnSubmit = 'Simpan'
      }

    }
  },  

}
</script>