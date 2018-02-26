import Vue from 'vue'
import Router from 'vue-router'
import Overview from '@/router/Overview'
import Project from '@/router/Project'
import Create from '@/router/Create'
import TargetGroups from '@/router/TargetGroups'
import TargetGroup from '@/router/TargetGroup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/overview',
      name: 'overview',
      component: Overview
    },
    {
      path: '/targetGroup/:id/:tid',
      name: 'targetGroup',
      component: TargetGroup
    },
    {
      path: '/project/:id',
      name: 'project',
      component: Project,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'create',
          path: 'create',
          component: Create
        },
        {
          name: 'targetGroups',
          path: 'targetGroups',
          component: TargetGroups
        }
      ]
    }
  ]
})
