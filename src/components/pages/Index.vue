/*
 * @Author: jeay
 * @Date: 2018-04-10 13:47:15
 * @Last Modified by: jeay
 * @Last Modified time: 2018-04-10 16:59:15
 */
<template>
  <div class="list">
    <el-row>
      <el-col :span="2">id</el-col>
      <el-col :span="4">姓名</el-col>
      <el-col :span="4">电话</el-col>
      <el-col :span="5">邮箱</el-col>
      <el-col :span="4">院系</el-col>
      <el-col :span="5">班级</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="sass" scoped>
.list
  padding: 5px
  .el-col
    height: 28px
    line-height: 28px
    border-bottom: 1px solid #eee
</style>
