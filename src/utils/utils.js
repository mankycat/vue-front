import {getRequest} from './api'
import {Message} from 'element-ui'

export const isNotNullORBlank = (...args) => {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i]
    if (argument == null || argument === '' || argument === undefined) {
      Message.warning({message: '数据不能为空!'})
      return false
    }
  }
  return true
}
export const initMemberList = (store) => {
  // 应该要能判断数据是否有更新?
  var isHighPriest = false
  var auth = store.state.user.authorities
  if (store.state.user !== undefined && auth !== [] && auth !== undefined) {
    for (var i in auth) {
      if (auth[i].authority === '区牧') {
        store.commit('initRolename', '区牧')
        initAreas(store)
        initTeams(store)
        isHighPriest = true
        return
      }
    }
  }
  if (store.state.user !== undefined && !isHighPriest &&
    auth !== [] && auth !== undefined) {
    for (var j in auth) {
      if (auth[j].authority === '区长') {
        store.commit('initRolename', '区长')
        initTeams(store)
        return
      }
    }
  }

  if (store.state.members === [] ||
    store.state.members === undefined || store.state.members === null) {
    getRequest('/user/getMembers').then(resp => {
      if (resp && resp.status === 200 && resp.data.status === 'success') {
        store.commit('initMemberList', resp.data.data)
        store.commit('setCTeam', store.state.user.groupid)
      }
    })
  }
}

function initAreas (store) {
  if (store.state.areas === [] || store.state.areas === undefined) {
    console.log('doInit Areas')
    getRequest('/org/getChildAreas').then(resp => {
      if (resp && resp.status === 200 && resp.data.status === 'success') {
        store.commit('initAreas', resp.data.data)
      }
    })
  }
}

function initTeams (store) {
  if (store.state.teams === [] || store.state.teams === undefined) {
    console.log('doInit Teams')
    getRequest('/org/getChildTeams').then(resp => {
      if (resp && resp.status === 200 && resp.data.status === 'success') {
        store.commit('initTeams', resp.data.data)
      }
    })
  }
}
