import React, { Component } from 'react'
import Search from '@/components/Search/index'
import Banner from './components/Banner/index'
import Lists from './components/Lists/index'

import './css/home.css'
export default class index extends Component {
    constructor(props){
        super(props);
        this.getData = this.getData.bind(this)
        this.state ={
            bannerImg:[],
            placeholder:'T恤',
            posterImageUrl:'',
            listData:[]
        }
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        fetch('https://shopapi.smartisan.com/mobile/home').then(res=>res = res.json()).then(res=>{
            if(res.code === 0){
                let data = res.data
                let header = data[1].image
                this.setState({
                    bannerImg:data[0],
                    posterImageUrl:header,
                   
                })
            }
        })
    }
    render() {
        return (
            <div>
                <p className='header'>
                    <i className='iconfont title'>&#xe82e;</i>
                </p>
                <Search placeholder={this.state.placeholder}/>
                <Banner />
                <aside className='ad-wrap-inner common-flex-box'>
                    <figure className='ad-cover'>
                        <img src={this.state.posterImageUrl} alt='' className='ad-poster'/>
                    </figure>
                </aside>
                <Lists />
            </div>
        )
    }
}
