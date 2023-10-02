import Vue from 'vue'
import layoutHelpers from '@/layout/helpers.js'
import themeSettings from '@/vendor/libs/theme-settings/theme-settings.js'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import moment from 'moment'



Vue.use(BootstrapVue)
Vue.use(Notifications)

export default function () {
  return {
    // Public url
    publicUrl: process.env.BASE_URL,

    // Layout helpers
    layoutHelpers,

    // Theme settings
    themeSettings,

    // Check for RTL layout
    get isRtlMode () {
      return document.documentElement.getAttribute('dir') === 'rtl' ||
             document.body.getAttribute('dir') === 'rtl'
    },

    // Check if IE
    get isIEMode () {
      return typeof document.documentMode === 'number'
    },

    // Check if IE10
    get isIE10Mode () {
      return this.isIEMode && document.documentMode === 10
    },

    // Layout navbar color
    get layoutNavbarBg () {
      return this.themeSettings.getOption('navbarBg') || 'navbar-theme'
    },

    // Layout sidenav color
    get layoutSidenavBg () {
      return this.themeSettings.getOption('sidenavBg') || 'sidenav-theme'
    },

    // Layout footer color
    get layoutFooterBg () {
      return this.themeSettings.getOption('footerBg') || 'footer-theme'
    },

    // Animate scrollTop
    scrollTop (to, duration, element = document.scrollingElement || document.documentElement) {
      if (element.scrollTop === to) return
      const start = element.scrollTop
      const change = to - start
      const startDate = +new Date()

      // t = current time; b = start value; c = change in value; d = duration
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
      }

      const animateScroll = () => {
        const currentDate = +new Date()
        const currentTime = currentDate - startDate
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration))
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll)
        } else {
          element.scrollTop = to
        }
      }

      animateScroll()
    },

    //-------- Extension Global Function & Variable --------//

    authHeader: {
      headers: {
        // Authorization: 'Bearer ' + window.localStorage.getItem('token')
        // 'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    },

    logoutUser () {
      auth.logout()
    },

    showNotifCustom (gNotif,tNotif,txNotif) {
      this.$notify({
        group: gNotif,
        title: tNotif,
        text: txNotif,
      })
    },

    hideModalDelete () {
      this.$bvModal.hide('modals-delete')
    },

    deleteData (url, id, elmTable) {
      if(id!=0) {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Data yang dihapus akan hilang",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Batal',
          confirmButtonText: 'Hapus',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            var authToken = axios.post('/AdminVue/check-token', { Url: url })
            .then(({data}) => {
              return data.status
            })
            .catch(({response}) => {
              return false
            })

            authToken.then(function(status) {
              if( status == 200 ) {
                this.showLoading()
                axios.post(url, {
                  Id: id,
                })
                .then( function (res) {

                  var resp = res.data

                  if(resp.status){
                    this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                  }else{
                    this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                  }

                  elmTable.refresh()
                  this.hideLoading()
                }.bind(this))
                .catch( function (e) {
                  this.hideLoading()
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
        
      }
    },

    publish(url,id,elmTable,isShow=false){
      if(id!=0) {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Ingin Publish Data",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#32CD32',
          cancelButtonColor: '#D63030',
          cancelButtonText: 'Batal',
          confirmButtonText: 'Publish',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            this.showLoading()
            axios.post(url, {
              Id: id,
            })
            .then( function (res) {
              var resp = res.data

              if(isShow) {
                if(resp.status){
                  if(url === '/AdminVue/noe-report-publish') {
                    this.$router.push({
                      name: 'noe/data-noe-report',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-success',
                        tNotif: 'Notifikasi Sukses',
                        txNotif: 'Publish Data Sukses!',
                      }
                    })
                  }
                  if(url === '/AdminVue/nod-report-publish') {
                    this.$router.push({
                      name: 'nod/data-nod-report',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-success',
                        tNotif: 'Notifikasi Sukses',
                        txNotif: 'Publish Data Sukses!',
                      }
                    })
                  }
                  if(url === '/AdminVue/nod-review-publish') {
                    this.$router.push({
                      name: 'nod/data-nod-review',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-success',
                        tNotif: 'Notifikasi Sukses',
                        txNotif: 'Publish Data Sukses!',
                      }
                    })
                  }
                } else {
                  if(url === '/AdminVue/noe-report-publish') {
                    this.$router.push({
                      name: 'noe/data-noe-report',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-danger',
                        tNotif: 'Notifikasi Eror',
                        txNotif: 'Publish Data Gagal!',
                      }
                    })
                  }
                  if(url === '/AdminVue/nod-report-publish') {
                    this.$router.push({
                      name: 'nod/data-nod-report',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-danger',
                        tNotif: 'Notifikasi Eror',
                        txNotif: 'Publish Data Gagal!',
                      }
                    })
                  }
                  if(url === '/AdminVue/nod-review-publish') {
                    this.$router.push({
                      name: 'nod/data-nod-review',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-danger',
                        tNotif: 'Notifikasi Eror',
                        txNotif: 'Publish Data Gagal!',
                      }
                    })
                  }
                }
              } else {
                if(resp.status){
                  this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                }else{
                  this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                }
                elmTable.refresh()
              }
              this.hideLoading()
            }.bind(this))
            .catch( function (e) {
              this.hideLoading()
              console.log(e)
            }.bind(this))
          }
        })
        
      }
    },

    sendAnswer(url,noeNumber,answer,elmTable,isShow=false,status =0)
    {
      if(noeNumber != 0)
      {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Ingin Kirim Jawaban",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#32CD32',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Batal',
          confirmButtonText: 'Kirim Jawaban',
          reverseButtons: true 
        }).then((result) => {
            if(result.value){
              this.showLoading()
              axios.post(url, {
                NoeNumber: noeNumber,
                Answer : answer,
              }).then (function (res) {
                  var resp = res.data
                  console.log('ini status '+ status)

                  if(isShow) {
                    if(status == 6 || status == 7 || status == 9){
                      this.$router.push({
                        name: 'noe/data-noe-evaluation',
                        params: {
                          isNotif: true,
                          gNotif: 'notifications-success',
                          tNotif: 'Notifikasi Sukses',
                          txNotif: 'Berhasil Kirim Komentar!'
                        }
                      })
                    } else if(status == 5 || status == 4 || status == 3 || status == 2) {
                      this.$router.push({
                        name: 'noe/data-noe-verification',
                        params: {
                          isNotif: true,
                          gNotif: 'notifications-success',
                          tNotif: 'Notifikasi Sukses',
                          txNotif: 'Berhasil Kirim Komentar!'
                        }
                      })
                    } else {
                      this.$router.push({
                        name: 'noe/data-noe-report',
                        params: {
                          isNotif: true,
                          gNotif: 'notifications-success',
                          tNotif: 'Notifikasi Sukses',
                          txNotif: 'Berhasil Kirim Komentar!'
                        }
                      })
                    }
                  }else {
                    if(resp.status){
                      this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                    }else{
                      this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                    }
                    elmTable.refresh()
                  }
                  

              }.bind(this))
              .catch( function (e) {
                this.hideLoading()
                console.log(e)
              }.bind(this))
            }
        })
      }
    },

    publishVerify(url,id,elmTable,isShow=false){
      if(id!=0) {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Ingin Publish Verifikasi",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#32CD32',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Batal',
          confirmButtonText: 'Publish Verifikasi',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            this.showLoading()
            axios.post(url, {
              Id: id,
            })
            .then( function (res) {
              var resp = res.data

              if(isShow) {
                this.$router.push({
                  name: 'noe/data-noe-verification',
                  params: {
                    isNotif: true,
                    gNotif: 'notifications-success',
                    tNotif: 'Notifikasi Sukses',
                    txNotif: 'Publish Verifikasi Success!'
                  }
                })
              } else {
                if(resp.status){
                  this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                }else{
                  this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                }
                elmTable.refresh()
              }
              this.hideLoading()
            }.bind(this))
            .catch( function (e) {
              this.hideLoading()
              console.log(e)
            }.bind(this))
          }
        })
        
      }
    },

    publishEvaluation(url,id,elmTable,isShow=false){
      if(id!=0) {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Ingin Publish Evaluasi",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#32CD32',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Batal',
          confirmButtonText: 'Publish Evaluasi',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            this.showLoading()
            axios.post(url, {
              Id: id,
            })
            .then( function (res) {
              var resp = res.data

              if(isShow) {
                this.$router.push({
                  name: 'noe/data-noe-evaluation',
                  params: {
                    isNotif: true,
                    gNotif: 'notifications-success',
                    tNotif: 'Notifikasi Sukses',
                    txNotif: 'Publish Verifikasi Success!'
                  }
                })
              } else {
                if(resp.status){
                  this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                }else{
                  this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                }
                elmTable.refresh()
              }
              this.hideLoading()
            }.bind(this))
            .catch( function (e) {
              this.hideLoading()
              console.log(e)
            }.bind(this))
          }
        })
        
      }
    },

    approve(url,id,elmTable,rowId=null,isShow=false,isCaretaker=false,opsRelevantDept=[],isDept=false, isRelevantDept=false, existRelevantDept=0){
      if(id!=0) {
        if(url === '/AdminVue/nod-report-approve' && (isDept == true || isRelevantDept == true))
        {
            let filterData = [] 
            if(existRelevantDept != 0) {
                filterData = JSON.parse(existRelevantDept).filter((value) => {
                return value
              })
            }
          
           const RelevantDept = opsRelevantDept.reduce((acc,item) => {
              if(filterData.includes(item.Id))
              {
                acc['']
              }
              else
              {
                acc[item.Id] = item.RelevantDept
              }
              return acc
          }, {})
          
          if(Object.keys(RelevantDept).length !== 0)
          {
            Vue.swal.fire({
              input: 'select',
              title: 'Pilih submit ke Dept terkait',
              inputOptions: {
                RelevantDept
              },
              inputPlaceholder: 'Select Departement',
              showCancelButton: true,
              confirmButtonColor: '#32CD32',
              cancelButtonColor: '#D63030',
              cancelButtonText: 'Batal',
              confirmButtonText: 'Submit',
              reverseButtons: true
            }).then((resultSubmit) => { 
                if(resultSubmit.isConfirmed && resultSubmit.value !== '')
                {
                  this.showLoading()
                  axios.post(url, {
                    Id: id,
                    SubmitVal : Number(resultSubmit.value)
                  })
                  .then( function (res) {
                    var resp = res.data
                    
                    if (isShow)
                    {
                      if(url === '/AdminVue/nod-report-approve') {
                        this.$router.push({
                          name: 'nod/data-nod-report',
                          params: {
                            isNotif: true,
                            gNotif: 'notifications-success',
                            tNotif: 'Notifikasi Sukses',
                            txNotif: 'Setujui Data Sukses!'
                          }
                        })
                      }
                    }else {
                      if(resp.status){
                        this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                      }else{
                        this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                      }
                      elmTable.refresh()
                      elmTable.hideDetailRow(rowId)
                    }
                    
                    this.hideLoading()
                  }.bind(this))
                  .catch( function (e) {
                    console.log(e);
                    this.hideLoading()
                  }.bind(this))
                }
            })
          } else {
            Vue.swal({
              title: 'Apa anda yakin?',
              text: "Ingin Setujui Data",
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#32CD32',
              cancelButtonColor: '#D63030',
              cancelButtonText: 'Batal',
              confirmButtonText: 'Setujui',
              reverseButtons: true
            }).then((result) => { 
              
              if (result.value) {
                if(isCaretaker) {
                  Vue.swal.fire({
                    input: 'textarea',
                    title: 'Deskripsi Caretaker',
                    inputPlaceholder: 'Ketik Deskripsi disini...',
                    inputAttributes: {
                      'aria-label': 'Ketik Deskripsi disini'
                    },
                    showCancelButton: true,
                    confirmButtonColor: '#0845D1',
                    cancelButtonColor: '#D63030',
                    cancelButtonText: 'Batal',
                    confirmButtonText: 'Submit',
                    reverseButtons: true
                  }).then((resultCaretaker) => {
                    if (resultCaretaker.value) {
                      this.showLoading()
                      axios.post(url, {
                        Id: id,
                        DescriptionCaretaker: resultCaretaker.value
                      })
                      .then( function (res) {
    
                        var resp = res.data
    
                        if(isShow) {
                          if(url === '/AdminVue/noe-verification-approve') {
                            this.$router.push({
                              name: 'noe/data-noe-verification',
                              params: {
                                isNotif: true,
                                gNotif: 'notifications-success',
                                tNotif: 'Notifikasi Sukses',
                                txNotif: 'Setujui Data Sukses!'
                              }
                            })
                          }
                          if(url === '/AdminVue/noe-evaluation-approve') {
                            this.$router.push({
                              name: 'noe/data-noe-evaluation',
                              params: {
                                isNotif: true,
                                gNotif: 'notifications-success',
                                tNotif: 'Notifikasi Sukses',
                                txNotif: 'Setujui Data Sukses!'
                              }
                            })
                          }
                          if(url === '/AdminVue/nod-report-approve') {
                            this.$router.push({
                              name: 'nod/data-nod-report',
                              params: {
                                isNotif: true,
                                gNotif: 'notifications-success',
                                tNotif: 'Notifikasi Sukses',
                                txNotif: 'Setujui Data Sukses!'
                              }
                            })
                          }
                        } else {
                          if(resp.status){
                            this.$router.push({
                              name: 'nod/data-nod-report',
                              params: {
                                isNotif: true,
                                gNotif: 'notifications-success',
                                tNotif: 'Notifikasi Sukses',
                                txNotif: resp.message
                              }
                            })
                            
                          }else{
                            this.$router.push({
                              name: 'nod/data-nod-report',
                              params: {
                                isNotif: true,
                                gNotif: 'notifications-danger',
                                tNotif: 'Notifikasi Eror',
                                txNotif: resp.message
                              }
                            })
                      
                          }
                  
                        }
                        this.hideLoading()
                      }.bind(this))
                      .catch( function (e) {
                        console.log(e);
                        this.hideLoading()
                      }.bind(this))
                    }
                  })
                } else {
                  this.showLoading()
                  axios.post(url, {
                    Id: id
                  })
                  .then( function (res) {
    
                    var resp = res.data
                    if(resp.status){
                      this.$router.push({
                        name: 'nod/data-nod-report',
                        params: {
                          isNotif: true,
                          gNotif: 'notifications-success',
                          tNotif: 'Notifikasi Sukses',
                          txNotif: resp.message
                        }
                      })
                     
                    }else{
                      this.$router.push({
                        name: 'nod/data-nod-report',
                        params: {
                          isNotif: true,
                          gNotif: 'notifications-danger',
                          tNotif: 'Notifikasi Eror',
                          txNotif: resp.message
                        }
                      })
                    }
            
                    this.hideLoading()
                  }.bind(this))
                  .catch( function (e) {
                    console.log(e);
                    this.hideLoading()
                  }.bind(this))
                }
              }
            })
          }
          
        }
        else{
          Vue.swal({
            title: 'Apa anda yakin?',
            text: "Ingin Setujui Data",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#32CD32',
            cancelButtonColor: '#D63030',
            cancelButtonText: 'Batal',
            confirmButtonText: 'Setujui',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              if(isCaretaker) {
                Vue.swal.fire({
                  input: 'textarea',
                  title: 'Deskripsi Caretaker',
                  inputPlaceholder: 'Ketik Deskripsi disini...',
                  inputAttributes: {
                    'aria-label': 'Ketik Deskripsi disini'
                  },
                  showCancelButton: true,
                  confirmButtonColor: '#0845D1',
                  cancelButtonColor: '#D63030',
                  cancelButtonText: 'Batal',
                  confirmButtonText: 'Submit',
                  reverseButtons: true
                }).then((resultCaretaker) => {
                  if (resultCaretaker.value) {
                    this.showLoading()
                    axios.post(url, {
                      Id: id,
                      DescriptionCaretaker: resultCaretaker.value
                    })
                    .then( function (res) {
  
                      var resp = res.data
  
                      if(isShow) {
                        if(url === '/AdminVue/noe-verification-approve') {
                          this.$router.push({
                            name: 'noe/data-noe-verification',
                            params: {
                              isNotif: true,
                              gNotif: 'notifications-success',
                              tNotif: 'Notifikasi Sukses',
                              txNotif: 'Setujui Data Sukses!'
                            }
                          })
                        }
                        if(url === '/AdminVue/noe-evaluation-approve') {
                          this.$router.push({
                            name: 'noe/data-noe-evaluation',
                            params: {
                              isNotif: true,
                              gNotif: 'notifications-success',
                              tNotif: 'Notifikasi Sukses',
                              txNotif: 'Setujui Data Sukses!'
                            }
                          })
                        }
                        if(url === '/AdminVue/nod-report-approve') {
                          this.$router.push({
                            name: 'nod/data-nod-report',
                            params: {
                              isNotif: true,
                              gNotif: 'notifications-success',
                              tNotif: 'Notifikasi Sukses',
                              txNotif: 'Setujui Data Sukses!'
                            }
                          })
                        }
                      } else {
                        if(resp.status){
                          this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                        }else{
                          this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                        }
                        elmTable.refresh()
                        elmTable.hideDetailRow(rowId)
                      }
                      this.hideLoading()
                    }.bind(this))
                    .catch( function (e) {
                      console.log(e);
                      this.hideLoading()
                    }.bind(this))
                  }
                })
              } else {
                this.showLoading()
                axios.post(url, {
                  Id: id
                })
                .then( function (res) {
  
                  var resp = res.data
                  
                  if(isShow) {
                    if(url === '/AdminVue/noe-verification-approve') {
                      this.$router.push({
                        name: 'noe/data-noe-verification',
                        params: {
                          isNotif: true,
                          gNotif: 'notifications-success',
                          tNotif: 'Notifikasi Sukses',
                          txNotif: 'Setujui Data Sukses!'
                        }
                      })
                    }
                    if(url === '/AdminVue/noe-evaluation-approve') {
                      this.$router.push({
                        name: 'noe/data-noe-evaluation',
                        params: {
                          isNotif: true,
                          gNotif: 'notifications-success',
                          tNotif: 'Notifikasi Sukses',
                          txNotif: 'Setujui Data Sukses!'
                        }
                      })
                    }
                    if(url === '/AdminVue/nod-report-approve') {
                      this.$router.push({
                        name: 'nod/data-nod-report',
                        params: {
                          isNotif: true,
                          gNotif: 'notifications-success',
                          tNotif: 'Notifikasi Sukses',
                          txNotif: 'Setujui Data Sukses!'
                        }
                      })
                    }
                  } else {
                    if(resp.status){
                      this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                    }else{
                      this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                    }
                    elmTable.refresh()
                    elmTable.hideDetailRow(rowId)
                  }
                  this.hideLoading()
                }.bind(this))
                .catch( function (e) {
                  console.log(e);
                  this.hideLoading()
                }.bind(this))
              }
            }
          })
        }
        
      }
    },

    approveCAPA(url,id,elmTable,verif,description,isCaretaker=false){
      if(id!=0) {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Ingin Setujui CAPA",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#32CD32',
          cancelButtonColor: '#D63030',
          cancelButtonText: 'Batal',
          confirmButtonText: 'Setujui',
          reverseButtons: true
        }).then((result) => {
          if (result.value && verif) {
            if(verif.value == 'Perlu CAPA lain' && description == null) {
              Vue.swal({
                icon: 'error',
                text: 'Silahkan lengkapi kolom *Wajib Diisi'
              })
            } else {
              if(isCaretaker) {
                Vue.swal.fire({
                  input: 'textarea',
                  title: 'Deskripsi Caretaker',
                  inputPlaceholder: 'Ketik Deskripsi disini...',
                  inputAttributes: {
                    'aria-label': 'Ketik Deskripsi disini'
                  },
                  showCancelButton: true,
                  confirmButtonColor: '#0845D1',
                  cancelButtonColor: '#D63030',
                  cancelButtonText: 'Batal',
                  confirmButtonText: 'Submit',
                  reverseButtons: true
                }).then((resultCaretaker) => {
                  if (resultCaretaker.value) {
                    this.showLoading()
                    axios.post(url, {
                      Id: id,
                      VerifCAPA: verif,
                      DescriptionCAPA: description,
                      DescriptionCaretaker: resultCaretaker.value
                    })
                    .then( function (res) {

                      var resp = res.data

                      if(resp.status){
                        // this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                        this.$router.push({
                          name: 'nod/data-nod-review',
                          params: {
                            isNotif: true,
                            gNotif: 'notifications-success',
                            tNotif: 'Notifikasi Sukses',
                            txNotif: 'Setujui CAPA Success!'
                          }
                        })
                      }else{
                        // this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                        this.$router.push({
                          name: 'nod/data-nod-review',
                          params: {
                            isNotif: true,
                            gNotif: 'notifications-danger',
                            tNotif: 'Notifikasi Eror',
                            txNotif: 'Setujui CAPA Gagal!'
                          }
                        })
                      }

                      // elmTable.refresh()
                      this.hideLoading()
                    }.bind(this))
                    .catch( function (e) {
                      console.log(e);
                      this.hideLoading()
                    }.bind(this))
                  }
                })
              } else {
                this.showLoading()
                axios.post(url, {
                  Id: id,
                  VerifCAPA: verif,
                  DescriptionCAPA: description
                })
                .then( function (res) {

                  var resp = res.data

                  if(resp.status){
                    // this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                    this.$router.push({
                      name: 'nod/data-nod-review',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-success',
                        tNotif: 'Notifikasi Sukses',
                        txNotif: 'Setujui CAPA Success!'
                      }
                    })
                  }else{
                    // this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                    this.$router.push({
                      name: 'nod/data-nod-review',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-danger',
                        tNotif: 'Notifikasi Eror',
                        txNotif: 'Setujui CAPA Gagal!'
                      }
                    })
                  }

                  // elmTable.refresh()
                  this.hideLoading()
                }.bind(this))
                .catch( function (e) {
                  console.log(e);
                  this.hideLoading()
                }.bind(this))
              }
            }
          }
        })

      }
    },

    reject(url,id,elmTable,isShow=false,isCaretaker=false){
      if(id!=0) {
        Vue.swal.fire({
          input: 'textarea',
          title: 'Deskripsi Tolak',
          inputPlaceholder: 'Ketik Deskripsi disini...',
          inputAttributes: {
            'aria-label': 'Ketik Deskripsi disini'
          },
          showCancelButton: true,
          confirmButtonColor: '#D0D630',
          cancelButtonColor: '#D63030',
          cancelButtonText: 'Batal',
          confirmButtonText: 'Tolak',
          reverseButtons: true
        })
        .then((result) => {
          if (result.value) {
            if(isCaretaker) {
              Vue.swal.fire({
                input: 'textarea',
                title: 'Deskripsi Caretaker',
                inputPlaceholder: 'Ketik Deskripsi disini...',
                inputAttributes: {
                  'aria-label': 'Ketik Deskripsi disini'
                },
                showCancelButton: true,
                confirmButtonColor: '#0845D1',
                cancelButtonColor: '#D63030',
                cancelButtonText: 'Batal',
                confirmButtonText: 'Submit',
                reverseButtons: true
              }).then((resultCaretaker) => {
                if (resultCaretaker.value) {
                  this.showLoading()
                  axios.post(url, {
                    Id: id,
                    Description: result.value,
                    DescriptionCaretaker: resultCaretaker.value
                  })
                  .then( function (res) {

                    var resp = res.data

                    if(isShow) {
                      if(url === '/AdminVue/noe-verification-reject') {
                        this.$router.push({
                          name: 'noe/data-noe-verification',
                          params: {
                            isNotif: true,
                            gNotif: 'notifications-success',
                            tNotif: 'Notifikasi Sukses',
                            txNotif: 'Tolak Data Sukses!'
                          }
                        })
                      }
                      if(url === '/AdminVue/noe-evaluation-reject') {
                        this.$router.push({
                          name: 'noe/data-noe-evaluation',
                          params: {
                            isNotif: true,
                            gNotif: 'notifications-success',
                            tNotif: 'Notifikasi Sukses',
                            txNotif: 'Tolak Data Sukses!'
                          }
                        })
                      }
                    } else {
                      if(resp.status){
                        this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                      }else{
                        this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                      }
                      elmTable.refresh()
                    }
                    this.hideLoading()
                  }.bind(this))
                  .catch( function (e) {
                    console.log(e);
                    this.hideLoading()
                  }.bind(this))
                }
              })
            } else {
              this.showLoading()
              axios.post(url, {
                Id: id,
                Description: result.value
              })
              .then( function (res) {

                var resp = res.data

                if(isShow) {
                  if(url === '/AdminVue/noe-verification-reject') {
                    this.$router.push({
                      name: 'noe/data-noe-verification',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-success',
                        tNotif: 'Notifikasi Sukses',
                        txNotif: 'Tolak Data Sukses!'
                      }
                    })
                  }
                  if(url === '/AdminVue/noe-evaluation-reject') {
                    this.$router.push({
                      name: 'noe/data-noe-evaluation',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-success',
                        tNotif: 'Notifikasi Sukses',
                        txNotif: 'Tolak Data Sukses!'
                      }
                    })
                  }
                } else {
                  if(resp.status){
                    this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                  }else{
                    this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                  }
                  elmTable.refresh()
                }
                this.hideLoading()
              }.bind(this))
              .catch( function (e) {
                console.log(e);
                this.hideLoading()
              }.bind(this))
            }
          }
        })
        
      }
    },

    revision(url,id,elmTable,rowId=null)
    {
      if(id != 0 ) 
      {
        this.showLoading()
        axios.post(url ,{
        Id: id
        }).then(function (res) {
          var resp = res.data
          console.log(resp);
          if(resp.status){
            this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
          }else{
            this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
          }
          elmTable.refresh()
          this.hideLoading()
        }.bind(this))
        .catch( function (e) {
          console.log(e);
          this.hideLoading()
        }.bind(this))
      }
    },

    rejectOld(url,id,elmTable,rowId=null,isShow=false,isCaretaker=false){
      if(id!=0) {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Ingin Tolak Data",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#D0D630',
          cancelButtonColor: '#D63030',
          cancelButtonText: 'Batal',
          confirmButtonText: 'Tolak',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            if(isCaretaker) {
              Vue.swal.fire({
                input: 'textarea',
                title: 'Deskripsi Caretaker',
                inputPlaceholder: 'Ketik Deskripsi disini...',
                inputAttributes: {
                  'aria-label': 'Ketik Deskripsi disini'
                },
                showCancelButton: true,
                confirmButtonColor: '#0845D1',
                cancelButtonColor: '#D63030',
                cancelButtonText: 'Batal',
                confirmButtonText: 'Submit',
                reverseButtons: true
              }).then((resultCaretaker) => {
                if (resultCaretaker.value) {
                  this.showLoading()
                  axios.post(url, {
                    Id: id,
                    DescriptionCaretaker: resultCaretaker.value
                  })
                  .then( function (res) {

                    var resp = res.data

                    if(isShow) {
                      if(url === '/AdminVue/nod-report-reject') {
                        this.$router.push({
                          name: 'nod/data-nod-report',
                          params: {
                            isNotif: true,
                            gNotif: 'notifications-success',
                            tNotif: 'Notifikasi Sukses',
                            txNotif: 'Setujui Data Sukses!'
                          }
                        })
                      }
                      if(url === '/AdminVue/nod-review-reject') {
                        this.$router.push({
                          name: 'nod/data-nod-review',
                          params: {
                            isNotif: true,
                            gNotif: 'notifications-success',
                            tNotif: 'Notifikasi Sukses',
                            txNotif: 'Setujui Data Sukses!'
                          }
                        })
                      }
                    } else {
                      if(resp.status){
                        this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                      }else{
                        this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                      }
                      elmTable.refresh()
                      elmTable.hideDetailRow(rowId)
                    }
                    this.hideLoading()
                  }.bind(this))
                  .catch( function (e) {
                    console.log(e);
                    this.hideLoading()
                  }.bind(this))
                }
              })
            } else {
              this.showLoading()
              axios.post(url, {
                Id: id,
              })
              .then( function (res) {

                var resp = res.data

                if(isShow) {
                  if(url === '/AdminVue/nod-report-reject') {
                    this.$router.push({
                      name: 'nod/data-nod-report',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-success',
                        tNotif: 'Notifikasi Sukses',
                        txNotif: 'Setujui Data Sukses!'
                      }
                    })
                  }
                  if(url === '/AdminVue/nod-review-reject') {
                    this.$router.push({
                      name: 'nod/data-nod-review',
                      params: {
                        isNotif: true,
                        gNotif: 'notifications-success',
                        tNotif: 'Notifikasi Sukses',
                        txNotif: 'Setujui Data Sukses!'
                      }
                    })
                  }
                } else {
                  if(resp.status){
                    this.showNotifCustom('notifications-success','Notifikasi Sukses',resp.message)
                  }else{
                    this.showNotifCustom('notifications-danger','Notifikasi Eror',resp.message)
                  }
                  elmTable.refresh()
                  elmTable.hideDetailRow(rowId)
                }
                this.hideLoading()
              }.bind(this))
              .catch( function (e) {
                console.log(e);
                this.hideLoading()
              }.bind(this))
            }
          }
        })
        
      }
    },

    isNotifExist () {
      if(this.$route.params.isNotif){
        var isNotif = this.$route.params.isNotif
        // console.log(isNotif)
        if(isNotif){
            var gNotif = this.$route.params.gNotif
            var tNotif = this.$route.params.tNotif
            var txNotif = this.$route.params.txNotif
            this.showNotifCustom(gNotif,tNotif,txNotif)
        }
      }
    },

    showLoading () {
      document.getElementById("div-loading").classList.remove('hide')
    },

    hideLoading () {
      setTimeout(()=> {
        document.getElementById("div-loading").classList.add('hide')
      },1000)
    },

    cssTable: {
      tableClass: 'vuetable table table-striped table-bordered',
      ascendingIcon: 'fas fa-sort-up',
      descendingIcon: 'fas fa-sort-down',
      handleIcon: 'fas fa-bars'
    },

    cssPagination: {
      wrapperClass: "pagination",
      activeClass: "btn-primary text-white",
      disabledClass: "disabled",
      pageClass: "btn page-link mr-1",
      linkClass: "btn page-link mr-1",
      icons: {
        first: 'fas fa-angle-double-left',
        prev: 'fas fa-angle-left',
        next: 'fas fa-angle-right',
        last: 'fas fa-angle-double-right',
      }
    },

    dateYmdMask: [/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
    datedmYMask: [/\d/, /\d/, '.', /\d/, /\d/, '.',/[1-9]/, /\d/],
    dateYYYYMask: [/[1-9]/, /\d/, /\d/, /\d/],
    dateYYMask: [/[1-9]/, /\d/],
    datemmMask: [/\d/, /\d/],

    momentYear () {
      return moment().format('YYYY')
    },
   
    // datePickerFormat: { year: 'numeric', month: 'long', day: 'numeric' },
    datePickerFormat: { format: 'DD.MM.YYYY' },
    // datePickerFormat: moment().format('DD.MM.YY'),

    opsYear: [],
    generateYear() {
      var dateNow = moment(new Date()).format('YYYY')
      for (let i=2015; i<=dateNow; i++) {
        this.opsYear.push(i)
      }
    }

  }
}
