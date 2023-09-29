<template> <div>

  <b-card header="Kategori NOE" header-tag="h4" class="mb-4">

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
              <masked-input style="width: 120px;" class="form-control" v-model="paramData.search.dvt__Month" :mask="datemmMask" placeholder="month" v-on:keyup.enter="getFilters()" />
              <masked-input style="width: 120px; margin-left: 2px;" class="form-control" v-model="paramData.search.dvt__Year" :mask="dateYYMask" placeholder="year" v-on:keyup.enter="getFilters()" /> 
            </b-form>
          </b-form>
      </div>

      <div class="col-md-4">
          <b-btn @click="createData()" class="btn btn-success btn-md float-right mr-2">
              <i class="ion ion-md-add-circle"></i> Buat Data
          </b-btn>
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-deviation"
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
            <b-input v-model="paramData.search.dvt__Code" placeholder="Kode" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.dvt__Deviation" placeholder="Kategori NOE" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.usr__UserName" placeholder="Dibuat Oleh" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="dd.mm.yy"
              v-model="paramData.search.dvt__UpdateAt"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="datedmYMask" />
          </th>
          <th></th>
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
import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import ButtonAction from '@/components/backend/template/ButtonAction'

export default {
  name: 'index-deviation',
  metaInfo: {
    title: 'Index Kategori NOE'
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
  				name: 'Code',
  				sortField: 'dvt.Code',
  				title: 'Kode',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
  				name: 'Deviation',
  				sortField: 'dvt.Deviation',
  				title: 'Kategori NOE',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
          name: 'UserEntry',
          sortField: 'usr.UserName',
          title: 'Dibuat Oleh',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'UpdateAt',
          sortField: 'dvt.UpdateAt',
          title: 'Terakhir Diubah',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
  			{
          name: ButtonAction,
          title: 'Tindakan',
          titleClass: 'text-center',
          dataClass: 'text-center',
          isShow: true,
          isEdit: true,
          isDelete: true,
          showUrl: 'master/show-deviation',
          editUrl: 'master/form-deviation',
          deleteUrl: '/AdminVue/deviation-delete'
        }
  		],

  		sortOrder: [
        {
          field: 'Code',
          sortField: 'dvt.Code',
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
    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD.MM.YY')
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
      this.$router.push('/RoleAdmin/master/form-deviation')
    },

  },

  mounted(){
    this.isNotifExist()
  },

}
</script>
