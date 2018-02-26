import Login from './Login'
import Reset from './Reset'
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
  }
])
