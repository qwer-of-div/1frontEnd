import React, { Component } from 'react'
import {Route,NavLink,Switch,Redirect} from 'react-router-dom'
import Intelligent from './intelligent/index'
import Breath from './breath/index'
import Medicine from './medicine/index'
import Shoe from './shoe/index'
import Smartisan from './smartisan/index'

import './css/kinds.css'
export default class index extends Component {
    render() {
        return (
            <div className='category-container'>
                <section className='right-wrap'>
                <Switch>
                <Route path='/category/intelligent' component={Intelligent}></Route>
                <Route path='/category/smartisan' component={Smartisan}></Route>
                <Route path='/category/shoe' component={Shoe}></Route>
                <Route path='/category/breath' component={Breath}></Route>
                <Route path='/category/medicine' component={Medicine}></Route>
                <Redirect from='/category' to='/category/intelligent'></Redirect>
                </Switch>
                </section>
                <section className='left-wrap'>
                <ul className='first-list'>
            <li>
                <NavLink to="/category/intelligent" >
                智能硬件
                </NavLink>
            </li>
            <li>
                <NavLink to="/category/smartisan" >
                smartisan
                </NavLink>
            </li>
            <li>
                <NavLink to="/category/shoe" >
                鞋包配饰
                </NavLink>
            </li>
            <li>
                <NavLink to="/category/breath" >
                畅呼吸
                </NavLink>
            </li>
            <li>
                <NavLink to="/category/medicine" >
                医疗保健
                </NavLink>
            </li>
            </ul>
                </section>
            </div>
        )
    }
}
