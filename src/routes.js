import Login from './Login'
import Reset from './Reset'
import Imprint from './Imprint'
import Privacy from './Privacy'
import Profile from './Profile'
import PageNotFound from './internal/PageNotFound'
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
    path: '/imprint',
    name: 'imprint',
    component: Imprint
  },
  {
    path: '/privacy-policy',
    name: 'privacy',
    component: Privacy
    
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
    
  },
  { path: '*', name:'notfound', component: PageNotFound }
])
