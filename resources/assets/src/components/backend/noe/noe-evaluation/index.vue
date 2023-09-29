<template> <div>

  <b-card header="Evaluasi NOE" header-tag="h4" class="mb-4">

  	<b-form inline class="mb-2 row">
      <div class="col-md-6">
          <b-form inline class="">
            <label class="form-label mr-sm-2">Tampilkan Data</label>
            <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
          </b-form>
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-noe-evaluation"
      :http-options= "authHeader" no-data-template="Data tidak ada"
	    :fields="fields"
	    :css="cssTable"
	    :sort-order="sortOrder"
	    :multi-sort="false"
	    multi-sort-key="ctrl"
	    :per-page="vars.perPage"
	    pagination-path=""
	    @vuetable:pagination-data="onPaginationData"
	    :append-params="paramData"
      @vuetable:loading="showLoading()"
      @vuetable:loaded="hideLoading()"
	  >

      <template slot="tableHeader" slot-scope="props">
        <tr class="text-center">
          <th class="wd-50"></th>
          <th>
            <b-input v-model="paramData.search.noe__NOENumberAcc" placeholder="No. NOE" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__NOENumber" placeholder="No. Draft NOE" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__IdTypeIncident" placeholder="Jenis Kejadian" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.loc__Name" placeholder="Lokasi Kejadian" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="dd.mm.yy"
              v-model="paramData.search.noe__Date"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="datedmYMask" />
          </th>
          <th>
            <b-input v-model="paramData.search.pdc__Code" placeholder="Bahan / Produk Terkait" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__BatchNo" placeholder="No. Kontrol / No. Bets" v-on:keyup.enter="getFilters()" />
          </th>
          <!-- <th>
            <b-input v-model="paramData.search.noe__Event" placeholder="Uraian Kejadian" v-on:keyup.enter="getFilters()" />
          </th> -->
          <th>
            <b-form-select v-model="paramData.search.noe__Status" :options="optionStatus" v-on:change="getFilters()" value="paramData.search.noe__Status"></b-form-select>
          </th>
          <th></th>
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <template slot="index" slot-scope="props">
          {{ props.rowIndex + 1}}
      </template>

      <template slot="NOENumberCustom" slot-scope="props">
        <span v-if="props.rowData.Status == 'Disetujui oleh QA Dept.Head' || props.rowData.Status == 'Disetujui oleh QA APJ' || props.rowData.Status == 'Disetujui oleh QA Sect.Head'">{{props.rowData.NOENumberAcc}}</span>
        <span v-else>{{props.rowData.NOENumber}}</span>
      </template>

      <template slot="action" slot-scope="props">
        <div class="custom-actions">

          <b-btn v-if="props.rowData.IsPublish == 2" class="btn btn-outline-info btn-sm mr-1 mt-1"
            @click="onAction('view-item', props.rowData, props.rowIndex)">
            <i class="ion ion-ios-eye"></i> Tampilkan
          </b-btn>
          <b-btn v-if="props.rowData.IsPublish == 2 && (((props.rowData.Status == 'Disetujui oleh Dept Head' || props.rowData.Status == 'Disetujui oleh Unit Head (caretaker)' || props.rowData.Status == 'Disetujui oleh Sect Head (caretaker)') && position == 2) || (props.rowData.Status == 'Disetujui oleh QA Sect.Head' && position == 3) || (props.rowData.Status == 'Disetujui oleh QA Sect.Head' && position == 4) )" class="btn btn-outline-secondary btn-sm mr-1 mt-1"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-create"></i> Ubah
          </b-btn>
          <b-btn v-if="props.rowData.IsPublish == 2 && (props.rowData.Status == 'Disetujui oleh Dept Head' || props.rowData.Status == 'Disetujui oleh Unit Head (caretaker)' || props.rowData.Status == 'Disetujui oleh Sect Head (caretaker)') && position == 2" class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-trash"></i> Hapus
          </b-btn>

          <b-btn v-if="props.rowData.IsPublish == 1 && (props.rowData.Status == 'Disetujui oleh Dept Head' || props.rowData.Status == 'Disetujui oleh Unit Head (caretaker)' || props.rowData.Status == 'Disetujui oleh Sect Head (caretaker)') && position == 2" class="btn btn-outline-success btn-sm mr-1 mt-1"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-checkmark"></i> Evaluasi
          </b-btn>
          <b-btn v-if="props.rowData.IsPublish == 2 && (props.rowData.Status == 'Disetujui oleh Dept Head' || props.rowData.Status == 'Disetujui oleh Unit Head (caretaker)' || props.rowData.Status == 'Disetujui oleh Sect Head (caretaker)') && position == 2" class="btn btn-outline-primary btn-sm mr-1 mt-1"
            @click="onAction('publish-evaluation', props.rowData, props.rowIndex)">
            <i class="ion-md-cloud-upload"></i> Publish Evaluasi
          </b-btn>
          <!-- <b-btn v-if="(position == 3 && props.rowData.Status == 'Disetujui oleh QA Sect.Head') || ((position == 4 || isCaretaker == true) && props.rowData.Status == 'Disetujui oleh QA Sect.Head') && props.rowData.IsPublish == 2" class="btn btn-outline-primary btn-sm mr-1 mt-1"
            @click="onAction('approve', props.rowData, props.rowIndex)">
            <i class="ion ion-md-checkmark"></i> Setujui
          </b-btn> -->
          <b-btn v-if="(position == 4 || isCaretaker == true) && (props.rowData.Status == 'Disetujui oleh QA Sect.Head') && (props.rowData.IsPublish == 2)" class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('reject', props.rowData, props.rowIndex)">
            <i class="ion ion-md-close"></i> Tolak
          </b-btn>

          <b-btn v-if="(position == 2 || isCaretaker == true) && (props.rowData.Status == 'Disetujui oleh Dept Head') && (props.rowData.IsPublish == 1)" class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('reject', props.rowData, props.rowIndex)">
            <i class="ion ion-md-close"></i> Tolak
          </b-btn>
          <b-btn v-if="((position == 2 && (props.rowData.Status == 'Disetujui oleh Dept Head' || props.rowData.Status == 'Disetujui oleh Unit Head (caretaker)' || props.rowData.Status == 'Disetujui oleh Sect Head (caretaker)')) || (position == 3 && props.rowData.Status == 'Disetujui oleh QA Sect.Head') || ((position == 4 || isCaretaker == true) && props.rowData.Status == 'Disetujui oleh QA Sect.Head') && props.rowData.IsPublish == 2) " class="btn btn-warning btn-sm mr-1 mt-1"
            @click="onAction('correction', props.rowData, props.rowIndex)">
            <i class="fas fa-comment"></i> Koreksi
          </b-btn>

          <div>
            <span v-if="(props.rowData.Status == 'Disetujui oleh Dept Head' && position == 2) || (position == 3 && props.rowData.Status == 'Disetujui oleh QA Sect.Head') || ((position == 4 || isCaretaker == true) && props.rowData.Status == 'Disetujui oleh QA Sect.Head')" class="btn btn-md btn-warning"></span>

            <span v-else class="btn btn-md btn-success"></span>
          </div>

        </div>
      </template>

      <template slot="more" slot-scope="props">
        <div class="custom-actions">
          
        </div>
      </template>
	  	
	  </vuetable> </div>

    <div class="vuetable-footer">
      <vuetable-pagination-info ref="paginationInfo" no-data-template="Data tidak ada" info-template="Menampilkan {from} - {to} dari {total} data">
      </vuetable-pagination-info>

      <vuetable-pagination ref="pagination"
          :css="cssPagination"
          @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>

  </b-card>

</div> </template>


<script>

import Vue from 'vue'
import Vuetable from 'vuetable-2'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import VuetableRowHeader from 'vuetable-2/src/components/VuetableRowHeader'
import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import ButtonAction from '@/components/backend/template/ButtonAction'

export default {
  name: 'index-noe-evaluation',
  metaInfo: {
    title: 'Index NOE Evaluation'
  },
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    VuetableRowHeader,
    MaskedInput
  },

  links: {
    pagination: {
      // pagination information
    }
  },

  data () { 
  	return {

  		fields: [
  			{
          name: 'index',
          title: '#',
          titleClass: 'text-center',
          dataClass: 'text-center wd-50'
        },
  			{
  				name: 'NOENumberCustom',
  				// sortField: 'noe.NOENumber',
  				title: 'No. NOE',
  				titleClass: 'text-center',
          dataClass: 'text-center',
  			},
        {
  				name: 'NOENumber',
  				title: 'No. Draft NOE',
  				titleClass: 'text-center',
          dataClass: 'text-center',
  			},
  			{
  				name: 'IdTypeIncident',
  				sortField: 'noe.IdTypeIncident',
  				title: 'Jenis Kejadian',
  				titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatIncident
  			},
        {
          name: 'Location',
          sortField: 'loc.Name',
          title: 'Lokasi Kejadian',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Date',
          sortField: 'noe.Date',
          title: 'Tanggal / Waktu',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'Product',
          sortField: 'pdc.Name',
          title: 'Bahan / Produk Terkait',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'BatchNo',
          sortField: 'noe.BatchNo',
          title: 'No. Kontrol / No. Bets',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        // {
        //   name: 'Event',
        //   sortField: 'noe.Event',
        //   title: 'Uraian Kejadian',
        //   titleClass: 'text-center',
        //   dataClass: 'text-center'
        // },
        {
          name: 'Status',
          sortField: 'noe.Status',
          title: 'Status',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
  			{
          name: 'action',
          title: 'Tindakan',
          titleClass: 'text-center',
          dataClass: 'text-center',
        }
        /*{
          name: 'more',
          title: 'More',
          titleClass: 'text-center',
          dataClass: 'text-center',
        }*/
  		],

  		sortOrder: [
        {
          field: 'NOENumber',
          sortField: 'noe.NOENumber',
          direction: 'asc'
        }
      ],

      vars: {
      	perPage: 10
      },

      paramData: {
        search: {},
      },

      optionStatus :[
        {value: null,text:'All'},
        {value: "UnPublish", text:"UnPublish"},
        {value: "Dilaporkan ke Unit Head", text:"Dilaporkan ke Unit Head"},
        {value: "Dilaporkan ke Sect Head", text:"Dilaporkan ke Sect Head"},
        {value: "Disetujui oleh Unit Head", text:"Disetujui oleh Unit Head"},
        {value: "Disetujui oleh Sect Head", text:"Disetujui oleh Sect Head"},
        {value: "Disetujui oleh Dept Head", text:"Disetujui oleh Dept Head"},
        {value: "Disetujui oleh QA Sect.Head", text:"Disetujui oleh QA Sect.Head"},
        // {value: "Disetujui oleh QA APJ", text:"Disetujui oleh QA APJ"},
        {value: "Disetujui oleh QA Dept.Head", text:"Disetujui oleh QA Dept.Head"},
        {value: "Ditolak", text:"Ditolak"},
        {value: "Disetujui oleh Unit Head (caretaker)", text: "Disetujui oleh Unit Head (caretaker)"},
        {value: "Disetujui oleh Sect Head (caretaker)", text: "Disetujui oleh Sect Head (caretaker)"}
      ],

      position: 0, //1 = unit head; 2 = sect head; 3 = APJ; 4 = dept head;
      isCaretaker: false

  	}
  },

  methods: {
    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD.MM.YY')
    },

    formatIncident: function(value) {
      let dataIncident = JSON.parse(value)
      var result = ''
      dataIncident.forEach((value,index) => {
        if(value.TypeIncident){
          result += value.TypeIncident+"; "
        }
      });
      return (value == null) ? '' : result
    },

    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },

    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },

    getFilters () {
      this.$refs.vuetable.refresh()
    },

    getSession () {
      axios.post('/AdminVue/noe-evaluation-get-session')
      .then( function (res) {
        this.position = res.data.position
      
        this.isCaretaker = res.data.isCaretaker
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    onAction(action,data,index){
      axios.post('/AdminVue/noe-evaluation-iscaretaker', {
        Id: data.id
      })
      .then( function (res) {
        this.isCaretaker = res.data.isCaretaker
        
        if(action=='view-item'){
          return this.$router.push({
                  name: 'noe/show-noe-evaluation',
                  params: {
                    Id: data.id,
                    isShow: true
                  }
                })
        }

        if(data.IsCorrection == false || data.IsCorrection == null) {
            if(action=='edit-item'){
            this.$router.push({
              name: 'noe/form-noe-evaluation',
              params: {
                isFormEdit: true,
                Id: data.id,
              }
            })
          }

          if(action=='delete-item'){
            this.deleteData('/AdminVue/noe-evaluation-delete', data.id, this.$refs.vuetable)
          }
          if(action == 'publish-evaluation'){
              this.publishEvaluation('/AdminVue/noe-evaluation-publish-evaluation', data.id, this.$refs.vuetable)
          }
          if(action == 'approve'){
              this.approve('/AdminVue/noe-evaluation-approve', data.id, this.$refs.vuetable, null, false, this.isCaretaker)
          }
          if(action == 'reject'){
              this.reject('/AdminVue/noe-evaluation-reject', data.id, this.$refs.vuetable, false, this.isCaretaker)
          }
          if(action == 'correction'){
            this.$router.push({
              name: 'noe/form-correction-noe-evaluation',
              params: {
                Id: data.id,
                isCaretaker: this.isCaretaker
              }
            })
          }
        } else {
          return this.showNotifCustom('notifications-danger','Forbidden Action', 'Harus isi jawaban dari pengkoreksi')
        }

      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))

    }

  },

  mounted(){
    this.isNotifExist()
    this.getSession()
  },

}
</script>
