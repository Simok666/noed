<template> <div>

  <b-card header="Posisi" header-tag="h4" class="mb-4">

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
	    api-url="/AdminVue/data-position"
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

      <template slot="tableHeader">
        <tr class="text-center">
          <th class="wd-50"></th>
          <th>
            <b-input v-model="paramData.search.pst__Code" placeholder="Kode" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.dvs__Department" placeholder="Divisi" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.dpt__Department" placeholder="Departemen" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.psp__Name" placeholder="Atasan" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.pst__Name" placeholder="Posisi" v-on:keyup.enter="getFilters()" />
          </th>
          <th></th>
          <th></th>
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <template slot="index" slot-scope="props">
          {{ props.rowIndex + 1}}
      </template>

	  	<template slot="action" slot-scope="props">
        <div class="custom-actions">
          <b-btn class="btn btn-outline-info btn-sm mr-1 mt-1"
            @click="onAction('view-item', props.rowData, props.rowIndex)">
            <i class="ion ion-ios-eye"></i> Tampilkan
          </b-btn>
          <b-btn class="btn btn-outline-secondary btn-sm mr-1 mt-1"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-create"></i> Ubah
          </b-btn>
          <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-trash"></i> Hapus
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

</div> 
</template>


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
  name: 'index-distric',
  metaInfo: {
    title: 'Index Position'
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
          sortField: 'pst.Code',
          title: 'Kode',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Division',
          sortField: 'dvs.Department',
          title: 'Divisi',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
  			{
  				name: 'Department',
  				sortField: 'dpt.Department',
  				title: 'Departemen',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
  				name: 'ParentName',
  				sortField: 'pst.Name',
  				title: 'Atasan',
  				titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatIncident
  			},
  			{
          name: 'Name',
          sortField: 'pst.Name',
          title: 'Posisi',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'Status',
          sortField: 'pst.Status',
          title: 'Status',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: (field) => {
            return field ? '<span class="btn btn-sm btn-success">Active</span>' : '<span class="btn btn-sm btn-danger">Not Active</span>'
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
          field: 'Code',
          sortField: 'pst.Code',
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
    formatIncident: function(value) {
      
      let dataParent = JSON.parse(value)
      
      var result = ''
      if(typeof dataParent == 'object')
      {
        dataParent.forEach((value,index) => {
          if(value.Name){
            result += value.Name+"; "
          }
        });
      }
      else
      {
        result = 'Belum Pilih Atasan'
      }
      
      return (value == null) ? '' : result
    },

    formatNumber: function(value) {
        return accounting.formatMoney(value, 'Rp ', 2, '.', ',')
    },

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
      this.$router.push('/RoleAdmin/master/form-position')
    },

    onAction(action,data,index){
      if(action=='view-item'){
        this.$router.push({
          name: 'master/form-position',
          params: {
            Id: data.id,
            isShow: true
          }
        })
      }

      if(action=='edit-item'){
        this.$router.push({
          name: 'master/form-position',
          params: {
            isFormEdit: true,
            Id: data.id,
          }
        })
      }

      if(action=='delete-item'){
        this.deleteData('/AdminVue/position-delete', data.id, this.$refs.vuetable)
      }
    }

  },

  mounted(){
    this.isNotifExist()
  },

}
</script>
