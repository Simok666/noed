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
            <label class="form-label">No. NOD</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.NODNumber"
              :options="opsNODNumber"
              :allow-empty="false"
              placeholder="Pilih No. NOD"
              label="NODNumber"
              track-by="NODNumber"
              @input="onChange"
              required
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.NODNumber">{{ allErrors.NODNumber[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">No. NOE</label>
            <b-input name="NOENumber" :state="allErrors.NOENumber?false:null" v-model="field.NOENumber" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.NOENumber">{{ allErrors.NOENumber[0] }}</span>
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
            <label class="form-label">Uraian / Kondisi Ketidaksesuaian</label>
            <b-textarea name="Event" :state="allErrors.Event?false:null" v-model="field.Event" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.Event">{{ allErrors.Event[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Kondisi Seharusnya</label>
            <b-textarea name="ProperCondition" :state="allErrors.ProperCondition?false:null" v-model="field.ProperCondition" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.ProperCondition">{{ allErrors.ProperCondition[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Man (Personel)</label>
            <b-textarea name="Man" :state="allErrors.Man?false:null" v-model="field.Man" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.Man">{{ allErrors.Man[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Machine (Mesin / Peralatan)</label>
            <b-textarea name="Machine" :state="allErrors.Machine?false:null" v-model="field.Machine" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.Machine">{{ allErrors.Machine[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Method (Metode / Prosedur)</label>
            <b-textarea name="Method" :state="allErrors.Method?false:null" v-model="field.Method" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.Method">{{ allErrors.Method[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Material (Produk / Bahan)</label>
            <b-textarea name="Material" :state="allErrors.Material?false:null" v-model="field.Material" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.Material">{{ allErrors.Material[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Milieu (Lingkungan)</label>
            <b-textarea name="Milieu" :state="allErrors.Milieu?false:null" v-model="field.Milieu" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.Milieu">{{ allErrors.Milieu[0] }}</span>
          </b-form-group>
        </b-form-row>

        <!-- <b-card class="mb-4" header="Tindakan Koreksi" header-tag="h5">
          <b-form-row>
            <b-form-group class="col-md-4">
              <label class="form-label">PIC</label>
              <b-input name="IdCAPIC" :state="allErrors.IdCAPIC?false:null" v-model="field.IdCAPIC" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.IdCAPIC">{{ allErrors.IdCAPIC[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-4">
              <label class="form-label">Tanggal Batas Tindakan</label>
                <b-input name="CADate" :state="allErrors.CADate?false:null" v-model="field.CADate" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.CADate">{{ allErrors.CADate[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-4">
              <label class="form-label">Deskripsi</label>
              <b-textarea name="CADescription" :state="allErrors.CADescription?false:null" v-model="field.CADescription" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.CADescription">{{ allErrors.CADescription[0] }}</span>
            </b-form-group>
          </b-form-row>
        </b-card>

        <b-card class="mb-3" header="Lampiran Tindakan Koreksi" header-tag="h5">
          <b-form-row>
            <b-form-group class="col-md-4" v-for="(item, index) in field.CAFileName" :key="index">
              <b-input-group>
                <b-form-input name="CAFileName" v-model="item[0]" readonly></b-form-input>
                <b-input-group-append>
                  <a class="input-group-text btn-outline-success" :href="BaseUrl+item[1]" target="_blank">
                    <i class="fa fa-download"></i>
                  </a>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-form-row>
        </b-card>

        <b-card class="mb-4" header="Tindakan Pencegahan" header-tag="h5">
          <b-form-row>
            <b-form-group class="col-md-4">
              <label class="form-label">PIC</label>
              <b-input name="IdPAPIC" :state="allErrors.IdPAPIC?false:null" v-model="field.IdPAPIC" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.IdPAPIC">{{ allErrors.IdPAPIC[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-4">
              <label class="form-label">Tanggal Batas Tindakan</label>
                <b-input name="PADate" :state="allErrors.PADate?false:null" v-model="field.PADate" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.PADate">{{ allErrors.PADate[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-4">
              <label class="form-label">Deskripsi</label>
              <b-textarea name="PADescription" :state="allErrors.PADescription?false:null" v-model="field.PADescription" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.PADescription">{{ allErrors.PADescription[0] }}</span>
            </b-form-group>
          </b-form-row>
        </b-card>

        <b-card class="mb-3" header="Lampiran Tindakan Pencegahan" header-tag="h5">
          <b-form-row>
            <b-form-group class="col-md-4" v-for="(item, index) in field.PAFileName" :key="index">
              <b-input-group>
                <b-form-input name="PAFileName" v-model="item[0]" readonly></b-form-input>
                <b-input-group-append>
                  <a class="input-group-text btn-outline-success" :href="BaseUrl+item[1]" target="_blank">
                    <i class="fa fa-download"></i>
                  </a>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-form-row>
        </b-card> -->

        <b-card class="mb-4" header="Tindakan Perbaikan (Corrective Action)" header-tag="h5">
          <template v-for="(item, index) in field.NODCA">
          <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">PIC</label>
              <b-input name="CAPIC" v-model="item.CAPIC" class="mb-1" readonly />
            </b-form-group>
            <b-form-group class="col-md-5 col-10">
              <label class="form-label">Due Date</label>
              <b-form-datepicker locale="en" v-model="item.CADate" class="mb-1" :date-format-options="datePickerFormat" required :disabled="true"></b-form-datepicker>
            </b-form-group>
          </b-form-row>

          <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">Deskripsi</label>
              <b-textarea name="CADescription" v-model="item.CADescription" class="mb-1" required :readonly="true" />
            </b-form-group>

            <b-form-group class="col-md-4">
              <label class="form-label">Lampiran Tindakan Koreksi</label>
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
        </b-card>

        <b-card class="mb-4" header="Tindakan Pencegahan (Preventive Action)" header-tag="h5">
          <template v-for="(item, index) in field.NODPA">
          <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">PIC</label>
              <b-input name="PAPIC" v-model="item.PAPIC" class="mb-1" readonly />
            </b-form-group>

            <b-form-group class="col-md-5 col-10">
              <label class="form-label">Due Date</label>
              <b-form-datepicker locale="en" v-model="item.PADate" class="mb-1" :date-format-options="datePickerFormat" required :disabled="true"></b-form-datepicker>
            </b-form-group>
          </b-form-row>

          <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">Deskripsi</label>
              <b-textarea name="PADescription" v-model="item.PADescription" class="mb-1" required :readonly="true" />
            </b-form-group>

            <b-form-group class="col-md-4">
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
        </b-card>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Sistem Lain yang Terdampak</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.IsOSA"
              :options="opsOSA"
              :allow-empty="false"
              placeholder="Pilih Sistem Lain yang Terdampak"
              label="text"
              track-by="text"
              @input="onChangeOSA"
              required
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.IsOSA">{{ allErrors.IsOSA[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-card class="md-4" v-if="IsOSA == true">
          <b-form-row v-for="(item, index) in field.OtherSA" :key="index">
            <b-form-group class="col-md-4">
              <template v-if="index == 0">
              <label>Terdampak Pada Sistem</label>
              <label class="form-label float-right text-danger">*Wajib Dipilih</label>
              </template>
              <multiselect
                :allow-empty="false"
                v-model="item.Assesment"
                :options="opsAssesment"
                placeholder="Pilih Terdampak Pada Sistem"
                selectLabel=""
                deselectLabel=""
                label="RiskAssesment"
                track-by="RiskAssesment"
                @select="onSelectDevRisk($event,index)"
                required
                :disabled="isShow" />
            </b-form-group>
            <b-form-group class="col-md-4">
              <template v-if="index == 0">
              <label>Deskripsi</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              </template>
              <b-textarea name="Description" v-model="item.Description" class="mb-1" required :readonly="isShow" />
            </b-form-group>
            <b-form-group class="col-md-3" v-if="isShow == false">
              <template v-if="index == 0">
              <label>Lampiran Sistem Lain yang Terdampak</label>
              <label class="form-label float-right text-danger">(Max. 100 MB)</label>
              </template>
              <file-pond
                name="AssesmentFile"
                ref="pondMyFile"
                label-idle="Tambahkan Lampiran"
                :allow-multiple="false"
                @updatefiles="handleFileAssesment($event,index)"
                :files="item.file"
                accepted-file-types="application/*, image/*, video/*"
                maxTotalFileSize="100MB"
                :disabled="isShow" />
            </b-form-group>
            <b-form-group class="col-md-4" v-if="isShow == true">
              <label v-if="index == 0">Lampiran Sistem Lain yang Terdampak</label>
              <b-input-group>
                <b-form-input name="AssesmentFile" v-model="item.fileName" readonly></b-form-input>
                <b-input-group-append>
                  <a class="input-group-text btn-outline-success" :href="item.file" target="_blank">
                    <i class="fa fa-download"></i>
                  </a>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group class="col-md-1 col-2 text-center" v-if="isShow == false">
              <label v-if="index == 0">Tindakan</label>
              <b-button v-if="index > 0" class="btn btn-sm btn-danger text-white" :pill="true" @click="removeDetail(index)">
                <i class="ion ion-md-trash"></i>
              </b-button>
            </b-form-group>
          </b-form-row>
          <b-btn v-if="isShow == false" type="button" @click="addDetail()" id="btambah-risk" class="float-left btn-info"><i class="fas fa-plus"></i> Tambah</b-btn>
        </b-card><br>

        <b-form-row v-if="isApprove == true && isShow == true">
          <b-form-group class="col-md-6">
            <label class="form-label">Verifikasi Efektifitas CAPA</label>
            <label class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.VerifCAPA"
              :options="opsVerifCAPA"
              :allow-empty="false"
              placeholder="Pilih Verifikasi Efektifitas CAPA"
              label="text"
              track-by="text"
              @input="onChangeVerifCAPA"
              required
              :disabled="isShowAll" />
            <span class="text-danger" v-if="allErrors.VerifCAPA">{{ allErrors.VerifCAPA[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6" v-if="descCAPA == true">
            <label class="form-label">Deskripsi</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="DescriptionCAPA" :state="allErrors.DescriptionCAPA?false:null" v-model="field.DescriptionCAPA" class="mb-1" required :readonly="isShowAll" />
            <span class="text-danger" v-if="allErrors.DescriptionCAPA">{{ allErrors.DescriptionCAPA[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row v-if="isApprove == false && isShow == true && valStatus == 4">
          <b-form-group class="col-md-6">
            <label class="form-label">Verifikasi Efektifitas CAPA</label>
            <b-input name="VerifCAPA" v-model="field.VerifCAPA" class="mb-1" readonly />
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Deskripsi</label>
            <b-textarea name="DescriptionCAPA" v-model="field.DescriptionCAPA" class="mb-1" readonly />
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6"></b-form-group>
          <b-form-group label="" class="col-md-6">
            <b-btn v-if="isShow == true && Position == 2 && valStatus <= 1" type="button" variant="primary" class="float-right ml-2" @click="onAction('publish')">Publish</b-btn>

            <b-btn v-if="isShow == true && Position == 2 && isCaretaker == false && valStatus == 2" variant="success" class="float-right ml-2">Diajukan</b-btn>

            <b-btn v-if="isShow == true && isApprove == true && ( (Position == 3 && valStatus == 2) ||  ((Position == 4 || isCaretaker == true) && valStatus == 3) )" type="button" variant="primary" class="float-right ml-2" @click="onAction('approve')">Setujui</b-btn>

            <b-btn v-if="isShow == true && isApprove == true && (Position == 4 || isCaretaker == true) && valStatus == 3" type="button" variant="danger" class="float-right ml-2" @click="onAction('reject')">Tolak</b-btn>

            <b-btn v-if="isShow == true && (Position == 4 || isCaretaker == true) && valStatus == 4" variant="success" class="float-right ml-2">Disetujui</b-btn>

            <b-btn v-if="isShow == true && (Position == 4 || isCaretaker == true) && valStatus == 5" variant="warning" class="float-right ml-2">Ditolak</b-btn>

            <b-btn v-if="isShow == true && isApprove == false && ( (Position == 3 && valStatus == 2) || ((Position == 4 || isCaretaker == true) && valStatus == 3) )" type="button" variant="warning" class="float-right ml-2" @click="onAction('correction')">Koreksi</b-btn>

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
  name: 'form-nod-review',
  metaInfo: {
    title: 'Form NOD Review'
  },
  components: {
  },
  data () {
    return {
      urlSubmit: '/AdminVue/nod-review-insert',
      headerCard: 'Review NOD',
      textBtnSubmit: 'Simpan',
      field: {
        NOENumber: '',
        BatchNo: '',
        IdProduct: '',
        Event: '',
        ProperCondition: '',
        Man: '',
        Machine: '',
        Method: '',
        Material: '',
        Milieu: '',
        // IdCAPIC: '',
        // CADate: '',
        // CADescription: '',
        // CAFile: [],
        // CAFileName: [],
        // IdPAPIC: '',
        // PADate: '',
        // PADescription: '',
        // PAFile: [],
        // PAFileName: [],
        NODCA:[{CAPIC:'',CADate:'',CADescription:'',CAFile:[]}],
        NODPA:[{PAPIC:'',PADate:'',PADescription:'',PAFile:[]}],
        OtherSA:[{Assesment:'',Description:'',AssesmentFile:''}],
        VerifCAPA: '',
        DescriptionCAPA: ''
      },
      allErrors: [],
      isNotif: false,
      isEdit: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsNODNumber: [],
      opsOSA: [
        {'value':'Ada','text':'Ada'},
        {'value':'Tidak Ada','text':'Tidak Ada'}
      ],
      IsOSA: false,
      opsAssesment: [],
      oldAssesmentFile: [],
      valStatus: 0,
      Position: 0, //1 = unit head; 2 = sect head; 3 = dept head;
      isShow: false,
      isApprove: false,
      isShowAll: false,
      opsVerifCAPA: [
        {'value':'CAPA telah dilaksanakan dengan baik','text':'CAPA telah dilaksanakan dengan baik'},
        {'value':'Perlu CAPA lain','text':'Perlu CAPA lain'}
      ],
      descCAPA: false,
      BaseUrl: process.env.BASE_URL,
      isCaretaker: false
    }
  },
  methods: {
    submitForm () {
      this.showLoading()
      var isEmpty = false
      if(this.field.OtherSA && this.field.IsOSA && this.field.IsOSA.value == "Ada") {
        this.field.OtherSA.forEach((data,index) => {
          if(data.Assesment=='') {
            isEmpty = true
            return false
          }
        })
      }
      if(isEmpty) {
        this.$swal({
          icon: 'error',
          text: 'Silahkan lengkapi kolom *Wajib Diisi!'
        })
      } else {
        const formData = new FormData()
        formData.append("Id", this.field.Id)
        if(this.field.NODNumber) formData.append("NODNumber", this.field.NODNumber.Id)
        if(this.field.IsOSA) {
          formData.append("IsOSA", this.field.IsOSA.value)
          if(this.field.IsOSA.value == "Ada") {
            for( var i = 0; i < this.field.OtherSA.length; i++ ) {
              if(this.field.OtherSA[i].file) var file = this.field.OtherSA[i].file
              formData.append('Assesment[' + i + ']', JSON.stringify(this.field.OtherSA[i].Assesment))
              formData.append('Description[' + i + ']', this.field.OtherSA[i].Description)
              if(this.field.OtherSA[i].file) formData.append('AssesmentFile[' + i + ']', file[0])
            }
            formData.append("OldAssesmentFile",JSON.stringify(this.oldAssesmentFile))
          }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post(this.urlSubmit, formData, config)
        .then( function (res) {
          var resp = res.data

          if(resp.status){

            this.$router.push({
              name: 'nod/data-nod-review',
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
      if(option) this.getDataNOD(option.Id)
    },

    onChangeOSA(option) {
      if(option.value == "Ada" || option == "Ada") {
        this.IsOSA = true
      } else {
        this.IsOSA = false
        this.field.OtherSA = [{Assesment:'',Description:'',AssesmentFile:''}]
      }
    },

    onChangeVerifCAPA(option) {
      if(option.value == "CAPA telah dilaksanakan dengan baik") this.descCAPA = false
      else this.descCAPA = true
    },

    onSelectDevRisk(value,index) {
      var isExist = false
      if(this.field.OtherSA.length && this.field.OtherSA.length>1) {
        this.field.OtherSA.forEach((data,index) => {
          if(data.Assesment.RiskAssesment==value.RiskAssesment) isExist = true
        })
      }

      if(isExist) {
        this.$swal({
          icon: 'error',
          text: 'Assesment tidak boleh sama!'
        }).then( function () {
          setTimeout(()=>{ document.getElementById("btambah-risk").focus() }, 500)
        })
        this.removeDetail(index)
      }
    },

    getData (Id) {
      axios.post('/AdminVue/nod-review-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.Position = res.data.position
        this.field = resp.data
        this.onChangeOSA(this.field.IsOSA)
        if(this.field.OtherSA == null) this.field.OtherSA = [{Assesment:'',Description:'',AssesmentFile:''}]
        if(res.data.data.IsOSA.value == 'Ada') {
          this.field.OtherSA.forEach((value,index) => {
            if(value){
              value.Assesment = JSON.parse(value.Assesment)
              if(value.file!='') {
                this.oldAssesmentFile.push(value.file)
                value.file = window.location.origin + '/' + value.file
                let result = value.fileName.split('/')
                value.fileName = result[4]
              }else{
                this.oldAssesmentFile.push('')
              }
            }
          })
        }
        if(this.field.Status) {
          if(this.field.Status == 'UnPublish') this.valStatus = 1
          if(this.field.Status == 'Dilaporkan ke QA APJ') this.valStatus = 2
          if(this.field.Status == 'Disetujui oleh QA Sect.Head') this.valStatus = 3
          if(this.field.Status == 'Disetujui oleh QA Dept.Head') this.valStatus = 4
          if(this.field.Status == 'Ditolak') this.valStatus = 5
        }
        if(this.isShow == true && this.isApprove == false) this.isShowAll == true
        this.isCaretaker = res.data.isCaretaker

        this.field.NODCA = res.data.NODCA
        this.field.NODPA = res.data.NODPA

        this.field.NODCA.forEach((value,index) => {
          if(value){
            if(value.CAFile!='') {
              value.CAFile = JSON.parse(value.CAFile)
              value.CAFileName = []
              value.CAFile.forEach((val, i)=> {
                value.CAFile[i] = window.location.origin + '/' + val
                let result = val.split('/')
                value.CAFileName[i] = result[4]
              })
            }
          }
        })

        this.field.NODPA.forEach((value,index) => {
          if(value){
            if(value.PAFile!='') {
              value.PAFile = JSON.parse(value.PAFile)
              value.PAFileName = []
              value.PAFile.forEach((val, i)=> {
                value.PAFile[i] = window.location.origin + '/' + val
                let result = val.split('/')
                value.PAFileName[i] = result[4]
              })
            }
          }
        })


      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getNODNumber () {
      axios.post('/AdminVue/nod-review-get-nod-number')
      .then( function (res) {
        this.opsNODNumber = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsNODNumber = []
      }.bind(this))
    },

    getDataNOD (Id) {
      axios.post('/AdminVue/nod-review-get-data-nod', {
        Id:Id,
      })
      .then( function (res) {
        this.field.NOENumber = res.data.data.NOENumber
        this.field.BatchNo = res.data.data.BatchNo
        this.field.IdProduct = res.data.data.IdProduct
        this.field.Event = res.data.data.Event
        this.field.ProperCondition = res.data.data.ProperCondition
        this.field.Man = res.data.data.Man
        this.field.Machine = res.data.data.Machine
        this.field.Method = res.data.data.Method
        this.field.Material = res.data.data.Material
        this.field.Milieu = res.data.data.Milieu

        /*this.field.IdCAPIC = res.data.data.IdCAPIC
        this.field.CADate = res.data.data.CADate
        this.field.CADescription = res.data.data.CADescription
        this.field.FileCA = res.data.data.FileCA
        if(res.data.data.FileCA != '') {
          let countFileCA = this.field.FileCA.length
          for(let i = 0; i < countFileCA; i++) {
            this.field.CAFile.push(process.env.BASE_URL + this.field.FileCA[i])
          }
        }
        this.field.CAFileName = res.data.data.CAFileName
        this.field.IdPAPIC = res.data.data.IdPAPIC
        this.field.PADate = res.data.data.PADate
        this.field.PADescription = res.data.data.PADescription
        this.field.FilePA = res.data.data.FilePA
        if(res.data.data.FilePA != '') {
          let countFilePA = this.field.FilePA.length
          for(let i = 0; i < countFilePA; i++) {
            this.field.PAFile.push(process.env.BASE_URL + this.field.FilePA[i])
          }
        }
        this.field.PAFileName = res.data.data.PAFileName*/

        this.field.NODCA = res.data.NODCA
        this.field.NODPA = res.data.NODPA

        this.field.NODCA.forEach((value,index) => {
          if(value){
            if(value.CAFile!='') {
              value.CAFile = JSON.parse(value.CAFile)
              value.CAFileName = []
              value.CAFile.forEach((val, i)=> {
                value.CAFile[i] = window.location.origin + '/' + val
                let result = val.split('/')
                value.CAFileName[i] = result[4]
              })
            }
          }
        })

        this.field.NODPA.forEach((value,index) => {
          if(value){
            if(value.PAFile!='') {
              value.PAFile = JSON.parse(value.PAFile)
              value.PAFileName = []
              value.PAFile.forEach((val, i)=> {
                value.PAFile[i] = window.location.origin + '/' + val
                let result = val.split('/')
                value.PAFileName[i] = result[4]
              })
            }
          }
        })

      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    getDevRiskAssesment () {
      axios.post('/AdminVue/nod-review-get-risk-assesment')
      .then( function (res) {
        this.opsAssesment = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsAssesment = []
      }.bind(this))
    },

    handleFileAssesment: function(files,index) {
      this.field.OtherSA[index].file = files.map(files => files.file)
    },

    handleRemoveFileAssesment: function(error,files){
      let result = typeof(files.source)
      if(this.isEdit == true && result === 'string'){
        console.log(window.location.origin)
        let index = this.oldAssesmentFile.indexOf(files.source.replace(window.location.origin+'/clouds','clouds'))
        this.oldAssesmentFile.splice(index,1)
        // this.oldAssesmentFile.splice(0,1)
      }
    },

    addDetail() {
      this.field.OtherSA.push({'Assesment':'','Description':'','AssesmentFile':''})
    },

    removeDetail(index) {
      if(this.isEdit == true){
        this.oldAssesmentFile.splice(index,1)
      }
      this.field.OtherSA.splice(index,1)
    },

    backIndex() {
      this.$router.push('/RoleAdmin/nod/data-nod-review')
    },

    onAction(action){
      if(action == 'publish'){
        this.publish('/AdminVue/nod-review-publish', this.field.Id, this.$parent, true)
      }
      if(action == 'approve'){
        if(this.field.VerifCAPA && this.field.VerifCAPA.value) {
          this.approveCAPA('/AdminVue/nod-review-approve', this.field.Id, this.$parent, this.field.VerifCAPA, this.field.DescriptionCAPA, this.isCaretaker)
        } else {
          this.$swal({
            icon: 'error',
            text: 'Silahkan lengkapi kolom *Wajib Diisi!'
          })
        }
      }
      if(action == 'reject'){
        this.rejectOld('/AdminVue/nod-review-reject', this.field.Id, this.$parent, null, this.isCaretaker)
      }
      if(action == 'correction'){
        this.$router.push({
          name: 'nod/form-correction-nod-review',
          params: {
            Id: this.field.Id,
            isCaretaker: this.isCaretaker
          }
        })
      }
    }

  },

  mounted(){

    this.getNODNumber()
    this.getDevRiskAssesment()

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      this.isEdit = true
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/nod-review-update'
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

    if(this.$route.params.isApprove){
      this.isApprove = this.$route.params.isApprove
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
      }
    }
  },

}
</script>