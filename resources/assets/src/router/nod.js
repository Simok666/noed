import Layout2 from '@/layout/Layout2'

export default [{
  path: '/RoleAdmin/nod',
  component: Layout2,
  meta: { middlewareAuth: true },
  children: [{
    path: 'data-nod-report',
  	name: 'nod/data-nod-report',
    component: () => import('@/components/backend/nod/nod-report/index')
  },{
    path: 'show-nod-report',
    name: 'nod/show-nod-report',
    component: () => import('@/components/backend/nod/nod-report/form')
  },{
    path: 'form-nod-report',
    name: 'nod/form-nod-report',
    component: () => import('@/components/backend/nod/nod-report/form')
  },{
    path: 'data-nod-review',
    name: 'nod/data-nod-review',
    component: () => import('@/components/backend/nod/nod-review/index')
  },{
    path: 'show-nod-review',
    name: 'nod/show-nod-review',
    component: () => import('@/components/backend/nod/nod-review/form')
  },{
    path: 'form-nod-review',
    name: 'nod/form-nod-review',
    component: () => import('@/components/backend/nod/nod-review/form')
  },{
    path: 'data-correction-nod-report',
    name: 'nod/data-correction-nod-report',
    component: () => import('@/components/backend/nod/correction-nod-report/index')
  },{
    path: 'form-correction-nod-report',
    name: 'nod/form-correction-nod-report',
    component: () => import('@/components/backend/nod/correction-nod-report/form')
  },{
    path: 'data-correction-nod-review',
    name: 'nod/data-correction-nod-review',
    component: () => import('@/components/backend/nod/correction-nod-review/index')
  },{
    path: 'form-correction-nod-review',
    name: 'nod/form-correction-nod-review',
    component: () => import('@/components/backend/nod/correction-nod-review/form')
  },{
    path: 'form-question-nod-report',
    name: 'nod/form-question-nod-report',
    component: () => import('@/components/backend/nod/question-nod-report/form')
  },{
    path: 'master-history-chat',
    name: 'nod/master-history-chat',
    component: () => import('@/components/backend/nod/question-nod-report/index')
  },{
    path: 'show-master-history-chat',
    name: 'nod/show-master-history-chat',
    component: () => import('@/components/backend/nod/question-nod-report/form')
  },{
    path: 'form-chat-room',
    name: 'nod/form-chat-room',
    component: () => import('@/components/backend/nod/question-nod-report/container')
  },{
    path: 'master-verifikasi-capa',
    name: 'nod/master-verifikasi-capa',
    component: () => import('@/components/backend/nod/verifikasi-capa-nod/index')
  },{
    path: 'form-master-verifikasi-capa',
    name: 'nod/form-master-verifikasi-capa',
    component: () => import('@/components/backend/nod/verifikasi-capa-nod/form')
  },{
    path: 'show-master-verifikasi-capa',
    name: 'nod/show-master-verifikasi-capa',
    component: () => import('@/components/backend/nod/verifikasi-capa-nod/form')
  },{
    path: 'form-correction-verifikasi-capa',
    name: 'nod/form-correction-verifikasi-capa',
    component: () => import('@/components/backend/nod/verifikasi-capa-nod/correctionform')
  }]
}]
