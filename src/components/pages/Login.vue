/*
 * @Author: jeay
 * @Date: 2018-04-10 13:47:15
 * @Last Modified by: jeay
 * @Last Modified time: 2018-04-10 16:05:49
 */
<template>
  <div class="login">
    <h1>后台登陆</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwd" required>
        <el-input type="password" v-model="ruleForm.passwd"></el-input>
      </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        passwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="sass" scoped>
.login
  border: 1px solid #eaeaea
  box-shadow: 0 0 25px #cac6c6
  width: 250px
  margin: 60px auto
  padding: 5px 20px 20px 5px
  @media (min-width: 330px)
    width: 280px
    padding: 10px 40px 40px 10px
  @media (min-width: 760px)
    width: 500px
</style>
