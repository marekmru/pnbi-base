import projects from '@/api/projects'
import helper from '@/pnbi-base/helper'
import is from 'is'
import config from '@/api/config'
import { tranformInConfig } from '@/store/helper'
const tgNew = {
  meta: {
    title: '',
    type: 'F',
    id: -1,
    description: null
  }
}
let configBackup = null
const current = {
  data: {
    public: false,
    protected: false,
    meta: {
      client: 'Nicht spezifiziert',
      campaignType: 'Nicht spezifiziert',
      description: '',
      campaign: null
    },
    goals: {
      kpi: null
    },
    targetGroups: [],
    mediaChannels: [],
    dateRange: {},
    validation: {
      meta: false,
      goals: false,
      targetGroups: false,
      mediaChannels: false,
      dateRange: false
    },
    result: {}
  }
}
const state = {
  config: {},
  all: [],
  current: {
    data: current.data,
    validation: {
      mediaChannels: false,
      dateRange: false,
      meta: false,
      goals: false,
      targetGroups: false
    }
  }
}

const actions = {
  $persist ({ commit, state }) {
    projects.put(state.current).then(() => {})
  },
  loadConfig ({ commit }) {
    config.getConfig().then(config => {
      commit('set_config', config)
    })
  },
  resetConfig ({ commit }) {
    commit('reset_config')
  },

  disableTGChar ({ commit }, payload) {
    commit('disable_tgchar', payload)
  },
  setTgChar ({ commit }, payload) {
    commit('set_tgchar_persist', payload)
  },

  getAllProjects ({ commit }) {
    projects.getAll().then(projects => {
      commit('recieve_projects', projects)
    })
  },
  deleteProject ({ commit }, pid) {
    projects.delete(pid).then(() => {
      commit('delete_project_persist', pid)
    })
  },
  duplicateProject ({ commit }, pid) {
    projects.duplicate(pid).then(project => {
      commit('duplicate_project', project)
    })
  },
  create ({ commit }, label) {
    // TODO: wrong use ?????
    const project = JSON.parse(JSON.stringify(current))
    project.data.meta.campaign = label
    projects.post(project).then(project => {
      commit('create_project', project)
    })
  },
  togglePublic ({ commit }, id) {
    projects.togglePublic(id).then(project => {
      commit('toggle_project_public', project)
    })
  },
  getProject ({ commit }, pid) {
    projects.getById(pid).then(project => {
      commit('create_project', project)
    })
  },
  /// /////////////////////////
  /// /////////////////////////
  /// /////////////////////////
  setFocusGroup ({ commit }, tid) {
    commit('set_focus_group_persist', tid)
  },
  setCompGroup ({ commit }, tg) {
    commit('set_comp_group_persist', tg)
  },
  duplicateTargetGroup ({ commit }, tg) {
    commit('duplicate_tgroup_persist', tg)
  },
  deleteTargetGroup ({ commit }, tid) {
    commit('delete_tgroup', tid)
    window.setTimeout(() => commit('set_deleted_focus_group_persist'), 100)
  },
  createTargetGroup ({ commit }) {
    commit('duplicate_tgroup_persist')
  }
}

const mutations = {
  set_config (state, config) {
    configBackup = tranformInConfig(config)
    state.config = helper.clone(configBackup)
  },
  reset_config (state) {
    if (is.null(configBackup)) {
      return
    }
    state.config = helper.clone(configBackup)
  },

  disable_tgchar (state, payload) {
    state.config.targetGroupVariablesMod.find(
      val => val.Pseudo_Variable_Name === payload.disable
    ).disabled = true

    if (is.defined(payload.enable)) {
      state.config.targetGroupVariablesMod.find(
        val => val.Pseudo_Variable_Name === payload.enable
      ).disabled = false
    }
  },
  set_tgchar_persist (state, payload) {
    /* eslint-disable  */
    const tg = state.current.data.targetGroups.find(
      val => val.meta.id === payload.tid
    );
    const pseudoVariableName = payload.Pseudo_Variable_Name;
    const elems = state.config.targetGroupVariablesFlat.filter(
      val => val.Pseudo_Variable_Name === pseudoVariableName
    );
    //const isPseudoMultiSelect = elems[0].Auswahltyp === 'Pseudo-Mehrfach-Auswahl'
    /*     if(is.array(payload.value) === false){
      payload.value = [payload.value] 
    } */
    const variableName = elems[0].Variable_Name;
    const type = elems[0].Auswahltyp;

    switch (type) {
      case "Pseudo-Mehrfach-Auswahl":
        break;
      case "Multiple Choice":
        break;
      case "Single Choice":
        Object.assign(tg[elems[0].group], { [variableName]: payload.value });
        break;
      case "Range (von ... bis ...)":
        break;

      default:
        break;
    }

    /* eslint-enable  */
  },
  recieve_projects (state, projects) {
    state.all = projects
  },
  delete_project (state, pid) {
    const oldProject = state.all.find(proj => proj._id === pid)
    const index = state.all.indexOf(oldProject)
    if (index > -1) {
      state.all.splice(index, 1)
    }
  },
  duplicate_project (state, project) {
    state.all.push(project)
  },
  create_project (state, project) {
    state.current = project
  },
  toggle_project_public (state, project) {
    const oldProject = state.all.find(proj => proj._id === project._id)
    oldProject.data.public = project.data.public
  },
  set_comp_group_persist (state, tgChanged) {
    const clone = helper.clone(state.current)
    clone.data.targetGroups = clone.data.targetGroups.map((tg, index) => {
      if (tg.meta.id === tgChanged.meta.id) {
        tg.meta.type = tgChanged.meta.type
      }
      return tg
    })
    state.current.data.targetGroups = clone.data.targetGroups
  },
  set_deleted_focus_group_persist (state) {
    const isFocusGroupSet = state.current.data.targetGroups.find(
      val => val.meta.type === 'F'
    )

    if (is.undefined(isFocusGroupSet) && state.current.data.targetGroups) {
      state.current.data.targetGroups[0].meta.type = 'F'
    }
  },
  set_focus_group_persist (state, tid) {
    const clone = helper.clone(state.current)
    clone.data.targetGroups = clone.data.targetGroups.map(tg => {
      if (tg.meta.type === 'F') {
        tg.meta.type = 'NA'
      }
      if (tg.meta.id === tid) {
        tg.meta.type = 'F'
      }
      return tg
    })
    state.current.data.targetGroups = clone.data.targetGroups
  },
  duplicate_tgroup_persist (state, tg = tgNew) {
    const clone = helper.clone(state.current)
    const tgClone = helper.clone(tg)
    tgClone.meta.title = `${tgClone.meta.title
      .replace(/\(Clone\)/g, '')
      .replace(/\(Clone [a-z0-9]*\)/g, '')} (Clone ${Math.random()
      .toString(36)
      .substr(2, 9)})`
    if (tgClone.meta.title.indexOf('(Clone') === 0) {
      tgClone.meta.title = `Zielgruppe ${tgClone.meta.title}`
    }

    if (tgClone.meta.type === 'C') {
      const count = clone.data.targetGroups.filter(
        val => val.meta.type === 'C'
      )
      if (count > 2) {
        tgClone.meta.type = 'NA'
      }
    } else {
      tgClone.meta.type = 'NA'
    }
    tgClone.meta.id = new Date().getTime()
    if (is.undefined(tgClone.potential)) {
      tgClone.potential = {
        count: 0,
        percent: 0
      }
    }
    clone.data.targetGroups.push(tgClone)
    state.current.data.targetGroups.push(tgClone)
  },
  delete_tgroup (state, tid) {
    state.current.data.targetGroups = state.current.data.targetGroups.filter(
      val => val.meta.id !== tid
    )
  },
  delete_tgroup_persist (state, tid) {
    state.current.data.targetGroups = state.current.data.targetGroups.filter(
      val => val.meta.id !== tid
    )
  }
}

const getters = {
  projects (state) {
    return state.all
  },
  project (state) {
    return state.current
  },
  targetGroups (state) {
    return state.current.data.targetGroups
  },
  targetGroupById: state => id => {
    const tg = state.current.data.targetGroups.find(tg => (tg.meta.id = id))
    return tg
  },
  config: state => field => {
    try {
      return state.config[field]
    } catch (err) {}
    return null
  },
  targetGroupVariablesMod (state) {
    return state.config.targetGroupVariablesMod
  },
  validation (state) {
    try {
      return state.current.data.validation
    } catch (err) {}
    return null
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
