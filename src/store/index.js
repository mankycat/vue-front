import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: window.localStorage.getItem('user') == null ? undefined : JSON.parse(window.localStorage.getItem('user')),
    members: undefined,
    cTeam: '',
    cArea: '',
    rolename: window.localStorage.getItem('rolename') == null ? undefined : JSON.parse(window.localStorage.getItem('rolename')),
    areas: window.localStorage.getItem('areas') == null ? undefined : JSON.parse(window.localStorage.getItem('areas')),
    teams: window.localStorage.getItem('teams') == null ? undefined : JSON.parse(window.localStorage.getItem('teams')),
    reports: undefined
  },
  mutations: {
    login (state, payload) {
      state.user = payload
      window.localStorage.setItem('user', JSON.stringify(payload))
    },
    logout (state) {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('rolename')
      window.localStorage.removeItem('areas')
      window.localStorage.removeItem('teams')
      state.user = undefined
      state.members = undefined
      state.areas = undefined
      state.teams = undefined
      state.cTeam = ''
      state.cArea = ''
      state.reports = ''
    },
    initMemberList (state, payload) {
      state.members = payload
    },
    initReportList (state, payload) {
      state.reports = payload
    },
    initAreas (state, payload) {
      state.areas = payload
      window.localStorage.setItem('areas', JSON.stringify(payload))
    },
    initTeams (state, payload) {
      state.teams = payload
      window.localStorage.setItem('teams', JSON.stringify(payload))
    },
    initRolename (state, payload) {
      state.rolename = payload
      window.localStorage.setItem('rolename', JSON.stringify(payload))
    },
    setCTeam (state, payload) {
      state.cTeam = payload
    },
    setCArea (state, payload) {
      state.cArea = payload
    }
  },
  actions: {
    login (context, payload) {
      context.commit('login', payload)
    },
    logout (context) {
      context.commit('logout')
    }
  }
})

export default store
