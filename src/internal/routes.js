import Login from '../components/login/Login'
import Reset from '../components/reset/Reset'
import Imprint from '../components/imprint/Imprint'
import Privacy from '../components/privacy/Privacy'
import Profile from '../components/profile/Profile'
import PageNotFound from './PageNotFound'

export function setRoutes (router) {
  router.addRoutes([
    {
      path: '/login',
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
    {
      path: '*',
      name: 'notfound',
      component: PageNotFound
    }
  ])
  router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/reset', '/imprint', '/privacy']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = window.localStorage.getItem('user')

    if (authRequired && !loggedIn) {
      return next('/login')
    }
    next()
  })
}
