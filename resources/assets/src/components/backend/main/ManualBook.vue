<template>
  <div>

    <b-card header="Data Buku Manual" header-tag="h4" class="mb-4">

      <form method="POST" @submit.prevent="submitForm()">
        <b-form-row>

          <b-form-group class="col-md-6">
            <label class="form-label">File Buku Manual</label>
            <b-input-group>
              <b-form-input name="FileEventDownload" value="Buku Manual e-DMS" readonly></b-form-input>
              <b-input-group-append>
                <a class="input-group-text btn-outline-success"  @click="isShowing ^= true">
                  <i class="fa fa-download"></i>
                </a>
              </b-input-group-append>
            </b-input-group>
            </b-form-group>

          <b-form-group class="col-md-6" v-if="typeUser==1 || typeUser==8">
            <label class="form-label">Upload File Buku Manual</label>
            <file-pond
              name="myFile"
              ref="pondMyFile"
              label-idle="Klik untuk mencari atau Taruh file disini..."
              :allow-multiple="false"
              @updatefiles="handleFile"
              accepted-file-types="application/pdf"
              required />
          </b-form-group>
        </b-form-row>

        <b-form-row v-if="typeUser==1 || typeUser==8">
          <b-form-group class="col-md-6"></b-form-group>
          <b-form-group label="" class="col-md-6">
            <b-btn type="submit" variant="primary" class="float-right ml-2">Simpan</b-btn>
          </b-form-group>
        </b-form-row>

      </form>

<!--COBA SHOW PDF-->
<div id="app">
        <b-form-row>
          <b-form-group class="col-md-12">  
          <embed v-show="isShowing" style=" max-width: 100%;min-width: 100% !important; height:1290px !important;" src="/clouds/backend/template/ManualBook.pdf" >
          </b-form-group>
        </b-form-row>
</div>
<!--COBA SHOW PDF-->




    </b-card>
  </div>
</template>	
<script>

import Vue from 'vue'

export default {
  name: 'index-manual-book',
  metaInfo: {
    title: 'Buku Manual'
  },

  data () { return {
    File: '',
    typeUser: 0,
      isShowing:false,
  } },

  methods: {
    submitForm () {
      this.showLoading()
      const formData = new FormData()
      formData.append("File", this.File[0])

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post('/AdminVue/manual-book-update', formData, config)
      .then( function (res) {
        var resp = res.data
        this.hideLoading()
        if(resp.status){
          Vue.swal({
            icon: 'success',
            text: resp.message
          })

        }else{
          Vue.swal({
            icon: 'error',
            text: resp.message
          })
        }
        this.$refs.pondMyFile.removeFile()
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.hideLoading()
        Vue.swal({
          icon: 'error',
          text: resp.message
        })
        this.$refs.pondMyFile.removeFile()
      }.bind(this))
    },
    handleFile: function(files) {
      this.File = files.map(files => files.file)
    }


  },

  mounted () {
    axios.post('/AdminVue/auth-get-session')
    .then( function (res) {
      var resp = res.data.data
      this.typeUser = resp.TypeUser
    }.bind(this))
    .catch( function (e) {
      console.log(e)
    }.bind(this))
  }
}




</script>