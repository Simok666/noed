<template> <div>

  <b-card header="Pengaturan Header" header-tag="h4" class="mb-4">

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
              <masked-input style="width: 120px;" class="form-control" v-model="paramData.search.sth__Month" :mask="datemmMask" placeholder="month" v-on:keyup.enter="getFilters()" />
              <masked-input style="width: 120px; margin-left: 2px;" class="form-control" v-model="paramData.search.sth__Year" :mask="dateYYMask" placeholder="year" v-on:keyup.enter="getFilters()" /> 
            </b-form>
          </b-form>
      </div>
      <!-- <div class="col-md-6">
          <b-btn @click="createData()" class="btn btn-success btn-md float-right mr-2">
              <i class="ion ion-md-add-circle"></i> Buat Data
          </b-btn>
      </div> -->
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-setting-header"
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
            <b-input v-model="paramData.search.sth__Name" placeholder="Nama Header" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.sth__Number" placeholder="No. Dokumen" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="dd.mm.yy"
              v-model="paramData.search.sth__Date"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="datedmYMask" />
          </th>
          <th>
            <b-input v-model="paramData.search.sth__NumberRef" placeholder="No. Referensi" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.sth__Title" placeholder="Judul" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.usr__UserName" placeholder="Diubah Oleh" v-on:keyup.enter="getFilters()" />
          </th>
          <th></th>
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <template slot="index" slot-scope="props">
          {{ props.rowIndex + 1}}
      </template>

      <template slot="action" slot-scope="props">
        <div class="custom-actions">
          <b-btn class="btn btn-outline-secondary btn-sm mr-1 mt-1"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-create"></i> Ubah
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

export default {
  name: 'index-setting-header',
  metaInfo: {
    title: 'Index Setting Header'
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
  				name: 'Name',
  				sortField: 'sth.Name',
  				title: 'Nama Header',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
  				name: 'Number',
  				sortField: 'sth.Number',
  				title: 'No. Dokumen',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
        {
          name: 'Date',
          sortField: 'sth.Date',
          title: 'Tanggal',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'NumberRef',
          sortField: 'sth.NumberRef',
          title: 'No. Referensi',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Title',
          sortField: 'sth.Status',
          title: 'Judul',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'UserName',
          sortField: 'usr.UserName',
          title: 'Diubah Oleh',
          titleClass: 'text-center',
          dataClass: 'text-center'
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
          field: 'id',
          sortField: 'sth.Id',
          direction: 'asc'
        }
      ],

      vars: {
      	perPage: 10
      },

      paramData: {
        search: {},
      }

  	}
  },

  methods: {
    formatNumber: function(value) {
        return accounting.formatMoney(value, 'Rp ', 2, '.', ',')
    },

    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD.MM.YY')
    },

    spanStatus: function(value) {
      return (value == 1) ? '<b-btn class="btn btn-success btn-sm">Active</b-btn>' : '<b-btn class="btn btn-danger btn-sm">Not Active</b-btn>'
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
      this.$router.push('/RoleAdmin/master/form-setting-header')
    },

    onAction(action,data,index){

      if(action=='edit-item'){
        this.$router.push({
          name: 'master/form-setting-header',
          params: {
            isFormEdit: true,
            Id: data.id,
          }
        })
      }
    }

  },

  mounted(){
    this.isNotifExist()
  },

}
</script>
