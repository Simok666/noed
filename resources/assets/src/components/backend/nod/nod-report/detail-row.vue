<template>
    <b-card header="Data Detail Laporan NOD" header-tag="h4" class="mb-4 text-center">
        <div class="table-responsive">
            <table class="table table-bordered b-t">
                <thead>
                    <tr style="background-color:white;">
                        <th>#</th>
                        <th>Dilaporkan Oleh</th>
                        <th colspan="2">Diperiksa Oleh</th>
                        <th colspan="2">Disetujui Oleh</th>
                        <th>Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="Status == 'UnPublish' && Status == null && countData == 1">
                        <td colspan="7"><b>Tidak Ada Data</b></td>
                    </tr>
                    <tr v-for = "(item, index) in historyRevision" style="background-color:white" v-else>
        
                        <td >{{index+1}}</td>
                        
                        <td >{{item.UserEntry}} - {{formatDate(item.CreateAt)}} <b v-if="item.IsRevision == 1">Revisi</b></td>
                        <td >
                            <span >{{item.UserUnit}} - {{formatDate(item.DateUnit)}}</span><br/>
                            <span >{{item.UserSection}} - {{formatDate(item.DateSection)}}</span><br/>
                                {{item.UserDept}} - {{formatDate(item.DateDept)}}
                        </td>
                        <td>{{item.UserTerkait}}</td>
                        <td colspan="2" >{{item.UserQA}} - {{formatDate(item.DateQA)}}</td>
                        
                        <td>
                            <div v-if="isData == true && item.IsRevision == 0 && (isPublishBy == true || isSectionPublish == true || isDept == true || isRelevantDept == true || Status == 'Disetujui oleh Dept Head Terkait' || Status == 'Disetujui Oleh QA Section Head')">
                                <!-- <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
                                @click="onAction('approve', Id, rowData.id)">
                                <i class="ion ion-md-checkmark"></i> Setujui
                                </b-btn> -->
                                <b-btn v-if="isDept" class="btn btn-outline-danger btn-sm mr-1 mt-1"
                                @click="onAction('reject', Id, rowData.id)">
                                <i class="ion ion-md-close"></i> Tolak
                                </b-btn>
                                <b-btn class="btn btn-warning btn-sm mr-1 mt-1"
                                @click="onAction('correction', Id, rowData.id)">
                                <i class="fas fa-comment"></i> Koreksi
                                </b-btn>
                            </div>
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
            Id: 0,
            Status: null,
            UserEntry: null,
            CreateAt: null,
            UserUnit: null,
            DateUnit: null,
            TextUnit: '',
            UserSection: null,
            DateSection: null,
            UserDept: null,
            DateDept: null,
            UserTerkait: null,
            UserQAAPJ: null,
            DateQAAPJ: null,
            UserQA: null,
            DateQA: null,
            isData: false,
            isCaretaker: false,
            isPublishBy: false,
            isSectionPublish: false,
            isRelevantDept: false,
            isDept: false,
            opsRelevantDept: [],
            historyRevision: [],
            revisionStatus:0,
            dataCount:0,
            relevantDeptExist:0
        }
    },

    methods: {
        formatDate: function(value) {
            return (value == null) ? '' : moment(value).format('DD.MM.YY')
        },

        getDataDetail(id){
            axios.post('/AdminVue/nod-report/'+this.rowData.id+'/detail')
            .then( function(res){
                var resp = res.data
                this.Id = resp.data.Id
                this.Status = resp.data.Status
                this.UserEntry = resp.data.UserEntry
                this.CreateAt = resp.data.CreateAt
                
                this.UserUnit = resp.data.UserUnit
                this.DateUnit = resp.data.DateUnit
                this.TextUnit = resp.data.UserUnit != null ? resp.data.UserUnit + ' - ' + this.formatDate(resp.data.DateUnit) + '<br>' : ''

                this.UserSection = resp.data.UserSection
                this.DateSection = resp.data.DateSection
                this.TextSection = resp.data.UserSection != null ? resp.data.UserSection + ' - ' + this.formatDate(resp.data.DateSection) + '<br>' : ''

                this.UserDept = resp.data.UserDept
                this.DateDept = resp.data.DateDept
                this.UserTerkait = resp.data.UserTerkait
                this.UserQAAPJ = resp.data.UserQAAPJ
                this.DateQAAPJ = resp.data.DateQAAPJ
                this.UserQA = resp.data.UserQA
                this.DateQA = resp.data.DateQA
                this.isData = resp.isData
                this.isCaretaker = resp.isCaretaker
                this.opsRelevantDept = resp.data.RelevantDept
                
                resp.data.IdPublish == resp.data.IdPosition ? this.isPublishBy = true : this.isPublishBy
                resp.data.IdSectionPublish == resp.data.IdPosition ? this.isSectionPublish = true : this.isSectionPublish
                if(resp.data.IdRelevantDept != 0)
                {    
                    JSON.parse(resp.data.IdRelevantDept).filter((value) => {
                        return value == resp.data.IdDepartmentSession ? this.isRelevantDept = true : this.isRelevantDept
                    }, {})
                } 
                
                (resp.data.TypeUser == 15 && this.isRelevantDept == false) || resp.data.TypeUser == 16 ? this.isDept = true : this.isDept
                
                this.relevantDeptExist = resp.data.IdRelevantDept 
                this.historyRevision = resp.historyRevision
                this.revisionStatus = resp.data.IsRevision
                this.countData = resp.countData                
                
            }.bind(this))
            .catch( function(e){
                console.log(e)
                this.isNotif = true
                this.alertNotif = 'Invalid Server Side!'
                this.alertVariant = 'alert-dark-danger'
            }.bind(this))
        },

        onAction(action,data,index){
            if(action == 'approve'){
                this.approve('/AdminVue/nod-report-approve', data, this.$parent, index, false, this.isCaretaker, this.opsRelevantDept, this.isDept, this.isRelevantDept, this.relevantDeptExist)
            }
            if(action == 'reject'){
                this.rejectOld('/AdminVue/nod-report-reject', data, this.$parent, index, false, this.isCaretaker)
            }
            if(action == 'correction'){
                this.$router.push({
                    name: 'nod/form-correction-nod-report',
                    params: {
                        Id: data,
                        isCaretaker: this.isCaretaker
                    }
                })
            }
            if(action == 'revision')
            {
                this.revision('/AdminVue/nod-report-revision',data,this.$parent, index)   
            }
            if(action == 'question'){
                this.$router.push({
                    name: 'nod/form-question-nod-report',
                    params: {
                        Id: data,
                        isCaretaker: this.isCaretaker
                    }
                })
            }
        }
    },

    mounted() {
        this.getDataDetail(this.rowData.id)
    },
}
</script>
