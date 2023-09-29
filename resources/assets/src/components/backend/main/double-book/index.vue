<template> <div>

  <b-card header="Laporan NOE" header-tag="h4" class="mb-4">

  	<b-form inline class="mb-2 row">
      <div class="col-md-6">
          <b-form inline class="">
            <label class="form-label mr-sm-2">Tampilkan Data</label>
            <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
          </b-form>
      </div>
      <div class="col-md-6">
          <b-btn @click="exportData()" class="btn btn-success btn-md float-right mr-2">
              <i class="ion ion-md-add-circle"></i> Export Data
          </b-btn>
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-double-book"
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
          <th></th>
          <th>
            <b-input v-model="paramData.search.noe__NOENumberAcc" placeholder="No. NOE" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__NODNumber" placeholder="No. NOD" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__IdTypeIncident" placeholder="Jenis Kejadian" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.loc__Name" placeholder="Lokasi Kejadian" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="Tahun"
              v-model="paramData.search.noe__Date"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="dateYYYYMask" />
          </th>
          <th>
            <b-input v-model="paramData.search.pdc__Name" placeholder="Bahan / Produk Terkait" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__BatchNo" placeholder="No. Kontrol / No. Bets" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-form-select v-model="paramData.search.noe__Status" :options="optionStatus" v-on:change="getFilters()" value="paramData.search.noe__Status"></b-form-select>
          </th>
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <template slot="index" slot-scope="props">
          {{ props.rowIndex + 1}}
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
import VuetableFieldCheckbox from 'vuetable-2/src/components/VuetableFieldCheckbox'
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
          name: VuetableFieldCheckbox,
          title: 'checkbox',
          titleClass: 'text-center',
          dataClass: 'text-center wd-50'
        },
  			{
  				name: 'NOENumberAcc',
  				sortField: 'noe.NOENumberAcc',
  				title: 'No. NOE',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
        {
          name: 'NODNumber',
          sortField: 'nod.NODNumber',
          title: 'No. NOD',
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
          name: 'Status',
          sortField: 'noe.Status',
          title: 'Status',
          titleClass: 'text-center',
          dataClass: 'text-center'
        }
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
        search: {
          noe__Date: moment().format('YYYY')
        },
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
        {value: "Ditolak", text:"Ditolak"}
      ]

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

    exportData () {
      Vue.swal({
          title: 'Apa anda yakin?',
          text: "Ingin Export Data Terpilih",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#32CD32',
          cancelButtonColor: '#D63030',
          confirmButtonText: 'Export',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            this.showLoading()
            axios.post('/AdminVue/double-book-export', {
              Id: this.$refs.vuetable.selectedTo,
              Year: this.paramData.search.noe__Date
            })
            .then( function (res) {
              this.hideLoading()
              var resp = res.data
              if(resp.status){
                this.$notify({
                  group: 'notifications-success',
                  title: 'Notifikasi Sukses',
                  text: resp.message,
                })
              } else {
                this.$notify({
                  group: 'notifications-danger',
                  title: 'Notifikasi Eror',
                  text: resp.message,
                })
              }

            }.bind(this))
            .catch( function (e) {
              console.log(e)
              this.hideLoading()
              this.$notify({
                group: 'notifications-danger',
                title: 'Notifikasi Eror',
                text: 'Export Data Gagal, Invalid!',
              })
            }.bind(this))

          }
        })
    }

  },

  mounted(){
    
  },

}
</script>
