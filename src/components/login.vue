<template>
    <el-form :model="Body" :rules="loginFormRules" ref="Body">
      <span class="login_title">登录</span>
      <el-form-item  prop="userid">
        <el-input  placeholder="请输入用户名" v-model="Body.userid"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" v-model="Body.password"></el-input>
      </el-form-item>
      <el-checkbox label="记住密码"></el-checkbox><span class="rememberim">忘记密码？</span>
      <el-form-item>
        <el-button @click="submitHandle" type="primary">登录</el-button>
        <el-button class="button_register"><router-link :to="{path:'/register'}" class="register_a">注册</router-link></el-button>
      </el-form-item>
      <!-- <platemanage :prop="manage"></platemanage> -->
    </el-form>    
</template>
<script>
import platemanage from '@/components/platemanage'
//这个页面需要一个请求
export default {
  data() {
    return {
      Body: {
        userid: '',
        password: ''
      },
      loginFormRules: {
         //trigger模糊匹配
        userid: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      // manage:{
      //   title:['板块一','版块二','板块三']
      // }
    }

  },
  // components:{
  //   platemanage
  // },
  methods: {
    //登录
    submitHandle() {
      // this.$store.state.list=['板块一','版块二','板块三','板块三','板块四'];
      console.log(this.$refs)
      console.log(this.Body)
      //清空操作

      // this.$refs.loginForm.resetFields()
      //表单验证，输入值符合匹配规则valid返回true
      this.$refs.Body.validate(valid => {
        console.log(valid)
        if (valid) {//验证通过发送请求
        // sessionStorage.setItem('token','11111')

          this.loginHandle()
        }
      })
    },
    //表单重置功能
    // resetLoginForm(formName) {
    //   this.$refs[formName].resetFields()
    loginHandle() {
      // alert("用户名或者密码不正确");
      const url = 'http://10.25.24.51:10195/api/v1.0/login'
      const sendDate = JSON.parse(JSON.stringify(this.Body))
      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
      this.$_axios.post(url, sendDate).then(response =>{
        console.log(response)

        //这边进行判断要是用户名密码不争取，进行alert提示
        
        if(response.data.re_code == 0){
          // alert(1)
          let token = response.data.token
          this.$store.state.list = token
          // localStorage.setItem('token', token)
          // localStorage.setItem('hash',1)
          this.$router.push({path:'/platemanage'})
        }
        if(response.data.re_code == 4103){
          alert(response.data.msg)
          //提示用户名和密码错误之后，再进行重置
          this.$refs.Body.resetFields()
        }
      })
      // this.$router.push({path:'/platemanage'})
      //重置表单功能
      // this.$refs.loginForm.resetFields()
      //发送请求的方法
      // login(this.loginForm).then(res => {
      //   if (res.data.code === 200) {
      //     this.$message({
      //       message: '登录成功',
      //       type: 'success',
      //       duration: 2 * 1000
      //     })
      //     sessionStorage.setItem('token', res.data.data.token) 
      //     setTimeout(() => {
      //       this.$router.push('/home')
      //     }, 1000);
      //   }
      // })

    // }
  }
    },

}
</script>
<style lang="less" scoped>
    .login_title{
        font-size: 24px;
        margin-top: 48px;
        color:#606266;
        display: inline-block;
    }

    .rememberim{
        color:firebrick;
        cursor: pointer;
    }
    .el-form{
        position: absolute;
        bottom: 78px;
        right: 132px;
        width:400px;
        height:402px;
        text-align: center;
        background-color:white;
        padding-left:40px;
        padding-right:40px;
    }
    .el-checkbox{
      margin-right:106px;
    }
    .el-button--primary{
      margin-right:50px;
    }
    .el-form-item{
      margin-bottom: 22px;
      margin-top: 30px;
    }
    .el-input--small.el-input__inner {
        height: 40px;
        line-height: 40px;
    }
    .button_register{
      padding:0px;
    }
    .register_a{
      width:70px;
      height:40px;
      display:inline-block;
      line-height: 40px;
    }
</style>
