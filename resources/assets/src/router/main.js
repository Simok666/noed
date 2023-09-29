import Layout2 from '@/layout/Layout2'
import LayoutBlank from '@/layout/LayoutBlank'
import ManualBook from '@/components/backend/main/ManualBook'

// ManualBook.mounted()
//   .then(typeUser => {
//     console.log(typeUser); 
//   })
//   .catch(error => {
//     console.log(error); 
//   });
// console.log('cek')
var dataUser = window.localStorage.getItem('user')
var dataUser = dataUser ? JSON.parse(dataUser) : null

export default [{
  path: '/RoleAdmin',
  component: LayoutBlank,
  children: [{
    path: 'manage',
    component: () => import('@/components/backend/Login')
  },{
    path: 'forgot-password',
    name: 'main/forgot-password',
    component: () => import('@/components/backend/ForgotPassword')
  },{
    path: 'verification-code',
    name: 'main/verification-code',
    component: () => import('@/components/backend/VerificationCode')
  },{
    path: 'reset-password',
    name: 'main/reset-password',
    component: () => import('@/components/backend/ResetPassword')
  }]
},

{path: '/RoleAdmin/main',
  component: Layout2,
  meta: { 
    middlewareAuth: true, 
    typeUser : 8
  },
  children: [{
    path: 'dashboard',
    component: () => import('@/components/backend/main/Dashboard')
  }, {
    path: 'profile',
    name: 'main/profile',
    component: () => import('@/components/backend/main/profile/index')
  }, {
    path: 'form-profile',
    name: 'main/form-profile',
    component: () => import('@/components/backend/main/profile/form')
  }, {
    path: 'master-module',
    name: 'main/master-module',
    component: () => import('@/components/backend/main/master-module/index')
  }, {
    path: 'form-master-module',
    name: 'main/form-master-module',
    component: () => import('@/components/backend/main/master-module/form')
  }, {
    path: 'show-master-module',
    name: 'main/show-master-module',
    component: () => import('@/components/backend/main/master-module/show')
  },{
    path: 'history-data',
    name: 'histroy-data/index',
    component: () => import('@/components/backend/main/history-data/index')
  },{
    path: 'show-history-data',
    name: 'main/show-history-data',
    component: () => import('@/components/backend/main/history-data/show')
  },{
    path: 'data-export-edms',
    name: 'main/data-export-edms',
    component: () => import('@/components/backend/main/double-book/index')
  },{
    path: 'manual-book',
    component:  () =>  import('@/components/backend/main/ManualBook')
  },{
    path: 'master-trouble-shoot',
    name: 'main/master-trouble-shoot',
    component: () => import('@/components/backend/main/master-trouble-shoot/index')
  },{
    path: 'form-master-trouble-shoot',
    name: 'main/form-master-trouble-shoot',
    component: () => import('@/components/backend/main/master-trouble-shoot/form')
  },{
    path: 'show-master-trouble-shoot',
    name: 'main/show-master-trouble-shoot',
    component: () => import('@/components/backend/main/master-trouble-shoot/form')
  }]
}]





