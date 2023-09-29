<template>
<div>
	<b-card header="Hak Akses User" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data Type User
	    </h6>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Nama Hak Akses User</div>
	        {{field.Name}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Deskripsi</div>
	        {{field.Description}}
	      </div>
	    </div>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Dibuat pada</div>
	        {{formatDate(field.CreateAt)}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Terakhir Diubah</div>
	        {{formatDate(field.UpdateAt)}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Dibuat Oleh</div>
	        {{field.UserEntry}}
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
	name: 'show-user-access',
	metaInfo: {
		title: 'Detail Type User'
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
	    axios.post('/AdminVue/user-access-show', {
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

    formatDate: function(value) {
	 	return (value == null) ? '' : moment(value).format('DD.MM.YY')
    },

    backIndex() {
    	this.$router.push('/RoleAdmin/master/data-user-access')
    }
  },

	mounted(){
    if(this.$route.params.Id){
      var Id = this.$route.params.Id;
      if(Id){
        this.getData(Id);
      }
    }
  },  

}

</script>