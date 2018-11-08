<template>
  <el-container class="home-container">
  <el-aside :style="{ 'width': isCollapse ? '0px' : '200px' , 'height' : '100%'}">
    <el-menu style="height: 100%" default-active="/memberlist" router unique-opened class="el-menu-vertical" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item @click="handleCollapse" index="/memberlist">查看/编辑组员信息</el-menu-item>
      <el-menu-item @click="handleCollapse" index="/updatepwd">更改密码</el-menu-item>
      <el-submenu @click="handleCollapse" >
        <template slot="title">报表</template>
        <el-menu-item index="/reportlist">填写周报</el-menu-item>
        <el-menu-item index="/reportlistmod">修改周报</el-menu-item>
      </el-submenu>
      <el-menu-item @click="logOut" index="/">退出</el-menu-item>
    </el-menu>
  </el-aside>
  <el-container>
        <el-header class="home-header" ><div @click.prevent="handleCollapse" class="menu-icon"><i class="el-icon-menu"></i></div>A'men</el-header>
          <div @click.prevent="checkCollapse" style="height: 100%">
            <router-view></router-view>
          </div>
        <!--<el-footer>Copyright ©2018 v1.0.0</el-footer>-->
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    logOut: function () {
      var _this = this
      this.$confirm('注销登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$store.commit('logout')
        _this.$router.replace({name: 'Login'})
      })
    },
    handleCollapse: function () {
      this.isCollapse = !this.isCollapse
    },
    checkCollapse: function () {
      if (!this.isCollapse) {
        this.isCollapse = true
      }
    }
  },
  mounted: function () {
    this.initMemberList(this.$store)
    this.initReportList(this.$store.state.user.groupid, this.$store)
  }
}
</script>

<style>
  .home-container {
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
  }
  .home-header {
      background-color: sandybrown;
      color: azure;
      text-align: center;
      line-height: 60px;
  }
   .menu-icon {
    float: left;
  }
  .el-footer {
      background-color: darkgray;
      line-height: 60px;
      color: azure;
      text-align: center;
  }
</style>
