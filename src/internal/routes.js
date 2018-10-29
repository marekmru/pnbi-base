import Login from '../components/login/Login'
import Reset from '../components/reset/Reset'
import Imprint from '../components/imprint/Imprint'
import Privacy from '../components/privacy/Privacy'
import Profile from '../components/profile/Profile'
import PageNotFound from './PageNotFound'
import bus, { TRACK } from '../event-bus'

export function setRoutes (router) {
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
    {
      path: '*',
      name: 'notfound',
      component: PageNotFound
    }
  ])
  const enabler = (a, b, c, d) => {
    b = document
    c = 'script'
    d = b.createElement(c)
    d.src = a
    d.type = 'text/java' + c
    d.async = true
    a = b.getElementsByTagName(c)[0]
    a.parentNode.insertBefore(d, a)
  }

  if (window.location.href.includes('localhost') === false) {
    // tealium
    window.utag_cfg_ovrd = window.utag_cfg_ovrd || {}
    window.utag_cfg_ovrd.noview = true
    window.utag_data = window.utag_data || {}
    enabler('//tags.tiqcdn.com/utag/plan-net-training/b.zimmermann/dev/utag.js')
    // ganalytics
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', 'UA-122079364-1')
    enabler('//www.googletagmanager.com/gtag/js?id=UA-122079364-1')

    const resolve = () => {
      let int = null
      return new Promise(resolve => {
        if (window.utag != null) {
          resolve()
        } else {
          int = window.setInterval(() => {
            // hmmm...
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
          tealium_event: 'page_view',
          page_name: pageName
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
}
