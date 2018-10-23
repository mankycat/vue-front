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
  name: 'ReportList',
  data () {
    return {
      tableData: [{
        reportname: 'aaa-20180622'
      }, {
        reportname: 'bbb-20180622'
      }]
    }
  },
  methods: {
    rowClick: function (row, event, column) {
      console.log(row.reportname)
      this.$router.push({name: 'ReportInfo'})
    }
  }
}
</script>

<style scoped>

</style>
