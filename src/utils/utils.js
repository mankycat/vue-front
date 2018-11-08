import {getRequest} from './api'
import {Message} from 'element-ui'
import xmlToJson from 'xml-to-json-promise'

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

export const initReportList = (groupId, store) => {
  console.log('init reportlist')
  var datas = '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<string xmlns="http://tempuri.org/">[{"StringID":"长青组-2018-03-04","StringText":"长青组"},{"StringID":"长青组-2018-03-11","StringText":"长青组"},{"StringID":"长青组-2018-03-18","StringText":"长青组"},{"StringID":"长青组-2018-03-25","StringText":"长青组"},{"StringID":"长青组-2018-04-01","StringText":"长青组"},{"StringID":"长青组-2018-04-08","StringText":"长青组"},{"StringID":"长青组-2018-04-15","StringText":"长青组"},{"StringID":"长青组-2018-04-22","StringText":"长青组"},{"StringID":"长青组-2018-04-29","StringText":"长青组"},{"StringID":"长青组-2018-05-06","StringText":"长青组"},{"StringID":"长青组-2018-05-13","StringText":"长青组"},{"StringID":"长青组-2018-05-20","StringText":"长青组"},{"StringID":"长青组-2018-05-27","StringText":"长青组"},{"StringID":"长青组-2018-06-03","StringText":"长青组"},{"StringID":"长青组-2018-06-10","StringText":"长青组"},{"StringID":"长青组-2018-06-17","StringText":"长青组"},{"StringID":"长青组-2018-06-24","StringText":"长青组"},{"StringID":"长青组-2018-07-01","StringText":"长青组"},{"StringID":"长青组-2018-07-08","StringText":"长青组"},{"StringID":"长青组-2018-07-15","StringText":"长青组"},{"StringID":"长青组-2018-07-22","StringText":"长青组"},{"StringID":"长青组-2018-07-29","StringText":"长青组"},{"StringID":"长青组-2018-08-05","StringText":"长青组"},{"StringID":"长青组-2018-08-12","StringText":"长青组"},{"StringID":"长青组-2018-08-19","StringText":"长青组"},{"StringID":"长青组-2018-08-26","StringText":"长青组"},{"StringID":"长青组-2018-09-02","StringText":"长青组"},{"StringID":"长青组-2018-09-09","StringText":"长青组"},{"StringID":"长青组-2018-09-16","StringText":"长青组"},{"StringID":"长青组-2018-09-23","StringText":"长青组"},{"StringID":"长青组-2018-09-30","StringText":"长青组"},{"StringID":"长青组-2018-10-07","StringText":"长青组"},{"StringID":"长青组-2018-10-14","StringText":"长青组"},{"StringID":"长青组-2018-10-21","StringText":"长青组"},{"StringID":"长青组-2018-10-28","StringText":"长青组"},{"StringID":"长青组-2018-11-04","StringText":"长青组"}]</string>'
  xmlToJson.xmlDataToJSON(datas).then(json => {
    store.commit('initReportList', JSON.parse(json.string._))
  })
  // postRequest('http://192.168.1.102:8080/WebServiceReport.asmx/SelectNOWeekReport', {
  //   GroupId: groupId
  // }).then(resp => {
  //   console.log(resp)
  // })
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
