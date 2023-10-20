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
              <label class="form-label">No. NOD Disetujui</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
              <multiselect
                v-model="field.NODAccNumber"
                :options="opsNODAccNumber"
                :allow-empty="false"
                placeholder="Pilih No. NOD disetujui"
                label="NODNumber"
                track-by="NODNumber"
                @input="onChange"
                required
                :disabled="isEdit || isShow" />
              <span class="text-danger" v-if="allErrors.NODAccNumber">{{ allErrors.NODAccNumber[0] }}</span>
            </b-form-group>
          </b-form-row>
  
          <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">Tanggal Kejadian NOE</label>
              <b-input name="Date" v-model="field.Date" class="mb-1" readonly/>
            </b-form-group>
            <b-form-group class="col-md-6">
              <label class="form-label">No. Kontrol / No. Bets</label>
              <b-input name="BatchNo" :state="allErrors.BatchNo?false:null" v-model="field.BatchNo" class="mb-1" readonly/>
              <span class="text-danger" v-if="allErrors.BatchNo">{{ allErrors.BatchNo[0] }}</span>
            </b-form-group>
          </b-form-row>
  
          <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">Bahan / Produk Terkait</label>
              <b-input name="IdProduct" :state="allErrors.IdProduct?false:null" v-model="field.IdProduct" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.IdProduct">{{ allErrors.IdProduct[0] }}</span>
            </b-form-group>
  
            <b-form-group class="col-md-6">
              <label class="form-label">Uraian / Kondisi Ketidaksesuaian</label>
              <b-textarea name="Event" :state="allErrors.Event?false:null" v-model="field.Event" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.Event">{{ allErrors.Event[0] }}</span>
            </b-form-group>
          </b-form-row>
  
          <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">Kondisi Seharusnya</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-textarea name="ProperCondition" :state="allErrors.ProperCondition?false:null" v-model="field.ProperCondition" class="mb-1" required readonly />
              <span class="text-danger" v-if="allErrors.ProperCondition">{{ allErrors.ProperCondition[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-6">
              <label class="form-label">Man (Personel)</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-textarea name="Man" :state="allErrors.Man?false:null" v-model="field.Man" class="mb-1" required readonly />
              <span class="text-danger" v-if="allErrors.Man">{{ allErrors.Man[0] }}</span>
            </b-form-group>
          </b-form-row>
  
          <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">Machine (Mesin / Peralatan)</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-textarea name="Machine" :state="allErrors.Machine?false:null" v-model="field.Machine" class="mb-1" required readonly />
              <span class="text-danger" v-if="allErrors.Machine">{{ allErrors.Machine[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-6">
              <label class="form-label">Method (Metode / Prosedur)</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-textarea name="Method" :state="allErrors.Method?false:null" v-model="field.Method" class="mb-1" required readonly />
              <span class="text-danger" v-if="allErrors.Method">{{ allErrors.Method[0] }}</span>
            </b-form-group>
          </b-form-row>
  
          <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">Material (Produk / Bahan)</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-textarea name="Material" :state="allErrors.Material?false:null" v-model="field.Material" class="mb-1" required readonly />
              <span class="text-danger" v-if="allErrors.Material">{{ allErrors.Material[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-6">
              <label class="form-label">Milieu (Lingkungan)</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-textarea name="Milieu" :state="allErrors.Milieu?false:null" v-model="field.Milieu" class="mb-1" required readonly />
              <span class="text-danger" v-if="allErrors.Milieu">{{ allErrors.Milieu[0] }}</span>
            </b-form-group>
          </b-form-row>
  
          <b-card class="mb-4" header="Tindakan Perbaikan (Corrective Action)" header-tag="h5">
            <template v-for="(item, index) in field.NODCA">
            <b-form-row>
              <b-form-group class="col-md-6">
                <label class="form-label">PIC</label>
                <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
                <multiselect
                v-model="item.IdCAPIC"
                :options="opsCAPIC"
                :allow-empty="false"
                placeholder="Pilih PIC"
                label="PIC"
                track-by="PIC"
                required
                @input = checkPIC(item.IdCAPIC)
                disabled />
              </b-form-group>
              <b-form-group class="col-md-5 col-10">
                <label class="form-label">Due Date</label>
                <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-datepicker locale="en" v-model="item.CADate" :min="min" class="mb-1" :date-format-options="datePickerFormat" required disabled></b-form-datepicker>
              </b-form-group>
              <b-form-group class="col-md-1 col-2 text-center" v-if="isShow == false && index > 0">
                <label>Tindakan</label><br>
                <b-button class="btn btn-sm btn-danger text-white" :pill="true" disabled @click="removeDetail(index, 'CA')">
                  <i class="ion ion-md-trash"></i>
                </b-button>
              </b-form-group>
            </b-form-row>
  
            <b-form-row>
              <b-form-group class="col-md-6">
                <label class="form-label">Deskripsi</label>
                <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-textarea name="CADescription" v-model="item.CADescription" class="mb-1" required readonly />
              </b-form-group>
  
              <b-form-group class="col-md-6" v-if="isShow == false">
                <label class="form-label">Lampiran Tindakan Perbaikan</label>
                <label class="form-label float-right text-danger">(Max. 50 MB)</label>
                <file-pond
                name="CAFile"
                ref="pondMyFile"
                label-idle="Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;"
                :allow-multiple="true"
                @updatefiles="handleFileCA($event,index)"
                @removefile="handleRemoveCA"
                :files="item.CAFile"
                accepted-file-types="application/*, image/*, video/*"
                maxTotalFileSize="50MB"
                disabled="true" />
              </b-form-group>
  
              <b-form-group class="col-md-4">
                <label class="form-label">Lampiran Tindakan Perbaikan</label>
                <template v-for="(file, i) in item.CAFileName">
                  <b-input-group>
                    <b-form-input name="CAFileName" :value="file" readonly></b-form-input>
                    <b-input-group-append>
                      <a class="input-group-text btn-outline-success" :href="item.CAFile[i]" target="_blank">
                        <i class="fa fa-download"></i>
                      </a>
                    </b-input-group-append>
                  </b-input-group>
                </template>
              </b-form-group>
  
            </b-form-row>
            <hr/>
            </template>
  
            <b-btn v-if="isShow == false" type="button" disabled @click="addDetail('CA')" id="btambah-CA" class="float-left btn-info"><i class="fas fa-plus"></i> Tambah</b-btn>
          </b-card>
  
          <b-card class="mb-4" header="Tindakan Pencegahan (Preventive Action)" header-tag="h5">
            <template v-for="(item, index) in field.NODPA">
            <b-form-row>
              <b-form-group class="col-md-6">
                <label class="form-label">PIC</label>
                <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
                <multiselect
                v-model="item.IdPAPIC"
                :options="opsPAPIC"
                :allow-empty="false"
                placeholder="Pilih PIC"
                label="PIC"
                track-by="PIC"
                required
                disabled />
              </b-form-group>
  
              <b-form-group class="col-md-5 col-10">
                <label class="form-label">Due Date</label>
                <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-datepicker locale="en" v-model="item.PADate" :min="min" class="mb-1" :date-format-options="datePickerFormat" required disabled></b-form-datepicker>
              </b-form-group>
  
              <b-form-group class="col-md-1 col-2 text-center" v-if="isShow == false && index > 0">
                <label>Tindakan</label><br>
                <b-button class="btn btn-sm btn-danger text-white" disabled :pill="true" @click="removeDetail(index, 'PA')">
                  <i class="ion ion-md-trash"></i>
                </b-button>
              </b-form-group>
            </b-form-row>
  
            <b-form-row>
              <b-form-group class="col-md-6">
                <label class="form-label">Deskripsi</label>
                <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-textarea name="PADescription" v-model="item.PADescription" class="mb-1" required readonly />
              </b-form-group>
              <b-form-group class="col-md-6" v-if="isShow == false">
                <label class="form-label">Lampiran Tindakan Pencegahan</label>
                <label class="form-label float-right text-danger">(Max. 50 MB)</label>
                <file-pond
                name="PAFile"
                ref="pondMyFile"
                label-idle="Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;"
                :allow-multiple="true"
                @updatefiles="handleFilePA($event,index)"
                @removefile="handleRemovePA"
                :files="item.PAFile"
                accepted-file-types="application/*, image/*, video/*"
                maxTotalFileSize="50MB"
                disabled = "true" />
              </b-form-group>
  
              <b-form-group  class="col-md-4">
                <label class="form-label">Lampiran Tindakan Pencegahan</label>
                <template v-for="(file, i) in item.PAFileName">
                  <b-input-group>
                    <b-form-input name="PAFileName" :value="file" readonly></b-form-input>
                    <b-input-group-append>
                      <a class="input-group-text btn-outline-success" :href="item.PAFile[i]" target="_blank">
                        <i class="fa fa-download"></i>
                      </a>
                    </b-input-group-append>
                  </b-input-group>
                </template>
              </b-form-group>
  
            </b-form-row>
            <hr/>
            </template>
  
            <b-btn v-if="isShow == false" :disabled = "true" type="button" @click="addDetail('PA')" id="btambah-PA" class="float-left btn-info"><i class="fas fa-plus"></i> Tambah</b-btn>
  
          </b-card>
      
          <b-card class="mb-4" v-if="Position == 2 || Position == 4" header="Sistem Lain Yang Terdampak (Bila Ada)" header-tag="h5">
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-form-group label="Bagian ini diisi oleh QA" disabled> 
              <b-form-radio v-model="selected" :state="allErrors.selected?false:null"  :value="false" :disabled="isShow">Tidak Ada</b-form-radio>
              <b-form-radio v-model="selected" :state="allErrors.selected?false:null"  :value="true" :disabled="isShow">Ada, yaitu ...</b-form-radio>
              <span class="text-danger" v-if="allErrors.selected">{{ allErrors.selected[0] }}</span>
            </b-form-group>
  
            <b-form-group v-if="selected === true" disabled>
              <li v-for="(item, index) in getAnotherEffect" :key="index" >
                    <b-form-checkbox
                        v-model="checkedEffect[item.id_effect]"
                        :value="item.id_effect"
                        :disabled="isShow"
                      >
                      {{item.title_effect}}
                    </b-form-checkbox>                    
  
                    <div v-if="checkedEffect[item.id_effect]">
                      <b-form-textarea
                        id="textarea-state"
                        v-model="text[item.id_effect]"
                        placeholder="Enter at least 10 characters"
                        rows="3"
                        class="mb-4"
                        disabled
                      ></b-form-textarea>
                    </div>
  
              </li>
            </b-form-group>
            
          </b-card>

          <b-form-row>
              <b-form-group class="col-md-12" >
                <label class="form-label">Lampiran CAPA</label>
                <label class="form-label float-right text-danger">(Max. 50 MB)</label>
                <file-pond
                name="CAPAFile"
                ref="pondMyFile"
                label-idle="Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;"
                :allow-multiple="true"
                @updatefiles="handleFileCAPA"
                @removefile="handleRemoveCAPA"
                :files="field.CAPAFile"
                accepted-file-types="application/*, image/*, video/*"
                maxTotalFileSize="50MB"
                required
                :disabled = "isShow || Position === 4"
               />
              </b-form-group>
  
              <b-card v-if="isShow == true" class="mb-3" header="Lampiran CAPA" header-tag="h5">
              <b-form-row>
                <b-form-group class="col-md-12" v-for="(item, index) in field.FileCAPADownload" :key="index">
                  <b-input-group>
                    <b-form-input name="FileCAPADownload" v-model="item[0]" readonly></b-form-input>
                    <b-input-group-append>
                      <a class="input-group-text btn-outline-success" :href="BaseUrl+item[1]" target="_blank">
                        <i class="fa fa-download"></i>
                      </a>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-form-row>
            </b-card>
  
          </b-form-row>
          
          <b-card class="mb-4" v-if="Position == 2 || Position == 4" header="Verifikasi Efektifitas CAPA" header-tag="h5">
            
            <b-form-row v-if="(isShow == true || isEdit == true) && ((Position === 4 || Position === 2) && (valStatus === 2 || valStatus === 3 || valStatus === 4) && userDepartment === 67)">
              <b-form-group class="col-md-12" >
                <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-group > 
                  <b-form-radio v-model="selectedEfektifitasCapa" :state="allErrors.selectedEfektifitasCapa?false:null"  value="approved" :disabled="isShow">CAPA telah dilaksanakan dengan baik</b-form-radio>
                  <b-form-radio v-model="selectedEfektifitasCapa" :state="allErrors.selectedEfektifitasCapa?false:null"  :value="true" :disabled="isShow">Perlu CAPA lain, yaitu :</b-form-radio>
                  <span class="text-danger" v-if="allErrors.selectedEfektifitasCapa">{{ allErrors.selectedEfektifitasCapa[0] }}</span>
                </b-form-group>
                <b-form-group v-if="selectedEfektifitasCapa === true" >
                  <b-form-textarea
                        id="textarea-state"
                        v-model="field.selectedEfektifitasValue"
                        placeholder="Enter at least 10 characters"
                        rows="3"
                        class="mb-4"
                        :disabled="isShow"
                        :required="selectedEfektifitasCapa"
                      ></b-form-textarea>
                </b-form-group>
              </b-form-group>
            </b-form-row>
          </b-card>
          
  
          <b-form-row>
            <b-form-group class="col-md-6"></b-form-group>
            <b-form-group label="" class="col-md-6">
              
              <b-btn v-if="isShow == true && (Position === 4 && valStatus === 2 && userDepartment === 67)"
                type="button" variant="primary" class="float-right ml-2" @click="onAction('approve')">
              Setujui</b-btn>
  
  
              <b-btn v-if="isShow == true && (Position === 4 && valStatus === 2 && userDepartment === 67)"
                type="button" variant="danger" class="float-right ml-2" @click="onAction('reject')">
              Tolak</b-btn>
  
  
              <b-btn v-if="isShow == true && (Position === 4 && valStatus === 2 && userDepartment === 67)"
                type="button" variant="warning" class="float-right ml-2" @click="onAction('correction')">
              Koreksi</b-btn>
  
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
  import Vue from 'vue'
  
  export default {
    name: 'form-nod-report',
    metaInfo: {
      title: 'Form NOD Report'
    },
    components: {
    },
    data () {
      return {
        urlSubmit: '/AdminVue/nod-verifikasi-capa-insert-data',
        headerCard: 'Verifikasi CAPA NOD',
        textBtnSubmit: 'Simpan',
        field: {
          Date: '', //moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
          BatchNo: '',
          IdProduct: '',
          Event: '',
          CAFile: [],
          PAFile: [],
          CAFileName: [],
          PAFileName: [],
          IdDepartment: 0,
          NODCA:[{IdCAPIC:'',CADate:'',CADescription:'',CAFile:[]}],
          NODPA:[{IdPAPIC:'',PADate:'',PADescription:'',PAFile:[]}],
          PublishTo: 0,
          SectionPublish: 0,
          userEntry: 0,
          CAPAFile: [],
          FileCAPADownload: [],
          Status: '',
          selectedEfektifitasValue: ''
        },
        allErrors: [],
        isNotif: false,
        isEdit: false,
        alertNotif: '',
        alertVariant: 'alert-dark-danger',
        opsNODAccNumber: [],
        opsCAPIC: [],
        opsPAPIC: [],
        Position: 0, //1 = unit head; 2 = sect head; 3 = APJ; 4 = dept head;
        valStatus: 0,
        isShow: false,
        userDepartment: 0,
        deptTerkait: false,
        statusDeptTerkait: false,
        OldCAFile: [],
        OldPAFile: [],
        BaseUrl: process.env.BASE_URL,
        isCaretaker: false,
        opsRelevantDept: [],
        isDept: false,
        isRelevantDept: false,
        relevantDeptExist:0,
        min: moment(new Date()).format('YYYY-MM-DD'),
        selected: '',
        selectedEfektifitasCapa : '',
        getAnotherEffect: [],
        checkedEffect: [],
        text: [],
        dataAnotherEffect: [],
        OldCAPAFile: [],
        deptHeadVerification:''
      }
    },
  
    created() {
      // Initialize the 'text' object with default values for each 'title_effect'
      this.getAnotherEffect.forEach((item) => {
        this.text[item.id_effect] = '';
      });
    },
  
    watch: {
      checkedEffect: {
        handler() {
          // Ketika checkbox diubah, perbarui nilai textarea sesuai dengan checkbox yang dicentang
          for (const key in this.checkedEffect) {
            if (this.checkedEffect[key]) {
              if (!this.text[key]) {
                this.text[key] = ''; // Inisialisasi nilai textarea jika belum ada
              }
            } else {
              delete this.text[key]; // Hapus nilai textarea jika checkbox tidak dicentang
            }
          }
        },
        deep: true
      }
    },
    
    methods: {
  
      submitForm () {
        this.showLoading()
        var isEmpty = false
        
        if(isEmpty) {
          this.$swal({
            icon: 'error',
            text: 'Silahkan lengkapi kolom *Wajib Diisi!'
          })
        } else {
          const formData = new FormData()
          formData.append("Id", this.field.Id)
          formData.append("userEntry", this.field.userEntry)
          
          if(this.field.NODAccNumber) formData.append("NODAccNumber", this.field.NODAccNumber.Id)
          
          for( var i = 0; i < this.field.CAPAFile.length; i++ ) {
            let file = this.field.CAPAFile[i];
            formData.append('CAPAFile[' + i + ']', file);
          }
          
          formData.append("OldCAPAFile", JSON.stringify(this.OldCAPAFile))

          let collectedEfektivitas = []

          if(this.selectedEfektifitasCapa === true) {
            collectedEfektivitas = {
              selected: this.selectedEfektifitasCapa,
              efektifitasDesc: this.field.selectedEfektifitasValue
            }
          } else {
            collectedEfektivitas = {
              selected: this.selectedEfektifitasCapa
            }
          }
          
          formData.append("verifikasiEfektivitasCapa", JSON.stringify(collectedEfektivitas))

          const config = {
              headers: { 'content-type': 'multipart/form-data' }
          }
          
          axios.post(this.urlSubmit, formData, config)
          .then( function (res) {
            var resp = res.data
            if(resp.status){
              this.$router.push({
                name: 'nod/master-verifikasi-capa',
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
        }
      },
  
      onChange(option) {
        if(option){
          
          this.getDataNODAcc(option.IdNOEReport, option.Id)
          this.getDataPIC(option.Id)
        }
      },
  
      getData (Id) {
        axios.post('/AdminVue/nod-verifikasi-capa-edit-data', {
          Id:Id,
        })
        .then( function (res) {
          var resp = res.data
          
          this.Position = res.data.position
          this.userDepartment = res.data.department
          this.deptTerkait = res.data.deptTerkait
          this.statusDeptTerkait = res.data.statusDeptTerkait
          this.field.NODAccNumber = resp.data
          this.field.Status = resp.data.statusCapa
          this.deptHeadVerification = resp.data.deptHead

          if(resp.data.efektivitasCapa !== null) {
            this.selectedEfektifitasCapa = resp.data.efektivitasCapa.selected
            this.field.selectedEfektifitasValue = resp.data.efektivitasCapa.efektifitasDesc
          } else {
            this.selectedEfektifitasCapa = null
          }
          
          Vue.set(this.field, 'FileCAPADownload', resp.data.FileCAPADownload)
          
          if(this.field.Status == 'Disetujui oleh QA Section Head') this.valStatus = 2
          if(this.field.Status == 'Diverifikasi oleh QA Dept Head') this.valStatus = 3
          if(this.field.Status == 'ditolak') this.valStatus = 4
          
          this.field.CAPAFile = resp.data.fileCAPA

          if(this.field.CAPAFile != ''){
          let countFileCAPA = this.field.CAPAFile.length
            for (let i = 0; i < countFileCAPA; i++) {
              this.OldCAPAFile.push(this.field.CAPAFile[i])
              this.field.CAPAFile.push(process.env.BASE_URL + this.field.CAPAFile[i])
            }
          }
          if(this.field.CAPAFile == ''){
            this.OldCAPAFile = '';
          }
          
          this.getDataNODAcc(resp.data.IdNOEReport, resp.data.Id)
          this.getDataPIC(resp.data.IdNOEReport)
  
  
        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.isNotif = true
          this.alertNotif = 'Invalid Server Side!'
          this.alertVariant = 'alert-dark-danger'
        }.bind(this))
      },
  
      getNODAccNumber () {
        axios.post('/AdminVue/nod-report-get-acc-number')
        .then( function (res) {
          this.opsNODAccNumber = res.data.data
        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.opsNODAccNumber = []
        }.bind(this))
      },
  
      getDataNODAcc (Id, IdNOD) {
        axios.post('/AdminVue/nod-verifikasi-capa-get-data', {
          Id:Id,
          IdNOD:IdNOD
        })
        .then( function (res) {
          
          this.Position = res.data.position
          this.field.BatchNo = res.data.data.BatchNo
          this.field.IdProduct = res.data.data.Product
          this.field.Event = res.data.data.Event
          this.field.PublishTo = res.data.data.IdPublish
          this.field.SectionPublish = res.data.data.publishSection
          this.field.userEntry = res.data.getUserEntry
          this.field.Date = moment(res.data.data.Date).format('DD/MM/YYYY HH:mm:ss')
          this.field.NODCA = res.data.NODCA
          this.field.NODPA = res.data.NODPA
          this.field.ProperCondition = res.data.data.ProperCondition
          this.field.Man = res.data.data.Man
          this.field.Machine = res.data.data.Machine
          this.field.Method = res.data.data.Method
          this.field.Material = res.data.data.Material
          this.field.Milieu = res.data.data.Milieu
          
          this.opsRelevantDept = res.data.data.RelevantDept
          
          if(res.data.data.IdRelevantDept != 0) {    
            JSON.parse(res.data.data.IdRelevantDept).filter((value) => {
              return value == res.data.data.IdDepartmentSession ? this.isRelevantDept = true : this.isRelevantDept
            }, {})
          }
          res.data.data.TypeUser == 15 ? this.isDept = true : this.isDept
          this.relevantDeptExist = res.data.data.IdRelevantDept 
          
          this.field.NODCA.forEach((value,index) => {
            if(value){
              if(value.CAFile!='') {
                value.IdCAPIC = {'Id': value.IdCAPIC , 'PIC': value.CAPIC}
                value.CAFile = JSON.parse(value.CAFile)
                this.OldCAFile.push(value.CAFile)
                value.CAFileName = []
                value.CAFile.forEach((val, i)=> {
                  value.CAFile[i] = window.location.origin + '/' + val
                  let result = val.split('/')
                  value.CAFileName[i] = result[4]
                })
              }else{
                this.OldCAFile.push('')
              }
            }
          })
  
          this.field.NODPA.forEach((value,index) => {
            if(value){
              if(value.PAFile!='') {
                value.IdPAPIC = {'Id': value.IdPAPIC , 'PIC': value.PAPIC}
                value.PAFile = JSON.parse(value.PAFile)
                this.OldPAFile.push(value.PAFile)
                value.PAFileName = []
                value.PAFile.forEach((val, i)=> {
                  value.PAFile[i] = window.location.origin + '/' + val
                  let result = val.split('/')
                  value.PAFileName[i] = result[4]
                })
              }else{
                this.OldPAFile.push('')
              }
            }
          })
          
          this.getAnotherEffect = res.data.getAnotherEffect
  
          let selectedAnotherEffect = Object.values(res.data.selectedAnotherEffect)
          
          if(selectedAnotherEffect) {
            selectedAnotherEffect.forEach((item, index) => {
              if(item !== false) {
                this.selected = item.selected
                this.checkedEffect[item.id_effect] = item.id_effect
                this.text[item.id_effect] = item.text
              } else {
                this.selected = item
              }
            })
          }
          
          this.min = moment(res.data.data.Date).format('YYYY-MM-DD')
        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.field.BatchNo = ''
          this.field.IdProduct = ''
          this.field.Event = ''
        }.bind(this))
      },
  
      getDataPIC (idNOEReport) {
        axios.post('/AdminVue/nod-report-get-data-pic',{
          IdNOEReport: idNOEReport
        })
        .then( function (res) {
          this.opsCAPIC = res.data.data
          this.opsPAPIC = res.data.data
        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.opsCAPIC = []
          this.opsPAPIC = []
        }.bind(this))
      },
  
      handleFileCA: function(files,index) {
        this.field.NODCA[index].CAFile = files.map(files => files.file)
      },
  
      handleRemoveCA: function(error, files){
        this.OldCAFile.forEach((val, k)=> {
          val.forEach((v, i)=> {
            if(v == files.source) {
              this.OldCAFile[k].splice(i,1)
            }
          })
        })
      },
  
      handleFilePA: function(files,index) {
        this.field.NODPA[index].PAFile = files.map(files => files.file)
      },
  
      handleRemovePA: function(error, files){
        this.OldPAFile.forEach((val, k)=> {
          val.forEach((v, i)=> {
            if(v == files.source) {
              this.OldPAFile[k].splice(i,1)
            }
          })
        })
      },

      handleFileCAPA: function(files) {
      this.field.CAPAFile = files.map(files => files.file)
      },

      handleRemoveCAPA: function(error,files){
        let result = typeof(files.source)
        if(this.isEdit == true && result === 'string'){
          let index = this.OldCAPAFile.indexOf(files.source.replace('/clouds','clouds'))
          this.OldCAPAFile.splice(index,1)
        }
      },
  
      addDetail(type) {
        
        if(type=='CA')
        {
          const newCA = {'IdCAPIC':'','CADate':'','CADescription':'','CAFile':[]}
          Vue.set(this.field.NODCA, this.field.NODCA.length, newCA)
          this.$forceUpdate()
        } 
        else
        {
          const newPA = {'IdPAPIC':'','PADate':'','PADescription':'','PAFile':[]}
          Vue.set(this.field.NODPA, this.field.NODPA.length, newPA)
          this.$forceUpdate()
        } 
  
      },
  
      checkPIC(value) {
        this.$forceUpdate()
      },
  
      removeDetail(index, type) {
        if(type=='CA') { 
          this.field.NODCA.splice(index,1)
          this.$forceUpdate()
        }
        else {
          this.field.NODPA.splice(index,1)
          this.$forceUpdate()
        }
      },
  
      backIndex() {
        this.$router.push('/RoleAdmin/nod/master-verifikasi-capa')
      },
  
      onAction(action){
        if(action == 'publish'){
          this.publish('/AdminVue/nod-report-publish', this.field.Id, this.$parent, true)
        }
        if(action == 'approve'){
          this.approveVerifikasiCapa('/AdminVue/nod-verifikasi-capa-approve-data', this.field.Id, this.$parent, null, true, this.selectedEfektifitasCapa, this.deptHeadVerification)
        }
        if(action == 'reject'){
          this.rejectCAPA('/AdminVue/nod-verifikasi-capa-reject-data', this.field.Id, this.$parent, null, true)
        }
        if(action == 'correction'){
          this.$router.push({
            name: 'nod/form-correction-verifikasi-capa',
            params: {
              Id: this.field.Id
            }
          })
        }
      }
  
    },
  
    mounted(){
  
      this.getNODAccNumber()
      
      if(this.$route.params.isFormEdit){
        var Id = this.$route.params.Id
        this.isEdit = true
       
        if(Id){
          this.getData(Id)
          this.field.Id = Id
          this.urlSubmit = '/AdminVue/nod-verifikasi-capa-update-data'
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