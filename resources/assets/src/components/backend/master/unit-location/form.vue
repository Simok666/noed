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
            <label class="form-label">Kode Unit</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Code" :state="allErrors.Code?false:null" v-model="field.Code" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Code">{{ allErrors.Code[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-4">
            <label class="form-label">Lokasi Kejadian</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required/>
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-4">
            <label class="form-label">Unit</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <!-- <b-input name="Prefix" :state="allErrors.Prefix?false:null" v-model="field.Prefix" class="mb-1" required/>
             -->
             <multiselect
              v-model="field.Prefix"
              :multiple="true"
              :options="opsPrefix"
              :allow-empty="true"
              placeholder="Pilih Unit Yang Akan Diisi"
              label="text"
              track-by="text"
              />
            <span class="text-danger" v-if="allErrors.Prefix">{{ allErrors.Prefix[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-4">
            <label class="form-label">Warna Lokasi</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="LocationColor" :state="allErrors.LocationColor?false:null" v-model="field.LocationColor" class="mb-1" required/>
            <span class="text-danger" v-if="allErrors.LocationColor">{{ allErrors.LocationColor[0] }}</span>
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
      urlSubmit: '/AdminVue/unit-location-insert',
      headerCard: 'Lokasi',
      textBtnSubmit: 'Simpan',
      field: {},
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsPrefix: [
        {'value':'1','text':'unit lokasi 1'},
        {'value':'2','text':'unit lokasi 2'},
        {'value':'3','text':'unit lokasi 3'},
        {'value':'4','text':'unit lokasi 4'},
        {'value':'5','text':'unit lokasi 5'},
        {'value':'6','text':'lain - lain'},
      ],
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Code", this.field.Code)
      formData.append("Name", this.field.Name)
      formData.append("LocationColor", this.field.LocationColor)
      if(this.field.Prefix) formData.append("Prefix", JSON.stringify(this.field.Prefix)) 

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-unit-location',
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
      axios.post('/AdminVue/unit-location-edit', {
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
      this.$router.push('/RoleAdmin/master/data-unit-location')
    }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/unit-location-update'
        this.textBtnSubmit = 'Simpan'
      }

    }
  },  

}
</script>