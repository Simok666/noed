<template> <div>

  <b-card header="Data Caretaker" header-tag="h4" class="mb-4">

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
              <masked-input style="width: 120px;" class="form-control" v-model="paramData.search.ctk__Month" :mask="datemmMask" placeholder="month" v-on:keyup.enter="getFilters()" />
              <masked-input style="width: 120px; margin-left: 2px;" class="form-control" v-model="paramData.search.ctk__Year" :mask="dateYYMask" placeholder="year" v-on:keyup.enter="getFilters()" /> 
            </b-form>
          </b-form>
      </div>
      <div v-if="sessionCreate == 0" class="col-md-4">
          <b-btn @click="createData()" class="btn btn-success btn-md float-right mr-2">
              <i class="ion ion-md-add-circle"></i> Buat Data
          </b-btn>
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-caretaker"
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
            <b-input v-model="paramData.search.dpt__Department" placeholder="Departemen" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.emp__Name" placeholder="Caretaker" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="dd.mm.yy"
              v-model="paramData.search.ctk__DateStart"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="datedmYMask" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="dd.mm.yy"
              v-model="paramData.search.ctk__DateEnd"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="datedmYMask" />
          </th>
          <th>
            <multiselect
              v-model="statusVal"
              :options="opsStatus"
              :allow-empty="true"
              placeholder="Pilih Status"
              label="text"
              track-by="text"
              @input="changeStatus()" />
          </th>
          <th>
            <b-input v-model="paramData.search.empE__Name" placeholder="Ditunjuk Oleh" v-on:keyup.enter="getFilters()" />
          </th>
          <th></th>
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <template slot="index" slot-scope="props">
          {{ props.rowIndex + 1}}
      </template>

      <template slot="action" slot-scope="props">
        <div class="custom-actions"> <template v-if="props.rowData.UserEntry==session.Id">
          <b-btn v-if="props.rowData.Status > 0" class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('not-active', props.rowData, props.rowIndex)">
            <i class="ion ion-ios-close"></i> Set Not Active
          </b-btn>
          <b-btn v-if="props.rowData.Status == 0" class="btn btn-outline-secondary btn-sm mr-1 mt-1"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-create"></i> Ubah 
          </b-btn>
          <b-btn v-if="props.rowData.Status == 0" class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-trash"></i> Hapus
          </b-btn>
        </template> </div>
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
  name: 'index-caretaker',
  metaInfo: {
    title: 'Index Caretaker'
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
  				name: 'Department',
  				sortField: 'dpt.Department',
  				title: 'Departemen',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
  				name: 'Name',
  				sortField: 'emp.Name',
  				title: 'Caretaker',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
        {
          name: 'DateStart',
          sortField: 'ctk.DateStart',
          title: 'Tanggal Mulai',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'DateEnd',
          sortField: 'ctk.DateEnd',
          title: 'Tanggal Selesai',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'Status',
          sortField: 'ctk.Status',
          title: 'Status',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.spanStatus
        },
        {
          name: 'EmpEntry',
          sortField: 'empE.Name',
          title: 'Ditunjuk Oleh',
          titleClass: 'text-center',
          dataClass: 'text-center',
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
          field: 'Department',
          sortField: 'dpt.Department',
          direction: 'asc'
        }
      ],

      vars: {
      	perPage: 10
      },

      paramData: {
        search: {},
      },

      opsStatus: [
        {'value':0,'text':'Not Active'},
        {'value':1,'text':'Active'}
      ],

      statusVal: [],
      session: [],
      sessionCreate:'',
      listValues: [],
      statusData: 0

  	}
  },

  methods: {
    formatNumber: function(value) {
        return accounting.formatMoney(value, 'Rp ', 2, '.', ',')
    },

    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD.MM.YY')
    },

    spanStatus: function(value, dateStart, dateEnd) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;

      if(today == dateStart || value == 1)
      {
        return '<b-btn class="btn btn-success btn-sm">Active</b-btn>'
      }
      else if(today == dateEnd || value == 0)
      {
        return '<b-btn class="btn btn-danger btn-sm">Not Active</b-btn>'
      }
      else
      {
        return '<b-btn class="btn btn-danger btn-sm">Not Active</b-btn>'
      }
      // return (value == 1) ? '<b-btn class="btn btn-success btn-sm">Active</b-btn>' : '<b-btn class="btn btn-danger btn-sm">Not Active</b-btn>'
      
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
      this.$router.push('/RoleAdmin/master/form-caretaker')
    },

    changeStatus () {
      if(this.statusVal) this.paramData.search.ctk__Status = this.statusVal.value
      else this.paramData.search.ctk__Status = null
      this.$refs.vuetable.refresh()  
    },

    setNotActive (url, id, elmTable) {
      Vue.swal({
          title: 'Apa anda yakin?',
          text: "Data akan menjadi \"Not Active\"",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Set Not Active',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            axios.post(url, {
              Id: id,
            })
            .then( function (res) {

              var resp = res.data

              if(resp.status){
                this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
              }else{
                this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
              }

              elmTable.refresh()

            }.bind(this))
            .catch( function (e) {
              console.log(e)
            }.bind(this))
          }
        })
    },

    getListTable () {
      axios.post('/AdminVue/caretaker-get-list-table')
      .then( function (res) {
        var response = res.data.data
        this.listValues = Object.values(response);
        Object.values(response).forEach(val => {
          this.spanStatus(val.Status, val.DateStart, val.DateEnd)
        });
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    getSession () {
      axios.post('/AdminVue/auth-get-session', {
        
      })
      .then( function (res) {
        var resp = res.data.data
        
        var objParent = JSON.parse(resp.ParentPosition)
        const dataParent = objParent.map((key) => {
          return key.Id
        })
        
        this.sessionCreate = dataParent
        this.session = resp
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    onAction(action,data,index){

      if(action=='edit-item'){
        this.$router.push({
          name: 'master/form-caretaker',
          params: {
            isFormEdit: true,
            Id: data.id,
          }
        })
      }

      if(action=='delete-item'){
        this.deleteData('/AdminVue/caretaker-delete', data.id, this.$refs.vuetable)
      }
      if(action == 'not-active'){
        this.setNotActive('/AdminVue/caretaker-not-active', data.id, this.$refs.vuetable)
      }
    }

  },

  mounted(){
    this.isNotifExist()
    this.getSession()
    this.getListTable()
  },

}
</script>
