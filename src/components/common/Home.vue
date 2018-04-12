<template>
  <div>
    <header>
      <div class="container">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          router
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/admin/">
            报名信息
          </el-menu-item>
          <el-menu-item index="/admin/user/">
            用户管理
          </el-menu-item>
        </el-menu>
      </div>
    </header>
    <div class="container mt30">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: ''
    }
  },
  mounted () {
    this.activeIndex = sessionStorage.getItem('activeIndex') ? sessionStorage.getItem('activeIndex') : '/admin/'
  },
  methods: {
    handleSelect (key) {
      this.activeIndex = key
      sessionStorage.setItem('activeIndex', key)
    }
  }
}
</script>
<style lang="sass">
.container
  max-width: 1200px
  margin: 0 auto
  padding: 0 10px
  &.mt30
    margin-top: 20px
    @media (min-width: 760px)
      margin-top: 30px
header
  background-color: #545c64
  color: #fff
  .container
    height: 60px
</style>
