import Layout2 from '@/layout/Layout2'

export default [{
  path: '/RoleAdmin/noe',
  component: Layout2,
  meta: { middlewareAuth: true },
  children: [{
    path: 'data-noe-report',
  	name: 'noe/data-noe-report',
    component: () => import('@/components/backend/noe/noe-report/index')
  },{
    path: 'form-noe-report',
    name: 'noe/form-noe-report',
    component: () => import('@/components/backend/noe/noe-report/form')
  },{
    path: 'show-noe-report',
    name: 'noe/show-noe-report',
    component: () => import('@/components/backend/noe/noe-report/form')
  },{
    path: 'data-noe-verification',
    name: 'noe/data-noe-verification',
    component: () => import('@/components/backend/noe/noe-verification/index')
  },{
    path: 'form-noe-verification',
    name: 'noe/form-noe-verification',
    component: () => import('@/components/backend/noe/noe-verification/form')
  },{
    path: 'show-noe-verification',
    name: 'noe/show-noe-verification',
    component: () => import('@/components/backend/noe/noe-verification/form')
  },{
    path: 'data-noe-evaluation',
    name: 'noe/data-noe-evaluation',
    component: () => import('@/components/backend/noe/noe-evaluation/index')
  },{
    path: 'show-noe-evaluation',
    name: 'noe/show-noe-evaluation',
    component: () => import('@/components/backend/noe/noe-evaluation/form')
  },{
    path: 'form-noe-evaluation',
    name: 'noe/form-noe-evaluation',
    component: () => import('@/components/backend/noe/noe-evaluation/form')
  },{
    path: 'data-correction-noe-report',
    name: 'noe/data-correction-noe-report',
    component: () => import('@/components/backend/noe/correction-noe-report/index')
  },{
    path: 'data-correction-noe-verification',
    name: 'noe/data-correction-noe-verification',
    component: () => import('@/components/backend/noe/correction-noe-verification/index')
  },{
    path: 'form-correction-noe-verification',
    name: 'noe/form-correction-noe-verification',
    component: () => import('@/components/backend/noe/correction-noe-verification/form')
  },{
    path: 'data-correction-noe-evaluation',
    name: 'noe/data-correction-noe-evaluation',
    component: () => import('@/components/backend/noe/correction-noe-evaluation/index')
  },{
    path: 'form-correction-noe-evaluation',
    name: 'noe/form-correction-noe-evaluation',
    component: () => import('@/components/backend/noe/correction-noe-evaluation/form')
  }]
}]
