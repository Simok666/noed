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
            <label class="form-label">No. NOD</label>
            <b-input name="Number" :state="allErrors.Number?false:null" v-model="field.Number" class="mb-1" readonly required />
            <input type="hidden" name="IdPublish" :state="allErrors.IdPublish?false:null" v-model="field.IdPublish" class="mb-1" readonly required />
            <input type="hidden" name="SectionPublish" :state="allErrors.SectionPublish?false:null" v-model="field.SectionPublish" class="mb-1" readonly required />
            <input type="hidden" name="HeadPublish" :state="allErrors.HeadPublish?false:null" v-model="field.HeadPublish" class="mb-1" readonly required />
            <span class="text-danger" v-if="allErrors.Number">{{ allErrors.Number[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-4">
            <label class="form-label">Koreksi</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="Description" :state="allErrors.Description?false:null" v-model="field.Description" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Description">{{ allErrors.Description[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-4">
            <label>Lampiran</label>
            <label class="form-label float-right text-danger">(Max. 100 MB)</label>
            <file-pond
            name="Attachment"
            ref="pondMyFile"
            label-idle="Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;"
            :allow-multiple="true"
            @updatefiles="handleFile"
            :files="field.Attachment"
            maxTotalFileSize="100MB"
            accepted-file-types="application/*, image/*, video/*" />
          </b-form-group>
        </b-form-row>

        <b-form-row v-if="isCaretaker == true">
          <b-form-group class="col-md-4">
            <label class="form-label">Deskripsi Mandatory</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="DescriptionCaretaker" :state="allErrors.DescriptionCaretaker?false:null" v-model="field.DescriptionCaretaker" class="mb-1" :required="isCaretaker" />
            <span class="text-danger" v-if="allErrors.DescriptionCaretaker">{{ allErrors.DescriptionCaretaker[0] }}</span>
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
    title: 'Form Correction NOD'
  },
  components: {
  },
  data () {
    return {
      urlSubmit: '/AdminVue/correction-nod-report-insert',
      headerCard: 'Perbaikan Laporan NOD',
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
      isCaretaker: false
    }
  },
  methods: {
    submitForm () {
      this.showLoading()
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Number", this.field.Number)
      formData.append("IdPublish", this.field.IdPublish)
      formData.append("SectionPublish", this.field.SectionPublish)
      formData.append("HeadPublish", this.field.HeadPublish)
      formData.append("Description", this.field.Description)
      if(this.field.Attachment) {
        for( var i = 0; i < this.field.Attachment.length; i++ ){
          let file = this.field.Attachment[i];
          formData.append('Attachment[' + i + ']', file);
        }
      }
      if(this.isCaretaker) formData.append("DescriptionCaretaker", this.field.DescriptionCaretaker)

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
        this.field.Number = resp.data.NODNumber
        this.field.IdPublish = resp.data.IdPublish
        this.field.SectionPublish = resp.data.IdSectionPublish
        this.field.HeadPublish =  resp.data.UserDept
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    handleFile: function(files) {
      // console.log('FilePond Updated')
      // example of instance method call on pond reference
      this.field.Attachment = files.map(files => files.file)
      // console.log( this.field.myFile )
    },

    backIndex() {
      this.$router.push('/RoleAdmin/nod/data-nod-report')
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