<template> <div>

    <b-card header="Chat Status Menu" header-tag="h4" class="mb-4">
  
        <b-form inline class="mb-4 row">
        <div class="col-md-6">
            <b-form inline class="">
              <label class="form-label mr-sm-2">Tampilkan Data</label>
              <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
            </b-form>
        </div>
        <div class="col-md-6">
            <b-btn v-if="session.TypeUser == 8" @click="createData()" class="btn btn-success btn-md float-right mr-2">
                <i class="ion ion-md-add-circle"></i> Buat Data
            </b-btn>
        </div>
        </b-form>
        <!-- /AdminVue/user-access -->
        <div class="table-responsive"> <vuetable ref="vuetable"
          api-url="/AdminVue/master-chat-status"
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
              <b-input v-model="paramData.search.cs__status" placeholder="NodNumber" v-on:keyup.enter="getFilters()" />
            </th>
            <th>
              <b-input v-model="paramData.search.cs__descriptions" placeholder="Deskripsi" v-on:keyup.enter="getFilters()" />
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
          <b-btn class="btn btn-outline-info btn-sm mr-1 mt-1"
            @click="onAction('view-item', props.rowData, props.rowIndex)">
            <i class="ion ion-ios-eye"></i> Tampilkan
          </b-btn>
          <b-btn v-if="session.TypeUser == 8 || session.TypeUser == 18" class="btn btn-outline-secondary btn-sm mr-1 mt-1"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-create"></i> Ubah
          </b-btn>
          <b-btn v-if="session.TypeUser == 8 || session.TypeUser == 18" class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-trash"></i> Hapus
          </b-btn>

          <span v-else class="btn btn-md btn-success"></span>

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
    name: 'index-chat-status',
    metaInfo: {
      title: 'Index Chat Status'
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
                    name: 'status',
                    sortField: 'cs.status',
                    title: 'Status',
                    titleClass: 'text-center',
                    dataClass: 'text-center'
                },
                {
                    name: 'descriptions',
                    sortField: 'cs.descriptions',
                    title: 'Deskripsi',
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
            sortField: 'cs.id',
            direction: 'asc'
          }
        ],
  
        vars: {
            perPage: 10
        },
        
        paramData: {
          search: {},
        },

        session: []
  
        }
    },
  
    methods: {
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
        this.$router.push('/RoleAdmin/master/form-chat-status')
      },

      onAction(action,data,index){
      
      if(action=='view-item'){
        this.$router.push({
          name: 'master/datatable-chat-status',
          params: {
            Id: data.id,
            isShow: true
          }
        })
      }

      if(action=='edit-item'){
        this.$router.push({
          name: 'master/form-chat-status',
          params: {
            isFormEdit: true,
            Id: data.id,
          }
        })
      }

      if(action=='delete-item'){
        this.deleteData('/AdminVue/master-chat-status-delete', data.id, this.$refs.vuetable)
      }

    },

      getSession () {
        axios.post('/AdminVue/auth-get-session')
        .then( function (res) {
            var resp = res.data.data
            this.session = resp
        }.bind(this))
        .catch( function (e) {
            console.log(e)
        }.bind(this))
     },
  
    },
  
    mounted(){
      this.isNotifExist()
      this.getSession()
    },
  
  }
  </script>
  