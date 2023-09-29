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
            <label class="form-label">Departemen</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.IdDepartment"
              :options="opsDepartment"
              :allow-empty="false"
              placeholder="Pilih Departemen"
              label="Department"
              track-by="Department"
              @select="onSelect" />
            <span class="text-danger" v-if="allErrors.IdDepartment">{{ allErrors.IdDepartment[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Posisi</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.IdPosition"
              :options="opsPosition"
              :allow-empty="true"
              placeholder="Pilih Posisi"
              label="Position"
              track-by="Position" />
            <span class="text-danger" v-if="allErrors.IdPosition">{{ allErrors.IdPosition[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Nama Karyawan</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">NIP</label>
            <b-input name="NIP" :state="allErrors.NIP?false:null" v-model="field.NIP" class="mb-1" type="number" />
            <span class="text-danger" v-if="allErrors.NIP">{{ allErrors.NIP[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">No. HP</label>
            <b-input name="CellPhone" :state="allErrors.CellPhone?false:null" v-model="field.CellPhone" class="mb-1" type="number" />
            <span class="text-danger" v-if="allErrors.CellPhone">{{ allErrors.CellPhone[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Hak Akses User</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.TypeUser"
              :options="opsTypeUser"
              :allow-empty="false"
              placeholder="Pilih Hak Akses User"
              label="TypeUser"
              track-by="TypeUser" />
            <span class="text-danger" v-if="allErrors.TypeUser">{{ allErrors.TypeUser[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Nama User</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="UserName" :state="allErrors.UserName?false:null" v-model="field.UserName" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.UserName">{{ allErrors.UserName[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Password</label>
            <label v-if="isFormCreate" class="form-label float-right text-danger">*Wajib Diisi</label>
            <label v-if="!isFormCreate" class="form-label float-right text-primary">*Kosongkan jika tidak ingin merubah Password</label>
            <b-input name="Password" :state="allErrors.Password?false:null" v-model="field.Password" class="mb-1" type="password" :required="isFormCreate" />
            <span class="text-danger" v-if="allErrors.Password">{{ allErrors.Password[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Email</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input type="email" name="Email" :state="allErrors.Email?false:null" v-model="field.Email" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Email">{{ allErrors.Email[0] }}</span>
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
  name: 'form-user-employee',
  metaInfo: {
    title: 'Form User Karyawan'
  },
  components: {
    
  },
  data () {
    return {
      urlSubmit: '/AdminVue/user-employee-insert',
      headerCard: 'User Karyawan',
      textBtnSubmit: 'Simpan',
      field: {
        CellPhone: 0
      },
      allErrors: [],
      isNotif: false,
      isFormCreate: true,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsDepartment: [],
      opsPosition: [],
      opsTypeUser: []
    }
  },
  methods: {
    submitForm () {
      let isEmpty = false
      if(this.field.IdDepartment === null || this.field.IdPosition === null || this.field.TypeUser === null) {
        isEmpty = true
      }

      if(isEmpty) {
        this.$swal({
          icon: 'error',
          text: 'Silahkan lengkapi kolom *Wajib Diisi!'
        })
      } else {
        const formData = new FormData()
        formData.append("Id", this.field.Id)
        if(this.field.IdDepartment) formData.append("IdDepartment", this.field.IdDepartment.Id)
        if(this.field.IdPosition) formData.append("IdPosition", this.field.IdPosition.Id)
        formData.append("Name", this.field.Name)
        formData.append("NIP", this.field.NIP)
        formData.append("CellPhone", this.field.CellPhone)
        if(this.field.TypeUser) formData.append("TypeUser", this.field.TypeUser.Id)
        formData.append("UserName", this.field.UserName)
        if(this.field.Password) formData.append("Password", this.field.Password)
        formData.append("Email", this.field.Email)

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post(this.urlSubmit, formData, config)
        .then( function (res) {
          var resp = res.data

          if(resp.status){

            this.$router.push({
              name: 'master/data-user-employee',
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
      axios.post('/AdminVue/user-employee-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        if(this.field.IdDepartment) this.getPosition(this.field.IdDepartment.Id)
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getDepartment () {
      axios.post('/AdminVue/user-get-department')
      .then( function (res) {
        this.opsDepartment = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsDepartment = []
      }.bind(this))
    },

    getPosition (IdDepartment) {
      axios.post('/AdminVue/user-get-position',{
          IdDepartment: IdDepartment
      })
      .then( function (res) {
        this.opsPosition = res.data.data
        if(this.opsPosition.length == 0) this.field.IdPosition = null
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsPosition = []
      }.bind(this))
    },

    getTypeUser () {
      axios.post('/AdminVue/user-get-type-user')
      .then( function (res) {
        this.opsTypeUser = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsTypeUser = []
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-user-employee')
    },

    onSelect(option) {
      this.getPosition(option.Id)
    }

  },

  mounted(){

    this.getDepartment()
    this.getTypeUser()

    if(this.$route.params.isFormEdit){
      this.isFormCreate = false
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/user-employee-update'
        this.textBtnSubmit = 'Simpan'
      }

    }
  },  

}
</script>