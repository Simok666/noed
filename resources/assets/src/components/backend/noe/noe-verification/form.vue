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
            <b-input name="NOENumber" :state="allErrors.NOENumber?false:null" v-model="field.NOENumber" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.NOENumber">{{ allErrors.NOENumber[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Tanggal / Waktu</label>
            <!-- <b-input name="Date" :state="allErrors.Date?false:null" v-model="field.Date" class="mb-1" readonly /> -->
            <b-input-group>
              <VueDatePicker
                v-model="field.Date"
                class="mb-1"
                required 
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
            <span class="text-danger" v-if="allErrors.Time">{{ allErrors.Time[0] }}</span>
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
            <label class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.Verified"
              :options="opsVerified"
              :allow-empty="false"
              placeholder="Pilih Verifikasi Tindakan"
              label="text"
              track-by="text"
              @input="onChangeVerified"
              required 
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.Verified">{{ allErrors.Verified[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Tindakan Koreksi Lain</label>
            <label v-if="valDept" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea v-if="isInputCorrection == false" name="OtherCorrectAction" :state="allErrors.OtherCorrectAction?false:null" v-model="field.OtherCorrectAction" class="mb-1" :required="valDept" :readonly="isShow" />
            <b-textarea v-if="isInputCorrection == true" name="OtherCorrectAction" :state="allErrors.OtherCorrectAction?false:null" v-model="field.OtherCorrectAction" class="mb-1" :required="valDept" :readonly="isShow" disabled/>
            <span class="text-danger" v-if="allErrors.OtherCorrectAction">{{ allErrors.OtherCorrectAction[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Departemen Terkait</label>
            <label class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.RelevantDept"
              :options="opsRelevantDept"
              :show-labels="false"
              :multiple="true"
              placeholder="Pilih Departemen Terkait"
              label="RelevantDept"
              track-by="RelevantDept" 
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.RelevantDept">{{ allErrors.RelevantDept[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-card class="md-4">
          <b-form-row v-for="(item, index) in field.IdDevRiskAssesment" :key="'IdDevRiskAssesment'+index">
            <b-form-group class="col-lg-5">
              <label v-if="index == 0">Pertanyaan (SEVERITY)</label>
              <b-input name="Question" v-model="item.Question" class="mb-1" readonly />
            </b-form-group>

            <b-form-group class="col-lg-6">
              <template v-if="index == 0">
              <label>Penilaian Risiko Deviasi (SEVERITY)</label>
              <label class="form-label float-right text-danger">*Wajib Dipilih</label>
              </template>
              <multiselect
                v-model="item.RiskAssesment"
                :options="opsRiskAssesment"
                :allow-empty="false"
                placeholder="Pilih Penilaian Risiko Deviasi"
                selectLabel=""
                deselectLabel=""
                label="RiskAssesment"
                track-by="RiskAssesment"
                @input="onSelectDevRisk($event,index)" 
                :disabled="isShow" />
            </b-form-group>

            <b-form-group class="col-lg-1">
              <label v-if="index == 0">Nilai</label>
              <b-input name="Value" type="number" v-model="item.Value" min="1" max="100" class="mb-1" readonly />
            </b-form-group>

            <!-- <b-form-group class="col-md-2">
              <label v-if="index == 0">Assesment Group</label>
              <b-input name="AssesmentGroup" v-model="item.AssesmentGroup" class="mb-1" readonly />
            </b-form-group> -->

            <!-- <b-form-group class="col-md-1 col-2 text-center" v-if="isShow == false">
              <label v-if="index == 0">Tindakan</label>
              <b-button v-if="index > 0" class="btn btn-sm btn-danger text-white" :pill="true" @click="removeDetail(index)">
                <i class="ion ion-md-trash"></i>
              </b-button>
            </b-form-group> -->

          </b-form-row>

          <b-form-row v-for="(item, index) in field.IdDevRiskAssesment2" :key="'IdDevRiskAssesment2'+index">
            <b-form-group class="col-lg-5">
              <label v-if="index == 0">Pertanyaan (PROBABILITY)</label>
                <b-input name="Question" v-model="item.Question" class="mb-1" readonly />
            </b-form-group>

            <b-form-group class="col-lg-6">
              <template v-if="index == 0">
              <label>Penilaian Risiko Deviasi (PROBABILITY)</label>
              <label class="form-label float-right text-danger">*Wajib Dipilih</label>
              </template>
              <multiselect
                v-model="item.RiskAssesment"
                :options="opsRiskAssesment2"
                :allow-empty="false"
                placeholder="Pilih Penilaian Risiko Deviasi"
                selectLabel=""
                deselectLabel=""
                label="RiskAssesment"
                track-by="RiskAssesment"
                @input="onSelectDevRisk2($event,index)" 
                :disabled="isShow" />
            </b-form-group>

            <b-form-group class="col-lg-1">
              <label v-if="index == 0">Nilai</label>
              <b-input name="Value" type="number" v-model="item.Value" min="1" max="100" class="mb-1" readonly />
            </b-form-group>

          </b-form-row>

          <b-form-row v-for="(item, index) in field.IdDevRiskAssesment3" :key="'IdDevRiskAssesment3'+index">
            <b-form-group class="col-lg-5">
              <label v-if="index == 0">Pertanyaan (DETECTABILITY)</label>
                <b-input name="Question" v-model="item.Question" class="mb-1" readonly />
            </b-form-group>

            <b-form-group class="col-lg-6">
              <template v-if="index == 0">
              <label>Penilaian Risiko Deviasi (DETECTABILITY)</label>
              <label class="form-label float-right text-danger">*Wajib Dipilih</label>
              </template>
              <multiselect
                v-model="item.RiskAssesment"
                :options="opsRiskAssesment3"
                :allow-empty="false"
                placeholder="Pilih Penilaian Risiko Deviasi"
                selectLabel=""
                deselectLabel=""
                label="RiskAssesment"
                track-by="RiskAssesment"
                @input="onSelectDevRisk3($event,index)" 
                :disabled="isShow" />
            </b-form-group>

            <b-form-group class="col-lg-1">
              <label v-if="index == 0">Nilai</label>
              <b-input name="Value" type="number" v-model="item.Value" min="1" max="100" class="mb-1" readonly />
            </b-form-group>

          </b-form-row>

          <!-- <b-btn v-if="isShow == false" type="button" @click="addDetail()" id="btambah-risk" class="float-left btn-info"><i class="fas fa-plus"></i> Tambah</b-btn> -->

        </b-card><br>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Level Deviasi</label>
            <b-textarea name="DeviationLevel" :state="allErrors.DeviationLevel?false:null" v-model="field.DeviationLevel" class="mb-1" readonly required />
            <span class="text-danger" v-if="allErrors.DeviationLevel">{{ allErrors.DeviationLevel[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Produk / Bets Lain yang Terdampak</label>
            <label class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.OtherProductAffect"
              :options="opsOPA"
              :allow-empty="false"
              placeholder="Pilih Produk / Bets Lain yang Terdampak"
              label="text"
              track-by="text"
              @input="onChangeOPA"
              required 
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.OtherProductAffect">{{ allErrors.OtherProductAffect[0] }}</span>
          </b-form-group>
        </b-form-row>
        <b-form-row>
          <!-- <b-form-group class="col-md-6"></b-form-group> -->
          <b-form-group class="col-md-6" v-if="DescOPA">
            <label class="form-label">Bets Terdampak</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="DescriptionOPA" :state="allErrors.DescriptionOPA?false:null" v-model="field.DescriptionOPA" class="mb-1" :required="DescOPA" :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.DescriptionOPA">{{ allErrors.DescriptionOPA[0] }}</span>
          </b-form-group>
        </b-form-row>
        <b-form-row>
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
            <b-btn v-if="isShow == true && field.IsPublish == 1 && ((Position == 1 && valStatus == 2) || (Position == 2 && valStatus == 3))" type="button" variant="primary" class="float-right ml-2" @click="onAction('publish-verify')">Publish Verifikasi</b-btn>

            <b-btn v-if="isShow == true && field.IsPublish == 1 && isCaretaker == false && ((Position == 1 && valStatus >= 4) || (Position == 2 && valStatus >= 5))" variant="success" class="float-right ml-2">Diajukan</b-btn>

            <b-btn v-if="isShow == true && field.IsPublish == 1 && (((Position == 3 || isCaretaker == true) && valStatus == 5) || (Position == 2 && valStatus == 4))" type="button" variant="primary" class="float-right ml-2" @click="onAction('approve')">Setujui</b-btn>

            <b-btn v-if="isShow == true && (Position == 3 || isCaretaker == true) && valStatus == 5" type="button" variant="danger" class="float-right ml-2" @click="onAction('reject')">Tolak</b-btn>

            <b-btn v-if="isShow == true && valStatus < 10 && (((Position == 3 || isCaretaker == true) && valStatus >= 6) || (Position == 2 && valStatus >= 5))" variant="success" class="float-right ml-2">Disetujui</b-btn>

            <b-btn v-if="isShow == true && valStatus == 10" variant="warning" class="float-right ml-2">Ditolak</b-btn>

            <b-btn v-if="isShow == true && field.IsPublish == 1 && ((Position == 1 && valStatus == 2) || (Position == 2 && (valStatus == 3) || valStatus == 4) || ((Position == 3 || isCaretaker == true) && valStatus == 5))" type="button" variant="warning" class="float-right ml-2" @click="onAction('correction')">Koreksi</b-btn>

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
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'

export default {
  name: 'form-noe-verification',
  metaInfo: {
    title: 'Form NOE Verification And Assesment'
  },
  components: {
    MaskedInput,
    VueDatePicker
  },
  data () {
    return {
      urlSubmit: '/AdminVue/noe-verification-insert',
      headerCard: 'Verifikasi & Penilaian NOE',
      textBtnSubmit: 'Simpan',
      field: {
        EventFile: [],
        CorrectiveActionFile: [],
        IdDevRiskAssesment:[{RiskAssesment:'',Question:'',Value:''}],
        IdDevRiskAssesment2:[{RiskAssesment:'',Question:'',Value:''}],
        IdDevRiskAssesment3:[{RiskAssesment:'',Question:'',Value:''}],
        DeviationLevel: '',
        OtherCorrectAction: '',
        DescriptionOPA: '',
        FileEventDownload: [],
        FileCorrectiveActionDownload: [],
        Date: moment(new Date()).format('YYYY-MM-DD'),
        Dept: '',
        Lampiran: ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      OldEventFile: [],
      OldCorrectiveActionFile: [],
      opsVerified:[
        {'value':'Tindakan koreksi telah dilaksanakan dengan baik','text':'Tindakan koreksi telah dilaksanakan dengan baik'},
        {'value':'Perlu tindakan koreksi lain','text':'Perlu tindakan koreksi lain'}
      ],
      opsRelevantDept: [],
      valDept: false,
      opsRiskAssesment: [],
      opsRiskAssesment2: [],
      opsRiskAssesment3: [],
      opsOPA: [
        {'value':'Ada','text':'Ada'},
        {'value':'Tidak Ada','text':'Tidak Ada'}
      ],
      DescOPA: false,
      resultValue: 0,
      IdDeviationLevel: 0,
      Position: 0, //1 = unit head; 2 = sect head; 3 = dept head;
      valStatus: 0,
      isShow: false,
      isComment: false,
      BaseUrl:process.env.BASE_URL,
      isCaretaker: false,
      deptStatus: false,
      opsPublish: [],
      isNOEAcc: false,
      dateFormat: 'DD.MM.YYYY',
      locale: { lang: 'en' },
      isInputCorrection : false,
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
      var isEmpty = false
      if(this.field.IdDevRiskAssesment) {
        this.field.IdDevRiskAssesment.forEach((data,index) => {
          if(data.RiskAssesment=='') {
            isEmpty = true
            return false
          }
        })
      }

      if(this.field.IdDevRiskAssesment2) {
        this.field.IdDevRiskAssesment2.forEach((data,index) => {
          if(data.RiskAssesment=='') {
            isEmpty = true
            return false
          }
        })
      }

      if(this.field.IdDevRiskAssesment3) {
        this.field.IdDevRiskAssesment3.forEach((data,index) => {
          if(data.RiskAssesment=='') {
            isEmpty = true
            return false
          }
        })
      }

      if(isEmpty)
        this.$swal({
          icon: 'error',
          text: 'Silahkan lengkapi kolom *Wajib Dipilih!'
        })
      else if(!this.field.Verified || this.field.Verified.value==null || !this.field.OtherProductAffect || (this.field.OtherProductAffect && this.field.OtherProductAffect.value==null))
        this.$swal({
          icon: 'error',
          text: 'Silahkan lengkapi kolom *Wajib Dipilih!'
        })
      else if( (this.field.Verified.value=='Perlu tindakan koreksi lain' && (!this.field.RelevantDept || !this.field.RelevantDept.length)) )
        this.$swal({
          icon: 'error',
          text: 'Silahkan lengkapi kolom *Wajib Dipilih!'
        })
      else {

        const formData = new FormData()
        formData.append("Id", this.field.Id)
        if(this.field.Verified) formData.append("Verified", this.field.Verified.value)
        if(this.field.OtherCorrectAction) formData.append("OtherCorrectAction", this.field.OtherCorrectAction)
        if(this.field.RelevantDept) formData.append("RelevantDept", JSON.stringify(this.field.RelevantDept))
        formData.append("IdDevRiskAssesment", JSON.stringify(this.field.IdDevRiskAssesment))
        formData.append("IdDevRiskAssesment2", JSON.stringify(this.field.IdDevRiskAssesment2))
        formData.append("IdDevRiskAssesment3", JSON.stringify(this.field.IdDevRiskAssesment3))
        formData.append("DeviationLevel", this.field.DeviationLevel)
        if(this.IdDeviationLevel) formData.append("IdDeviationLevel", this.IdDeviationLevel)
        if(this.field.OtherProductAffect) formData.append("OtherProductAffect", this.field.OtherProductAffect.value)
        formData.append("DescriptionOPA", this.field.DescriptionOPA)
        if(this.field.IdPublish) formData.append("IdPublish", this.field.IdPublish.Id)
        
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post(this.urlSubmit, formData, config)
        .then( function (res) {
          var resp = res.data

          if(resp.status){

            this.$router.push({
              name: 'noe/data-noe-verification',
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

    onChangeVerified(option) {
      if(option.value == "Perlu tindakan koreksi lain" || option == "Perlu tindakan koreksi lain") {
        this.valDept = true
        this.isInputCorrection = false
      } else if (option.value == "Tindakan koreksi telah dilaksanakan dengan baik"){
        this.isInputCorrection = true
      } else {
        // sebelumnya keluar jika 'Verified' == 'Perlu tindakan koreksi lain'
        this.valDept = false
        // this.field.OtherCorrectAction = ''
      }
      console.log(this.isInputCorrection)
    },

    onChangeOPA(option) {
      if(option.value == "Ada" || option == "Ada") {
        this.DescOPA = true
      } else {
        this.DescOPA = false
        this.field.DescriptionOPA = ''
      }
    },

    onSelectDevRisk(value,index) {
      var isExist = false
      if(this.field.IdDevRiskAssesment.length && this.field.IdDevRiskAssesment.length>1) {
        this.field.IdDevRiskAssesment.forEach((data,index) => {
          if(data.RiskAssesment.RiskAssesment==value.RiskAssesment) {
            isExist = true
          }
        })
      }

      if(isExist) {
        this.$swal({
          icon: 'error',
          text: 'Penilaian Risiko Deviasi tidak boleh sama!'
        }).then( function () {
          setTimeout(()=>{ document.getElementById("btambah-risk").focus() }, 500)
        })
        this.removeDetail(index)
        this.addDetail()
      } else {
        this.field.IdDevRiskAssesment[index].Question = value.Question
        this.field.IdDevRiskAssesment[index].Value = value.Value
        this.field.IdDevRiskAssesment[index].AssesmentGroup = value.AssesmentGroup
        this.countValue()
      }
    },

    onSelectDevRisk2(value,index) {
      this.field.IdDevRiskAssesment2[index].Question = value.Question
      this.field.IdDevRiskAssesment2[index].Value = value.Value
      this.countValue()
    },

    onSelectDevRisk3(value,index) {
      this.field.IdDevRiskAssesment3[index].Question = value.Question
      this.field.IdDevRiskAssesment3[index].Value = value.Value
      this.countValue()
    },

    countValue() {
      this.resultValue = 0
      this.field.IdDevRiskAssesment.forEach((data,index) => {
        if(data.RiskAssesment!='') {
          if(this.resultValue == 0) this.resultValue += parseInt(data.Value)
          else this.resultValue *= parseInt(data.Value)
        }
      })
      
      this.field.IdDevRiskAssesment2.forEach((data,index) => {
        if(data.RiskAssesment!='') {
          if(this.resultValue == 0) this.resultValue += parseInt(data.Value)
          else this.resultValue *= parseInt(data.Value)
        }
      })
      
      this.field.IdDevRiskAssesment3.forEach((data,index) => {
        if(data.RiskAssesment!='') {
          if(this.resultValue == 0) this.resultValue += parseInt(data.Value)
          else this.resultValue *= parseInt(data.Value)
        }
      })
      
      this.getDeviationLevel(this.resultValue)
    },

    getData (Id) {
      axios.post('/AdminVue/noe-verification-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.Position = res.data.position
        this.field = resp.data
        if (resp.data.NOENumberAcc == null) {
          this.field.NOENumber = resp.data.NOENumber
        } else {
          this.field.NOENumber = resp.data.NOENumberAcc
          this.isNOEAcc = true 
        } 
        this.IdDeviationLevel = resp.data.IdDeviationLevel
        this.onChangeVerified(this.field.Verified)
        this.onChangeOPA(this.field.OtherProductAffect)
        if(resp.data.IdDevRiskAssesment == null || resp.data.IdDevRiskAssesment == '') this.field.IdDevRiskAssesment = [{RiskAssesment:'',Question:'',Value:''}]
        if(resp.data.IdDevRiskAssesment2 == null || resp.data.IdDevRiskAssesment2 == '') this.field.IdDevRiskAssesment2 = [{RiskAssesment:'',Question:'',Value:''}]
        if(resp.data.IdDevRiskAssesment3 == null || resp.data.IdDevRiskAssesment3 == '') this.field.IdDevRiskAssesment3 = [{RiskAssesment:'',Question:'',Value:''}]
        if(resp.data.IdDeviationLevel) this.countValue()
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
          this.OldEventFile = ''
        }
        if(this.field.FileCorrectiveAction != ''){
          let countFileCorrectiveAction = this.field.FileCorrectiveAction.length
          for (let i = 0; i < countFileCorrectiveAction; i++) {
            this.OldCorrectiveActionFile.push(this.field.FileCorrectiveAction[i])
            this.field.CorrectiveActionFile.push(process.env.BASE_URL + this.field.FileCorrectiveAction[i])
          }
        }
        if(this.field.CorrectiveActionFile == ''){
          this.OldCorrectiveActionFile = ''
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

        if (this.opsRiskAssesment.length > 0) {
          this.field.IdDevRiskAssesment[0].Question = this.opsRiskAssesment[0].Question;
        } else {
          this.field.IdDevRiskAssesment[0].Question = ''; // Set a default value or handle the situation differently
        }

        if (this.opsRiskAssesment2.length > 0) {
          this.field.IdDevRiskAssesment2[0].Question = this.opsRiskAssesment2[0].Question;
        } else {
          this.field.IdDevRiskAssesment2[0].Question = ''; // Set a default value or handle the situation differently
        }

        if (this.opsRiskAssesment3.length > 0) {
          this.field.IdDevRiskAssesment3[0].Question = this.opsRiskAssesment3[0].Question;
        } else {
          this.field.IdDevRiskAssesment3[0].Question = ''; // Set a default value or handle the situation differently
        }

        this.isCorrection = resp.isCorrection
       
        // this.field.IdDevRiskAssesment[0].Question = this.opsRiskAssesment[0].Question
        // this.field.IdDevRiskAssesment2[0].Question = this.opsRiskAssesment2[0].Question
        // this.field.IdDevRiskAssesment3[0].Question = this.opsRiskAssesment3[0].Question
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

    getRelevantDept () {
      axios.post('/AdminVue/noe-verification-get-relevant-dept')
      .then( function (res) {
        this.opsRelevantDept = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsRelevantDept = []
      }.bind(this))
    },

    getDeviationRisk () {
      axios.post('/AdminVue/noe-verification-get-deviation-risk')
      .then( function (res) {
        this.opsRiskAssesment = res.data.data
        this.field.IdDevRiskAssesment[0].Question = res.data.data[0].Question
        this.opsRiskAssesment2 = res.data.data2
        this.field.IdDevRiskAssesment2[0].Question = res.data.data2[0].Question
        this.opsRiskAssesment3 = res.data.data3
        this.field.IdDevRiskAssesment3[0].Question = res.data.data3[0].Question

      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsRiskAssesment = []
        this.opsRiskAssesment2 = []
        this.opsRiskAssesment3 = []
      }.bind(this))
    },

    getDeviationLevel (value) {
      axios.post('/AdminVue/noe-verification-get-deviation-level', {
        value:value,
      })
      .then( function (res) {
        this.field.DeviationLevel = res.data.data
        this.IdDeviationLevel = res.data.iddeviation
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.field.DeviationLevel = ''
        this.IdDeviationLevel = ''
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

    addDetail() {
      this.field.IdDevRiskAssesment.push({'RiskAssesment':'','Question':'','Value':'','AssesmentGroup':''})
    },

    removeDetail(index) {
      this.field.IdDevRiskAssesment.splice(index,1)
      this.countValue()
    },

    backIndex() {
      this.$router.push('/RoleAdmin/noe/data-noe-verification')
    },

    onAction(action) {
      if(action == 'sendAnswer') {
        return this.sendAnswer('/AdminVue/noe-report-answer', this.field.NOENumber, this.field.Answer, this.$parent, true, this.valStatus) 
      }

      if (this.isCorrection == false)
      {
        if(action == 'publish-verify'){
          this.publishVerify('/AdminVue/noe-verification-publish-verify', this.field.Id, this.$parent, true)
        }
        if(action == 'approve'){
          this.approve('/AdminVue/noe-verification-approve', this.field.Id, this.$parent, null, true, this.isCaretaker)
        }
        if(action == 'reject'){
          this.reject('/AdminVue/noe-verification-reject', this.field.Id, this.$parent, true, this.isCaretaker)
        }
        if(action == 'correction'){
          this.$router.push({
            name: 'noe/form-correction-noe-verification',
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

    this.getRelevantDept()
    this.getDeviationRisk() 
    this.getPublish()

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/noe-verification-update'
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