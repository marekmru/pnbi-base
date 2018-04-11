import Login from './Login'
import Reset from './Reset'
import Forbidden from './Forbidden'
import ForbiPageNotFounddden from './PageNotFound'
import router from '@/router'

router.addRoutes([
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/reset/:code',
    name: 'reset',
    component: Reset
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: Forbidden
  },
  { path: '*', name:'notfound', component: PageNotFound }
])
