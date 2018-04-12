<template>
  <div>
      <h1>404 Error</h1>
      <el-button type="primary" @click="goHistory">返回</el-button>
    </div>
</template>
<script>
export default {
  methods: {
    goHistory () {
      this.$router.push({path: (sessionStorage.getItem('activeIndex') ? sessionStorage.getItem('activeIndex') : '/')})
    }
  }
}
</script>
