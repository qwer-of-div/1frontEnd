define(['url', 'jquery','tools', 'cookie'], (url) => {
    class Header {
        constructor() {
            this.load().then(() => {
                this.isCookie();
                this.cartClick();
                // console.log(this.cookie)
                this.headlock();
                this.search();
                this.mouseEL();
                // this.login1();
                this.quit();
                // this.login();
                // this.modal();
                // this.quitCart();
            });
        }
        // 加载header.html文件
        load() {
            
            return new Promise(resolve => {
                $('header').load('/html/modules/header.html', resolve);

            })
        }

        //退出cart
        quitCart () {
           
                console.log(location)
                if (location.pathname === '/html/cart.html') {
                    $('.nextlogin a').on('mouseup', () => {
                        location.href = "/index.html"
                    })
                }
            
        }

        //头部固定
        headlock () {
            var flag = true;
            $(document).scroll(function() {
                
                if($(document).scrollTop() > 200 ){
                    if(flag){
                        flag = false
                   
                    $('.top-action').css({
                        'position': 'fixed',
                        'top': -200,
                        'left': 0,
                        'zIndex':100
                    }).animate({
                        'top': 0
                    },1500)
               } } else {
                    $('.top-action').css({
                        'position': 'static',
                       
                    })
                   
                    flag = true;
                }
            });
        }

        //cookie判断
        isCookie () {
            this.cookie = $.cookie('userinfo');
                if (this.cookie) {
                    this.cookie = JSON.parse(this.cookie);
                    this.cookie.forEach(item => {
                        if (item.hasOwnProperty('checked')) {
                            const username = item.username
                            this.afterLogin(username);

                        }
                    })
                } 
        }

        
        login () {
            // console.log(124)
            $('.prelogin').on('click', () => {
                if(tools.getCookie('username')){
                    $('.modal1 .username').val(tools.getCookie('username'));
                    if(tools.getCookie('password')){
                        $('.modal1 .password').val(tools.getCookie('password'));
                    }else{
                        $('.modal1 .password').val('');
                    }
                }
                $('.modal1').css('display','block');
            });

            $('.nextlogin a').on('click', () => {
                $('.prelogin').css('display','block');
                $('.nextlogin').css('display','none');
            })
        }

        //登录,退出
        quit () {
            $('.nextlogin a').on('click', () => {
               if(confirm('大佬，你真的要离开我吗？')){
                    // console.log(this.cookie)
                const html = $('.nextlogin span').html();
                this.cookie = $.cookie('userinfo');
                this.cookie = JSON.parse(this.cookie);
                this.cookie = this.cookie.map(item => {
                    if(item.username === html){
                    delete item['checked'];
                    }
                    return item;
                })
                $.cookie('userinfo', JSON.stringify(this.cookie), { expires: 7, path: '/' });
                $('.prelogin').css('display','block');
                $('.nextlogin').css('display','none');
                $('.navico-cartnum').html(0);
                if (location.pathname === '/html/cart.html') {
                    
                        location.href = "/index.html"
                   
                }
               }
            })
        }

        afterLogin (param) {
            $('.prelogin').css('display','none');
            $('.nextlogin').css('display','block');
            $('.nextlogin span').html(param);

        }

        cartClick () {
            
            $('.cartbox1').on('click', () => {
                if($('.nextlogin').css('display') === 'block') {
                   location.href = "/html/cart.html"
                } else {
                    alert('未登录，请登录！')
                }
            })
           }

        //模态框事件
        modal () {
            
            $('.modal1 .cancel').on('click', () => {
                $('.modal1').css('display', 'none')
            })
            $('input[type="button"]').on('click', () => {
                // console.log(125)
                let username = $('.modal1 .username').val(),
                    password = $('.modal1 .password').val();

                tools.setCookie('username', username, {expires: 7, path: '/'})
                if($('.check-input').prop('checked')){
                    tools.setCookie('password', password, {expires: 7, path: '/'})
                }else{
                    tools.setCookie('password', password, {expires: -1, path: '/'})
                }

                $.get(`${url.jsonUrl}login.json`,{username,password}, resp => {
                    if (resp.code === 200) {
                        // console.log(resp.body.login[0].username,$('.modal1 .username'))
                        if(username === resp.body.login[0].username && password === resp.body.login[0].password){
                            $('.modal1 .cancel').trigger("click");
                            this.afterLogin();
                        }
                    }
                })

                
            })
        }

        // 完成百度搜索效果
        search() {
            $('#inpt_header_search').on('keyup', function () {
                let keyword = $(this).val();
                $.getJSON(
                    `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${keyword}&cb=?`,
                    resp => {
                        var str = '';
                        $('#blk_header_search ul').html('');
                        resp.s.forEach(function (ele) {
                            str += '<li>' + ele + '</li>';
                        });
                        $('#blk_header_search ul').html(str);
                    }
                )
            });
            $('#blk_header_search ul').on('mousedown', 'li', function (e) {
                //   console.log($(this));
                var str = 'https://www.baidu.com/s?ie=UTF-8&wd=' + $(this).html();
                window.open(str,'_blank');
            });
            $('#inpt_header_search').on('blur', function () {
                $('#blk_header_search ul').html('');
            });
            $('#inpt_header_search').on('focus', function (e) {
                $(this).on('keyup', function (e) {
                    if(e.which === 13){
                        var str = 'https://www.baidu.com/s?ie=UTF-8&wd=' + $(this).val();
                        window.open(str,'_blank');
                    }
                })
            });
        }

        //全部商品
        mouseEL () {
            $('.all-class').on('mouseenter', () => {
                $('.top-submenu').css('display','block');
            });
            $('.top-head').on('mouseleave', () => {
                $('.top-submenu').css('display','none');
            });
        }

    }
    return new Header();
})