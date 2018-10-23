<template>
  <el-table
    :data="tableData"
    border
    @row-click="rowClick"
    style="width: 100%">
    <el-table-column
      prop="reportname"
      min-width="120"
      label="">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ReportListModify',
  data () {
    return {
      tableData: [{
        reportname: 'ccc-20180622'
      }, {
        reportname: 'ddd-20180622'
      }]
    }
  },
  methods: {
    rowClick: function (row, event, column) {
      console.log(row.reportname)
    }
  }
}
</script>

<style scoped>

</style>
