/*
 * @Author: jeay
 * @Date: 2018-04-10 15:47:34
 * @Last Modified by: jeay
 * @Last Modified time: 2018-04-11 17:52:13
 */
<template>
  <div class="list">
    <div class="adduser">
      <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    </div>
    <div class="adduser-dialog">
      <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="90%"
        center>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name" required>
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwd" required>
            <el-input type="password" v-model="ruleForm.passwd"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="real_name" required>
            <el-input v-model="ruleForm.real_name"></el-input>
          </el-form-item>
          <div class="tac">
            <el-button @click="dialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <h2>用户信息</h2>
    <div class="userList">
      <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%">
        <el-table-column
          prop="real_name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="登陆账户">
        </el-table-column>
        <el-table-column
          prop="last_login_time"
          label="上次登陆时间">
        </el-table-column>
        <el-table-column
          prop="last_login_ip"
          label="上次登陆地址">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style lang="sass">
.adduser-dialog
  .el-dialog
    max-width: 500px
  .el-dialog__body
    padding: 10px 20px 30px 0
    @media (min-width:500px)
      padding: 20px 40px 40px 25px
.userList
  table
    text-align: left
</style>
<style lang="sass" scoped>
.adduser
  text-align: left
h2
  text-align: left
</style>

<script>
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      loading: true,
      tableData: [],
      totalUser: 0,
      currentPage: 1,
      dialogVisible: false,
      ruleForm: {
        name: '',
        real_name: '',
        passwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入登陆账户', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        real_name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted () {
    let msg = await axios.get('/user/?access_token=' + localStorage.getItem('access_token') + '&page=' + this.currentPage)
    this.loading = false
    if (!msg.data.error) {
      this.tableData = msg.data.data.userList
      this.totalUser = msg.data.data.totalUser
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          let date = {
            user_name: this.ruleForm.name,
            real_name: this.ruleForm.real_name,
            passwd: this.ruleForm.passwd
          }
          let msg = await axios.post('/user/?access_token=' + localStorage.getItem('access_token'), qs.stringify(date))
          this.loading = false
          if (!msg.data.error) {
            this.tableData.push(date)
            let addmsg = '用户：' + this.ruleForm.real_name + '添加成功'
            this.dialogVisible = false
            Message.success({message: addmsg})
          }
        }
      })
    },
    async deleteRow (index, rows) {
      this.loading = true
      let msg = await axios.delete('/user/' + rows[index].user_id + '?access_token=' + localStorage.getItem('access_token'))
      this.loading = false
      if (!msg.data.error) {
        Message.success({message: '用户：' + rows[index].real_name + '删除成功'})
        rows.splice(index, 1)
      }
    }
  }
}
</script>
