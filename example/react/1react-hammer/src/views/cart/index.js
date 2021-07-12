import React, { Component } from 'react'
import Shop from './shop/index'

import "./css/main.css"

export default class index extends Component {
    render() {
        return (
            <div>
                <header>购物车</header>
                <Shop />
            </div>
        )
    }
}
