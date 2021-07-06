import React, { Component } from 'react'
import {Route,NavLink,Switch,Redirect} from 'react-router-dom'
import axios from 'axios'

import './css/search.css'
export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            hotList: [],
            keyWord: '',
            keyList: []
        }
    }
    componentDidMount () {
        this.getData()
    }
    getData () {
        axios({
            method: 'get',
            // url: '/cz/Home/FirstPage?updateTime=2019-10-31+20%3A05%3A51&source=',
            url: '/cz/v1/search/hot-words',
            
        }).then(res => {
            if(res.status === 200) {
                let hotList = res.data.hot
                this.setState({
                    hotList
                })
                
            }
        //    console.log(res)
        })
    }
    keyGetData () {
        axios({
            method: 'get',
            url: '/cz/v1/search/suggest?keyword=' + this.state.keyWord,
            
        }).then(res => {
            
                let keyList = res.data.data
                this.setState({
                    keyList
                })    
        })
    }
    change (e) {
        this.setState({
            keyWord: e.target.value
        }, () => {
            this.keyGetData()
        })
    }
    render() {
        
        let {hotList, keyWord, keyList} = this.state
        console.log(keyList)
        return (

            <div className="search">
                <div className='search-content'>
                    <i className='iconfont title'>&#xe65e;</i>
                    <input  type='text' placeholder="请输入关键词" value={keyWord} onChange={this.change.bind(this)}/>
                    <button>取 消</button>
                    <div className="showDown" style={{display: keyWord!=='' ? 'block': 'none'}}>
                        <ul className="keyWord-ul">
                            {
                                keyList.map(item => {
                                    return <li key={item} className="keyWord-li">
                                        <NavLink className="keyWord-link" to="/home" key={item}>{item}</NavLink>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="hot">
                    <p className="hot-title">热门搜索</p>
                    <div className="hot-list">
                        {
                            hotList.map((item,index) => {
                                if(index < 4){
                                    return <NavLink className="hot-link" to="/home" key={item}>{item}</NavLink>
                                }
                                
                            })
                        }
                        
                    </div>
            <div className='searchBox'>
                <div className='search-content'>
                <i className='iconfont title'>&#xe65e;</i>
                <input  type='text' placeholder={this.props.placeholder}/>
                </div>
            </div>
        )
    }
}
