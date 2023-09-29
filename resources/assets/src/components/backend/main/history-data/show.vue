<template>
<div>
	<b-card header="Detail / Data Log History" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data Log History
	    </h6>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Nama Modul</div>
	        {{field.Nama_Modul}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">From | Action</div>
	        {{field.From}} | {{field.Action}}
	      </div>
          <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Dibuat Oleh</div>
	        {{field.Dilaporkan_Oleh}}
	      </div>

          <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Dibuat Pada</div>
	        {{field.Createdate}}
	      </div>
          <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Terakhir Diubah</div>
	        {{field.Modifiedate}}
	      </div>
	      <div class="col-12">
	        <b-btn type="button" variant="secondary" @click="backIndex()" class="float-right">Kembali</b-btn>
	      </div>
	    </div>
	  </b-card-body>
	  <hr class="m-0">

  </b-card>
</div>
</template>

<style src="@/vendor/styles/pages/users.scss" lang="scss"></style>
<style type="text/css">
	.td-first-child{
		width: 9rem;
	}
</style>

<script>
import moment from 'moment'

export default {
    name: 'show-master-module',
	metaInfo: {
		title: 'Detail History Data'
	},

	components: {

	},

	data () {
		return {
	    field: {},
		};
	},

	methods: {
        getData (Id) {
            axios.post('/AdminVue/history-data-show', {
                Id:Id,
            })
            .then( function (res) {
                var resp = res.data;
                this.field = resp.data;
            }.bind(this))
            .catch( function (e) {
                console.log(e);
            })
        },
        backIndex() {
            this.$router.push('/RoleAdmin/main/history-data')
        }
    },

    mounted() {
        if(this.$route.params.Id){
            var Id = this.$route.params.Id;
            if(Id){
                this.getData(Id);
            }
        }
    },
}
</script>