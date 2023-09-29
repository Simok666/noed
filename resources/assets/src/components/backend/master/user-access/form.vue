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
            <label class="form-label">Nama Hak Akses User</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-6">
            <label class="form-label">Deskripsi</label>
            <b-textarea name="Description" :state="allErrors.Description?false:null" v-model="field.Description" class="mb-1" row="3" />
            <span class="text-danger" v-if="allErrors.Description">{{ allErrors.Description[0] }}</span>
          </b-form-group>
        </b-form-row>

        <v-jstree
          :data="treeData"
          :class="{ 'tree-rtl': isRtlMode }"
          no-dots
          show-checkbox
          multiple
          collapse
          allow-batch
          @item-click="itemClick" />

        <!-- <pre class="mt-4" style="white-space: normal;direction:ltr;text-align:left">{{ treeDataJson }}</pre> -->

        <b-form-row>
          <b-form-group class="col-md-6"></b-form-group>
          <b-form-group label="" class="col-md-6">
            <b-btn type="submit" variant="primary" class="float-right ml-2">Simpan</b-btn>
            <b-btn type="button" variant="secondary" @click="backIndex()" class="float-right">Kembali</b-btn>
          </b-form-group>
        </b-form-row>
      </form>

    </b-card>

  </div>
</template>

<style src="@/vendor/libs/vue-jstree/vue-jstree.scss" lang="scss"></style>

<script>

import Vue from 'vue'
import VJstree from 'vue-jstree'

export default {
  name: 'form-user-access',
  metaInfo: {
    title: 'Form Hak Akses User'
  },
  components: {
    VJstree
  },
  data () {
    return {
    treeData: [],

    urlSubmit: '/AdminVue/user-access-insert',
    headerCard: 'Hak Akses User',
    textBtnSubmit: 'Simpan',
    field: {},
    allErrors: [],
    isNotif: false,
    alertNotif: '',
    alertVariant: 'alert-dark-danger',
    thisParent: true,
    parentSelected: false
  }},

  computed: {
    treeDataJson () {
      return JSON.stringify(this.treeData)
    }
  },

  methods: {
    itemClick (node, item, e) {
      this.treeData = this.treeData.slice(0)
      // console.log(node)
      // console.log(item)
      // console.log(e)
      if(item.selected == true) {
        this.isParentCheck(item)
      }
      
    },

    isParentCheck (item) {
      for (let val of this.treeData) {
        if(val.id == item.id) return false
        else if(val.children.length) {
          for (let v of val.children) {
            if(v.id == item.id) {
              if(val.selected == false) {
                Vue.swal({
                  title:'Menu Hak Akses', text:'Menu Parent harus dicentang dahulu!', icon: 'info'
                })
                item.selected = false
                for (let vv of item.children) {
                  vv.selected = false
                }
              }
              return false
            } else {
              if(v.children.length) {
                for (let value of v.children) {
                  if(value.id == item.id) {
                    if(v.selected == false) {
                      Vue.swal({
                        title:'Menu Hak Akses', text:'Menu Parent harus dicentang dahulu!', icon: 'info'
                      })
                      item.selected = false
                    }
                    return false
                  }
                }
              }
            }
          }
        }
      }
    },

    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Name", this.field.Name)
      formData.append("Description", this.field.Description)
      formData.append("Action", JSON.stringify(this.treeData))

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-user-access',
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
      axios.post('/AdminVue/user-access-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        // console.log(this.field.action)
        this.treeData = JSON.parse(this.field.action)

        // // this.itemClick(node.model.text)
        // this.treeData = this.field.action
        // console.log(this.treeData)
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-user-access')
    }
  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/user-access-update'
        this.textBtnSubmit = 'Simpan'
      }
    }else{
      axios.post('/AdminVue/user-access-getJsonTree')
      .then( function (res) {
        // console.log(res.data.action)
        this.treeData = JSON.parse( res.data.action )
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    }

  }

}

</script>
