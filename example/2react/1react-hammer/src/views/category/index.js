import React, { Component } from 'react'
import Search from '@/components/Search/index'
import Kinds from './components/kinds/index'
export default class index extends Component {
    constructor(props){
        super(props)
        this.state={
            placeholder:'T恤'
        }
    }
    render() {
        return (
            <div>
                <Search placeholder={this.state.placeholder}/>
                <Kinds/>
            </div>
        )
    }
}
