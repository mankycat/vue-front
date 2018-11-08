<template>
  <el-table
    :data="tableData"
    border
    @row-click="rowClick"
    style="width: 100%">
    <el-table-column
      prop="StringID"
      min-width="120"
      label="">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ReportList',
  methods: {
    rowClick: function (row, event, column) {
      console.log(row.StringID)
      this.$router.push({name: 'ReportInfo', params: {reportName: row.StringID}})
    }
  },
  computed: {
    tableData () {
      return this.$store.state.reports
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>

</style>
