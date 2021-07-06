require(['/js/modules/config.js'], () => {
    require(['url', 'template','header','footer', 'zoom', 'fly', 'cookie'], (url,template) => {
       
        class Details {
            constructor () {
                // this.addCart();
                
                this.getData().then(resp => {
                    this.showData(resp);
                    
                    // this.isLogin();
                    this.addCart ();
                   this.count();
                    this.imgWord();
                    this.zoom();
                    this.myindex = 0;
                })
            }

            //获取数据
            getData () {
                this.id = Number(window.location.search.slice(4));
               
                return new Promise(resolve => {
                    $.get(`${url.rapUrl}details`, {id: this.id}, resp => {
                        resolve(resp);
                    })
                })
            }

            //展示数据
            showData (resp) {
                if(resp.code === 200){
                    this.details = {...resp.body.details,id: this.id}
                    // console.log(this.details)
                    let str = template('wrap-template', {...this.details})
                    $('#wrap').html(str);
                    this.styleChange(0)
                }
            }

            //判断登录
            isLogin () {
                console.log('----------isLogin')
                this.cookie = $.cookie('userinfo');
                    if (this.cookie) {
                        this.cookie = JSON.parse(this.cookie);
                        this.cookie.some(item => {
                            if (item.hasOwnProperty('checked')) {
                                // this.cart();
                                
                                // console.log(item.hasOwnProperty('checked'))
                            } else {
                                // $('.navico-cartnum').html(0);
                            }
                        })
                    } else {
                        // $('.navico-cartnum').html(0);
                    }
                    
            }

            //放大镜效果
            zoom () {
                $(".zoomLens").css({
                    width: 200,
                    height: 200
                })
                // console.log($(".zoom-img").width())
                $(".zoom-img").elevateZoom({
                    gallery: 'gal1', //ul父级盒子的id
                    cursor: 'pointer',
                    borderSize: '1',
                    galleryActiceClass: 'active',
                    borderColor: '#f2f2f2'
                })
            }

            //图片，规格点击事件
            imgWord () {
                let _this = this;
                $('.picdetail-list').on('mouseup', 'li', function () {
                   _this.myindex =  $(this).index()
                    // console.log($(this).index());
                    let index = $(this).index();
                    _this.styleChange(index);
                   
                })
                $('.spec').on('mousedown', 'li', function () {
                    // let index = $(this).index();
                    // $(`.picdetail-list li:nth-of-type(${index})`).trigger("click");
                    $(`.picdetail-list li:nth-of-type(${_this.myindex})`)
                    let index = $(this).index();
                    _this.styleChange(index)
                   
                })
            }

            //图片，规格点击事件,样式变换
            styleChange (index) {
                
                $('.picdetail-list li').removeClass('border-color').children('a').removeClass('border-color')
                // $('.picdetail-list li').removeClass('border-color')
                // $(`.picdetail-list li:nth-of-type(${index + 1})`).children('a').addClass('border-color')
                $(`.picdetail-list li:nth-of-type(${index + 1})`).addClass('border-color').children('a').addClass('border-color')
                $(`.spec li, .spec li .pord-selbox`).removeClass('border-color');
                $(`.spec li:nth-of-type(${index + 1}), .spec li:nth-of-type(${index + 1}) .pord-selbox`).addClass('border-color');
                let src = $(`.picdetail-list li:nth-of-type(${index + 1}) img`)[0].src
                $('.good-imgs img').attr('src',src)
                // $('.zoomWindowContainer').css('backgroundImg')
                $('.zoomWindowContainer div').css("background-image",`url(${src})`);
                console.log($('.good-imgs img').attr('src'))
            }

            //商品数量
            count () {
                this.count = Number($('.inpt_detail_main_buy_num').val());
                $('.btn_detail_main_buy_plus').on('click', () => {
                    this.count++;
                    $('.inpt_detail_main_buy_num').val(this.count);
                }),
                $('.btn_detail_main_buy_min').on('click', () => {
                    if(this.count > 1){

                    
                    this.count--;
                    $('.inpt_detail_main_buy_num').val(this.count);
                }})
            }

            //添加购物车
            addCart () {
                $('.wrap').on('click', '#btn_detail_cart_add', e => {
                    if($('.nextlogin').css('display') === 'block') {
                    this.fly(e);
                    let count = $('.inpt_detail_main_buy_num').val() - 0;
                    let cart = localStorage.getItem('cart');
                    if (cart) {
                        cart = JSON.parse(cart);
                        //some遍历每一项判断条件是否存在，返回boolean
                        const isExist = cart.some(shop => {
                            return shop.id === this.id;
                        })
                        if (isExist) {
                            //map 遍历每一项 返回每一项，形成新数组
                            cart = cart.map( shop => {
                                if(shop.id === this.id) shop.num += count;
                                return shop;
                            })
                        } else {
                            //有其他商品，本商品是第一次加入购物车
                            cart.push({...this.details, num: count, checked: true})
                        }
                        localStorage.setItem('cart', JSON.stringify(cart));
                    } else {
                        let arr = [{...this.details,num: count, checked: true}]
                        localStorage.setItem('cart', JSON.stringify(arr));
                    }
                } else {
                    alert('未登录，请登录！')
                }
            })
            }

            //购物车总个数
            counts () {
                let cart = localStorage.getItem('cart');
                let num = 0;
                if (cart) {
                    cart = JSON.parse(cart);
                    //遍历数组每一项，返回计算结果
                    num = cart.reduce((res, shop) => {
                        res += shop.num
                        return res
                      }, 0)}
                    // $('.navico-cartnum').html(num);
                // } else {
                //     $('.navico-cartnum').html(num);
                // }
                $('.navico-cartnum').html(num);
            }
            
            //fly曲线插件
            fly (e) {
                const _this = this;
                $(`<div style="background-color: #f64446;width:40px;height:40px;border-radius: 50%;color: #fff;
                text-align: center;font-weight: 700">=_=</div>`).fly({
                    start:{
                      left: e.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
                      top: e.clientY  //开始位置（必填）
                    },
                    end:{
                      left: $('.navico-cartnum').offset().left, //结束位置（必填）
                      top: $('.navico-cartnum').offset().top - $(window).scrollTop(),  //结束位置（必填）
                      width: 0, //结束时高度
                      height: 0 //结束时高度
                    },
                    autoPlay: true, //是否直接运动,默认true
                    speed: 0.5, //越大越快，默认1.2
                    vertex_Rtop: 100, //运动轨迹最高点top值，默认20
                    onEnd: function(){
                        this.destroy();
                        _this.counts();
                    } //结束回调
                  });
            }

            //商品详情大图

        }

        new Details();
    })
})