import React, { Component } from 'react'
import {NavLink, Route} from "react-router-dom"
import "./css/wrapper.css"
import Login from '@/components/login/index'
import store from '@/store'

export default class index extends Component {
    constructor (props) {
        super(props);
        this.state = {
            display: store.getState().xin.userName ? false : true
        }
        console.log(store.getState().xin.userName)
        store.subscribe(() => {
            this.setState({
                display: store.getState().xin.userName ? false : true
            })
            
        })
    }
   
    componentDidMount () {
       
    }
    render() {
        let {display} = this.state
        return (
            <div className='wrapper'>
                <div className='common-box box-userinfo'>
                <div className='avatar'>
                    
                </div>
                {/* <Route path='/login' component={Login}></Route> */}
              
                        <NavLink to='/login' style={{display: display ? 'inline-block' : 'none'}}>登录/注册 </NavLink>
                        <div style={{display: display ? 'none' : 'inline-block'}}>欢迎 {store.getState().xin.userName}</div>

                </div>
                <ul className='common-box menu-list-parallel box-order'>
                    <li>
                        <NavLink to='/a'>全部订单</NavLink>
                    </li>
                    <li>
                        <NavLink to='/a'>代付款</NavLink>
                    </li>
                    <li>
                        <NavLink to='/a'>待收货</NavLink>
                    </li>
                    <li>
                        <NavLink to='/a'>售后</NavLink>
                    </li>
                </ul>
                <ul className='common-box menu-list-vertical'>
                    <li>
                    <NavLink to='/a'>地址管理</NavLink>
                    </li>
                    <li>
                    <NavLink to='/a'>我的优惠券</NavLink>
                    </li>
                    <li>
                    <NavLink to='/a'>优先购买码</NavLink>
                    </li>
                </ul>
                <ul className='common-box menu-list-vertical'>
                    <li>
                    <NavLink to='/a'>依旧换新</NavLink>
                    </li>
                    <li>
                    <NavLink to='/a'>常见问题</NavLink>
                    </li>
                    <li>
                    <NavLink to='/a'>服务支持</NavLink>
                    </li>
                </ul>
                <ul className='common-box menu-list-vertical'>
                    <li>
                    <NavLink to='/a'>意外碎屏保修服务</NavLink>
                    </li>
                    <li>
                    <NavLink to='/a'>延长保修服务</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}