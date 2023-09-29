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
            <label class="form-label">Kode</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Code" :state="allErrors.Code?false:null" v-model="field.Code" class="mb-1" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.Code">{{ allErrors.Code[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
            <label class="form-label">Divisi</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.Division"
              :options="opsDivision"
              :allow-empty="false"
              :show-labels="false"
              placeholder="Pilih Divisi"
              label="Department"
              track-by="Department"
              @select="onSelect"
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.Division">{{ allErrors.Division[0] }}</span>
          </b-form-group>
        
          <b-form-group class="col-md-4">
            <label class="form-label">Departemen</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.Department"
              :options="opsDepartment"
              @input="getParent"
              :allow-empty="false"
              placeholder="Pilih Departemen"
              label="Department"
              track-by="Department"
              :disabled="isShow" />
              <small class="float-right text-primary" v-if="isShow == false">Pilih Divisi Terlebih Dahulu</small>
            <span class="text-danger" v-if="allErrors.Department">{{ allErrors.Department[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-4">
            <label class="form-label">Atasan Posisi</label>
            <multiselect
              v-model="field.Parent"
              :multiple="true"
              :options="opsParent"
              :allow-empty="true"
              placeholder="Pilih Departemen Dahulu"
              label="Name"
              track-by="Name"
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.Parent">{{ allErrors.Parent[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-4">
            <label class="form-label">Posisi</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
            <label class="form-label">Status</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.Status"
              :preselectFirst="true"
              :options="opsStatus"
              :allow-empty="false"
              :show-labels="false"
              selectLabel=""
              deselectLabel=""
              placeholder="Pilih Status"
              label="text"
              track-by="text"
              :disabled="isShow" />
            <small v-if="isShow == false" class="float-right text-primary">*Status Active untuk Setujui Laporan NOE & NOD</small>
            <span class="text-danger" v-if="allErrors.Division">{{ allErrors.Division[0] }}</span>
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

export default {
  name: 'form-position',
  metaInfo: {
    title: 'Form Position'
  },
  components: {
    
  },
  data () {
    return {
      urlSubmit: '/AdminVue/position-insert',
      headerCard: 'Posisi',
      textBtnSubmit: 'Simpan',
      field: {
        
      },
      allErrors: [],
      opsParent:[],
      opsDepartment:[],
      opsDivision:[],
      opsStatus:[{'value':1, text:'Active'}, {'value':0, text:'Not Active'}],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      isShow: false
    }
  },
  methods: {
    submitForm () {
      var isEmpty = false
      if(!this.field.Department || !this.field.Division) {
        isEmpty = true
      }

      if(isEmpty) {
        this.$swal({
          icon: 'error',
          text: 'Silahkan lengkapi kolom *Wajib Diisi!'
        })
      } else {
        const formData = new FormData()
        
        if(this.field.Parent) this.field.Parent = this.field.Parent
        else this.field.Parent = 0
        formData.append("Id", this.field.Id)
        if(this.field.Department) formData.append("IdDepartment", this.field.Department.Id)
        else formData.append("IdDepartment", 0)
        if(this.field.Division) formData.append("IdDivision", this.field.Division.Id)
        else formData.append("IdDivision", 0)
        formData.append("Parent", JSON.stringify(this.field.Parent))
        formData.append("Code", this.field.Code)
        formData.append("Name", this.field.Name)
        formData.append("Status", this.field.Status.value)

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post(this.urlSubmit, formData, config)
        .then( function (res) {
          var resp = res.data

          if(resp.status){

            this.$router.push({
              name: 'master/data-position',
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
      }
    },

    getData (Id) {
      axios.post('/AdminVue/position-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        if(this.field.Division && this.isShow == false) this.getDepartment(this.field.Division.Id)
        if(this.field.Department != 0 && this.isShow == false){
          this.getParent(null, 1)
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getDivision () {
      axios.post('/AdminVue/position-get-division',{
      })
      .then( function (res) {
        this.opsDivision = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsDivision = []
      }.bind(this))
    },

    getDepartment (Id) {
      axios.post('/AdminVue/position-get-department',{
        IdDivision: Id,
      })
      .then( function (res) {
        this.opsDepartment = res.data.data
        if(this.opsDepartment.length < 1) this.field.Department = null
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsDepartment= []
      }.bind(this))
    },

    getParent (value, mode=0) {
      if(mode==0) var id = value.Id
      else var id = this.field.Department.Id
      var idPosition = 0
      if(this.field.Id) idPosition = this.field.Id

      axios.post('/AdminVue/position-getParent',{
        IdPosition: idPosition,
        IdDepartment: id
      })
      .then( function (res) {
        this.opsParent = res.data.parent
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsParent = []
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-position')
    },

    onSelect(option) {
      if(option) this.getDepartment(option.Id)
    }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/position-update'
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
    if(this.isShow == false) this.getDivision()
  },  

}
</script>