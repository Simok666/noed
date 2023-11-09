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
            <b-input name="NODNumber" :state="allErrors.NODNumber?false:null" v-model="field.NODNumber" class="mb-1" readonly required />
            <span class="text-danger" v-if="allErrors.NODNumber">{{ allErrors.NODNumber[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">No. NOE</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Dipilih</label>
            <multiselect
              v-model="field.NOENumber"
              :options="opsNOENumber"
              :allow-empty="false"
              placeholder="Pilih No. NOE"
              label="NOENumber"
              track-by="NOENumber"
              @input="onChange"
              required
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.NOENumber">{{ allErrors.NOENumber[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Tanggal Kejadian NOE</label>
            <b-input name="Date" v-model="field.Date" class="mb-1" readonly/>
            <!-- <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-form-datepicker locale="en" v-model="field.Date" class="mb-1" :date-format-options="datePickerFormat" required :disabled="isShow"></b-form-datepicker>
            <span class="text-danger" v-if="allErrors.Date">{{ allErrors.Date[0] }}</span> -->
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
            <!-- <b-textarea name="Event" :state="allErrors.Event?false:null" v-model="field.Event" class="mb-1" readonly /> -->
            <!-- <b-input name="Event" :state="allErrors.Event?false:null" v-model="field.Event" class="mb-1" readonly/> -->
            <b-textarea name="Event" :state="allErrors.Event?false:null" v-model="field.Event" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.Event">{{ allErrors.Event[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Kondisi Seharusnya</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="ProperCondition" :state="allErrors.ProperCondition?false:null" v-model="field.ProperCondition" class="mb-1" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.ProperCondition">{{ allErrors.ProperCondition[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Man (Personel)</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="Man" :state="allErrors.Man?false:null" v-model="field.Man" class="mb-1" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.Man">{{ allErrors.Man[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Machine (Mesin / Peralatan)</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="Machine" :state="allErrors.Machine?false:null" v-model="field.Machine" class="mb-1" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.Machine">{{ allErrors.Machine[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Method (Metode / Prosedur)</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="Method" :state="allErrors.Method?false:null" v-model="field.Method" class="mb-1" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.Method">{{ allErrors.Method[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Material (Produk / Bahan)</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="Material" :state="allErrors.Material?false:null" v-model="field.Material" class="mb-1" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.Material">{{ allErrors.Material[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Milieu (Lingkungan)</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-textarea name="Milieu" :state="allErrors.Milieu?false:null" v-model="field.Milieu" class="mb-1" required :readonly="isShow" />
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
              :disabled="isShow" />
            </b-form-group>
            <b-form-group class="col-md-5 col-10">
              <label class="form-label">Due Date</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-form-datepicker locale="en" v-model="item.CADate" :min="min" class="mb-1" :date-format-options="datePickerFormat" required :disabled="isShow"></b-form-datepicker>
            </b-form-group>
            <b-form-group class="col-md-1 col-2 text-center" v-if="isShow == false && index > 0">
              <label>Tindakan</label><br>
              <b-button class="btn btn-sm btn-danger text-white" :pill="true" @click="removeDetail(index, 'CA')">
                <i class="ion ion-md-trash"></i>
              </b-button>
            </b-form-group>
          </b-form-row>

          <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">Deskripsi</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-textarea name="CADescription" v-model="item.CADescription" class="mb-1" required :readonly="isShow" />
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
              :disabled="isShow" />
            </b-form-group>

            <b-form-group v-if="isShow" class="col-md-4">
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

          <b-btn v-if="isShow == false" type="button" @click="addDetail('CA')" id="btambah-CA" class="float-left btn-info"><i class="fas fa-plus"></i> Tambah</b-btn>
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
              :disabled="isShow" />
            </b-form-group>

            <b-form-group class="col-md-5 col-10">
              <label class="form-label">Due Date</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-form-datepicker locale="en" v-model="item.PADate" :min="min" class="mb-1" :date-format-options="datePickerFormat" required :disabled="isShow"></b-form-datepicker>
            </b-form-group>

            <b-form-group class="col-md-1 col-2 text-center" v-if="isShow == false && index > 0">
              <label>Tindakan</label><br>
              <b-button class="btn btn-sm btn-danger text-white" :pill="true" @click="removeDetail(index, 'PA')">
                <i class="ion ion-md-trash"></i>
              </b-button>
            </b-form-group>
          </b-form-row>

          <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">Deskripsi</label>
              <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
              <b-textarea name="PADescription" v-model="item.PADescription" class="mb-1" required :readonly="isShow" />
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
              :disabled="isShow" />
            </b-form-group>

            <b-form-group v-if="isShow" class="col-md-4">
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

          <b-btn v-if="isShow == false" type="button" @click="addDetail('PA')" id="btambah-PA" class="float-left btn-info"><i class="fas fa-plus"></i> Tambah</b-btn>

        </b-card>

        <b-card class="mb-4" v-if="Position == 2 || Position == 4" header="Sistem Lain Yang Terdampak (Bila Ada)" header-tag="h5">
          <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
          <b-form-group label="Bagian ini diisi oleh QA" > 
            <b-form-radio v-model="selected" :state="allErrors.selected?false:null"  :value="false" :disabled="isShow">Tidak Ada</b-form-radio>
            <b-form-radio v-model="selected" :state="allErrors.selected?false:null"  :value="true" :disabled="isShow">Ada, yaitu ...</b-form-radio>
            <span class="text-danger" v-if="allErrors.selected">{{ allErrors.selected[0] }}</span>
          </b-form-group>

          <b-form-group v-if="selected === true">
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
                      :readonly="isShow"
                    ></b-form-textarea>

                    <b-form-row>
                        <b-form-group class="col-md-12" >
                          <label class="form-label">Lampiran sistem lain yang terdampak</label>
                          <label class="form-label float-right text-danger">(Max. 50 MB)</label>
                          <file-pond
                          name="anotherEffectFile"
                          ref="pondMyFile"
                          label-idle="Lampiran : 1.Data Batch Record; 2.Buku Kronik; 3.Dokumentasi before/after perbaikan; 4.Lain-lain;"
                          :allow-multiple="true"
                          @updatefiles="handleAnotherEffectFile($event, item.id_effect)"
                          @removefile="handleRemoveEffectFile"
                          :files="anotherEffectFile[item.id_effect]"
                          accepted-file-types="application/*, image/*, video/*"
                          maxTotalFileSize="50MB"
                          :disabled = "isShow"
                        />
                        </b-form-group>
            
                        <b-card class="mb-3" header="Lampiran Another Effect" header-tag="h5">
                          <b-form-row>
                            <b-form-group class="col-md-12" v-for="(itemFile, indexFile) in fileAnotherEffectDownload[item.id_effect]" :key="indexFile">
                              <b-input-group>
                                <b-form-input name="FileVerifPADownload" v-model="itemFile[0]" readonly></b-form-input>
                                <b-input-group-append>
                                  <a class="input-group-text btn-outline-success" :href="BaseUrl+itemFile[1]" target="_blank">
                                    <i class="fa fa-download"></i>
                                  </a>
                                </b-input-group-append>
                              </b-input-group>
                            </b-form-group>
                          </b-form-row>
                        </b-card>
                    </b-form-row>

                  </div>

            </li>
          </b-form-group>
          
        </b-card>

        <b-form-row>
          <b-form-group class="col-md-6"></b-form-group>
          <b-form-group label="" class="col-md-6">
            
            <b-btn v-if="isShow == true && Position < 3 && valStatus == 1" type="button" variant="primary" class="float-right ml-2" @click="onAction('publish')">Publish</b-btn>
            
            <b-btn v-if="isShow == true && ( (valStatus == 2 && field.IdDepartment == userDepartment && Position == 1) || (valStatus == 3 && field.IdDepartment == userDepartment && Position == 2) || (valStatus == 4 && field.IdDepartment == userDepartment && (Position == 4 || isCaretaker == true)) || (valStatus == 5 && deptTerkait == true && statusDeptTerkait==false) || (userDepartment == 67 &&  ( (Position == 3 && valStatus == 6) || (Position == 4 && valStatus == 10) || (Position == 4 && valStatus == 10) || (Position == 2 && valStatus == 6) )) )"
              type="button" variant="primary" class="float-right ml-2" @click="onAction('approve')">
            Setujui</b-btn>

            <b-btn v-if="isShow == true && ( (valStatus == 4 && field.IdDepartment == userDepartment && (Position == 4 || isCaretaker == true)) || (userDepartment == 67 && ( (Position == 3 && valStatus == 6) || (Position == 4 && valStatus == 10) || (Position == 4 && valStatus == 10) )) )"
              type="button" variant="danger" class="float-right ml-2" @click="onAction('reject')">
            Tolak</b-btn>

            <b-btn v-if="isShow == true && ( (valStatus == 2 && field.IdDepartment == userDepartment && Position == 1) || (valStatus == 3 && field.IdDepartment == userDepartment && Position == 2) || (valStatus == 4 && field.IdDepartment == userDepartment && (Position == 4 || isCaretaker == true)) || (valStatus == 5 && deptTerkait == true && statusDeptTerkait==false) || (userDepartment == 67 && ( (Position == 3 && valStatus == 6) || (Position == 4 && valStatus == 10) || (Position == 4 && valStatus == 10) )) )"
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
      urlSubmit: '/AdminVue/nod-report-insert',
      headerCard: 'Laporan NOD',
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
        SectionPublish: 0
      },
      allErrors: [],
      isNotif: false,
      isEdit: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsNOENumber: [],
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
      getAnotherEffect: [],
      checkedEffect: [],
      text: [],
      anotherEffectFile: [],
      fileAnotherEffect: [],
      fileAnotherEffectDownload: [],
      oldFileAnotherEffect: [],
      dataAnotherEffect: [],
      fileResponseAnotherEffect: []
    }
  },

  created() {
    // Initialize the 'text' object with default values for each 'title_effect'
    this.getAnotherEffect.forEach((item) => {
      this.text[item.id_effect] = '';
      this.anotherEffectFile[item.id_effect] = [];
    });
  },

  watch: {
    checkedEffect: {
      handler() {
        // Ketika checkbox diubah, perbarui nilai textarea sesuai dengan checkbox yang dicentang
        for (const key in this.checkedEffect) {
          if (this.checkedEffect[key]) {
            if (!this.text[key] || !this.anotherEffectFile[key]) {
              this.text[key] = ''; // Inisialisasi nilai textarea jika belum ada
              // this.anotherEffectFile[key] = []; 
            }
          } else {
            delete this.text[key]; // Hapus nilai textarea jika checkbox tidak dicentang
            delete this.anotherEffectFile[key]
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
      
      if(this.field.NODCA) {
        this.field.NODCA.forEach((data,index) => {
          if(data.IdCAPIC=='' || data.CADate=='') {
            isEmpty = true
            return false
          }
        })
      }

      if(this.field.NODPA) {
        this.field.NODPA.forEach((data,index) => {
          if(data.IdPAPIC=='' || data.PADate=='') {
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
        formData.append("NODNumber", this.field.NODNumber)
        if(this.field.NOENumber) formData.append("NOENumber", this.field.NOENumber.Id)
        formData.append("Date", this.field.Date)
        formData.append("ProperCondition", this.field.ProperCondition)
        formData.append("Man", this.field.Man)
        formData.append("Machine", this.field.Machine)
        formData.append("Method", this.field.Method)
        formData.append("Material", this.field.Material)
        formData.append("Milieu", this.field.Milieu)
        
        let collected = []
        
        if(this.selected == true){
          for (const idEffect in this.checkedEffect) {
            if(this.checkedEffect[idEffect]) {
                
                if(this.anotherEffectFile[idEffect] !== undefined) {

                  for( var i = 0; i < this.anotherEffectFile[idEffect].length; i++ ) {
                    let file = this.anotherEffectFile[idEffect][i];
                    
                    formData.append('anotherEffectFile[' + idEffect + '][' + i + ']', file);
                  }
                } 

                if(this.oldFileAnotherEffect[idEffect] !== undefined) {
            
                  for(var i = 0; i < this.oldFileAnotherEffect[idEffect].length; i++ ) {
                    let oldfile = this.oldFileAnotherEffect[idEffect][i];
                    
                    formData.append('oldEffectFile[' + idEffect + '][' + i + ']', oldfile)
                  }
                }
                
                
                collected[idEffect] = {
                id_effect: idEffect,
                selected: this.selected,
                text: this.text[idEffect] || '',

              }              

            }
          }  

        } else {
          collected.push(this.selected)
        }

        if(this.Position == 2 || this.Position == 4) {
          formData.append("DescAnotherEffect", JSON.stringify(collected))
        }

        // sebelumnya hanya 1 data group, sekarang lebih dari 1 data group
        for( var i = 0; i < this.field.NODCA.length; i++ ) {
          formData.append('IdCAPIC[' + i + ']', this.field.NODCA[i].IdCAPIC.Id)
          formData.append('CADate[' + i + ']', this.field.NODCA[i].CADate)
          formData.append('CADescription[' + i + ']', this.field.NODCA[i].CADescription)
          var file = this.field.NODCA[i].CAFile
          for( var j=0; j<file.length; j++ ) {
            formData.append('CAFile[' + i + ']['+ j +']', file[j])
          }
        }
        formData.append("OldCAFile",JSON.stringify(this.OldCAFile))


        // sebelumnya hanya 1 data group, sekarang lebih dari 1 data group
        for( var i = 0; i < this.field.NODPA.length; i++ ) {
          formData.append('IdPAPIC[' + i + ']', this.field.NODPA[i].IdPAPIC.Id)
          formData.append('PADate[' + i + ']', this.field.NODPA[i].PADate)
          formData.append('PADescription[' + i + ']', this.field.NODPA[i].PADescription)
          var file = this.field.NODPA[i].PAFile
          for( var j=0; j<file.length; j++ ) {
            formData.append('PAFile[' + i + ']['+ j +']', file[j])
          }
        }
        formData.append("OldPAFile",JSON.stringify(this.OldPAFile))
        formData.append("IdPublish",this.field.PublishTo)
        formData.append("publishSection",this.field.SectionPublish)
        
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        
        axios.post(this.urlSubmit, formData, config)
        .then( function (res) {
          var resp = res.data
          if(resp.status){
            this.$router.push({
              name: 'nod/data-nod-report',
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
        this.getDataNOE(option.Id)
        this.generateNumber(option.NOENumber, option.NOENumberAcc, option.Date)
        this.getDataPIC(option.Id)
      }
    },

    handleAnotherEffectFile: function(files, checkedKey) {
     this.anotherEffectFile[checkedKey] = files.map(files => files.file );
    },
  
    handleRemoveEffectFile: function(error, files){
      let replace = files.source.replace('/clouds','clouds')
      this.oldFileAnotherEffect.forEach((val, k)=> {
        val.forEach((v, i)=> {
          if(v == replace) {
            this.oldFileAnotherEffect[k].splice(i,1)
            
          }
        })
      })
      },

    getData (Id) {
      axios.post('/AdminVue/nod-report-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.Position = res.data.position
        this.userDepartment = res.data.department
        this.deptTerkait = res.data.deptTerkait
        this.statusDeptTerkait = res.data.statusDeptTerkait
        this.field = resp.data
        this.getDataNOE(this.field.IdNOEReport)
        this.getDataPIC(this.field.IdNOEReport)
        this.field.NODCA = resp.NODCA
        this.field.NODPA = resp.NODPA
        this.opsNOENumber.unshift(this.field.NOENumber)
        this.opsRelevantDept = resp.data.RelevantDept
        
        if(resp.data.IdRelevantDept != 0) {    
          JSON.parse(resp.data.IdRelevantDept).filter((value) => {
            return value == resp.data.IdDepartmentSession ? this.isRelevantDept = true : this.isRelevantDept
          }, {})
        }
        
        resp.data.TypeUser == 15 || resp.data.TypeUser == 16 ? this.isDept = true : this.isDept
        this.relevantDeptExist = resp.data.IdRelevantDept 
        
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
        
        if(this.field.Status) {
          if(this.field.Status == 'UnPublish') this.valStatus = 1
          if(this.field.Status == 'Dilaporkan ke Unit Head') this.valStatus = 2
          if(this.field.Status == 'Disetujui oleh Unit Head') this.valStatus = 3
          if(this.field.Status == 'Disetujui oleh Section Head') this.valStatus = 4
          if(this.field.Status == 'Disetujui oleh Dept Head') this.valStatus = 5
          if(this.field.Status == 'Disetujui oleh Dept Head Terkait') this.valStatus = 6
          if(this.field.Status == 'Disetujui oleh QA APJ') this.valStatus = 7
          if(this.field.Status == 'Disetujui oleh QA Dept.Head') this.valStatus = 8
          if(this.field.Status == 'Ditolak') this.valStatus = 9
          if(this.field.Status == 'Disetujui Oleh QA Section Head') this.valStatus = 10
        }
        this.isCaretaker = res.data.isCaretaker
        this.getAnotherEffect = resp.getAnotherEffect

        let selectedAnotherEffect = Object.values(resp.selectedAnotherEffect)
        
        
  
        if(selectedAnotherEffect) {
          selectedAnotherEffect.forEach((item, index) => {
            this.anotherEffectFile[item.id_effect] = []
            this.oldFileAnotherEffect[item.id_effect] = []

            if(item !== false) {
              this.selected = item.selected
              this.checkedEffect[item.id_effect] = item.id_effect
              this.text[item.id_effect] = item.text
              this.fileResponseAnotherEffect[item.id_effect] = item.namefile
              
              this.fileAnotherEffectDownload[item.id_effect] = item.filedownload

              if(this.fileResponseAnotherEffect[item.id_effect] != ''){
              let countFileAnotherEffect = this.fileResponseAnotherEffect[item.id_effect].length
                for (let i = 0; i < countFileAnotherEffect; i++) {
                  this.oldFileAnotherEffect[item.id_effect].push(this.fileResponseAnotherEffect[item.id_effect][i])
                  this.anotherEffectFile[item.id_effect].push(process.env.BASE_URL + this.fileResponseAnotherEffect[item.id_effect][i])
                }
              }
            
              if(this.anotherEffectFile[item.id_effect] == ''){
                this.oldFileAnotherEffect[item.id_effect] = '';
              }

            } else {
              this.selected = item
            }
          })
        }

      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    generateNumber (noeNumber, noeNumberAcc=0, date=null) {
      axios.post('/AdminVue/nod-report-get-number',{
        NOENumber: noeNumber,
        NOENumberAcc: noeNumberAcc,
        Date: date
      })
      .then( function (res) {
        // this.field.NODNumber = res.data.data
        this.$set(this.field,'NODNumber',res.data.data)
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.field.NODNumber = ''
      }.bind(this))
    },

    getNOENumber () {
      axios.post('/AdminVue/nod-report-get-noe-number')
      .then( function (res) {
        this.opsNOENumber = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsNOENumber = []
      }.bind(this))
    },

    getDataNOE (Id) {
      axios.post('/AdminVue/nod-report-get-data-noe', {
        Id:Id,
      })
      .then( function (res) {
        this.field.BatchNo = res.data.data.BatchNo
        this.field.IdProduct = res.data.data.Product
        this.field.Event = res.data.data.Event
        this.field.PublishTo = res.data.data.IdPublish
        this.field.SectionPublish = res.data.data.publishSection
        this.field.Date = moment(res.data.data.Date).format('DD/MM/YYYY HH:mm:ss')
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

    addDetail(type) {
      
      if(type=='CA')
      {
        const newCA = {'IdCAPIC':'','CADate':'','CADescription':'','CAFile':[]}
        // this.field.NODCA.push({'IdCAPIC':'','CADate':'','CADescription':'','CAFile':[]})
        Vue.set(this.field.NODCA, this.field.NODCA.length, newCA)
        this.$forceUpdate()
      } 
      else
      {
        const newPA = {'IdPAPIC':'','PADate':'','PADescription':'','PAFile':[]}
        // this.field.NODPA.push({'IdPAPIC':'','PADate':'','PADescription':'','PAFile':[]})
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
      this.$router.push('/RoleAdmin/nod/data-nod-report')
    },

    onAction(action){
      if(action == 'publish'){
        this.publish('/AdminVue/nod-report-publish', this.field.Id, this.$parent, true)
      }
      if(action == 'approve'){
        this.approve('/AdminVue/nod-report-approve', this.field.Id, this.$parent, null, true, this.isCaretaker, this.opsRelevantDept, this.isDept, this.isRelevantDept, this.relevantDeptExist)
      }
      if(action == 'reject'){
        this.rejectOld('/AdminVue/nod-report-reject', this.field.Id, this.$parent, null, true, this.isCaretaker)
      }
      if(action == 'correction'){
        this.$router.push({
          name: 'nod/form-correction-nod-report',
          params: {
            Id: this.field.Id,
            isCaretaker: this.isCaretaker
          }
        })
      }
    }

  },

  mounted(){

    this.getNOENumber()
    // this.getDataPIC()
    
    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      this.isEdit = true
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/nod-report-update'
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
    // if(this.isEdit == false && this.isShow == false) this.generateNumber()
  },

}
</script>