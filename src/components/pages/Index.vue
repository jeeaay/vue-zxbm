/*
 * @Author: jeay
 * @Date: 2018-04-10 13:47:15
 * @Last Modified by: jeay
 * @Last Modified time: 2018-04-11 17:55:42
 */
<template>
  <div class="list">
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="sub_time"
        label="时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话"
        width="110">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="department"
        label="院系">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="班级">
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
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync=currentPage
        :page-size="10"
        layout="total, prev, pager, next"
        :total=totalMsg>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui'
// import qs from 'qs'
export default {
  data () {
    return {
      loading: true,
      tableData: [],
      totalMsg: 0,
      currentPage: 1
    }
  },
  async mounted () {
    let msg = await axios.get('/msg/?access_token=' + localStorage.getItem('access_token') + '&page=' + this.currentPage)
    this.loading = false
    if (msg.data.error) {
      console.log('账户或密码错误')
    } else {
      this.tableData = msg.data.data.msgList
      this.totalMsg = msg.data.data.totalMsg
    }
  },
  methods: {
    async handleCurrentChange (val) {
      if (val !== this.currentPage) {
        this.loading = true
        this.currentPage = val
        let msg = await axios.get('/msg/?access_token=' + localStorage.getItem('access_token') + '&page=' + this.currentPage)
        if (!msg.data.error) {
          this.tableData = msg.data.data.msgList
          this.loading = false
        }
      }
    },
    async deleteRow (index, rows) {
      this.loading = true
      let msg = await axios.delete('/msg/' + rows[index].id + '?access_token=' + localStorage.getItem('access_token'))
      this.loading = false
      if (!msg.data.error) {
        Message.success({message: rows[index].name + '提交的消息已经删除成功'})
        rows.splice(index, 1)
      }
    }
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
.pagination
  margin-top: 30px
</style>
<style lang="sass">
table
  text-align: left
</style>
