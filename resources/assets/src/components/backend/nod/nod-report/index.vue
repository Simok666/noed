<template> <div>

  <b-card header="Laporan NOD" header-tag="h4" class="mb-4">

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
              <masked-input style="width: 120px;" class="form-control" v-model="paramData.search.nod__Month" :mask="datemmMask" placeholder="month" v-on:keyup.enter="getFilters()" />
              <masked-input style="width: 120px; margin-left: 2px;" class="form-control" v-model="paramData.search.nod__Year" :mask="dateYYMask" placeholder="year" v-on:keyup.enter="getFilters()" /> 
            </b-form>
          </b-form>
      </div>
      <div class="col-md-4">
          <!-- <b-btn @click="createData()" v-if="position == 1" class="btn btn-success btn-md float-right mr-2"> -->
          <b-btn @click="createData()" class="btn btn-success btn-md float-right mr-2">
            <i class="ion ion-md-add-circle"></i> Buat Data
          </b-btn>
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-nod-report"
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
            <b-input v-model="paramData.search.nod__NODNumber" placeholder="No. NOD" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__NOENumber" placeholder="No. NOE" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="dd.mm.yy"
              v-model="paramData.search.nod__Date"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="datedmYMask" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__BatchNo" placeholder="No. Kontrol / No. Bets" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.pdc__Name" placeholder="Bahan / Produk Terkait" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-form-select v-model="paramData.search.nod__Status" :options="optionStatus" v-on:change="getFilters()" value="paramData.search.nod__Status"></b-form-select>
          </th>
          <th>
            <b-input v-model="paramData.search.emp__Name" placeholder="Dilaporkan Oleh" v-on:keyup.enter="getFilters()" />
          </th>
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
          <b-btn class="btn btn-outline-info btn-sm mr-1 mt-1"
            @click="onAction('view-item', props.rowData, props.rowIndex)">
            <i class="ion ion-ios-eye"></i> Tampilkan
          </b-btn>
          <b-btn v-if="(((props.rowData.Status == 'UnPublish' || props.rowData.Status == 'Direvisi' && props.rowData.IsUpadatedRevision === null ) && props.rowData.IdUserEntry == idUser) || ( props.rowData.Status == 'Disetujui oleh Dept Head Terkait' && position == 2))" class="btn btn-outline-secondary btn-sm mr-1 mt-1"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-create"></i> Ubah
          </b-btn>
          <b-btn v-if="((props.rowData.Status == 'UnPublish' || props.rowData.Status == 'Direvisi' && props.rowData.IsUpadatedRevision === null) && props.rowData.IdUserEntry == idUser)" class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-trash"></i> Hapus
          </b-btn>
          <b-btn v-if="((props.rowData.Status == 'UnPublish' || props.rowData.Status == 'Direvisi' && props.rowData.IsUpadatedRevision === null) && props.rowData.IdUserEntry == idUser)" class="btn btn-outline-success btn-sm mr-1 mt-1"
            @click="onAction('publish', props.rowData, props.rowIndex)">
            <i class="ion-md-cloud-upload"></i> Publish
          </b-btn>

          <b-btn v-if="props.rowData.Status != 'UnPublish'" class="btn btn-warning btn-sm mr-1 mt-1"
            :href="'/AdminVue/nod-report/'+props.rowData.id+'/export'" target="_blank">
            <i class="ion ion-md-print"></i> Export
          </b-btn>

          <div>
            <span v-if="(position != 4 && props.rowData.Status == 'UnPublish') || (position == 1 && props.rowData.Status == 'Dilaporkan ke Unit Head') || (position == 2 && props.rowData.Status == 'Disetujui oleh Unit Head') || ( (position == 4 || isCaretaker == true) && ( (props.rowData.Status == 'Disetujui oleh Section Head' && props.rowData.IdDepartment == userDepartment) || ( (props.rowData.IdDepartment != userDepartment) && props.rowData.Status == 'Disetujui oleh Dept Head') || (userDepartment == 67 && props.rowData.Status == 'Disetujui oleh Dept Head Terkait') ) )" class="btn btn-md btn-warning"></span>

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
import DetailRow from './detail-row'

export default {
  name: 'index-nod-report',
  metaInfo: {
    title: 'Index NOD Report'
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
          name: 'NODNumber',
          sortField: 'nod.NODNumber',
          title: 'No. NOD',
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
          name: 'Date',
          sortField: 'nod.Date',
          title: 'Tanggal / Waktu',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'BatchNo',
          sortField: 'noe.BatchNo',
          title: 'No. Kontrol / No. Bets',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Product',
          sortField: 'pdc.Name',
          title: 'Bahan / Produk Terkait',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Status',
          sortField: 'nod.Status',
          title: 'Status',
          titleClass: 'text-center',
          dataClass: 'text-center'
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
          title: 'More',
          titleClass: 'text-center',
          dataClass: 'text-center',
        }*/
  		],

  		sortOrder: [
        {
          field: 'NODNumber',
          sortField: 'nod.NODNumber',
          direction: 'asc'
        }
      ],

      vars: {
      	perPage: 10
      },

      paramData: {
        search: {},
      },

      myDetailRow: DetailRow,

      optionStatus :[
        {value: null,text:'All'},
        {value: "UnPublish", text:"UnPublish"},
        {value: "Dilaporkan ke Unit Head", text:"Dilaporkan ke Unit Head"},
        {value: "Disetujui oleh Unit Head", text:"Disetujui oleh Unit Head"},
        {value: "Disetujui oleh Section Head", text:"Disetujui oleh Section Head"},
        {value: "Disetujui oleh Dept Head", text:"Disetujui oleh Dept Head"},
        {value: "Disetujui oleh Dept Head Terkait", text:"Disetujui oleh Dept Head Terkait"},
        {value: "Disetujui oleh QA Dept.Head", text:"Disetujui oleh QA Dept.Head"},
        {value: "Ditolak", text:"Ditolak"},
        {value: "Direvisi", text:"Direvisi"},
        {value: "Disetujui Oleh QA Section Head", text:"Disetujui Oleh QA Section Head"}

      ],

      position: 0, //position 1 = unit; 2 = section head; 3 = APJ; 4 = dept head;
      idUser: 0,
      idDetail: [],
      isCaretaker: false,
      deptTerkait: false,
      userDepartment: 0,
      typeUser: 0

  	}
  },

  methods: {
    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD.MM.YY')
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

    createData () {
      this.$router.push('/RoleAdmin/nod/form-nod-report')
    },

    onCellClicked(data, index){
      for (let i = 0; i < this.idDetail.length; i++) {
        this.$refs.vuetable.hideDetailRow(this.idDetail[i])
      }
      this.$refs.vuetable.toggleDetailRow(data.id)
      this.idDetail.push(data.id)
    },

    getSession () {
      axios.post('/AdminVue/nod-report-get-session')
      .then( function (res) {
        this.position = res.data.position
        this.isCaretaker = res.data.isCaretaker
        this.userDepartment = res.data.userDepartment
        this.typeUser = res.data.typeUser
        this.idUser = res.data.idUser
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    getDeptTerkait (id) {
      axios.post('/AdminVue/nod-report-edit',{
        Id: id
      })
      .then( function (res) {
        this.deptTerkait = res.data.deptTerkait
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },


    onAction(action,data,index){
      if(action=='view-item'){
        this.$router.push({
          name: 'nod/show-nod-report',
          params: {
            Id: data.id,
            isShow: true
          }
        })
      }

      if(action=='edit-item'){
        this.$router.push({
          name: 'nod/form-nod-report',
          params: {
            isFormEdit: true,
            Id: data.id,
          }
        })
      }

      if(action=='delete-item'){
        this.deleteData('/AdminVue/nod-report-delete', data.id, this.$refs.vuetable)
      }

      if(action == 'publish'){
          this.publish('/AdminVue/nod-report-publish', data.id, this.$refs.vuetable)
      }

      if(action == 'approve'){
        this.approve('/AdminVue/nod-report-approve', data.id, this.$refs.vuetable, null, true, this.isCaretaker)
      }

    }

  },

  mounted(){
    this.isNotifExist()
    this.getSession()
  },

}
</script>
