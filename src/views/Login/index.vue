<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current': item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMneu(item)">{{item.txt}}</li>
      </ul>
      <!-- 登录注册 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">

        <el-form-item prop="username" class="item-from">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label>密码</label>
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <!-- 重复密码 -->
        <el-form-item prop="passwords" class="item-from" v-show="model == 'register' ">
          <label>重复密码</label>
          <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>

        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'
export default {
  name: 'login',
  data() {

    //验证邮箱用户名
    var validateUsername = (rule, value, callback) => {
      let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确邮箱'))
      } else {
        callback()
      }
    }
    //验证密码
    var validatePassword = (rule, value, callback) => {
      // let reg = /^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$/
      // let reg = /^[a-zA-Z](?![a-zA-Z]+$)w{5,19}$/
      // let reg = /^[?!\D+$](?![^a-zA-Z]+$)\S{6,20}$/
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('密码6至20位加字母'))
      } else {
        callback()
      }
    }
    //重复密码
    //验证密码
    var validatePasswords = (rule, value, callback) => {
      //如果模块为login,直接通过
      if(this.model === 'login') { callback() }
      if (value === '') {
        callback(new Error('请再次密码'))
      } else if (value != this.ruleForm.password) {
        callback(new Error('重复密码不正确'))
      } else {
        callback()
      }
    }
        //验证验证码m
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入验证码'))
      } else if (validateEmail(value)) {
        callback(new Error('请输入正确验证码'))
      } else {
        callback()
      }
    }
    return {
      model: 'register',
      menuTab: [
        { txt: '登录', current: false, type: 'login' },
        { txt: '注册', current: true, type: 'register' }
      ],
      ruleForm: {
        username: '',
        password: '',
        passwords: '',
        code: ''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        passwords: [{ validator: validatePasswords, trigger: 'blur' }],
        code: [{ validator: validateCode, trigger: 'blur' }]
      }
    }
  },
  methods: {
    //注册提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    toggleMneu(data) {
      this.menuTab.forEach(element => {
        element.current = false
        // console.log(element);
      })
      data.current = true
      this.model = data.type
      // this.menuTab.current = false
    }
  }
}
</script>

<style lang="scss" scope>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>