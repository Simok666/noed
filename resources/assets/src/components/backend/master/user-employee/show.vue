<template>
<div>
	<b-card header="User Karyawan" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data User Karyawan
	    </h6>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Position — Department</div>
	        {{field.Position}} — {{field.Departement}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Nama</div>
	        {{field.Name}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">NIP</div>
	        {{field.NIP}}
	      </div>
	    </div>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">No. HP</div>
	        {{field.CellPhone}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Hak Akses User</div>
	        {{field.TypeUser}}
	      </div>
	    </div>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Nama User</div>
	        {{field.UserName}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Password</div>
	        {{field.Password}}
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
	
export default {
	name: 'show-user-employee',
	metaInfo: {
		title: 'Detail User Karyawan'
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
	    axios.post('/AdminVue/user-employee-show', {
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
    	this.$router.push('/RoleAdmin/master/data-user-employee')
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