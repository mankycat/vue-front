import {getRequest, postRequest} from './api'
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
  // var datas = '<?xml version="1.0" encoding="utf-8"?>\n' +
  //   '<string xmlns="http://tempuri.org/">[{"StringID":"长青组-2018-03-04","StringText":"长青组"},{"StringID":"长青组-2018-03-11","StringText":"长青组"},{"StringID":"长青组-2018-03-18","StringText":"长青组"},{"StringID":"长青组-2018-03-25","StringText":"长青组"},{"StringID":"长青组-2018-04-01","StringText":"长青组"},{"StringID":"长青组-2018-04-08","StringText":"长青组"},{"StringID":"长青组-2018-04-15","StringText":"长青组"},{"StringID":"长青组-2018-04-22","StringText":"长青组"},{"StringID":"长青组-2018-04-29","StringText":"长青组"},{"StringID":"长青组-2018-05-06","StringText":"长青组"},{"StringID":"长青组-2018-05-13","StringText":"长青组"},{"StringID":"长青组-2018-05-20","StringText":"长青组"},{"StringID":"长青组-2018-05-27","StringText":"长青组"},{"StringID":"长青组-2018-06-03","StringText":"长青组"},{"StringID":"长青组-2018-06-10","StringText":"长青组"},{"StringID":"长青组-2018-06-17","StringText":"长青组"},{"StringID":"长青组-2018-06-24","StringText":"长青组"},{"StringID":"长青组-2018-07-01","StringText":"长青组"},{"StringID":"长青组-2018-07-08","StringText":"长青组"},{"StringID":"长青组-2018-07-15","StringText":"长青组"},{"StringID":"长青组-2018-07-22","StringText":"长青组"},{"StringID":"长青组-2018-07-29","StringText":"长青组"},{"StringID":"长青组-2018-08-05","StringText":"长青组"},{"StringID":"长青组-2018-08-12","StringText":"长青组"},{"StringID":"长青组-2018-08-19","StringText":"长青组"},{"StringID":"长青组-2018-08-26","StringText":"长青组"},{"StringID":"长青组-2018-09-02","StringText":"长青组"},{"StringID":"长青组-2018-09-09","StringText":"长青组"},{"StringID":"长青组-2018-09-16","StringText":"长青组"},{"StringID":"长青组-2018-09-23","StringText":"长青组"},{"StringID":"长青组-2018-09-30","StringText":"长青组"},{"StringID":"长青组-2018-10-07","StringText":"长青组"},{"StringID":"长青组-2018-10-14","StringText":"长青组"},{"StringID":"长青组-2018-10-21","StringText":"长青组"},{"StringID":"长青组-2018-10-28","StringText":"长青组"},{"StringID":"长青组-2018-11-04","StringText":"长青组"}]</string>'
  // xmlToJson.xmlDataToJSON(datas).then(json => {
  //   store.commit('initReportList', JSON.parse(json.string._))
  // })
  postRequest('http://192.168.1.102:8080/WebServiceReport.asmx/SelectNOWeekReport', {
    GroupId: groupId
  }).then(resp => {
    if (resp && resp.status === 200) {
      xmlToJson.xmlDataToJSON(resp.data).then(json => {
        store.commit('initReportList', JSON.parse(json.string._))
      })
      console.log(resp.data)
    }
  })
}

export const initReportListEdit = (groupId, store) => {
  // var datas = '<?xml version="1.0" encoding="utf-8"?>\n' +
  //   '<string xmlns="http://tempuri.org/">[{"ID":"0c6ffc5a-6c4b-4408-b095-1bb206848680","ReportName":"长青组-2018-10-14","WeekReportDate":"2018-10-14 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-10-18 10:09:14","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"d53fc931-d5e2-424b-ab48-d3beb73e1553","ReportName":"长青组-2018-10-07","WeekReportDate":"2018-10-07 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-10-18 10:08:29","IsParty":0,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"25cb7a38-5e32-4355-a95e-6450740a417f","ReportName":"长青组-2018-09-30","WeekReportDate":"2018-09-30 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-10-18 10:06:40","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"2bbd4071-feb1-460b-9067-b5ffd959f33d","ReportName":"长青组-2018-09-23","WeekReportDate":"2018-09-23 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-28 15:35:55","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"79cb6733-663a-423f-9a80-c2ac14a3b460","ReportName":"长青组-2018-09-16","WeekReportDate":"2018-09-16 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-17 10:49:06","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"f9caf232-4f68-4db3-9492-56ad45e862f8","ReportName":"长青组-2018-09-09","WeekReportDate":"2018-09-09 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-13 14:27:25","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"14a78d09-d501-447c-a5b8-84d142f0ff2a","ReportName":"长青组-2018-09-02","WeekReportDate":"2018-09-02 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-13 14:22:41","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"e9a12ba8-9348-4d1f-bea6-54ddebc57345","ReportName":"长青组-2018-08-26","WeekReportDate":"2018-08-26 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-13 14:29:23","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"e8d50c30-d955-439b-bba6-d149cab7913e","ReportName":"长青组-2018-08-19","WeekReportDate":"2018-08-19 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-13 14:28:28","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"2756ff5b-0b76-4ccb-a6aa-10f2a2104eb7","ReportName":"长青组-2018-08-12","WeekReportDate":"2018-08-12 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-13 14:30:13","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"febb66c9-5235-451f-9d04-91ab8d825c7c","ReportName":"长青组-2018-08-05","WeekReportDate":"2018-08-05 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-13 14:31:01","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"e02663ea-4059-46c9-8f83-790ea996e627","ReportName":"长青组-2018-07-29","WeekReportDate":"2018-07-29 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-13 14:31:42","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"6f470eb8-e497-457e-bd9b-cc1c6acd5242","ReportName":"长青组-2018-07-22","WeekReportDate":"2018-07-22 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-13 14:32:19","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"2dd66378-1c37-46a2-9ae4-13c4af85273d","ReportName":"长青组-2018-07-15","WeekReportDate":"2018-07-15 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-13 14:33:00","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"0354f12e-1de2-49c7-9bc3-0fb683dca871","ReportName":"长青组-2018-07-08","WeekReportDate":"2018-07-08 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-13 14:33:36","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null},{"ID":"ac358042-6d40-4dff-9e24-1e2f31691998","ReportName":"长青组-2018-07-01","WeekReportDate":"2018-07-01 00:00:00","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","CreateUserID":"LC2015120004","CreateDate":"2018-09-13 14:34:18","IsParty":1,"IsSunday":1,"Description":null,"OrganizationName":"长青组","ParentOrganizationName":null,"GrandFatherName":null,"UserName":null}]</string>'
  // xmlToJson.xmlDataToJSON(datas).then(json => {
  //   store.commit('initReportListEdit', JSON.parse(json.string._))
  // })
  postRequest('http://192.168.1.102:8080/WebServiceReport.asmx/SelectWeekReportByMonth', {
    OrganizationID: groupId
  }).then(resp => {
    if (resp && resp.status === 200) {
      xmlToJson.xmlDataToJSON(resp.data).then(json => {
        store.commit('initReportListEdit', JSON.parse(json.string._))
      })
      console.log(resp.data)
    }
    console.log(resp.data)
  })
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
