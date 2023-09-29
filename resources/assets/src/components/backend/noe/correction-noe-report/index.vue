<template> <div>

  <b-card header="Perbaikan Laporan NOE" header-tag="h4" class="mb-4">

  	<b-form inline class="mb-2 row">
      <div class="col-md-6">
          <b-form inline class="">
            <label class="form-label mr-sm-2">Tampilkan Data</label>
            <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
            <b-select class="ml-2" v-model="paramData.search.crt__Year" :options="opsYear" v-on:change="getFilters()" />
          </b-form>
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-correction-noe-report"
      http-method="post"
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
            <b-input v-model="paramData.search.crt__Number" placeholder="No. NOE" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.crt__Description" placeholder="Deskripsi Perbaikan" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="dd.mm.yy"
              v-model="paramData.search.crt__CreateAt"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="datedmYMask" />
          </th>
          <th>
            <b-input v-model="paramData.search.emp__Name" placeholder="Perbaikan Oleh" v-on:keyup.enter="getFilters()" />
          </th>
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <template slot="index" slot-scope="props">
        <b-btn class="btn btn-outline-info btn-sm mr-sm-1"
          @click="onCellClicked(props.rowData, props.rowIndex)">
          <i class="fas fa-bars"></i>
        </b-btn>
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
import DetailRow from './detail-row'

export default {
  name: 'index-correction-noe-report',
  metaInfo: {
    title: 'Index Correction NOE Report'
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
          name: 'Number',
          sortField: 'crt.Number',
          title: 'No. NOE',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Description',
          sortField: 'crt.Description',
          title: 'Deskripsi Perbaikan',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'CreateAt',
          sortField: 'crt.CreateAt',
          title: 'Tanggal Perbaikan',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'UserEntry',
          sortField: 'emp.Name',
          title: 'Perbaikan Oleh',
          titleClass: 'text-center',
          dataClass: 'text-center',
        }
  		],

  		sortOrder: [
        {
          field: 'Number',
          sortField: 'crt.Number',
          direction: 'asc'
        }
      ],

      vars: {
      	perPage: 10
      },

      paramData: {
        search: {
          crt__Year: moment(new Date()).format('YYYY')
        },
      },

      myDetailRow: DetailRow,
      idDetail: []

  	}
  },

  methods: {
    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD.MM.YY HH:mm')
    },

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

    onCellClicked(data, index){
      for (let i = 0; i < this.idDetail.length; i++) {
        this.$refs.vuetable.hideDetailRow(this.idDetail[i])
      }
      this.$refs.vuetable.toggleDetailRow(data.id)
      this.idDetail.push(data.id)
    }

  },

  mounted(){
    this.isNotifExist()
    this.generateYear()
  },

}
</script>
