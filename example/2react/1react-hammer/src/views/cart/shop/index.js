import React, { Component } from 'react'
import{NavLink} from "react-router-dom"
import './css/shop.css'

export default class index extends Component {
    render() {
        return (
            <div className='empty-container'>
                <div className="img-container"></div>
                <h3>购物车暂无商品</h3>
                <p>
                添加到购物车的商品将会显示在这里
                </p>
                <NavLink to="/login" className='buy-btn login'>登录</NavLink>
                <NavLink to="/nowBuy" className='buy-btn box-border'>现在选购</NavLink>
            </div>
        )
    }
}
