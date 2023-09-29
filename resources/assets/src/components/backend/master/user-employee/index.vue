<template> <div>

  <b-card header="User Karyawan" header-tag="h4" class="mb-4">

    <b-form inline class="mb-2 row">
      <div class="col-md-2">
          <b-form inline class="">
            <label class="form-label mr-sm-2">Tampilkan Data</label>
            <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
          </b-form>
      </div>
      
      <div class="col-md-4">
          <b-form inline class="">
            <label class="form-label mr-sm-1">Periode</label>
            <b-form inline class="">
              <masked-input style="width: 120px;" class="form-control" v-model="paramData.search.emp__Month" :mask="datemmMask" placeholder="month" v-on:keyup.enter="getFilters()" />
              <masked-input style="width: 120px; margin-left: 2px;" class="form-control" v-model="paramData.search.emp__Year" :mask="dateYYMask" placeholder="year" v-on:keyup.enter="getFilters()" /> 
            </b-form>
          </b-form>
      </div>

      <div class="col-md-2">
          <b-form inline class="">
            <label class="form-label mr-sm-2">User tidak aktif</label>
            <b-form-checkbox  v-model="isChecked" checked true-value="1" false-value="false" @click.native="check()"  />
          </b-form>
      </div>
      <div class="col-md-4">
          <b-btn @click="createData()" class="btn btn-success btn-md float-right mr-2">
              <i class="ion ion-md-add-circle"></i> Buat Data
          </b-btn>
      </div>
    </b-form>

    <div class="table-responsive"> <vuetable ref="vuetable"
      api-url="/AdminVue/data-user-employee"
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
            <b-input v-model="paramData.search.emp__Name" placeholder="Nama" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.emp__CellPhone" placeholder="No. HP" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.usr__UserName" placeholder="Nama User" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.tyu__Name" placeholder="Hak Akses User" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="dd.mm.yy"
              v-model="paramData.search.emp__UpdateAt"
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
import accounting from 'accounting'
import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import ButtonAction from '@/components/backend/template/ButtonAction'

export default {
  name: 'index-user-employee',
  metaInfo: {
    title: 'Index User Karyawan'
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
          name: 'Departement',
          sortField: 'dpt.Department',
          title: 'Departemen',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Name',
          sortField: 'emp.Name',
          title: 'Nama',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'CellPhone',
          sortField: 'emp.CellPhone',
          title: 'No. HP',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Username',
          sortField: 'usr.UserName',
          title: 'Nama User',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'TypeUser',
          sortField: 'tyu.Name',
          title: 'Hak Akses User',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'UpdateAt',
          sortField: 'emp.UpdateAt',
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
          showUrl: 'master/show-user-employee',
          editUrl: 'master/form-user-employee',
          deleteUrl: '/AdminVue/user-employee-delete'
        }
      ],
      
      isNotif: false,

      sortOrder: [
        {
          field: 'Name',
          sortField: 'emp.Name',
          direction: 'asc'
        }
      ],

      vars: {
        perPage: 10
      },

      // isChecked : false,
      alertVariant: 'alert-dark-danger',

      isCheckedDataMoreThanZero : 0,

      paramData: {
        search: {},
        checklist: {
          value : null,
          successChecked : 'Berhasil Menonaktifkan users',
          successUnChecked : 'Berhasil Mengaktifkan users',
        },
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
      this.$router.push('/RoleAdmin/master/form-user-employee')
    },
    
    check: function() {
     
      this.paramData.checklist.value = this.isChecked ? 0 : 1;
      if(this.paramData.checklist.value == 0)
      {
        this.$refs.vuetable.refresh()
        this.showNotifCustom('notifications-danger','Notifikasi sukses',this.paramData.checklist.successUnChecked)
      }else
      {
        this.$refs.vuetable.refresh()
        this.showNotifCustom('notifications-success','Notifikasi Sukses',this.paramData.checklist.successChecked)  
      }
      // (this.paramData.checklist.value == 0) ? this.$refs.vuetable.refresh() :  this.$refs.vuetable.refresh() 
    },
    
    getUnactivedData () {
      axios.get('/AdminVue/user-checklist-employee')
	    .then( function (res) {
	        var resp = res.data;
          (resp.data == 0) ?  this.isCheckedDataMoreThanZero  : this.isCheckedDataMoreThanZero = resp.data
	    }.bind(this))
	    .catch( function (e) {
	        console.log(e);
	    })
    }

  },

  computed: {
    isChecked: {
      get() {
        return this.isCheckedDataMoreThanZero > 0
      },
      set(value) {
        if (value) {
          this.isCheckedDataMoreThanZero = 1
        } else {
          this.isCheckedDataMoreThanZero = 0
        }
      },
    },
  },

  mounted(){
    this.isNotifExist()
    this.getUnactivedData();
    (this.isCheckedDataMoreThanZero > 0) ? this.isChecked = true : this.isChecked = false
  },

}
</script>
