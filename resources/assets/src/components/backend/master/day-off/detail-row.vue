<template>
	<b-card header="Data Detail Hari Libur" header-tag="h4" class="mb-4 text-center">
		<div class="table-responsive">
			<table class="table table-bordered b-t">
				<thead>
					<tr style="background-color:white;">
						<th>#</th>
						<th>Tanggal</th>
            <td>Dibuat Oleh</td>
						<td>Tindakan</td>
					</tr>
				</thead>
				<tbody v-if="detailData.length == 0" >
					<tr>
						<td colspan="4"><b>Tidak Ada Data</b></td>
					</tr>
				</tbody>
        <tbody v-else v-for="(item, index) in detailData" :key="index">
					<tr style="background-color:white">
            <td>{{index + 1}}</td>
            <td>{{formatDate(item.Date)}}</td>
						<td>{{item.UserName}}</td>
						<td>
							<b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
								@click="onAction('delete-item', item.Date, index)">
								<i class="ion ion-md-trash"></i> Hapus
							</b-btn>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</b-card>
</template>

<script>

import Vue from 'vue'
import Vuetable from 'vuetable-2'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import VuetableRowHeader from 'vuetable-2/src/components/VuetableRowHeader'
import moment from 'moment'

export default {
	props: {
	  rowData: {
		type: Object,
		required: true
	  },
	  rowIndex: {
		type: Number
	  },
    vuetable: {
      type: Object
    }
	},

	components: {
		Vuetable,
		VuetablePagination,
		VuetablePaginationInfo,
		VuetableRowHeader
	},

	data() {
		return {
			detailData: [],
			BaseUrl: process.env.BASE_URL
		}
	},

	methods: {
    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD.MM.YY')
    },

		getDataDetail(id){
			axios.post('/AdminVue/day-off/'+this.rowData.id+'/detail')
			.then( function(res){
				this.detailData = res.data.data
			}.bind(this))
			.catch( function(e){
				this.isNotif = true
				this.alertNotif = 'Invalid Server Side!'
				this.alertVariant = 'alert-dark-danger'
			}.bind(this))
		},

    onAction(action,data,index){
      if(action=='delete-item'){

        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Data yang dihapus akan hilang",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Delete',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            var authToken = axios.post('/AdminVue/check-token', { Url: '/AdminVue/day-off-delete' })
            .then(({data}) => {
              return data.status
            })
            .catch(({response}) => {
              return false
            })

            authToken.then(function(status) {
              if( status == 200 ) {
                axios.post('/AdminVue/day-off-delete', {
                  Id: data,
                })
                .then( function (res) {

                  var resp = res.data

                  if(resp.status){
                    this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                    this.detailData.splice(index,1)
                  }else{
                    this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                  }

                }.bind(this))
                .catch( function (e) {
                  console.log(e)
                }.bind(this))
              } else if(status==406) {
                Vue.swal({
                  title:'Access Page', text:'Feature Access Not Allowed!'
                })
              } else {
                Vue.swal({
                  title:'Server Session', text:'User Data Expired!'
                }).then(function () {
                  auth.logout()
                })
              }
            }.bind(this))
          }
        })

        // this.deleteData('/AdminVue/day-off-delete', data, this.$parent)
        // this.$parent.hideDetailRow(this.rowData.id)
      }
    }
	},

	mounted() {
		this.getDataDetail(this.rowData.id)
	},
}
</script>
