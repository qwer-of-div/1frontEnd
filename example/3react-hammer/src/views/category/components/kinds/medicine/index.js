import React, { Component } from 'react'

export default class index extends Component {
    constructor(props){
        super(props)
        this.getData = this.getData.bind(this)
        this.state={
            banner:'',
            dataList:[]
        }
}
componentDidMount(){
    this.getData();
}
getData(){
    fetch('https://shopapi.smartisan.com/mobile/classify').then(res=>res = res.json()).then(res=>{
        // console.log(res)
        if(res.code === 0){
            let data = res.data
            let bannerContent = data[4].banner;
            let dataContent = data[4].second; 
            this.setState({
                banner:bannerContent,
                dataList:dataContent
            })
            // console.log(data)
        }
    })
}
render() {
    console.log(typeof this.state.banner)
    return (
        <div className='category-sub'>
            {/* {this.state.banner == 'null'? '':<div className='banner-wrap'>
                <div className='swiper-slide'>
                    <img src={this.state.banner[0].image} alt='' className='banner-img'/>
                </div>
            </div>} */}
            {
                this.state.dataList.map((item)=>{
                    return (
                        <section className='second-and-third-list' key={item.classifyId}>
                    <h1>{item.classifyName}</h1>
                    <aside className='list-flex-wrap'>
                    {
                        item.third.map((element)=>{
                                return(
                        <figure className='flex-item' key={element.classifyId}>
                        <div className='img-cover'>
                            <img src={element.image} alt=''/>
                        </div>
                        <figcaption className="title text-ellipsis">{element.classifyName}</figcaption>
                    </figure>
                                )
                        })
                    }
                    </aside>
                </section>
                    )
                })
            }
        </div>
    )
}
}
