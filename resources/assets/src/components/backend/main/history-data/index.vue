<template>
    <div>
        <b-card header="View / Data Log History 1" header-tag="h4" class="mb-4">

  	<b-form inline class="mb-2 row">
      <div class="col-md-6">
          <b-form inline class="">
            <label class="form-label mr-sm-2">Tampilkan Data</label>
            <b-select v-model="vars.perPage" value="vars.perPage" :options="options" />
          </b-form>




      </div>
      <div class="col-md-6">
         <a href="/AdminVue/export_excel" class="btn btn-success my-3" target="_blank">EXPORT DATA</a>
      </div>



	  </b-form>

            <div class="table-responsive" id="table-responsive"> <vuetable ref="vuetable"
            api-url="/AdminVue/data-history-data"
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
            <b-input v-model="paramData.search.Nama_Modul" placeholder="Nama Modul" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.DrafNoe" placeholder="Draft Noe" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.Noenod" placeholder="Noe/NOD" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="Tgl-Bln-Thn"
              v-model="paramData.search.Tanggal"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="datedmYMask" />
          </th>          
          <th>
                <b-input v-model="paramData.search.Jam" placeholder="No. NOE" v-on:keyup.enter="getFilters()" />          
          </th>
          <th>
            <b-input v-model="paramData.search.Nobatch" placeholder="No Kontrol / No Batch" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.Produkname" placeholder="Bahan/Produk Terkait" v-on:keyup.enter="getFilters()" />
          </th>   
          <th>
            <b-input v-model="paramData.search.Jeniskejadian" placeholder="Jenis Kejadian" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.Lokasikejadian" placeholder="Lokasi Kejadian" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.Status" placeholder="Status" v-on:keyup.enter="getFilters()" />
          </th>   
          <th>
            <b-input v-model="paramData.search.Dilaporkan_Oleh" placeholder="Dilaporkan Oleh" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.User" placeholder="User" v-on:keyup.enter="getFilters()" />
          </th> 
          <th>
            <masked-input type="text" class="form-control" placeholder="Tgl-Bln-Thn"
              v-model="paramData.search.Createdate"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="datedmYMask" />
          </th>  
          <th>
            <masked-input type="text" class="form-control" placeholder="Tgl-Bln-Thn"
              v-model="paramData.search.Modifiedate"
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
        <vuetable-pagination-info ref="paginationInfo" no-data-template="Data tidak ada"
        ></vuetable-pagination-info>

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
import VuetableFieldCheckbox from 'vuetable-2/src/components/VuetableFieldCheckbox'
import accounting from 'accounting'
import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import ButtonAction from '@/components/backend/template/ButtonAction'
import VueExcelXlsx from 'vue-excel-xlsx'






export default {
  name: 'index-master-module',
  metaInfo: {
    title: 'Index Master Module'
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
       selected: null,
        options: [
          { value: 10, text: '10' },
          { value: 25, text: '25' },
          { value: 50, text: '50' },
          { value: 100, text: '100' },
          { value: 1000, text: '1000' },
          { value: 'all', text: 'All' }
        ],
      fields: [
        {
          name: 'index',
          title: '#',
          titleClass: 'text-center',
          dataClass: 'text-center wd-50'
        },
        {
          name: 'Nama_Modul',
          sortField: 'Nama_Modul',
          title: 'Nama Modul',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'DrafNoe',
          sortField: 'DrafNoe',
          title: 'Draft Noe',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },  
        {
          name: 'Noenod',
          sortField: 'Noenod',
          title: 'Noe/NOD',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },  
        {
          name: 'Tanggal',
          sortField: 'Tanggal',
          title: 'Tanggal',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },  
        {
          name: 'Jam',
          sortField: 'Jam',
          title: 'Waktu',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatJam
        },  
        {
          name: 'Nobatch',
          sortField: 'Nobatch',
          title: 'No Kontrol / No Batch',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },  
        {
          name: 'Produkname',
          sortField: 'Produkname',
          title: 'Bahan/Produk Terkait',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },  
        {
          name: 'Jeniskejadian',
          sortField: 'Jeniskejadian',
          title: 'Jenis Kejadian',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatJeniskejadian
        },  
        {
          name: 'Lokasikejadian',
          sortField: 'Lokasikejadian',
          title: 'Lokasi Kejadian',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },  
        {
          name: 'Status',
          sortField: 'Status',
          title: 'Status',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },  

        {
          name: 'Dilaporkan_Oleh',
          sortField: 'Dilaporkan_Oleh',
          title: 'Dilaporkan Oleh',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'User',
          sortField: 'User',
          title: 'User',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Createdate',
          sortField: 'Createdate',
          title: 'Create Date',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'Modifiedate',
          sortField: 'Modifiedate',
          title: 'Modified Date',
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
          isEdit: false,
          isDelete: false,
          showUrl: 'main/show-history-data',
        },
      ],
      sortOrder: [
        {
          field: 'id',
          sortField: 'Id',
          direction: 'desc'
        }
      ],

      vars: {
        perPage: 10
      },

      paramData: {
        search: {},
      },

      descVisible: false

    }
  },

  methods: {
    formatNumber: function(value) {
        return accounting.formatMoney(value, 'Rp ', 2, '.', ',')
    },  
    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD.MM.YY')
    },
    formatJam: function(value) {
      return (value == null || moment(value).format('HH.mm') == "00.00") ? '' : moment(value).format('HH.mm')
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    formatJeniskejadian: function(value) {
      let datakejadian = JSON.parse(value)
      var result = ''

      datakejadian.forEach(function(data, index) {
        if(data){
        result += data.TypeIncident+"; "
       }
      });

      return (value == null) ? '' : result
    }, 
   onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },

    getFilters () {
      this.$refs.vuetable.refresh()
    },








  },

  mounted(){
    this.isNotifExist()
  },
}
</script>