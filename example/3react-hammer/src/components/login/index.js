import React, { Component } from 'react'
import './css/login.css'
// import { getCode, Login } from '@/api/center'
import axios from 'axios'
import actionCreator from './actionCreator'
import store from '../../store'
import {Route,Redirect,Switch} from 'react-router-dom'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iphone: '',
            captcha: ''
        }
       
    }
    //修改手机号
    changeIphone(e) {
        this.setState({
            iphone: e.target.value
        })
    }
    changeCaptcha(e) {
        this.setState({
            captcha: e.target.value
        })
    }
    captcha() {
        axios({
            method: 'post',
            url: 'https://m.maizuo.com/gateway',
            headers: {
                'x-Host': 'mall.user.sms-code.send',
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15670014718602819495825"}'
            },
            data: {

                imgCode: '',
                imgKey: '',
                mobile: this.state.iphone,
                type: '1'
            }
        }).then(res => {

        })
    }
    login() {
        
        let { iphone, captcha } = this.state
        axios({
            method: 'post',
            url: 'https://m.maizuo.com/gateway?k=6189443',
            headers: {
                'x-Host': 'mall.user.sms-code-login',
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15670014718602819495825"}'
            },
            data: {

                
                extra: {},
                imgCode: '',
                imgKey: '',
                mobile: iphone,
                smsCode: captcha
            }
        }).then(res => {
            console.log(res)
            // console.log(res.data.token)
            if (res.data.status == 0) {
                console.log(res.data.data.nickName)
                store.dispatch(actionCreator.setToken(res.data.data.token, res.data.data.nickName))
                //   this.getData = res.data.data.content
                this.props.history.push("/user")
              }
        })
    }
    login1() {
        
        let { iphone, captcha } = this.state
        axios({
            method: 'get',
            url: 'https://shopapi.smartisan.com/product/skus?ids=100060201&with_stock=true&with_spu=true',
           
            
        }).then(res => {
            console.log(res)
            // console.log(res.data.token)
            
        })
    }
    render() {
        let { iphone, captcha } = this.state
        return (
            <div>
                <div className="login">
                    <header>短信验证码登录</header>
                    <div className="container">
                        <div className="form">
                            <div className="input clearfix">
                                <input className="country input-txt" disabled type="text" defaultValue="国家和地区"></input>
                                <span className="country-is ">中国</span>
                            </div>
                            <div className="input clearfix">
                                <span className="mainland">+86 </span>
                                <input className="iphone input-txt" type="number" placeholder="手机号" value={iphone} onChange={this.changeIphone.bind(this)}></input>

                            </div>
                            <div className="input clearfix">

                                <input className="captcha-txt input-txt" type="text" placeholder="短信验证码" value={captcha} onChange={this.changeCaptcha.bind(this)}></input>
                                <input className="captcha-btn input-txt" type="button" defaultValue="获取验证码" onClick={this.captcha.bind(this)} />
                            </div>
                            <div className="input clearfix">


                                <input className="login-btn input-txt" type="button" defaultValue="登录" onClick={this.login1.bind(this)} />
                            </div>
                            <div className="remake">
                                <p className="remake-p">未注册的手机号验证后将自动注册</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
