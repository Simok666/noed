<template> <div>

  <b-card header="Pengaturan Hari Libur" header-tag="h4" class="mb-4">

  	<b-form inline class="mb-2 row">
      <div class="col-md-6">
          <b-form inline class="">
            <label class="form-label mr-sm-2">Tampilkan Data</label>
            <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
          </b-form>
      </div>
      <div class="col-md-6">
          <b-btn @click="createData()" class="btn btn-success btn-md float-right mr-2">
              <i class="ion ion-md-add-circle"></i> Buat Data
          </b-btn>
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-day-off"
      :http-options= "authHeader" no-data-template="Data tidak ada"
	    :fields="fields"
	    :css="cssTable"
	    :sort-order="sortOrder"
	    :multi-sort="false"
	    multi-sort-key="ctrl"
      :detail-row-component="myDetailRow"
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
            <b-input v-model="paramData.search.dyo__Year" placeholder="Tahun" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.dyo__Month" placeholder="Bulan" v-on:keyup.enter="getFilters()" />
          </th>
          <th></th>
          <th></th>
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <template slot="index" slot-scope="props">
        <b-btn class="btn btn-outline-info btn-sm mr-sm-1"
          @click="onCellClicked(props.rowData, props.rowIndex)">
          <i class="fas fa-bars"></i>
        </b-btn>
      </template>

      <template slot="action" slot-scope="props">
        <div class="custom-actions">
          <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-trash"></i> Hapus All
          </b-btn>
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
import accounting from 'accounting'
import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import ButtonAction from '@/components/backend/template/ButtonAction'
import DetailRow from './detail-row'

export default {
  name: 'index-day-off',
  metaInfo: {
    title: 'Index Data Day Off'
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
  				name: 'Year',
  				sortField: 'dyo.Date',
  				title: 'Tahun',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
  				name: 'Month',
  				sortField: 'dyo.Date',
  				title: 'Bulan',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
        {
          name: 'Total',
          title: 'Total',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: (field)=> {
            return field + ' Days'
          }
        },
        {
          name: 'action',
          title: 'Tindakan',
          titleClass: 'text-center',
          dataClass: 'text-center',
        }
  		],

  		sortOrder: [
        {
          field: 'Year',
          sortField: 'Year',
          direction: 'desc'
        }
      ],

      vars: {
      	perPage: 10
      },

      paramData: {
        search: {},
      },

      myDetailRow: DetailRow,
      idDetail: []

  	}
  },

  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
      for (let i = 0; i < this.idDetail.length; i++) {
        this.$refs.vuetable.hideDetailRow(this.idDetail[i])
      }
    },

    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },

    getFilters () {
      this.$refs.vuetable.refresh()
      for (let i = 0; i < this.idDetail.length; i++) {
        this.$refs.vuetable.hideDetailRow(this.idDetail[i])
      }
    },

    createData () {
      this.$router.push('/RoleAdmin/master/form-day-off')
    },

    onCellClicked(data, index){
      for (let i = 0; i < this.idDetail.length; i++) {
        this.$refs.vuetable.hideDetailRow(this.idDetail[i])
      }
      this.$refs.vuetable.toggleDetailRow(data.id)
      this.idDetail.push(data.id)
    },

    onAction(action,data,index){
      if(action=='delete-item'){
        this.deleteData('/AdminVue/day-off-delete', 'all-'+data.Year+'-'+data.Month, this.$refs.vuetable)
      }
    }

  },

  mounted(){
    
  },

}
</script>
