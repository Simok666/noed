<template>
  <div>

    <b-card :header="headerCard" header-tag="h4" class="mb-4">

      <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
        <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
        {{alertNotif}}
      </div>

      <form method="POST" @submit.prevent="submitForm()">
        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Tanggal</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <!-- <b-form-datepicker
              locale="en"
              v-model="field.Date"
              class="mb-1"
              :date-format-options="datePickerFormat"
              required
              :date-disabled-fn="dateDisabled"
            ></b-form-datepicker> -->
            <VueDatePicker
              v-model="field.Date"
              class="mb-1"
              required
              :date-disabled-fn="dateDisabled"
              :format="dateFormat"
              :locale="locale"
            />
            <span class="text-danger" v-if="allErrors.Date">{{ allErrors.Date[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-6">
            <label class="form-label">Nama Hari Libur</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="dayoff"
              v-model="field.DayOff"
              class="mb-1"
              required
            ></b-input>
            <span class="text-danger" v-if="allErrors.DayOff">{{ allErrors.DayOff[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6"></b-form-group>
          <b-form-group label="" class="col-md-6">
            <b-btn type="submit" variant="primary" class="float-right ml-2">Simpan</b-btn>
            <b-btn type="button" variant="secondary" @click="backIndex()" class="float-right">Kembali</b-btn>
          </b-form-group>
        </b-form-row>
      </form>

        <b-form inline class="mb-2 row">
          <div class="col-md-4">
            <b-form inline class="">
              <label class="form-label mr-sm-1">Periode</label>
                <b-form inline class="">
                  <masked-input style="width: 120px;" class="form-control" v-model="paramData.search.df__Month" :mask="datemmMask" placeholder="month" v-on:keyup.enter="getFilters()" />
                  <masked-input style="width: 120px; margin-left: 2px;" class="form-control" v-model="paramData.search.df__Year" :mask="dateYYMask" placeholder="year" v-on:keyup.enter="getFilters()" /> 
                </b-form>
              </b-form>
          </div>
        </b-form>

        <div class="table-responsive"> <vuetable ref="vuetable"
        api-url="/AdminVue/data-day-off-table"
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

  </div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import VuetableRowHeader from 'vuetable-2/src/components/VuetableRowHeader'
import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import ButtonAction from '@/components/backend/template/ButtonAction'
import { VueDatePicker } from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'

export default {
  name: 'form-day-off',
  metaInfo: {
    title: 'Form Data Day Off'
  },
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    VuetableRowHeader,
    MaskedInput,
    VueDatePicker
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
  				name: 'Date',
  				sortField: 'df.Date',
  				title: 'Tanggal Libur',
  				titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
  			},
  			{
  				name: 'NameDayOff',
  				sortField: 'df.NameDayOff',
  				title: 'Nama Hari Libur',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
          name: ButtonAction,
          title: 'Tindakan',
          titleClass: 'text-center',
          dataClass: 'text-center',
          isShow: true,
          isEdit: true,
          isDelete: true,
          showUrl: 'master/datatable-day-off',
          editUrl: 'master/form-day-off-edit',
          deleteUrl: '/AdminVue/day-off-delete-data'
        }
  		],

  		sortOrder: [
        {
          field: 'Date',
          sortField: 'df.Date',
          direction: 'asc'
        }
      ],

      vars: {
      	perPage: 10
      },

      paramData: {
        search: {},
      },

      urlSubmit: '/AdminVue/day-off-insert',
      headerCard: 'Pengaturan Hari Libur',
      textBtnSubmit: 'Simpan',
      field: {
        // myFile : ''
        Date: moment(new Date()).format('YYYY-MM-DD')
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsEmp: [],
      dateFormat: 'DD.MM.YY',
      locale: { lang: 'en' }

    }
  },
  methods: {

    formatDate: function(value) {
      const getDayName = new Date(value).toLocaleDateString('id-ID',{weekday: 'long'})
      const formattedDate = (value == null) ? '' : moment(value).format('DD.MM.YY');
      
      return `${getDayName}, ${formattedDate}`;
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

    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      const weekday = date.getDay()
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6
    },

    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      if(this.field.Date) formData.append("Date", this.field.Date)
      if(this.field.DayOff) formData.append("NameDayOff", this.field.DayOff)


      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-day-off',
            params: {
              isNotif: true,
              gNotif: 'notifications-success',
              tNotif: this.textBtnSubmit+' Data Sukses',
              txNotif: 'Simpan Data Sukses!',
            }
          })

        }else{
          this.isNotif = true
          this.alertNotif = resp.message
          this.alertVariant = 'alert-dark-danger'
          this.allErrors = resp.validation
          this.scrollTop(0, 1000)
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getData (Id) {
      axios.post('/AdminVue/day-off-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-day-off')
    }

  },

  mounted(){
    this.isNotifExist()
    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/product-update'
        this.textBtnSubmit = 'Simpan'
      }

    }
  },  

}
</script>