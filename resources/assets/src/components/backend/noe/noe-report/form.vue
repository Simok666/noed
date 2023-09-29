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
            <label v-if="isNOEAcc == true" class="form-label">No. NOE</label>
            <label v-if="isNOEAcc == false" class="form-label">No. DRAFT NOE</label>
            <b-input name="NOENumber" :state="allErrors.NOENumber?false:null" v-model="field.NOENumber" class="mb-1" ref="iNOENumber" readonly required />
            <span class="text-danger" v-if="allErrors.NOENumber">{{ allErrors.NOENumber[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Tanggal / Waktu</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input-group>
              <!-- <b-form-datepicker locale="en" v-on:input="generateNumber(field.Date)" v-model="field.Date" class="mb-1" :date-format-options="datePickerFormat" required :disabled="isShow"></b-form-datepicker> -->
              <VueDatePicker
                v-model="field.Date"
                @input="generateNumber(field.Date)"
                class="mb-1"
                required 
                :allowed-dates="allowedDates"
                :disabled="isShow"
                :format="dateFormat"
                :locale="locale"
              /> 
              <b-input-group-append>
                <!-- <b-form-timepicker class="mb-1" v-model="field.Time" aria-required="true" :disabled="isShow" :hour12="false"></b-form-timepicker> -->
                <masked-input type="text" class="form-control" placeholder="Contoh 4 digit : 09:00"
                  v-model="field.Time"
                  :guide="false"
                  :mask="[/\d/, /\d/, '.', /\d/, /\d/]" 
                  :disabled="isShow"/>
              </b-input-group-append>
            </b-input-group>
            <span class="text-danger" v-if="allErrors.Date">{{ allErrors.Date[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">No. Kontrol / No. Bets</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="BatchNo" :state="allErrors.BatchNo?false:null" v-model="field.BatchNo" class="mb-1" @input="onControlBets(field.BatchNo)" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.BatchNo">{{ allErrors.BatchNo[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Bahan / Produk Terkait</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.IdProduct"
              :options="opsProduct"
              :allow-empty="false"
              placeholder="Pilih Bahan / Produk Terkait"
              label="Product"
              track-by="Product"
              required
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.IdProduct">{{ allErrors.IdProduct[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Lokasi Kejadian</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.IdLocation"
              :options="opsLocation"
              :allow-empty="false"
              placeholder="Pilih Lokasi Kejadian"
              label="Location"
              track-by="Location"
              required
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.IdLocation">{{ allErrors.IdLocation[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Jenis Kejadian</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
            <!-- "NOTES = FOR MULTIPLE"   :multiple="true" -->
            <multiselect
              v-model="field.IdTypeIncident"
              :options="opsTypeIncident"
              :show-labels="false"
              placeholder="Pilih Jenis Kejadian"
              label="TypeIncident"
              track-by="TypeIncident"
              required
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.IdTypeIncident">{{ allErrors.IdTypeIncident[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Uraian Kejadian</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="Event" :state="allErrors.Event?false:null" v-model="field.Event" class="mb-1" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.Event">{{ allErrors.Event[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6" v-if="isShow == false">
            <label>Lampiran Uraian Kejadian</label>
            <label class="form-label float-right text-danger">*Wajib Diisi (Max. 50 MB)</label>
            <file-pond
            name="EventFile"
            ref="pondMyFile"
            label-idle="Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;"
            :allow-multiple="true"
            @updatefiles="handleFileEvent"
            @removefile="handleRemoveEvent"
            :files="field.EventFile"
            accepted-file-types="application/*, image/*, video/*"
            maxTotalFileSize="50MB"
            required
            :disabled="isShow" />
          </b-form-group>
        </b-form-row>

        <b-card v-if="isShow == true" class="mb-3" header="Lampiran Uraian Kejadian" header-tag="h5">
          <b-form-row>
            <b-form-group class="col-md-4" v-for="(item, index) in field.FileEventDownload" :key="index">
              <b-input-group>
                <b-form-input name="FileEventDownload" v-model="item[0]" readonly></b-form-input>
                <b-input-group-append>
                  <a class="input-group-text btn-outline-success" :href="BaseUrl+item[1]" target="_blank">
                    <i class="fa fa-download"></i>
                  </a>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-form-row>
        </b-card>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Tindakan Koreksi yang Dilakukan</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="CorrectiveAction" :state="allErrors.CorrectiveAction?false:null" v-model="field.CorrectiveAction" class="mb-1" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.CorrectiveAction">{{ allErrors.CorrectiveAction[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6" v-if="isShow == false">
            <label>Lampiran Tindakan Koreksi yang Dilakukan</label>
            <label class="form-label float-right text-danger">(Max. 50 MB)</label>
            <file-pond
            name="CorrectiveActionFile"
            ref="pondMyFile"
            label-idle="Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;"
            :allow-multiple="true"
            @updatefiles="handleFileCorrective"
            @removefile="handleRemoveCorrective"
            :files="field.CorrectiveActionFile"
            accepted-file-types="application/*, image/*, video/*"
            maxTotalFileSize="50MB"
            :disabled="isShow" />
          </b-form-group>
        </b-form-row>

        <b-card v-if="isShow == true" class="mb-3" header="Lampiran Tindakan Koreksi yang Dilakukan" header-tag="h5">
          <b-form-row>
            <b-form-group v-if="field.FileCorrectiveActionDownload && field.FileCorrectiveActionDownload.length" class="col-md-4" v-for="(item, index) in field.FileCorrectiveActionDownload" :key="index">
              <b-input-group>
                <b-form-input name="FileCorrectiveActionDownload" v-model="item[0]" readonly></b-form-input>
                <b-input-group-append>
                  <a class="input-group-text btn-outline-success" :href="BaseUrl+item[1]" target="_blank">
                    <i class="fa fa-download"></i>
                  </a>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-form-row>
        </b-card>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Due Date Review</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input-group>
              <VueDatePicker
                v-model="field.dueDate"
                @input="generateNumber(field.dueDate)"
                class="mb-1"
                required 
                :disabled="isShow"
                :format="dateFormat"
                :locale="locale"
              /> 
              <b-input-group-append>
                <!-- <b-form-timepicker class="mb-1" v-model="field.Time" aria-required="true" :disabled="isShow" :hour12="false"></b-form-timepicker> -->
                <masked-input type="text" class="form-control" placeholder="Contoh 4 digit : 09:00"
                  v-model="field.dueTime"
                  :guide="false"
                  :mask="[/\d/, /\d/, '.', /\d/, /\d/]" 
                  :disabled="isShow"/>
              </b-input-group-append>
            </b-input-group>
            <span class="text-danger" v-if="allErrors.dueDate">{{ allErrors.dueDate[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Publish Ke :</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-if="deptStatus == true"
              v-model="field.IdPublish"
              :options="opsPublish"
              :allow-empty="false"
              :show-labels="false"
              placeholder="Pilih Publish Ke Siapa"
              label="Name"
              track-by="Name"
              required
              :disabled="isShow" />
              <multiselect
              v-if="deptStatus == false"
              v-model="field.IdPublish"
              :options="opsPublish"
              :allow-empty="false"
              :show-labels="false"
              placeholder="Atasan Masih belum diisi silahkan tanya ke QA"
              required
              disabled />
            <span class="text-danger" v-if="allErrors.IdPublish">{{ allErrors.IdPublish[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-card v-if="isShow == true && isComment == true" class="mb-3" header="Koreksi dari Approver" header-tag="h5">
          <b-form-row>
            <b-form-group class="col-md-12" v-for="(item, index) in getCorrector" :key="index">
              <!-- {{item}} -->
              <b-input-group>
                <b-form inline class="">
                  <label class="form-label mr-sm-1">Comment Dari :</label>
                  <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                  <b-input name="Dept" :state="allErrors.Dept?false:null" v-model="item.CorrectorName" class="mb-1" required :readonly="isShow" />

                  <span class="text-danger" v-if="allErrors.Dept">{{ allErrors.Dept[0] }}</span>
                </b-form>
              </b-input-group>

              <b-input-group>
                <b-textarea style="margin-left: 95px;" name="Lampiran" :state="allErrors.Lampiran?false:null" v-model="item.Description" class="mb-1" required :readonly="isShow" />
                <span class="text-danger" v-if="allErrors.Lampiran">{{ allErrors.Lampiran[0] }}</span>
              </b-input-group>

              <b-input-group>
                <b-form inline class="">
                  <label class="form-label mr-sm-1">Jawaban :</label>
                  <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                  <b-textarea v-if="isAnswered == false && isTypeUser == false && isChildToAnswer == true" style="margin-left: 30px;" name="Answer" :state="allErrors.Answer?false:null" v-model="field.Answer" class="mb-1" required />
                  <b-textarea v-else-if="isTypeUser == true && isChildToAnswer == false" style="margin-left: 30px;" name="Answer" :state="allErrors.Answer?false:null" v-model="field.Answer" class="mb-1" required :readonly="isShow"  /> 
                  <b-textarea v-else="isAnswered == true && isTypeUser == true" style="margin-left: 30px;" name="Answer" :state="allErrors.Answer?false:null" v-model="field.Answer" class="mb-1" required :readonly="isShow"  />
                  <span class="text-danger" v-if="allErrors.Answer">{{ allErrors.Answer[0] }}</span>
                </b-form>
              </b-input-group>
            </b-form-group>
          </b-form-row>
            <b-form-row>
            <b-form-group class="col-md-6"></b-form-group>
            <b-form-group label="" class="col-md-6">
              <b-btn v-if="isAnswered == false && isTypeUser == false && isChildToAnswer == true" variant="success" class="float-right ml-2" @click="onAction('sendAnswer')">Kirim</b-btn>
            </b-form-group>
          </b-form-row>
        </b-card>

        <b-card v-if="checkAnswer == true" class="mb-3" header="Histori Koreksi dari Approver" header-tag="h5">
          <b-form-group  class="col-md-12" v-for="(item,index) in HistoryCorrection" :key="index">
              <b-input-group>
                <b-form inline class="">
                  <label class="form-label mr-sm-1">Comment Dari :</label>
                  <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                  <b-input name="Dept" v-model="item.Name" class="mb-1" required :readonly="isShow" />
                </b-form>
              </b-input-group>

              <b-input-group>
                <b-textarea style="margin-left: 95px;" name="Lampiran"  v-model="item.Description" class="mb-1" required :readonly="isShow" />
              </b-input-group>

              <b-input-group>
                <b-form inline class="">
                  <label class="form-label mr-sm-1">Jawaban :</label>
                  <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
                  <b-textarea style="margin-left: 30px;" name="Answer"  v-model="item.Answer" class="mb-1" required :readonly="isShow"  />
                </b-form>
              </b-input-group>
            </b-form-group>
            <b-button v-if="showMoreButton" @click="toggleShowMore" variant="outline-primary"> {{ showMore ? 'Show Less' : 'Show More' }}</b-button>
        </b-card>

        <b-form-row>
          <b-form-group class="col-md-6"></b-form-group>
          <b-form-group label="" class="col-md-6">
            <b-btn v-if="isShow == true && valStatus == 1 && isButton" type="button" variant="primary" class="float-right ml-2" @click="onAction('publish')">Publish</b-btn>
            <b-btn v-if="isShow == true && valStatus >= 2 && isButton" variant="success" class="float-right ml-2">Diajukan</b-btn>
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
// import VueDatepicker from 'vue-datepicker';

import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'

export default {
  name: 'form-noe-report',
  metaInfo: {
    title: 'Form NOE Report'
  },
  components: {
    MaskedInput,
    VueDatePicker
  },
  data () {
    return {
      urlSubmit: '/AdminVue/noe-report-insert',
      headerCard: 'Laporan Kejadian NOE',
      textBtnSubmit: 'Simpan',
      field: {
        EventFile: [],
        CorrectiveActionFile: [],
        Date: moment(new Date()).format('YYYY-MM-DD'),
        // Date: null,
        FileEventDownload: [],
        FileCorrectiveActionDownload: [],
        Time:'09:00',
        dueDate: moment(new Date()).format('YYYY-MM-DD'),
        dueTime:'09:00',
        Dept: '',
        Lampiran: ''
      },
      HistoryCorrectionData: [],
      getCorrectorData:[],
      allErrors: [],
      isNotif: false,
      isEdit: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsProduct: [],
      opsLocation: [],
      opsTypeIncident: [],
      opsPublish: [],
      OldEventFile: [],
      OldCorrectiveActionFile: [],
      isAnswered: false,
      valStatus: 0,
      isShow: false,
      isComment: false,
      isTypeUser: false,
      isChildToAnswer: false,
      isNOEAcc : false,
      BaseUrl: process.env.BASE_URL,
      isButton: false,
      dateFormat: 'DD.MM.YYYY',
      locale: { lang: 'en' },
      noBets: '',
      noControl: '',
      deptStatus: false,
      checkAnswer: false,
      showMore: false,
      isCorrection: false,
      maxVisibleItems: 2
    }
  },
  
  computed: {
    HistoryCorrection () {
      if (this.showMore) 
      {
        return this.HistoryCorrectionData 
      } else {
        return this.HistoryCorrectionData.slice(0, this.maxVisibleItems)
      }
    },
    getCorrector () {
      return this.getCorrectorData
    },
    deptValue () {
      return this.field.Dept
    },
    lampiranValue () {
      return this.field.Lampiran
    },
    showMoreButton () {
      return this.HistoryCorrectionData.length > this.maxVisibleItems;
    }
  },

  methods: {
    async submitForm () {
      this.showLoading()
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("NOENumber", this.field.NOENumber)
      formData.append("Date", this.field.Date)
      if(this.field.Time) formData.append("Time", this.field.Time)
      formData.append("BatchNo", this.field.BatchNo)
      if(this.field.IdProduct) formData.append("IdProduct", this.field.IdProduct.Id)
      if(this.field.IdLocation) formData.append("IdLocation", this.field.IdLocation.Id)
      var incidentArr = []
      
      if(this.field.IdTypeIncident.Id !== undefined) {
        incidentArr.push(this.field.IdTypeIncident)
        if(this.field.IdTypeIncident) formData.append("IdTypeIncident", JSON.stringify(incidentArr))
      }else{
        if(this.field.IdTypeIncident) formData.append("IdTypeIncident", JSON.stringify(this.field.IdTypeIncident))
      }

      formData.append("Event", this.field.Event)
      formData.append("CorrectiveAction", this.field.CorrectiveAction)
      formData.append("DueDate", this.field.dueDate)
      if(this.field.dueTime) formData.append("DueTime", this.field.dueTime)

      for( var i = 0; i < this.field.EventFile.length; i++ ){
        let file = this.field.EventFile[i];
        formData.append('EventFile[' + i + ']', file);
      }

      formData.append("OldEventFile", JSON.stringify(this.OldEventFile))
      for( var n = 0; n < this.field.CorrectiveActionFile.length; n++ ){
        let file = this.field.CorrectiveActionFile[n];
        formData.append('CorrectiveActionFile[' + n + ']', file);
      }
      formData.append("OldCorrectiveActionFile", JSON.stringify(this.OldCorrectiveActionFile))
      if(this.field.IdPublish) formData.append("IdPublish", this.field.IdPublish.Id)
      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }
      
      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        this.hideLoading()
        var resp = res.data
        
        if(resp.status){

          this.$router.push({
            name: 'noe/data-noe-report',
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
        if (e.response) {
          // Handle HTTP response errors
          console.error('HTTP Error Response:', e.response);
          // You can access error.response.data, error.response.status, etc. here
        } else if (e.request) {
          // Handle request error (e.g., no response received)
          console.error('Request Error:', e.request);
        } else {
          // Handle other errors
          console.error('Error:', e.message);
        }

        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
        this.scrollTop(0, 1000)
        this.hideLoading()
      }.bind(this))
    },

    getData (Id) {
      axios.post('/AdminVue/noe-report-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        this.field.EventFile = []
        this.field.CorrectiveActionFile = []
        
        if(this.field.FileEvent != ''){
          let countFileEvent = this.field.FileEvent.length
          for (let i = 0; i < countFileEvent; i++) {
            this.OldEventFile.push(this.field.FileEvent[i])
            this.field.EventFile.push(process.env.BASE_URL + this.field.FileEvent[i])
          }
        }
        if(this.field.EventFile == ''){
          this.OldEventFile = '';
        }
        if(this.field.FileCorrectiveAction != ''){
          let countFileCorrectiveAction = this.field.FileCorrectiveAction.length
          for (let i = 0; i < countFileCorrectiveAction; i++) {
            this.OldCorrectiveActionFile.push(this.field.FileCorrectiveAction[i])
            this.field.CorrectiveActionFile.push(process.env.BASE_URL + this.field.FileCorrectiveAction[i])
          }
        }
        if(this.field.CorrectiveActionFile == ''){
          this.OldCorrectiveActionFile = '';
        }
        if(this.field.Status) {
          if(this.field.Status == 'UnPublish') this.valStatus = 1
          if(this.field.Status == 'Dilaporkan ke Unit Head') this.valStatus = 2
          if(this.field.Status == 'Dilaporkan ke Sect Head') this.valStatus = 3
          if(this.field.Status == 'Disetujui oleh Unit Head') this.valStatus = 4
          if(this.field.Status == 'Disetujui oleh Sect Head') this.valStatus = 5
          if(this.field.Status == 'Disetujui oleh Dept Head') this.valStatus = 6
          if(this.field.Status == 'Disetujui oleh QA Sect.Head') this.valStatus = 7
          if(this.field.Status == 'Disetujui oleh QA Dept.Head') this.valStatus = 8
          if(this.field.Status == 'Ditolak') this.valStatus = 9
        }
        if (resp.data.NOENumberAcc == null) {
          this.field.NOENumber = resp.data.NOENumber
        } else {
          this.field.NOENumber = resp.data.NOENumberAcc
          this.isNOEAcc = true 
        } 
        this.isButton = resp.isButton
        this.isCorrection = resp.isCorrection
      
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getCorrectionData (Id) {
      axios.post('/AdminVue/noe-report-get-correction',{
        Id:Id,
      }).then( function (res) {
        var resp = res.data.data    
        var count = res.data.count
        var history = res.data.history
        var getCorrectorData = res.data.correction

        this.HistoryCorrectionData = history
        this.getCorrectorData = getCorrectorData
        
        this.$set(this.field, 'Dept', resp.Name)
        this.$set(this.field, 'Lampiran', resp.Description)
        
        if(resp)
        {  
          if(resp.TypeUser == resp.SessionTypeUser)
          {
            this.isTypeUser = true
          }

          if(resp.ChildToAnswer == resp.SessionIdPosition)
          {
            this.isChildToAnswer = true
          }

          if(resp.Answer == null)
          {
             this.isAnswered
          } 
          else
          {
            this.field.Answer = resp.Answer
            this.isAnswered = true
          }
          
          let countAnswer = []
          history.forEach((keys) => {
            countAnswer.push(keys.Answer)
          })

          if(countAnswer.length > 0) this.checkAnswer = true
        }

        (count > 0) ? this.isComment = true : this.isComment

        this.$forceUpdate()

      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    toggleShowMore() {
      this.showMore = !this.showMore 
      console.log(this.showMore)
    },

    generateNumber (date=null) {
      axios.post('/AdminVue/noe-report-get-number',{
        Date:date,
      })
      .then( function (res) {
        // this.field.NOENumber = res.data.data
        this.$set(this.field, 'NOENumber', res.data.data) // this.$set -> untuk merubah variabel dan value di field inputnya
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.field.NOENumber = ''
      }.bind(this))
    },

    getProduct () {
      axios.post('/AdminVue/noe-report-get-product')
      .then( function (res) {
        this.opsProduct = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsProduct = []
      }.bind(this))
    },

    getIncident () {
      axios.post('/AdminVue/noe-report-get-incident')
      .then( function (res) {
        this.opsTypeIncident = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsTypeIncident = []
      }.bind(this))
    },

    handleFileEvent: function(files) {
      // console.log('FilePond Updated')
      // example of instance method call on pond reference
      this.field.EventFile = files.map(files => files.file)
      // console.log( this.field.myFile )
    },

    handleRemoveEvent: function(error,files){
      let result = typeof(files.source)
      if(this.isEdit == true && result === 'string'){
        let index = this.OldEventFile.indexOf(files.source.replace('/clouds','clouds'))
        this.OldEventFile.splice(index,1)
      }
    },

    handleFileCorrective: function(files) {
      // console.log('FilePond Updated')
      // example of instance method call on pond reference
      this.field.CorrectiveActionFile = files.map(files => files.file)
      // console.log( this.field.myFile )
    },

    handleRemoveCorrective: function(error,files){
      let result = typeof(files.source)
      if(this.isEdit == true && result === 'string'){
        let index = this.OldCorrectiveActionFile.indexOf(files.source.replace('/clouds','clouds'))
        this.OldCorrectiveActionFile.splice(index,1)
      }
    },

    allowedDates: date => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
    
      return date <= today
    },

    onControlBets (value) {
        
      axios.post('/AdminVue/noe-report-get-location-bets',{
        Value:value,
      })
      .then( function (res) {
        this.opsLocation = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))

    },

    getPublish () {
      axios.post('/AdminVue/noe-report-get-publish')
      .then( function (res) {
        var resp = res.data
        this.opsPublish = resp.data
        if(resp.status == true)
        {
          this.deptStatus = true 
        }else
        {
          this.deptStatus
        }
  
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsPublish = []
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/noe/data-noe-report')
    },

    onAction(action){
      
      if(action == 'sendAnswer') {
        return this.sendAnswer('/AdminVue/noe-report-answer', this.field.NOENumber, this.field.Answer, this.$parent, true) 
      }
      
      if(this.isCorrection == false) {
        if(action == 'publish') {
          this.publish('/AdminVue/noe-report-publish', this.field.Id, this.$parent, true)
        }
      } else {
        return this.showNotifCustom('notifications-danger','Forbidden Action', 'Harus isi jawaban dari pengkoreksi')   
      }
      
      
    }

  },

  mounted(){

    this.getProduct()
    // this.getLocation()
    this.getIncident()
    this.getPublish()

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      this.isEdit = true
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/noe-report-update'
        this.textBtnSubmit = 'Simpan'
      }
    }
    if(this.$route.params.isShow){
      this.isShow = this.$route.params.isShow
      var Id = this.$route.params.Id
      var number = this.field.NOENumber
      if(Id){
        this.getCorrectionData(Id)
        this.getData(Id)
        this.field.Id = Id
      }
    }
    if(this.isEdit == false && this.isShow == false) this.generateNumber()
  },

}
</script>