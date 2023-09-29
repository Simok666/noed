<template>
    <b-card header="Data Detail Perbaikan" header-tag="h4" class="mb-4 text-center">
        <div class="table-responsive">
            <table class="table table-bordered b-t">
                <thead>
                    <tr style="background-color:white;">
                        <th>#</th>
                        <th>Lampiran</th>
                        <th>Tindakan</th>
                    </tr>
                </thead>
                <tbody v-if="detailData.length == 0" >
                    <tr>
                        <td colspan="3"><b>Tidak Ada Lampiran</b></td>
                    </tr>
                </tbody>
                <tbody v-else v-for="(item, index) in detailData" :key="index">
                    <tr style="background-color:white">
                        <td>{{index + 1}}</td>
                        <td>{{item[0]}}</td>
                        <td>
                            <a class="btn btn-outline-success btn-sm text-success" :href="BaseUrl+item[1]" target="_blank"> <i class="fas fa-download"></i> Download</a>
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

export default {
    props: {
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
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
        getDataDetail(id){
            axios.post('/AdminVue/correction-nod-report/'+this.rowData.id+'/detail')
            .then( function(res){
                this.detailData = res.data.data
            }.bind(this))
            .catch( function(e){
                this.isNotif = true
                this.alertNotif = 'Invalid Server Side!'
                this.alertVariant = 'alert-dark-danger'
            }.bind(this))
        }
    },

    mounted() {
        this.getDataDetail(this.rowData.id)
    },
}
</script>
