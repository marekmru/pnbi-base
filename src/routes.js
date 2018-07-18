import Login from './Login'
import Reset from './Reset'
import Imprint from './Imprint'
import Privacy from './Privacy'
import Profile from './Profile'
import PageNotFound from './internal/PageNotFound'
import router from '@/router'
import bus, { TRACK } from 'pnbi-base/src/event-bus'

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
  { path: '*', name: 'notfound', component: PageNotFound }
])

const tealiumEnabler = (a, b, c, d) => {
  a = '//tags.tiqcdn.com/utag/plan-net-training/b.zimmermann/dev/utag.js'
  b = document
  c = 'script'
  d = b.createElement(c)
  d.src = a; d.type = 'text/java' + c
  d.async = true
  a = b.getElementsByTagName(c)[0]
  a.parentNode.insertBefore(d, a)
}
if (window.location.href.includes('localhost') === false) {
  window.utag_cfg_ovrd = window.utag_cfg_ovrd || {}
  window.utag_cfg_ovrd.noview = true
  window.utag_data = window.utag_data || {}
  tealiumEnabler()

  const resolve = () => {
    let int = null
    return new Promise(resolve => {
      if (window.utag != null) {
        resolve()
      } else {
        int = window.setInterval(() => { // hmmm...
          if (window.utag != null) {
            window.clearInterval(int)
            resolve()
          }
        }, 10)
      }
    })
  }
  router.beforeEach((to, from, next) => {
    resolve().then(() => {
      const pageName = to.meta != null ? to.meta.title : 'No page name'
      bus.$emit(TRACK, {
        'tealium_event': 'page_view',
        'page_name': pageName
      })
      if (from.name === 'login' && to.name !== 'reset') {
        bus.$emit(TRACK, {
          tealium_event: 'user_login'
        })
      }
      next()
    })
  })
}
