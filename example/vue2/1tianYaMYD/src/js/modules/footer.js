define(['jquery', 'cookie'], () => {
    class Footer {
        constructor () {
            this.init().then(resp => {
                this.isCookie()
                this.cartClick();
            });
           
        }
        init () {
            return new Promise(resolve => {
                $('footer').load('/html/modules/footer.html', resolve);
            })
            
        }

        //cookie 获取
        isCookie () {
            this.cookie = $.cookie('userinfo');
                if (this.cookie) {
                    this.cookie = JSON.parse(this.cookie);
                    this.cookie.forEach(item => {
                        if (item.hasOwnProperty('checked')) {
                            this.cart();
                            // console.log(item.hasOwnProperty('checked'))
                        }
                    })
                } else {
                    $('.navico-cartnum').html(0);
                }
                
        }

        //购物车
        cart () {
            
            let cart = JSON.parse(localStorage.getItem('cart'));
            if (cart) {
                let num = cart.reduce((num, shop) => {
                    return num += shop.num;
                }, 0)
                // console.log('---------aaaaaaaaaaaaa',num)
                $('.navico-cartnum').html(num);
            } else {
                $('.navico-cartnum').html(0)
            }
        }

        //购物车点击事件
       cartClick () {
        $('.mycart').on('click', () => {
            if($('.nextlogin').css('display') === 'block') {
                location.href = "/html/cart.html"
            } else {
                alert('未登录，请登录！')
            }
        })
       }
    }
    return new Footer();
})