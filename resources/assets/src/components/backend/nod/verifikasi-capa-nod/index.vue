<template> <div>

    <b-card header="Verifikasi CAPA NOD" header-tag="h4" class="mb-4">
  
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
            <b-btn @click="createData()" v-if="typeUser == 19" class="btn btn-success btn-md float-right mr-2">
              <i class="ion ion-md-add-circle"></i> Buat Data
            </b-btn>
        </div>
        </b-form>
  
        <div class="table-responsive"> <vuetable ref="vuetable"
          api-url="/AdminVue/data-verifikasi-capa-nod"
        http-method="post"
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
              <b-input v-model="paramData.search.nod__NODNumber" placeholder="No. NOD" v-on:keyup.enter="getFilters()" />
            </th>
            <th>
              <b-form-select v-model="paramData.search.vcn__statusCAPA" :options="optionStatus" value="paramData.search.vcn__statusCAPA" v-on:change="getFilters()"></b-form-select>
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
      
        <template slot="statusCAPA" slot-scope="props">
          <div class="custom-actions">
            <template v-if="props.rowData.statusCAPA == 'ditolak'">
              {{props.rowData.statusCAPA}}
              <b-btn class="btn btn-outline-info btn-xs ml-1" v-on:click="showReject(props.rowData.id)"> <i class="ion ion-ios-eye"></i></b-btn>
            </template>
            <template v-else>
              {{props.rowData.statusCAPA}}
            </template>
          </div>
        </template>

        <template slot="action" slot-scope="props">
          <div class="custom-actions">
            <b-btn class="btn btn-outline-info btn-sm mr-1 mt-1"
              @click="onAction('view-item', props.rowData, props.rowIndex)">
              <i class="ion ion-ios-eye"></i> Tampilkan
            </b-btn>
            
            <b-btn v-if="(((props.rowData.statusCAPA == 'Dibuat oleh QA Section Head' || props.rowData.statusCAPA == 'Disetujui oleh QA Section Head') && ((position === 2 && props.rowData.isPublish === 0) || (position == 4 && props.rowData.isPublish === 1))))" class="btn btn-outline-secondary btn-sm mr-1 mt-1"
              @click="onAction('edit-item', props.rowData, props.rowIndex)">
              <i class="ion ion-md-create"></i> Ubah
            </b-btn>
            
            <b-btn v-if="((props.rowData.statusCAPA == 'Dibuat oleh QA Section Head' && position == 2))" class="btn btn-outline-danger btn-sm mr-1 mt-1"
              @click="onAction('delete-item', props.rowData, props.rowIndex)">
              <i class="ion ion-md-trash"></i> Hapus
            </b-btn>
  
            <b-btn v-if="((props.rowData.statusCAPA == 'Dibuat oleh QA Section Head' && position == 2))" class="btn btn-outline-success btn-sm mr-1 mt-1"
              @click="onAction('publish', props.rowData, props.rowIndex)">
              <i class="ion-md-cloud-upload"></i> Publish
            </b-btn>

            <b-btn v-if="props.rowData.Status != 'UnPublish'" class="btn btn-warning btn-sm mr-1 mt-1"
              :href="'/AdminVue/nod-report/'+props.rowData.id_Approve+'/export'" target="_blank">
              <i class="ion ion-md-print"></i> Export
            </b-btn>
  
            <!-- <div>
              <span v-if="(position != 4 && props.rowData.Status == 'UnPublish') || (position == 1 && props.rowData.Status == 'Dilaporkan ke Unit Head') || (position == 2 && props.rowData.Status == 'Disetujui oleh Unit Head') || ( (position == 4 || isCaretaker == true) && ( (props.rowData.Status == 'Disetujui oleh Section Head' && props.rowData.IdDepartment == userDepartment) || ( (props.rowData.IdDepartment != userDepartment) && props.rowData.Status == 'Disetujui oleh Dept Head') || (userDepartment == 67 && props.rowData.Status == 'Disetujui oleh Dept Head Terkait') ) )" class="btn btn-md btn-warning"></span>
  
              <span v-else class="btn btn-md btn-success"></span>
            </div> -->
            
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
    name: 'index-verifikasi-capa-nod',
    metaInfo: {
      title: 'Index Verifikasi CAPA NOD'
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
            name: 'statusCAPA',
            sortField: 'vcn.statusCAPA',
            title: 'Status',
            titleClass: 'text-center',
            dataClass: 'text-center'
          },
          {
            name: 'action',
            title: 'Tindakan',
            titleClass: 'text-center',
            dataClass: 'text-center',
          }],
  
            sortOrder: [
                {
                    field: 'NODNumber',
                    sortField: 'nod.NODNumber',
                    direction: 'desc'
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
          {value: "Disetujui oleh QA Section Head", text:"Disetujui oleh QA Section Head"},
          {value: "Diverifikasi oleh QA Dept Head", text:"Diverifikasi oleh QA Dept Head"},
        ],
  
        position: 0, //position 1 = unit; 2 = section head; 3 = APJ; 4 = dept head;
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

      showReject (id) {
      axios.post('/AdminVue/nod-verifikasi-capa-description-reject-data',{
        Id: id
        })
        .then( function (res) {
          var resp = res.data.data
          this.$swal({
            icon: 'info',
            title: 'Deskripsi Verifikasi CAPA Ditolak',
            text: resp,
            confirmButtonText: 'Tutup',
          })
        }.bind(this))
        .catch( function (e) {
          console.log(e)
        }.bind(this))
      },
  
      createData () {
        this.$router.push('/RoleAdmin/nod/form-master-verifikasi-capa')
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
            name: 'nod/show-master-verifikasi-capa',
            params: {
              Id: data.id_Approve,
              isShow: true
            }
          })
        }
  
        if(action=='edit-item'){
          this.$router.push({
            name: 'nod/form-master-verifikasi-capa',
            params: {
              isFormEdit: true,
              Id: data.id_Approve,
            }
          })
        }
        
        if(action=='delete-item'){
          this.deleteData('/AdminVue/nod-verifikasi-capa-delete-data', data.id, this.$refs.vuetable)
        }
  
        if(action == 'publish'){
            this.publish('/AdminVue/nod-verifikasi-capa-publish-data', data.id_Approve, this.$refs.vuetable)
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
  