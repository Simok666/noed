<template> <div>

  <b-card header="Review NOD" header-tag="h4" class="mb-4">

  	<b-form inline class="mb-2 row">
      <div class="col-md-6">
          <b-form inline class="">
            <label class="form-label mr-sm-2">Tampilkan Data</label>
            <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
            <b-select v-if="department == 67 && position == 2" class="ml-2" value="Data NOD Belum Review" :options="['Data NOD Belum Review','Data NOD Sudah Review']" v-on:change="setReview()" />
          </b-form>
      </div>
      <div class="col-md-6">
          <b-btn @click="createData()" v-if="department == 67 && position == 2" class="btn btn-success btn-md float-right mr-2">
              <i class="ion ion-md-add-circle"></i> Buat Data
          </b-btn>
      </div>
	  </b-form>

    <div v-if="!isReview && department == 67 && position == 2" class="table-responsive"> <vuetable ref="vuetable"
      api-url="/AdminVue/data-nod-notreview"
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
            <b-input v-model="paramData.search.nrt__NODNumber" placeholder="No. NOD" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__NOENumber" placeholder="No. NOE" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__Event" placeholder="Uraian / Kondisi Ketidaksesuaian" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.nod__ProperCondition" placeholder="Kondisi Seharusnya" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__BatchNo" placeholder="No. Kontrol / No. Bets" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.pdc__Code" placeholder="Bahan / Produk Terkait" v-on:keyup.enter="getFilters()" />
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

        </div>
      </template>

      <template slot="more" slot-scope="props">
        <div class="custom-actions">

        </div>
      </template>
      
    </vuetable> </div>

	  <div v-else class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-nod-review"
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
            <b-input v-model="paramData.search.nrt__NODNumber" placeholder="No. NOD" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__NOENumber" placeholder="No. NOE" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__Event" placeholder="Uraian / Kondisi Ketidaksesuaian" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.nod__ProperCondition" placeholder="Kondisi Seharusnya" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.noe__BatchNo" placeholder="No. Kontrol / No. Bets" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.pdc__Code" placeholder="Bahan / Produk Terkait" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-form-select v-model="paramData.search.nod__Status" :options="optionStatus" v-on:change="getFilters()" value="paramData.search.nod__Status"></b-form-select>
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
          <b-btn v-if="department == 67" class="btn btn-outline-info btn-sm mr-1 mt-1"
            @click="onAction('view-item', props.rowData, props.rowIndex)">
            <i class="ion ion-ios-eye"></i> Tampilkan
          </b-btn>
          <b-btn v-if="department == 67 && props.rowData.Status == 'UnPublish'" class="btn btn-outline-secondary btn-sm mr-1 mt-1"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-create"></i> Ubah
          </b-btn>
          <b-btn v-if="department == 67 && props.rowData.Status == 'UnPublish'" class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-trash"></i> Hapus
          </b-btn>

          <b-btn v-if="department == 67 && position == 2 && props.rowData.Status == 'UnPublish'" class="btn btn-outline-primary btn-sm mr-1 mt-1"
            @click="onAction('publish', props.rowData, props.rowIndex)">
            <i class="ion ion-md-checkmark"></i> Publish
          </b-btn>

          <b-btn v-if="department == 67 && ( (position == 3 && props.rowData.Status == 'Dilaporkan ke QA APJ') || ((position == 4 || isCaretaker == true) && props.rowData.Status == 'Disetujui oleh QA Sect.Head') )" class="btn btn-outline-success btn-sm mr-1 mt-1"
            @click="onAction('approve', props.rowData, props.rowIndex)">
            <i class="ion ion-md-checkmark"></i> Setujui
          </b-btn>

          <b-btn v-if="department == 67 && (position == 4 || isCaretaker == true) && props.rowData.Status == 'Disetujui oleh QA Sect.Head'" class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('reject', props.rowData, props.rowIndex)">
            <i class="ion ion-md-close"></i> Tolak
          </b-btn>

          <b-btn v-if="department == 67 && ( (position == 3 && props.rowData.Status == 'Dilaporkan ke QA APJ') || ((position == 4 || isCaretaker == true) && props.rowData.Status == 'Disetujui oleh QA Sect.Head') )" class="btn btn-warning btn-sm mr-1 mt-1"
            @click="onAction('correction', props.rowData, props.rowIndex)">
            <i class="fas fa-comment"></i> Koreksi
          </b-btn>

          <div>
            <span v-if="department == 67 && ( (position == 2 && props.rowData.Status == 'UnPublish') || (position == 3 && props.rowData.Status == 'Dilaporkan ke QA APJ') || ((position == 4 || isCaretaker == true) && props.rowData.Status == 'Disetujui oleh QA Sect.Head') )" class="btn btn-md btn-warning"></span>

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

export default {
  name: 'index-nod-review',
  metaInfo: {
    title: 'Index NOD Review'
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
          sortField: 'nrt.NODNumber',
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
          name: 'Event',
          sortField: 'noe.Event',
          title: 'Uraian / Kondisi Ketidaksesuaian',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'ProperCondition',
          sortField: 'nod.ProperCondition',
          title: 'Kondisi Seharusnya',
          titleClass: 'text-center',
          dataClass: 'text-center',
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
          sortField: 'nrt.NODNumber',
          direction: 'asc'
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
        // {value: "Dilaporkan ke QA APJ", text:"Dilaporkan ke QA APJ"},
        {value: "Disetujui oleh QA Sect.Head", text:"Disetujui oleh QA Sect.Head"},
        {value: "Disetujui oleh QA Dept.Head", text:"Disetujui oleh QA Dept.Head"},
        {value: "Ditolak", text:"Ditolak"}
      ],

      department: 0,
      position: 0, //1 = unit head; 2 = sect head; 3 = APJ; 4 = dept head;
      isCaretaker: false,
      isReview: false

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
      this.$router.push('/RoleAdmin/nod/form-nod-review')
    },

    setReview () {
      this.isReview = !this.isReview
    },

    getSession () {
      axios.post('/AdminVue/nod-review-get-session')
      .then( function (res) {
        this.department = res.data.department
        this.position = res.data.position
        this.isCaretaker = res.data.isCaretaker
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.department = 0
        this.position = 0
        this.isCaretaker = false
      }.bind(this))
    },

    onAction(action,data,index){
      if(action=='view-item'){
        this.$router.push({
          name: 'nod/show-nod-review',
          params: {
            Id: data.id,
            isShow: true
          }
        })
      }

      if(action=='edit-item'){
        this.$router.push({
          name: 'nod/form-nod-review',
          params: {
            isFormEdit: true,
            Id: data.id,
          }
        })
      }

      if(action=='delete-item'){
        this.deleteData('/AdminVue/nod-review-delete', data.id, this.$refs.vuetable)
      }
      if(action == 'publish'){
        this.publish('/AdminVue/nod-review-publish', data.id, this.$refs.vuetable)
      }
      if(action == 'approve'){
        this.$router.push({
          name: 'nod/form-nod-review',
          params: {
            Id: data.id,
            isShow: true,
            isApprove: true,
            isCaretaker: this.isCaretaker
          }
        })
      }
      if(action == 'reject'){
        this.rejectOld('/AdminVue/nod-review-reject', data.id, this.$refs.vuetable, null, false, this.isCaretaker)
      }
      if(action == 'correction'){
        this.$router.push({
          name: 'nod/form-correction-nod-review',
          params: {
            Id: data.id,
            isCaretaker: this.isCaretaker
          }
        })
      }
    }

  },

  mounted(){
    this.isNotifExist()
    this.getSession()
  },

}
</script>
