<template>
  <div>

    <b-card :header="headerCard" header-tag="h4" class="mb-4">

      <form method="POST" @submit.prevent="submitForm()">
        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">No. NOE</label>
            <b-input name="NOENumber" :state="allErrors.NOENumber?false:null" v-model="field.NOENumber" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.NOENumber">{{ allErrors.NOENumber[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Tanggal / Waktu</label>
            <b-input name="Date" :state="allErrors.Date?false:null" v-model="field.Date" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.Date">{{ allErrors.Date[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">No. Kontrol / No. Bets</label>
            <b-input name="BatchNo" :state="allErrors.BatchNo?false:null" v-model="field.BatchNo" class="mb-1" readonly/>
            <span class="text-danger" v-if="allErrors.BatchNo">{{ allErrors.BatchNo[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Bahan / Produk Terkait</label>
            <b-input name="IdProduct" :state="allErrors.IdProduct?false:null" v-model="field.IdProduct" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.IdProduct">{{ allErrors.IdProduct[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Lokasi Kejadian</label>
            <b-input name="IdLocation" :state="allErrors.IdLocation?false:null" v-model="field.IdLocation" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.IdLocation">{{ allErrors.IdLocation[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Jenis Kejadian</label>
            <b-input name="IdTypeIncident" :state="allErrors.IdTypeIncident?false:null" v-model="field.IdTypeIncident" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.IdTypeIncident">{{ allErrors.IdTypeIncident[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Uraian Kejadian</label>
            <b-textarea name="Event" :state="allErrors.Event?false:null" v-model="field.Event" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.Event">{{ allErrors.Event[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-card class="mb-3" header="Lampiran Uraian Kejadian" header-tag="h5">
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
            <b-textarea name="CorrectiveAction" :state="allErrors.CorrectiveAction?false:null" v-model="field.CorrectiveAction" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.CorrectiveAction">{{ allErrors.CorrectiveAction[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-card class="mb-3" header="Lampiran Tindakan Koreksi yang Dilakukan" header-tag="h5">
          <b-form-row>
            <b-form-group class="col-md-4" v-for="(item, index) in field.FileCorrectiveActionDownload" :key="index">
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
            <label class="form-label">Verifikasi Tindakan</label>
              <b-input name="Verified" :state="allErrors.Verified?false:null" v-model="field.Verified" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.Verified">{{ allErrors.Verified[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Tindakan Koreksi Lain</label>
            <b-textarea name="OtherCorrectAction" :state="allErrors.OtherCorrectAction?false:null" v-model="field.OtherCorrectAction" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.OtherCorrectAction">{{ allErrors.OtherCorrectAction[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Departemen Terkait</label>
              <b-input name="RelevantDept" :state="allErrors.RelevantDept?false:null" v-model="field.RelevantDept" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.RelevantDept">{{ allErrors.RelevantDept[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-card class="md-4">
          <b-form-row v-for="(item, index) in field.IdDevRiskAssesment" :key="'IdDevRiskAssesment'+index">
            <b-form-group class="col-md-5">
              <label v-if="index == 0">Pertanyaan (SEVERITY)</label>
              <b-input name="Question" v-model="item.Question" class="mb-1" readonly />
            </b-form-group>
            <b-form-group class="col-md-6">
              <label v-if="index == 0">Penilaian Risiko Deviasi (SEVERITY)</label>
              <b-input name="RiskAssesment" v-model="item.RiskAssesment.RiskAssesment" class="mb-1" readonly />
            </b-form-group>
            <b-form-group class="col-md-1">
              <label v-if="index == 0">Nilai</label>
              <b-input name="Value" type="number" v-model="item.Value" min="1" max="100" class="mb-1" readonly />
            </b-form-group>
          </b-form-row>

          <b-form-row v-for="(item, index) in field.IdDevRiskAssesment2" :key="'IdDevRiskAssesment2'+index">
            <b-form-group class="col-md-5">
              <label v-if="index == 0">Pertanyaan (PROBABILITY)</label>
              <b-input name="Question" v-model="item.Question" class="mb-1" readonly />
            </b-form-group>
            <b-form-group class="col-md-6">
              <label v-if="index == 0">Penilaian Risiko Deviasi (PROBABILITY)</label>
              <b-input name="RiskAssesment" v-model="item.RiskAssesment.RiskAssesment" class="mb-1" readonly />
            </b-form-group>
            <b-form-group class="col-md-1">
              <label v-if="index == 0">Nilai</label>
              <b-input name="Value" type="number" v-model="item.Value" min="1" max="100" class="mb-1" readonly />
            </b-form-group>
          </b-form-row>

          <b-form-row v-for="(item, index) in field.IdDevRiskAssesment3" :key="'IdDevRiskAssesment3'+index">
            <b-form-group class="col-md-5">
              <label v-if="index == 0">Pertanyaan (DETECTABILITY)</label>
              <b-input name="Question" v-model="item.Question" class="mb-1" readonly />
            </b-form-group>
            <b-form-group class="col-md-6">
              <label v-if="index == 0">Penilaian Risiko Deviasi (DETECTABILITY)</label>
              <b-input name="RiskAssesment" v-model="item.RiskAssesment.RiskAssesment" class="mb-1" readonly />
            </b-form-group>
            <b-form-group class="col-md-1">
              <label v-if="index == 0">Nilai</label>
              <b-input name="Value" type="number" v-model="item.Value" min="1" max="100" class="mb-1" readonly />
            </b-form-group>
          </b-form-row>

        </b-card><br>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Level Deviasi</label>
            <b-textarea name="DeviationLevel" :state="allErrors.DeviationLevel?false:null" v-model="field.DeviationLevel" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.DeviationLevel">{{ allErrors.DeviationLevel[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Produk / Bets Lain yang Terdampak</label>
              <b-input name="OtherProductAffect" :state="allErrors.OtherProductAffect?false:null" v-model="field.OtherProductAffect" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.OtherProductAffect">{{ allErrors.OtherProductAffect[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6"></b-form-group>
          <b-form-group class="col-md-6" v-if="DescOPA == true">
            <label class="form-label">Deskripsi</label>
            <b-textarea name="DescriptionOPA" :state="allErrors.DescriptionOPA?false:null" v-model="field.DescriptionOPA" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.DescriptionOPA">{{ allErrors.DescriptionOPA[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row> <b-form-group class="col-12">
          <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
            <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
            {{alertNotif}}
          </div>
        </b-form-group> </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Kategori NOE</label>
            <label class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.IdDeviation"
              :options="opsDeviation"
              :show-labels="false"
              :multiple="false"
              placeholder="Pilih Kategori NOE"
              label="Deviation"
              track-by="Deviation"
              required 
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.IdDeviation">{{ allErrors.IdDeviation[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-4 hide">
            <label class="form-label">Kategori NOE</label>
            <label class="form-label float-right text-danger">*Wajib Dipilih</label>
              <multiselect
              v-model="field.NOEClassification"
              :options="opsNOE"
              :allow-empty="false"
              placeholder="Pilih Kategori NOE"
              label="text"
              track-by="text"
              required 
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.NOEClassification">{{ allErrors.NOEClassification[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Level Deviasi dari QA</label>
            <label class="form-label float-right text-danger">*Wajib Dipilih</label>
              <multiselect
              v-model="field.DeviationLevelQA"
              :options="opsDevLevelQA"
              :allow-empty="false"
              placeholder="Pilih Level Deviasi"
              label="text"
              track-by="text"
              required 
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.DeviationLevelQA">{{ allErrors.DeviationLevelQA[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-12">
            <label class="form-label">Evaluasi Terhadap Kesesuaian Pelaporan</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="DescriptionEvaluation" :state="allErrors.DescriptionEvaluation?false:null" v-model="field.DescriptionEvaluation" class="mb-1" rows="3" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.DescriptionEvaluation">{{ allErrors.DescriptionEvaluation[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-12">
            <label class="form-label">Remarks</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="Remarks" :state="allErrors.Remarks?false:null" v-model="field.Remarks" class="mb-1" rows="3" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.Remarks">{{ allErrors.Remarks[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-card v-if="isShow == true && isComment == true" class="mb-3" header="Koreksi dari Approver" header-tag="h5">
          <b-form-row>
            <b-form-group class="col-md-12" v-for="(item, index) in getCorrector" :key="index">
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
      
        <b-card v-if="isShow == true && checkAnswer == true" class="mb-3" header="Histori Koreksi dari Approver" header-tag="h5">
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
            <b-btn v-if="isShow == true && Position == 2 && field.IsPublish == 2 && valStatus == 6" type="button" variant="primary" class="float-right ml-2" @click="onAction('publish-evaluation')">Publish Evaluasi</b-btn>

            <b-btn v-if="isShow == true && Position == 2 && field.IsPublish == 2 && isCaretaker == false && valStatus >= 7" variant="success" class="float-right ml-2">Diajukan</b-btn>

            <b-btn v-if="isShow == true && ((Position == 3 && valStatus == 7) || (Position == 4 || isCaretaker == true) && valStatus == 7)" type="button" variant="primary" class="float-right ml-2" @click="onAction('approve')">Setujui</b-btn>

            <b-btn v-if="isShow == true && (Position == 4 || isCaretaker == true) && valStatus == 7" type="button" variant="danger" class="float-right ml-2" @click="onAction('reject')">Tolak</b-btn>

            <b-btn v-if="isShow == true && ((Position == 3 && valStatus == 8) || ((Position == 4 || isCaretaker == true) && valStatus == 9))" variant="success" class="float-right ml-2">Disetujui</b-btn>

            <b-btn v-if="isShow == true && (Position == 4 || isCaretaker == true) && valStatus == 10" variant="warning" class="float-right ml-2">Ditolak</b-btn>

            <b-btn v-if="isShow == true && ((Position == 2 && valStatus == 6) || (Position == 3 && valStatus == 7) || ((Position == 4 || isCaretaker == true) && valStatus == 7))" type="button" variant="warning" class="float-right ml-2" @click="onAction('correction')">Koreksi</b-btn>

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
  name: 'form-noe-evaluation',
  metaInfo: {
    title: 'Form NOE Evaluation'
  },
  components: {
  },
  data () {
    return {
      urlSubmit: '/AdminVue/noe-evaluation-insert',
      headerCard: 'Evaluasi NOE',
      textBtnSubmit: 'Simpan',
      field: {
        EventFile: [],
        CorrectiveActionFile: [],
        IdDevRiskAssesment:[{RiskAssesment:'',Question:'',Value:'',AssesmentGroup:''}],
        DeviationLevel: '',
        FileEventDownload: [],
        FileCorrectiveActionDownload: [],
        Dept: '',
        Lampiran: ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      OldEventFile: [],
      OldCorrectiveActionFile: [],
      valDept: 0,
      DescOPA: false,
      resultValue: 0,
      opsDeviation: [],
      opsNOE: [
        {'value':'Bets','text':'Bets'},
        {'value':'Non Bets','text':'Non Bets'}
      ],
      opsDevLevelQA: [
        {'value':'Minor','text':'Minor'},
        {'value':'Major','text':'Major'},
        {'value':'Critical','text':'Critical'}
      ],
      Position: 0, //1 = unit head; 2 = sect head; 3 = APJ; 4 = dept head;
      valStatus: 0,
      isShow: false,
      isEdit: false,
      BaseUrl:process.env.BASE_URL,
      isCaretaker: false,
      isComment: false,
      checkAnswer: false,
      HistoryCorrectionData: [],
      getCorrectorData:[],
      showMore: false,
      maxVisibleItems: 2,
      isTypeUser: false,
      isChildToAnswer: false,
      isAnswered: false,
      isCorrection: false,
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
    submitForm () {
      this.showLoading()
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      if(this.field.IdDeviation && this.field.IdDeviation.Deviation !=null)
        formData.append("IdDeviation", this.field.IdDeviation.Deviation)
      formData.append("DescriptionEvaluation", this.field.DescriptionEvaluation)
      if(this.field.NOEClassification && this.field.NOEClassification.value!=null)
        formData.append("NOEClassification", this.field.NOEClassification.value)
      if(this.field.DeviationLevelQA && this.field.DeviationLevelQA.value!=null)
        formData.append("DeviationLevelQA", this.field.DeviationLevelQA.value)
      formData.append("Remarks", this.field.Remarks)
      
      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'noe/data-noe-evaluation',
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
      axios.post('/AdminVue/noe-evaluation-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.Position = res.data.position
        this.field = resp.data
        if(this.field.Verified == "Perlu tindakan koreksi lain") this.valDept = 1
        if(this.field.Verified == "Tindakan koreksi telah dilaksanakan dengan baik") this.valDept = 0
        if(this.field.OtherProductAffect == "Ada") this.DescOPA = true
        if(this.field.OtherProductAffect == "Tidak Ada") {
          this.DescOPA = false
          this.field.DescriptionOPA = ''
        }
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
          if(this.field.Status == 'Dilaporkan ke Unit Head') this.valStatus = 2
          if(this.field.Status == 'Dilaporkan ke Sect Head') this.valStatus = 3
          if(this.field.Status == 'Disetujui oleh Unit Head') this.valStatus = 4
          if(this.field.Status == 'Disetujui oleh Sect Head') this.valStatus = 5
          if(this.field.Status == 'Disetujui oleh Dept Head') this.valStatus = 6
          if(this.field.Status == 'Disetujui oleh QA Sect.Head') this.valStatus = 7
          if(this.field.Status == 'Disetujui oleh QA APJ') this.valStatus = 8
          if(this.field.Status == 'Disetujui oleh QA Dept.Head') this.valStatus = 9
          if(this.field.Status == 'Ditolak') this.valStatus = 10
        }
        this.isCaretaker = res.data.isCaretaker
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

    getDeviation () {
      axios.post('/AdminVue/noe-evaluation-get-deviation')
      .then( function (res) {
        this.opsDeviation = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsDeviation = []
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/noe/data-noe-evaluation')
    },

    onAction(action) {

      if(action == 'sendAnswer') {
       return this.sendAnswer('/AdminVue/noe-report-answer', this.field.NOENumber, this.field.Answer, this.$parent, true, this.valStatus) 
      }

      if(this.isCorrection == false) {
        if(action == 'publish-evaluation'){
        this.publishEvaluation('/AdminVue/noe-evaluation-publish-evaluation', this.field.Id, this.$parent, true)
        }
        if(action == 'approve'){
          this.approve('/AdminVue/noe-evaluation-approve', this.field.Id, this.$parent, null, true, this.isCaretaker)
        }
        if(action == 'reject'){
          this.reject('/AdminVue/noe-evaluation-reject', this.field.Id, this.$parent, true, this.isCaretaker)
        }
        if(action == 'correction'){
          this.$router.push({
            name: 'noe/form-correction-noe-evaluation',
            params: {
              Id: this.field.Id,
              isCaretaker: this.isCaretaker
            }
          })
        }
      } else {
        return this.showNotifCustom('notifications-danger','Forbidden Action', 'Harus isi jawaban dari pengkoreksi')
      }
      
    }

  },

  mounted(){

    this.getDeviation()

    if(this.$route.params.isFormEdit){
      this.isEdit = this.$route.params.isFormEdit
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.getCorrectionData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/noe-evaluation-update'
        this.textBtnSubmit = 'Simpan'
      }
    }

    if(this.$route.params.isShow){
      this.isShow = this.$route.params.isShow
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.getCorrectionData(Id)
        this.field.Id = Id
      }
    }
  },

}
</script>