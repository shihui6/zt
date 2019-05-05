<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="10px" class="demo-ruleForm">
        <span class="login_title">注册</span>
        <el-form-item  prop="username">
            <el-input type="username" placeholder='请输入用户名' v-model="ruleForm2.username"></el-input>
        </el-form-item>
        <el-form-item  prop="pass">
            <el-input type="email" placeholder='请输入邮箱' v-model="ruleForm2.pass"></el-input>
        </el-form-item>
        <el-form-item  prop="checkPass">
            <el-input type="password" placeholder='请输入密码' v-model="ruleForm2.checkPass" ></el-input>
        </el-form-item>
        <el-form-item  prop="checkpass2">
            <el-input type="password" placeholder='请输入再次输入密码' v-model.number="ruleForm2.checkpass2"></el-input>
        </el-form-item>
        <el-form-item  prop="vercode">
            <el-input type="vercode" placeholder='请输入邮箱收到的验证码' v-model="ruleForm2.vercode"></el-input><el-button :loading="isloading.loading"  @click="btnclick()" type="info" plain>{{isloading.content}}</el-button>
            <!-- <el-button v-show='!isshow'  type="info" plain>{{count}}</el-button> -->
        </el-form-item>
        <el-form-item>
            <el-button  size="large" type="primary" @click="submitForm('ruleForm2')">注册</el-button>
        </el-form-item>
            <span><router-link :to="{path:'/login'}">已有账号？直接登录→</router-link></span>
    </el-form> 
</template>

<script>
  export default {
    data() {

      var validatePass3 = (rule, value, callback) => {
        if (!value) {
           callback(new Error('请再次输入密码'));
        }else if(value != this.ruleForm2.checkPass){
            callback(new Error("两次输入密码不一致"))
        }else{
            callback()
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass4 = (rule,value,callback) => {
        if(value === ''){
          callback(new Error('请输入用户名'));
        }else{
          callback();
        }
      }
      var validatePass5 = (rule, value, callback) =>{
        if(value === ''){
          callback(new Error('请输入验证码'));
        }else{
          callback()
        }
      }
      return {
        ruleForm2: {
          username:'',
          pass: '',
          checkPass: '',
          checkpass2: '',
          vercode:''
        },
        // isloading = true,
        isloading:{
          loading:false,
          content:'发送验证码',
          timer:null
        },
        // show = false,
        // count = '',
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checkpass2: [
            { validator: validatePass3, trigger: 'blur' }
          ],
          username:[
            {validator: validatePass4, trigger: 'blur'}
          ],
          vercode:[
            {validator: validatePass5, trigger: 'blur'}
          ]
        }
        
      };
      
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const url = 'http://10.25.24.51:10195/api/v1.0/register'
            let Body = {
              username:  this.ruleForm2.username,
              email: this.ruleForm2.pass,
              password: this.ruleForm2.checkpass2,
              mailcode: this.ruleForm2.vercode
            }
            // if(this.ruleForm2.username == '' || this.ruleForm2.pass == '' ||  this.ruleForm2.checkpass2 == '' ||  this.ruleForm2.vercode == ''){
            //   alert("请填写完正确信息");
            //   return
            // }
            this.$_axios.post(url,Body).then(response => {
              console.log(response)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //验证码请求
      btnclick(){
        const url ='http://10.25.24.51:10195/api/v1.0/mailcode'
        let Body = {
          username: this.ruleForm2.username,
          email: this.ruleForm2.pass
        }
        const time_count = 60
        if(this.ruleForm2.username == '' || this.ruleForm2.pass == ''){
          alert("请输入用户名或邮箱")
          return
        }

        this.$_axios.post(url,Body).then(response => {
          console.log(response)
          if(response.data.re_code == 0){
            // alert("验证码发送成功，到邮箱查收")
            this.isloading.loading = true;
            this.isloading.content = time_count;
            this.isloading.timer = setInterval(() => {
              if(this.isloading.content > 0 && this.isloading.content <= time_count ){
                this.isloading.content--
              }else{
                this.isloading.content = '发送验证码'
                this.isloading.timer = null;
                this.isloading.loading = false;
              }
            }, 1000);
            // alert("验证码发送成功，到邮箱查收")
          }
          if(response.data.re_code == 4003){
            alert(response.data.msg)
          
          }
        })
      }
    }
  }
</script>


<style lang="less" scoped>
    .login_all{
        position: absolute;
        bottom: 78px;
        right: 132px;
        width:400px;
        height:402px;
        text-align: center;
        color:#606266;
        background-color:white;
    }
    .login_title{
        font-size: 24px;
        margin-top: 27px;
        color: #606266;
        display: inline-block;
        margin-bottom: 22px;
    }
    .login_phone{
        height: 44px;
        width: 300px;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        padding-left:16px;
    }
    .login_secret{
        height: 44px;
        width: 300px;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        padding-left:16px;
    }
    .login_rember{
        margin-right:150px;
    }
    .login_up{
        height: 44px;
        width: 300px;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: #E2E2E2;
    }
    .rememberim{
        color:firebrick
    }
    a{
        color:black;
    }
    .el-form {
        position: absolute;
        bottom: 78px;
        right: 132px;
        width:400px;
        height:490px;
        text-align: center;
        background-color:white;
        padding-left:40px;
        padding-right:40px;
    }
    .el-button--info.is-plain{
      position: absolute;
      right:0px;
      bottom: 0px;
    }
</style>

