<template> <div>

  <b-card header="Laporan NOE" header-tag="h4" class="mb-4">

  	<b-form inline class="mb-2 row">
      <div class="col-md-4">
          <b-form inline class="">
            <label class="form-label mr-sm-2">Tampilkan Data</label>
            <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
          </b-form>
      </div>
      <div class="col-md-4">
          <b-form inline class="">
            <label class="form-label mr-sm-1">Periode</label>
            <b-form inline class="">
              <masked-input style="width: 120px;" class="form-control" v-model="paramData.search.noe__Month" :mask="datemmMask" placeholder="month" v-on:keyup.enter="getFilters()" />
              <masked-input style="width: 120px; margin-left: 2px;" class="form-control" v-model="paramData.search.noe__Year" :mask="dateYYMask" placeholder="year" v-on:keyup.enter="getFilters()" /> 
            </b-form>
          </b-form>
      </div>
      <div class="col-md-4">
          <b-btn @click="createData()"  class="btn btn-success btn-md float-right mr-2">
              <i class="ion ion-md-add-circle"></i> Buat Data
          </b-btn>
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-noe-report"
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
            <b-input v-model="paramData.search.noe__NOENumber" placeholder="No. Draft NOE" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__NOENumberAcc" placeholder="No. NOE" v-on:keyup.enter="getFilters()" />
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
            <b-input v-model="paramData.search.pdc__Name" placeholder="Bahan/Produk Terkait" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__BatchNo" placeholder="No. Kontrol / No. Bets" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-form-select v-model="paramData.search.noe__Status" :options="optionStatus" v-on:change="getFilters()" value="paramData.search.noe__Status"></b-form-select>
          </th>
          <th>
            <b-input v-model="paramData.search.emp__Name" placeholder="Dilaporkan Oleh" v-on:keyup.enter="getFilters()" />
          </th>
          <th></th>
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <template slot="index" slot-scope="props">
          {{ props.rowIndex + 1}}
      </template>

      <template slot="statusCustom" slot-scope="props">
        <div class="custom-actions">
          <template v-if="props.rowData.Status == 'Ditolak'">
            {{props.rowData.Status}}
            <b-btn class="btn btn-outline-info btn-xs ml-1" v-on:click="showReject(props.rowData.id)"> <i class="ion ion-ios-eye"></i></b-btn>
          </template>
          <template v-else>
            {{props.rowData.Status}}
          </template>
        </div>
      </template>

      <template slot="action" slot-scope="props">
        <div class="custom-actions">
          <b-btn class="btn btn-outline-info btn-sm mr-1 mt-1"
            @click="onAction('view-item', props.rowData, props.rowIndex)">
            <i class="ion ion-ios-eye"></i> Tampilkan
          </b-btn>
          <b-btn v-if="props.rowData.Status == 'UnPublish' && props.rowData.IdUser == session.Id" class="btn btn-outline-secondary btn-sm mr-1 mt-1"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-create"></i> Ubah
          </b-btn>
          <b-btn v-if="props.rowData.Status == 'UnPublish' && props.rowData.IdUser == session.Id" class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-trash"></i> Hapus
          </b-btn>

          <b-btn v-if="props.rowData.Status == 'UnPublish' && props.rowData.IdUser == session.Id" class="btn btn-outline-primary btn-sm mr-1 mt-1"
            @click="onAction('publish', props.rowData, props.rowIndex)">
            <i class="ion ion-md-checkmark"></i> Publish
          </b-btn>
          <b-btn v-if="props.rowData.IsPublish == 2" class="btn btn-warning btn-sm mr-1 mt-1"
            :href="'/AdminVue/noe-report/'+props.rowData.id+'/export'" target="_blank">
            <i class="ion ion-md-print"></i> Export
          </b-btn>

          <span v-if="props.rowData.Status == 'UnPublish' && props.rowData.IdUser == session.Id" class="btn btn-md btn-warning"></span>

          <span v-else class="btn btn-md btn-success"></span>

        </div>
      </template>

      <template slot="more" slot-scope="props">
        <div class="custom-actions">
          <b-btn v-if="props.rowData.Status == 'UnPublish' && props.rowData.IdUser == session.Id" class="btn btn-outline-primary btn-sm mr-1 mt-1"
            @click="onAction('publish', props.rowData, props.rowIndex)">
            <i class="ion ion-md-checkmark"></i> Publish
          </b-btn>
          <b-btn v-if="props.rowData.IsPublish == 2" class="btn btn-warning btn-sm mr-1 mt-1"
            :href="'/AdminVue/noe-report/'+props.rowData.id+'/export'" target="_blank">
            <i class="ion ion-md-print"></i> Export
          </b-btn>

          <span v-if="props.rowData.Status == 'UnPublish' && props.rowData.IdUser == session.Id" class="btn btn-md btn-warning"></span>

          <span v-else class="btn btn-md btn-success"></span>

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
  name: 'index-noe-report',
  metaInfo: {
    title: 'Index NOE Report'
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
  				name: 'NOENumber',
  				sortField: 'noe.NOENumber',
  				title: 'No. Draft NOE',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
        {
          name: 'NOENumberAcc',
          sortField: 'noe.NOENumberAcc',
          title: 'No. NOE',
          titleClass: 'text-center',
          dataClass: 'text-center'
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
        {
          name: 'statusCustom',
          sortField: 'noe.Status',
          title: 'Status',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'Employee',
          sortField: 'emp.Name',
          title: 'Dilaporkan Oleh',
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
          title: '',
          titleClass: 'text-center',
          dataClass: 'text-center',
        }*/
  		],

  		sortOrder: [
        // {
        //   field: 'NOENumberAcc',
        //   sortField: 'noe.NOENumberAcc',
        //   direction: 'desc'
        // },
        {
          field: 'NOENumber',
          sortField: 'noe.NOENumber',
          direction: 'desc'
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
        {value: "Disetujui oleh QA Dept.Head", text:"Disetujui oleh QA Dept.Head"},
        {value: "Ditolak", text:"Ditolak"},
        {value: "Disetujui oleh Unit Head (caretaker)", text: "Disetujui oleh Unit Head (caretaker)"},
        {value: "Disetujui oleh Sect Head (caretaker)", text: "Disetujui oleh Sect Head (caretaker)"}
      ],

      session: []

  	}
  },

  methods: {
    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD.MM.YY')
    },

    showReject (id) {
      axios.post('/AdminVue/noe-report-descriptionReject',{
        Id: id
      })
      .then( function (res) {
        var resp = res.data.data
        this.$swal({
          icon: 'info',
          title: 'Deskripsi Laporan Ditolak',
          text: resp,
          confirmButtonText: 'Tutup',
        })
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
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

    createData () {
      this.$router.push('/RoleAdmin/noe/form-noe-report')
    },

    onAction(action,data,index){
      if(action=='view-item') {
        this.$router.push({
          name: 'noe/show-noe-report',
          params: {
            Id: data.id,
            isShow: true
          }
        })
        return
      }
      
      if(data.IsCorrection == false || data.IsCorrection == null) {
        if(action=='edit-item'){
          this.$router.push({
            name: 'noe/form-noe-report',
            params: {
              isFormEdit: true,
              Id: data.id,
            }
          })
        }
  
        if(action=='delete-item'){
          this.deleteData('/AdminVue/noe-report-delete', data.id, this.$refs.vuetable)
        }
  
        if(action == 'publish'){
            this.publish('/AdminVue/noe-report-publish', data, this.$refs.vuetable)
        }
      } else {
        return this.showNotifCustom('notifications-danger','Forbidden Action', 'Harus isi jawaban dari pengkoreksi')
      }
      
    },

    getSession () {
      axios.post('/AdminVue/auth-get-session')
      .then( function (res) {
        var resp = res.data.data
        this.session = resp
        
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
