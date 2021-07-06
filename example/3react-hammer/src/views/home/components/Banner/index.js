import React, { Component } from 'react'
import Swiper from 'swiper';
import '@/assets/swiper/css/swiper.min.css'
import './css/Banner.css'
export default class index extends Component {
    constructor(props){
        super(props)
        this.state={
            imgs:[],
            success:false
        }
    }
    componentDidMount(){
        this.getData()
    }
    getData=()=>{
        fetch('https://shopapi.smartisan.com/mobile/home').then(res=>res = res.json()).then(res=>{
            if(res.code === 0){
                let data = res.data
                this.setState({
                    imgs:data[0].list,
                    success:true
                })
                this.init()
            }
        })
    }
    init=()=>{
        new Swiper ('.my-swiper', {
            loop: true, // 循环模式选项
            slidesPerView: "auto",
            speed: 300,
            autoplay: {
              disableOnInteraction: false, //手动滑动之后不打断播放
              delay: 2000
            },
            pagination: {
              el: '.swiper-pagination',
            }
          })
    }
    render() {
        return (
            <div>
                {this.state.success?<div className="swiper-container my-swiper">
                <div className="swiper-wrapper">
                
                    {this.state.imgs.map((val,index)=>{
                        return (
                            <div className="swiper-slide" key={index}>
                            <img src={val.image} alt='' className='swiper-img'/>
                            </div>
                        )
                    })}
                </div>
                <div className="swiper-pagination"></div>
                </div>:''
            }
            </div>
        )
    }
}
