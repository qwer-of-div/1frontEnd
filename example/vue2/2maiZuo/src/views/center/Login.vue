<template>
  <div>
    <div class="box">
      <div class="image">
        <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" />
      </div>
      <div class="login-from">
        <form>
          <div class="form-group">
            <input v-model="text" type="tel" maxlength="13" placeholder="手机号" class="input-control" />
            <div class="getSmsCode sms-code disable" @click="captcha()">获取验证码</div>
          </div>
          <div class="form-group">
            <input v-model="text1" placeholder="验证码" class="input-control" />
          </div>
          <div class="submit login-btn" @click="login"><span>登录</span></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { getCode, Login } from '@/api/center'
import { setToken } from '@/utils/local-data'
import { mapMutations } from 'vuex'
// import axios from 'axios'

export default {
  data () {
    return {
      text: '',
      text1: ''
    }
  },
  created () {
    //    getCode().then((res)=>{
    //   if(res.status == 0){
    //   //   this.getData = res.data.data.content
    //     console.log(res)
    //   }
    // })
  },

  methods: {
    ...mapMutations(['setToken']),
    // 存储当前setToken名称
    setToken1 (val) {
      console.log('存储当前setToken名称....')
      setToken(val)

      this.setToken(val)
    },
    captcha () {
      console.log(this.text)
      getCode(this.text).then((res) => {
        // console.log(res)
        if (res.status == 0) {
        //   this.getData = res.data.data.content
          console.log(res)
        }
      })
    },
    login () {
      Login(this.text, this.text1).then((res) => {
        console.log(res)
        if (res.status == 0) {
          this.setToken1(res.data.token)
          //   this.getData = res.data.data.content
          this.$router.push('/center')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.image {
  img {
    display: block;
    height: 1.2rem;
    margin: 1.58rem auto 0.8rem;
  }
}
.form-group {
  line-height: 1.1rem;
  margin: 0 0.5rem;
  position: relative;
  border-bottom: 1px solid #ededed;
}
.input-control {
              height: 0.3rem;
line-height: 0.3rem;
padding: 0.4rem 0;
width: 100%;
font-size: 0.3rem;
color: #191a1b;
border: 0;
outline-width: 0;
}
.getSmsCode {
  font-size: 0.26rem;
  position: absolute;
  color: #bdc0c5;
  top: 0.1rem;
  right: 0;
}
.login-btn {
    margin-top: 1.4rem;
}
.submit {
    line-height: 0.9rem;
    font-size: 0.32rem;
    margin: 1.4rem 0.5rem 0;
    border-radius: 0.06rem;
    text-align: center;
    background-color: #ff5f16;
    height: 0.88rem;
    color: #fff;
    border: none;
}
</style>
