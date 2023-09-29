<template>
    <div>
        <b-card header="Day Off Detail" header-tag="h4" class="mb-0" no-body>
            <b-card-body>
            <h6 class="font-weight-semibold">
              Data Day Off
            </h6>
            <div class="row">
              <div class="col-md-4 mb-3">
                <div class="font-weight-semibold">Date</div>
                {{formatDate(field.Date)}}
              </div>
              <div class="col-md-4 mb-3">
                <div class="font-weight-semibold">Nama Hari Libur</div>
                {{field.NameDayOff}}
              </div>
            </div>
            <div class="row">
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
        name: 'datatable-dayoff',
        metaInfo: {
            title: 'Detail Data Day Off'
        },
    
        components: {
    
        },
    
        data () {
            return {
            field: {},
            };
        },
    
        methods: {
        formatDate: function(value) {
            const getDayName = new Date(value).toLocaleDateString('id-ID',{weekday: 'long'})
            const formattedDate = (value == null) ? '' : moment(value).format('DD.MM.YY');
            
            return `${getDayName}, ${formattedDate}`;
        },
        
          getData (Id) {
            axios.post('/AdminVue/data-day-off-table-show', {
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
            this.$router.push('/RoleAdmin/master/form-day-off')
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