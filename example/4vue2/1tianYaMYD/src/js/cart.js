require(['/js/modules/config.js'], () => {
    require(['template','footer','header'], (template,footer) => {
        class Cart{
            constructor () {
                this.showData();
                this.totalMoney();
                this.unitCheck();
                this.allCheck();
                this.count();
                this.del();
                this.cartList =  $('#mycart-list');
                this.quit();
            }

            //获得数据渲染界面
            showData () {
                let cart = localStorage.getItem('cart');
                if(cart) {
                    this.cart = JSON.parse(cart);
                    this.html = template('mycart-list-temp',{cart: this.cart});
                    $('#mycart-list').html(this.html)
                    $('.noshop').hide()
                    $('.mycart-list').show();
                    
                } else {
                    $('.mycart-list').hide()
                    $('.noshop').show()
                }
                
            }

            //总价计算，选中个数计算
            totalMoney () {
                this.checkNum = 0;
                let cart = localStorage.getItem('cart');
                if (cart) {
                    this.cart = JSON.parse(cart);
                    this.length = this.cart.length;
                    this.cart.forEach(ele => {
                        if (ele.checked) {
                            this.checkNum++;
                        }
                    });
                    $('.cartcheck').prop('checked', this.checkNum === this.length);
                    $('.total').html(this.checkNum);
                    // if(this.cart.every((value, index, array) => {
                    //     return value.checked
                    // })) {
                    //     $('.cartcheck').prop('checked',true);
                    // } else {
                    //     $('.cartcheck').prop('checked',false);
                    // }
                    //遍历每一项，每一项运算，返回计算结果
                    let allMoney = this.cart.reduce((money, shop) => {
                        if(shop.checked) {
                            money += shop.num * shop.price
                        }
                        return money;
                    }, 0);
                    $('.money').html(allMoney + ' 元');
                } else {
                    $('.money').html('0 元')
                }
            }

            //全选按钮
            allCheck () {
                const _this = this;
                $('.cartcheck').on('change', function () {
                    $('.mycart-item .goodscheck').prop('checked',this.checked)
                    _this.cart =  _this.cart.map(shop => {
                        shop.checked = this.checked;
                        return shop;
                    })
                    localStorage.setItem('cart', JSON.stringify(_this.cart));
                    _this.totalMoney();
                })
            }

            //单选按钮
            unitCheck () {
                const _this = this;
                $('.mycart-item .goodscheck').on('change', function () {
                    const id = $(this).parents('.mycart-item').attr('data-id') - 0;
                    //修改每一项的值，返回数组
                    _this.cart = _this.cart.map(shop => {
                         // prop 一般就是用与获取或者修改表单元素的影响数据的属性，比如下拉菜单的select,按钮的disabled,选框的checked
                         if (shop.id === id) {
                            shop.checked = $(this).prop('checked')
                         }
                         return shop;
                    })
                   
                    localStorage.setItem('cart', JSON.stringify(_this.cart));
                    _this.totalMoney();
                    // let num = 0
                    // _this.cart.forEach(ele => {
                    //     if(ele.checked) num++
                    // });
                    // _this.checkNum = num;
                    // console.log( _this.checkNum)
                    // _this.checkNum = this.checked ? _this.checkNum + 1 : _this.checkNum - 1;
                    // $('.cartcheck').prop('checked', _this.checkNum === _this.length);
                })
            }

            //商品数量
            count () {
                const _this = this;
                let count = 0;
                $('.btn_cart_list_buy_plus').on('click', function (){
                    const id = $(this).parents('.mycart-item').attr('data-id') - 0;
                    count = Number($(this).prev().val())
                    count+=1;
                    // console.log($(this).prev())
                    $(this).prev().val(count);
                    _this.cart =  _this.cart.map(shop => {
                        // prop 一般就是用与获取或者修改表单元素的影响数据的属性，比如下拉菜单的select,按钮的disabled,选框的checked
                        if (shop.id === id) {
                           shop.num = count;
                           $(this).parents('.mycart-item').find('.mycart-item-price').html(`${shop.price * shop.num} 元`)
                        }
                        return shop;
                   })
                    localStorage.setItem('cart', JSON.stringify(_this.cart));
                    _this.totalMoney();
                    let html = 0;
                    $('.inpt_cart_list_buy_num').each( function () {
                        html += ($(this).val() - 0)
                    })
                    $('.navico-cartnum').html(html)
                   
                });
                $('.btn_cart_list_buy_min').on('click', function (){
                    const id = $(this).parents('.mycart-item').attr('data-id') - 0;
                    count = Number($(this).next().val())
                    if(count > 1){
                    count+=-1;
                    $(this).next().val(count);
                    _this.cart =  _this.cart.map(shop => {
                        // prop 一般就是用与获取或者修改表单元素的影响数据的属性，比如下拉菜单的select,按钮的disabled,选框的checked
                        if (shop.id === id) {
                           shop.num = count
                           $(this).parents('.mycart-item').find('.mycart-item-price').html(`${shop.price * shop.num} 元`)
                        }
                        return shop;
                   })
                   
                    localStorage.setItem('cart', JSON.stringify(_this.cart));
                    _this.totalMoney();
                    let html = 0;
                    $('.inpt_cart_list_buy_num').each( function () {
                        html += ($(this).val() - 0)
                    })
                    $('.navico-cartnum').html(html)
                }})
                $('.inpt_cart_list_buy_num').on('keyup', function () {
                    const id = $(this).parents('.mycart-item').attr('data-id') - 0;
                    count = Number($(this).val())
                    console.log(count)
                    _this.cart =  _this.cart.map(shop => {
                        // prop 一般就是用与获取或者修改表单元素的影响数据的属性，比如下拉菜单的select,按钮的disabled,选框的checked
                        if (shop.id === id) {
                           shop.num = count;
                           $(this).parents('.mycart-item').find('.mycart-item-price').html(`${shop.price * shop.num} 元`)
                        }
                        return shop;
                   })
                    localStorage.setItem('cart', JSON.stringify(_this.cart));
                    _this.totalMoney();
                    let html = 0;
                    $('.inpt_cart_list_buy_num').each( function () {
                        html += ($(this).val() - 0)
                    })
                    $('.navico-cartnum').html(html)
                })
                // let html = 0;
                // $('.inpt_cart_list_buy_num').each( function () {
                //     html += ($(this).val() - 0)
                // })
                // $('.navico-cartnum').html(html)
                // console.log(123)
            }
            

            //删除按钮
            del () {
                const _this = this;
                $('.btn-del').on('click', function () {

                    // console.log(11111111111)
                    if(confirm('你确定删除吗？')){
                    const id = $(this).parents('.mycart-item').attr('data-id') - 0;
                    //修改每一项的值，返回数组
                    _this.cart.forEach((item, index) => {
                        if(item.id === id){
                            _this.cart.splice(index, 1);
                            $(this).parents('.mycart-item').css('display', 'none');
                        }
                    })
                    if(_this.cart.length === 0){
                        $('.mycart-list').hide()
                        $('.noshop').show()
                        localStorage.removeItem('cart');
                        $('.total').html(0);
                    } else {
                        $('.noshop').hide()
                        $('.mycart-list').show();
                        localStorage.setItem('cart', JSON.stringify(_this.cart));
                    }
                    // console.log(_this.cart);
                    
                    // _this.showData(); 
                    // _this.del()
                    _this.totalMoney();
                    footer.cart();
                }})
            }

            //退出按钮
            quit () {
                console.log('quit');
                console.log($('.nextlogin a'));
                $('.nextlogin a').on('mousedown', () => {
                    console.log(132);
                    location.href = '/index.html'
                })
            }

        }

        new Cart()
    })
})