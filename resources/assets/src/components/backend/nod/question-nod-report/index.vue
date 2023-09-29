<template> <div>

    <b-card header="History Chat NOD" header-tag="h4" class="mb-4">
        <b-form inline class="mb-4 row">
            <div class="col-md-6">
                <b-form inline class="">
                <label class="form-label mr-sm-2">Tampilkan Data</label>
                <b-select v-model="vars.perPage" value="vars.perPage" @change="onGetOption($event)" :options="[2,3,5,100,1000]" />
                </b-form>
            </div>
            <div class="col-md-6">
                <b-form @submit.prevent="submitSearch">
                <b-input-group>
                    <b-form-input
                    v-model="field.searchQuery.rc__question"
                    placeholder="Search History Data"
                    />
                    <b-input-group-append>
                    <b-button type="submit" variant="primary">Search</b-button>
                    </b-input-group-append>
                </b-input-group>
                </b-form>
            </div>
        </b-form>

        <b-form inline class="mb-4 row">

                <div class="col-md-4" v-for="(item, index) in historyData">
                    <b-button @click="onAction('chatRoom', item.ChatroomId, item.NodNumber)" variant="light" class="mb-2 mt-2">{{item.ChatStatus}}</b-button>
                    
                    <b-card v-if="item.ChatStatus" :bg-variant="getVariant(item.ChatStatus)" :text-variant="(item.ChatStatus == 'Done') ? 'black' : 'white' " :header="item.NodNumber" >
                        <b-card-text>Topik Diskusi : </b-card-text>
                        <b-card-text>{{item.Question}}</b-card-text>
                        <b-card-text>Invite Chat Forum : </b-card-text>
                        <b-card-text>{{item.RequestName}} - ({{item.DepartName}})</b-card-text>
                    </b-card>
                </div>

        </b-form>

        <b-pagination
            v-model="currentPage"
            :total-rows="totalHistoryData"
            :per-page="vars.perPage"
            @input="onPageChange"
            aria-controls="history-data-pagination"
        ></b-pagination>
    </b-card>

</div> </template>

<script>

export default {
    name: 'index-history-chat',
    metaInfo: {
      title: 'Index Histroy Chat'
    },
    components: {   
        
    },

    data () {
        return {
            field: {},
            vars: 
            {
                perPage: 2
            },
            
            field: 
            {
                searchQuery: {},
            },            
            historyData: [],
            variant: '',
            totalHistoryData: 0,
            currentPage: 1
        }
    },

    methods: {
        getHistoryData (pageNumber) {
            axios.post('/AdminVue/auth-get-history-chat-data', {
                perPage: this.vars.perPage,
                page: pageNumber,
                search: this.field.searchQuery
            })
                .then( function (res) {
                    var resp = res.data.data
                    
                    this.historyData = resp.data 
                    this.totalHistoryData = resp.total
                }.bind(this))
                .catch( function (e) {
                    console.log(e)
                }.bind(this))
        },

        getVariant(chatStatus) {
            switch (chatStatus) {
                case 'Open':
                return 'success';
                case 'Done':
                return 'light';
                case 'InProgress':
                return 'info';
                case 'Expired':
                return 'warning';
                case 'Cancel':
                return 'danger';
                default:
                return '';
            }
        },

        onGetOption(event)
        {
            if(event != null || event != 0)
            {
                this.vars.perPage = event
                this.currentPage = 1;
                this.showLoading()
                this.getHistoryData(this.currentPage)
                this.hideLoading()
            }
        },

        onPageChange(pageNumber) {
            this.getHistoryData(pageNumber);
        },

        submitSearch() {
            this.currentPage = 1
            this.getHistoryData(this.currentPage)
        },

        onAction(action, indexChatRoom, nodNumber) {
            if(action == 'chatRoom'){
                this.$router.push({
                    name: 'nod/form-chat-room',
                    params: {
                        Id: indexChatRoom,
                        NodNumber: nodNumber
                        // isCaretaker: this.isCaretaker
                    }
                })
            }
        }
    
    },

    mounted(){
      this.getHistoryData(this.currentPage)
    },




}

</script>