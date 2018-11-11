<template>
  <el-table
    :data="tableData"
    border
    @row-click="rowClick"
    style="width: 100%">
    <el-table-column
      prop="ReportName"
      min-width="120"
      label="">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ReportListModify',
  methods: {
    rowClick: function (row, event, column) {
      console.log(row.ReportName)
      this.$router.push({name: 'ReportInfo',
        params: {isEdit: true,
          reportName: row.ReportName,
          reportId: row.ID,
          isParty: row.IsParty,
          isSunday: row.IsSunday,
          reportDate: row.WeekReportDate,
          createUserId: row.CreateUserID
        }})
    }
  },
  computed: {
    tableData () {
      return this.$store.state.reportedit
    }
  },
  mounted: function () {
    console.log('reportlist modify')
  }
}
</script>

<style scoped>

</style>
