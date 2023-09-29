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
              <label class="form-label">Nama Menu</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
              <multiselect
                v-model="field.IdMenu"
                :options="opsLocation"
                :allow-empty="false"
                placeholder="Pilih Menu"
                label="text"
                track-by="text"
                required
                :disabled="isShow" />
              <span class="text-danger" v-if="allErrors.IdMenu">{{ allErrors.IdMenu[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-6">
                <label class="form-label">Kejadian</label>
                <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-textarea name="Incident" :state="allErrors.Incident?false:null" v-model="field.Incident" class="mb-1" required :readonly="isShow" />
                <span class="text-danger" v-if="allErrors.Incident">{{ allErrors.Incident[0] }}</span>
            </b-form-group>
          </b-form-row>
  
          <!-- <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">Hak Access</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
              <multiselect
                v-model="field.IdUserAccess"
                :options="opsTypeUser"
                :show-labels="false"
                :multiple="true"
                placeholder="Pilih Jenis Kejadian"
                label="TypeUser"
                track-by="TypeUser"
                required
                :disabled="isShow" />
              <span class="text-danger" v-if="allErrors.IdUserAccess">{{ allErrors.IdUserAccess[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-6">
                <label class="form-label">Langkah Yang Bisa di lakukan</label>
                <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-textarea name="CorrectiveAction" :state="allErrors.CorrectiveAction?false:null" v-model="field.CorrectiveAction" class="mb-1" required :readonly="isShow" />
                <span class="text-danger" v-if="allErrors.CorrectiveAction">{{ allErrors.CorrectiveAction[0] }}</span>
            </b-form-group>
          </b-form-row> -->
        <b-form-row>
          <b-form-group class="col-md-12">
            <label>Langkah Yang Bisa di lakukan</label>
            <label class="form-label float-right text-danger">(Max. 100 MB)</label>
            <el-tiptap v-model="field.Content" :extensions="extensions" :readonly="isShow"/>
            <!-- <file-pond
            name="CorrectiveActionFile"
            ref="pondMyFile"
            label-idle="Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain; 5.Format PDF"
            :allow-multiple="true"
            @updatefiles="handleFileCorrective"
            @removefile="handleRemoveCorrective"
            :files="field.CorrectiveActionFile"
            accepted-file-types="application/pdf"
            maxTotalFileSize="100MB"
            :disabled="isShow" /> -->
          </b-form-group>
        </b-form-row>

        <!-- <b-card v-if="isShow == true" class="mb-3" header="Lampiran Tindakan Koreksi yang Dilakukan" header-tag="h5">
          <b-form-row>
            <b-form-group  class="col-md-12">
              <div class="mt-3">
                <div class="mb-3">
                  <b-row>
                    <b-col> 
                      <b-form-checkbox v-model="show">ShowData</b-form-checkbox>
                    </b-col>
                    <b-col>
                      <b-form-select  v-model="src" style="width: 30em"> 
                        <b-form-select-option  value="" >Pilih Manual Book Pdf</b-form-select-option>
                        <b-form-select-option  v-for="(item, index) in pdfList" :value="BaseUrl+item" v-text="item" :key="index"></b-form-select-option>
                      </b-form-select>
                    </b-col> 
                  </b-row>
                </div>
                
                <div class="mb-3">
                  <b-row>
                    <b-col>
                      <b-form inline class="">
                        <label class="form-label" style="padding-right: 10px">Change Pages</label>
                        <b-form-input v-model.number="page" type="number" style="width: 5em"> /{{numPages}} </b-form-input>
                      </b-form>
                    </b-col>
                    <b-col>
                      <b-button @click="rotate += 90" variant="outline-info">&#x27F3;</b-button>
                    </b-col>
                    <b-col>
                      <b-button @click="rotate -= 90" variant="outline-info">&#x27F2;</b-button>
                    </b-col>
                    <b-col>
                      <b-button @click="$refs.pdf.print()" variant="outline-info">print</b-button>
                    </b-col>
                  </b-row>
                </div>

                
                  <div style="width: 100%">
                    <div v-if="loadedRatio > 0 && loadedRatio < 1" 
                      style="background-color: green; color: white; text-align: center" 
                      :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%
                    </div>
                      <pdf v-if="show" 
                      ref="pdf" 
                      style="border: 1px solid red" 
                      :src="src" 
                      :page="page" 
                      :rotate="rotate" 
                      @password="password" 
                      @progress="loadedRatio = $event" 
                      @error="error" 
                      @num-pages="numPages = $event" 
                      @link-clicked="page = $event">
                      </pdf>
                  </div>  
              </div>
            </b-form-group>
          </b-form-row>
        </b-card> -->

        
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
  // import pdf from 'vue-pdf'
  import pdf from '@teckel/vue-pdf'
  import {
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  Image,
  TextAlign,
  ListItem,
  Link,
  CodeBlock,
  BulletList,
  OrderedList,
  FontType,
} from 'element-tiptap'
  
  export default {
    name: 'form-noe-report',
    metaInfo: {
      title: 'Form NOE Report'
    },
    components: {
      MaskedInput,
      pdf
    },
    data () {
      return {
        extensions: [
          new Doc(),
          new Text(),
          new Paragraph(),
          new Heading({ level: 5 }),
          new Bold({ bubble: true }), // render command-button in bubble menu.
          new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
          new Italic(),
          new Strike(),
          new Image(),
          new TextAlign(),
          new ListItem(),
          new Link(),
          new CodeBlock(),
          new BulletList(),
          new OrderedList(),
          new FontType(),
        ],
        urlSubmit: '/AdminVue/master-trouble-shoot-insert',
        headerCard: 'Form TroubleShoot',
        textBtnSubmit: 'Simpan',
        field: {
          EventFile: [],
          CorrectiveActionFile: [],
          Date: moment(new Date()).format('YYYY-MM-DD'),
          FileEventDownload: [],
          FileCorrectiveActionDownload: [],
          Time: '09:00',
          Content: '',
        },
        allErrors: [],
        isNotif: false,
        isEdit: false,
        alertNotif: '',
        alertVariant: 'alert-dark-danger',
        opsProduct: [],
        opsLocation: [],
        opsTypeUser: [],
        OldEventFile: [],
        OldCorrectiveActionFile: [],
        valStatus: 0,
        isShow: false,
        BaseUrl: process.env.BASE_URL,
        isButton: false,
        show: true,
        pdfList: [],
        src:'',
        loadedRatio: 0,
        page: 1,
        numPages: 0,
        rotate: 0,
      }
    },

    methods: {
      submitForm () {
        this.showLoading()
        const formData = new FormData()
   
        formData.append("Id", this.field.Id)
        if(this.field.IdMenu) formData.append("IdMenu",  JSON.stringify(this.field.IdMenu.text))
        formData.append("Incident", this.field.Incident)
        if(this.field.IdUserAccess) formData.append("IdUserAccess", JSON.stringify(this.field.IdUserAccess))
        formData.append("CorrectiveAction", this.field.CorrectiveAction)
        formData.append("Content", this.field.Content)

        // for( var n = 0; n < this.field.CorrectiveActionFile.length; n++ ){
        //   let file = this.field.CorrectiveActionFile[n];
        //   formData.append('CorrectiveActionFile[' + n + ']', file);
        // }
        // formData.append("OldCorrectiveActionFile", JSON.stringify(this.OldCorrectiveActionFile))
  
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
  
        axios.post(this.urlSubmit, formData, config)
        .then( function (res) {
          this.hideLoading()
          var resp = res.data
  
          if(resp.status){
  
            this.$router.push({
              name: 'main/master-trouble-shoot',
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
        axios.post('/AdminVue/master-trouble-shoot-edit', {
          Id:Id,
        })
        .then( function (res) {
          var resp = res.data
          this.field = resp.data  
          this.field.Content = resp.data.CorrectiveActionFile

          // this.field.CorrectiveActionFile = []
          
          // if(this.field.FileCorrectiveAction != ''){
          //   let countFileCorrectiveAction = this.field.FileCorrectiveAction.length
          //   for (let i = 0; i < countFileCorrectiveAction; i++) {
          //     this.OldCorrectiveActionFile.push(this.field.FileCorrectiveAction[i])
          //     this.field.CorrectiveActionFile.push(process.env.BASE_URL + this.field.FileCorrectiveAction[i])
          //   }
          // }
          // if(this.field.CorrectiveActionFile == ''){
          //   this.OldCorrectiveActionFile = '';
          // }

          // if(this.field.FileCorrectiveActionDownload != '')
          // {
          //   let countFileCorrectiveActionDownload = this.field.FileCorrectiveActionDownload.length
          //   for (let i = 0; i < countFileCorrectiveActionDownload; i++)
          //   {
          //     let path = this.field.FileCorrectiveActionDownload[i]
          //     this.pdfList.push(path[1])
          //   }
          // }
          
          this.isButton = resp.isButton
        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.isNotif = true
          this.alertNotif = 'Invalid Server Side!'
          this.alertVariant = 'alert-dark-danger'
        }.bind(this))
      },
  
      getMenuText () {
        axios.post('/AdminVue/user-access-getJsonTree')
        .then( function (res) {
          var getObjMenu = JSON.parse(res.data.action)
          this.opsLocation = getObjMenu
        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.opsLocation = []
        }.bind(this))
      },
  
      getUser () {
        axios.post('/AdminVue/master-trouble-shoot-get-user')
        .then( function (res) {
          this.opsTypeUser = res.data.data
        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.opsTypeUser = []
        }.bind(this))
      },
  
      // handleFileCorrective: function(files) {
      //   // console.log('FilePond Updated')
      //   // example of instance method call on pond reference
      //   this.field.CorrectiveActionFile = files.map(files => files.file)
      //   // console.log( this.field.myFile )
      // },
  
      // handleRemoveCorrective: function(error,files){
      //   let result = typeof(files.source)
      //   if(this.isEdit == true && result === 'string'){
      //     let index = this.OldCorrectiveActionFile.indexOf(files.source.replace('/clouds','clouds'))
      //     this.OldCorrectiveActionFile.splice(index,1)
      //   }
      // },
  
      backIndex() {
        this.$router.push('/RoleAdmin/main/master-trouble-shoot')
      },

      password: function(updatePassword, reason) {

       updatePassword(prompt('password is "test"'));
      },

      error: function(err) {

      // console.log(err);
      }
  
    },

    watch: {
      page(newPage){
        if(this.numPages > newPage)
        {
          this.numPages = newPage
        }
      }
    },
  
    mounted(){
  
      this.getMenuText()
      this.getUser()
  
      if(this.$route.params.isFormEdit){
        var Id = this.$route.params.Id
        this.isEdit = true
        if(Id){
          this.getData(Id)
          this.field.Id = Id
          this.urlSubmit = '/AdminVue/master-trouble-shoot-update'
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