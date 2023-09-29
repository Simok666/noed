import Layout2 from '@/layout/Layout2'

export default [{
  path: '/RoleAdmin/master',
  component: Layout2,
  meta: { middlewareAuth: true },
  children: [{
    path: 'data-district',
  	name: 'master/data-district',
    component: () => import('@/components/backend/master/district/index')
  },{
    path: 'form-district',
    name: 'master/form-district',
    component: () => import('@/components/backend/master/district/form')
  },{
    path: 'show-district',
    name: 'master/show-district',
    component: () => import('@/components/backend/master/district/show')
  },{
    path: 'data-pos-code',
    name: 'master/data-pos-code',
    component: () => import('@/components/backend/master/pos-code/index')
  },{
    path: 'form-pos-code',
    name: 'master/form-pos-code',
    component: () => import('@/components/backend/master/pos-code/form')
  },{
    path: 'show-pos-code',
    name: 'master/show-pos-code',
    component: () => import('@/components/backend/master/pos-code/show')
  },{
    path: 'data-city',
    name: 'master/data-city',
    component: () => import('@/components/backend/master/city/index')
  },{
    path: 'form-city',
    name: 'master/form-city',
    component: () => import('@/components/backend/master/city/form')
  },{
    path: 'show-city',
    name: 'master/show-city',
    component: () => import('@/components/backend/master/city/show')
  },{
    path: 'data-province',
    name: 'master/data-province',
    component: () => import('@/components/backend/master/province/index')
  },{
    path: 'form-province',
    name: 'master/form-province',
    component: () => import('@/components/backend/master/province/form')
  },{
    path: 'show-province',
    name: 'master/show-province',
    component: () => import('@/components/backend/master/province/show')
  },{
    path: 'data-country',
    name: 'master/data-country',
    component: () => import('@/components/backend/master/country/index')
  },{
    path: 'form-country',
    name: 'master/form-country',
    component: () => import('@/components/backend/master/country/form')
  },{
    path: 'show-country',
    name: 'master/show-country',
    component: () => import('@/components/backend/master/country/show')
  },{
    path: 'data-division',
    name: 'master/data-division',
    component: () => import('@/components/backend/master/division/index')
  },{
    path: 'form-division',
    name: 'master/form-division',
    component: () => import('@/components/backend/master/division/form')
  },{
    path: 'show-division',
    name: 'master/show-division',
    component: () => import('@/components/backend/master/division/show')
  },{
    path: 'data-department',
    name: 'master/data-department',
    component: () => import('@/components/backend/master/department/index')
  },{
    path: 'form-department',
    name: 'master/form-department',
    component: () => import('@/components/backend/master/department/form')
  },{
    path: 'show-department',
    name: 'master/show-department',
    component: () => import('@/components/backend/master/department/show')
  },{
    path: 'data-position',
    name: 'master/data-position',
    component: () => import('@/components/backend/master/position/index')
  },{
    path: 'form-position',
    name: 'master/form-position',
    component: () => import('@/components/backend/master/position/form')
  },{
    path: 'data-user-employee',
    name: 'master/data-user-employee',
    component: () => import('@/components/backend/master/user-employee/index')
  },{
    path: 'form-user-employee',
    name: 'master/form-user-employee',
    component: () => import('@/components/backend/master/user-employee/form')
  },{
    path: 'show-user-employee',
    name: 'master/show-user-employee',
    component: () => import('@/components/backend/master/user-employee/show')
  },{
    path: 'data-user-access',
    name: 'master/data-user-access',
    component: () => import('@/components/backend/master/user-access/index')
  },{
    path: 'form-user-access',
    name: 'master/form-user-access',
    component: () => import('@/components/backend/master/user-access/form')
  },{
    path: 'show-user-access',
    name: 'master/show-user-access',
    component: () => import('@/components/backend/master/user-access/show')
  },{
    path: 'data-deviation',
    name: 'master/data-deviation',
    component: () => import('@/components/backend/master/deviation/index')
  },{
    path: 'form-deviation',
    name: 'master/form-deviation',
    component: () => import('@/components/backend/master/deviation/form')
  },{
    path: 'show-deviation',
    name: 'master/show-deviation',
    component: () => import('@/components/backend/master/deviation/show')
  },{
    path: 'data-event-incident',
    name: 'master/data-event-incident',
    component: () => import('@/components/backend/master/event-incident/index')
  },{
    path: 'form-event-incident',
    name: 'master/form-event-incident',
    component: () => import('@/components/backend/master/event-incident/form')
  },{
    path: 'show-event-incident',
    name: 'master/show-event-incident',
    component: () => import('@/components/backend/master/event-incident/show')
  },{
    path: 'data-deviation-risk',
    name: 'master/data-deviation-risk',
    component: () => import('@/components/backend/master/deviation-risk/index')
  },{
    path: 'form-deviation-risk',
    name: 'master/form-deviation-risk',
    component: () => import('@/components/backend/master/deviation-risk/form')
  },{
    path: 'show-deviation-risk',
    name: 'master/show-deviation-risk',
    component: () => import('@/components/backend/master/deviation-risk/show')
  },{
    path: 'data-other-system',
    name: 'master/data-other-system',
    component: () => import('@/components/backend/master/other-system/index')
  },{
    path: 'form-other-system',
    name: 'master/form-other-system',
    component: () => import('@/components/backend/master/other-system/form')
  },{
    path: 'show-other-system',
    name: 'master/show-other-system',
    component: () => import('@/components/backend/master/other-system/show')
  },{
    path: 'data-deviation-level',
    name: 'master/data-deviation-level',
    component: () => import('@/components/backend/master/deviation-level/index')
  },{
    path: 'form-deviation-level',
    name: 'master/form-deviation-level',
    component: () => import('@/components/backend/master/deviation-level/form')
  },{
    path: 'show-deviation-level',
    name: 'master/show-deviation-level',
    component: () => import('@/components/backend/master/deviation-level/show')
  },{
    path: 'data-product',
    name: 'master/data-product',
    component: () => import('@/components/backend/master/product/index')
  },{
    path: 'form-product',
    name: 'master/form-product',
    component: () => import('@/components/backend/master/product/form')
  },{
    path: 'show-product',
    name: 'master/show-product',
    component: () => import('@/components/backend/master/product/show')
  },{
    path: 'data-unit-location',
    name: 'master/data-unit-location',
    component: () => import('@/components/backend/master/unit-location/index')
  },{
    path: 'form-unit-location',
    name: 'master/form-unit-location',
    component: () => import('@/components/backend/master/unit-location/form')
  },{
    path: 'show-unit-location',
    name: 'master/show-unit-location',
    component: () => import('@/components/backend/master/unit-location/show')
  },{
    path: 'data-caretaker',
    name: 'master/data-caretaker',
    component: () => import('@/components/backend/master/caretaker/index')
  },{
    path: 'form-caretaker',
    name: 'master/form-caretaker',
    component: () => import('@/components/backend/master/caretaker/form')
  },{
    path: 'data-setting-header',
    name: 'master/data-setting-header',
    component: () => import('@/components/backend/master/setting-header/index')
  },{
    path: 'form-setting-header',
    name: 'master/form-setting-header',
    component: () => import('@/components/backend/master/setting-header/form')
  },{
    path: 'data-day-off',
    name: 'master/data-day-off',
    component: () => import('@/components/backend/master/day-off/index')
  },{
    path: 'datatable-day-off',
    name: 'master/datatable-day-off',
    component: () => import('@/components/backend/master/day-off/show')
  },{
    path: 'form-day-off',
    name: 'master/form-day-off',
    component: () => import('@/components/backend/master/day-off/form')
  },{
    path: 'form-day-off-edit',
    name: 'master/form-day-off-edit',
    component: () => import('@/components/backend/master/day-off/form-libur')
  },{
    path: 'data-chat-status',
    name: 'master/data-chat-status',
    component: () => import('@/components/backend/master/chat-status/index')
  },{
    path: 'datatable-chat-status',
    name: 'master/datatable-chat-status',
    component: () => import('@/components/backend/master/chat-status/show')
  },{
    path: 'form-chat-status',
    name: 'master/form-chat-status',
    component: () => import('@/components/backend/master/chat-status/form')
  }]
}]
