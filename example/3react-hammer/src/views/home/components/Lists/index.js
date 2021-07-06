import React, { Component } from 'react'
import Swiper from 'swiper';
import store from './reducer'
import action from './actionCreate'
import '@/assets/swiper/css/swiper.min.css'

export default class index extends Component {
    constructor(props){
        super(props)
        this.state={
            listData:store.getState().list,
            posterImageUrl:''
        }
        store.subscribe(()=>{
            this.setState({
                listData:store.getState().list
            })
            this.init()
        })
    }
    
    componentDidMount(){
        action.getData()
    }
    init=()=>{
        new Swiper('.list-swiper', {
            slidesPerView: 4,
            spaceBetween: 30,
            
          });
    }
    render() {
        console.log(this.state.listData)
        let newArr = this.state.listData.slice(2)
        return (

                    <aside className='list-wrap '>
                    { 
                        newArr.map((element,index)=>{
                            let header = element.header
                            let data = element.skuInfo
                            return ( < div className='list-wrap-content'>
                                <aside className='ad-wrap-inner common-flex-box' key={index}>
                    <figure className='ad-cover'>
                        <img src={header.image} alt='' className='ad-poster'/>
                    </figure>
                    </aside>
                    <div className="swiper-container list-swiper">
                <div className="swiper-wrapper">
                        {data.map((item)=>{
                            return (
                                <div className="swiper-slide" key={item.skuId}>
                                <section className='sku-item-normal-box'>
                        <figure className='item-cover'>
                            <img src={item.images} alt=''/>
                        </figure>
                        <article className='item-title two-line'>
                        <h3>{item.skuName}</h3>
                        </article>
                        <article className='item-bottom-info'>
                            <aside className='item-price'>
                            <span className="yuan">¥</span>
                            <span >{item.originalPrice}</span>
                            </aside>
                            <aside className='item-promotion-tags'>
                            
                            </aside> 
                        </article>
                    </section>
                    </div>
                            )
                        })
                        }
                        </div>
                            </div>
                    </div>
                            )
                        })
                    }
                    
                    
            </aside>
        )
    }
}
