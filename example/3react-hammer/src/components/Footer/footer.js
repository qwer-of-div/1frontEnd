import React, { Component } from 'react'
import {Route,NavLink,Switch,Redirect} from 'react-router-dom'
import Home from '@/views/home/index'
import Category from '@/views/category/index'
import Cart from '@/views/cart/index'
import User from '@/views/user/index'
import Login from '@/components/login/index'
import Search from '@/components/Search/index.js'



// console.log(Cart)
import './css/footer.css'
export default class footer extends Component {
    render() {
        return (
            <div>
                <Switch>
                <Route path='/home' component={Home}></Route>
                <Route path='/category' component={Category}></Route>
                <Route path='/cart' component={Cart}></Route>
                <Route path='/user' component={User}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/search' component={Search}></Route>
                <Redirect from='/' to='/home' exact></Redirect>
                
                </Switch>
            <ul className='bottom-nav-bar'>
                <li>
                <NavLink to="/home" >
                <figure className='iconfont font'>&#xe665;</figure>
                <h5>首页</h5>
                </NavLink>
                </li>
                <li>
                <NavLink to="/category">
                    <figure className='iconfont font'>&#xe632;</figure>
                    <h5>分类</h5>
                </NavLink>
                </li>
                <li>
                <NavLink to="/cart">
                    <figure className='iconfont font'>&#xe69e;</figure>
                    <h5>购物车</h5>
                </NavLink>
                </li>
                <li>
                <NavLink to="/user">
                    <figure className='iconfont font'>&#xe602;</figure>
                    <h5>个人中心</h5>
                </NavLink>
                </li>
            </ul>
            </div>
        )
    }
}
