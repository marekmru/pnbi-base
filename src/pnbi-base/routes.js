import Login from './Login'
import Reset from './Reset'
import Simulate from './Simulate'
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
    path: '/simulate',
    name: 'simulation',
    component: Simulate
  }
])
