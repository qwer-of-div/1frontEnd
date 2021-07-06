require(['/js/modules/config.js'], () => {
    require(['cookie','tools'], () => {
        class Login {
            constructor() {
                // console.log($.cookie('userinfo'))
                // console.log(this.cookie)
                this.username = document.querySelector('#username');
                this.password = document.querySelector('#password');
                this.checkbox = document.querySelector('#checkbox');
                this.login = $('#login');
                this.cookie = $.cookie('userinfo');
                this.register = $('#register')
                this.init();
                // this.checkClick();

                this.reg();
                this.login1();
                // this.background1();
                this.back();
            }
            //初始化
            init() {
                this.getCookie();
                if (this.cookie) {
                    console.log(this.cookie)
                    this.cookie.forEach(item => {
                        if (item.hasOwnProperty('checkbox')) {

                            if (item.checkbox) {
                                $('#username').val(item.username)
                                $('#password').val(item.password)

                            } else {
                                $('#username').val(item.username)
                            }
                        }

                    })
                }
            }

            //读取cookie
            getCookie() {

                this.cookie = $.cookie('userinfo');
                // console.log(this.cookie)
                if (this.cookie) {
                    this.cookie = JSON.parse(this.cookie);
                }



            }

            //加载背景图
            background() {
               
                var imgs = ["/images/login4.jpg", "/images/login1.jpg", "/images/login3.jpg"];    //（设定想要显示的图片）
                var i = 0;
                var head = document.querySelector("body");//获取DIV对象
                head.style.backgroundImage = "url(/images/login3.jpg)";   //设置图片的初始图片为该路径的图片
             
                setInterval(function time() {
                    i++;
                    i = i % 3;         // 超过2则取余数，保证循环在0、1、2之间
                    head.style.backgroundImage = "url(" + imgs[i] + ")";
                    console.log(head.style.backgroundImage)
                }, 2000);//循环调用time1()函数，时间间隔为2000ms
            }

            //加载背景图
            background1 () {
              
                var body = document.querySelector("body");
                    // body.animate({backgroundImage:'/images/login3.jpg',opacity:'0.1'},"slow");
                    // body.animate({backgroundImage:'/images/login4.jpg',opacity:'1'},"slow");
                    // body.animate({backgroundImage:'/images/login1.jpg',opacity:'0'},"slow");
                    // body.animate({backgroundImage:'/images/login3.jpg',opacity:'1'},"slow");
                    body.animate({opacity:'0.1'},"slow");
                    body.animate({opacity:'1'},"slow");
                    body.animate({opacity:'0'},"slow");
                    body.animate({opacity:'1'},"slow");
            }

            //注册
            reg() {
                this.register.on('click', () => {
                    let username = this.username.value,
                        password = this.password.value;
                    if (username !== '' && password !== '') {
                        this.getCookie();
                        // this.cookie.forEach(item => {
                        //     if(item.username === username) {
                        //         alert('用户名已存在，请重试！')
                        //     } else {



                        //     }
                        // })
                        if (this.cookie) {
                            //some遍历每一项判断条件是否存在，返回boolean
                            const isExist = this.cookie.some(shop => {
                                return shop.username === username;
                            })
                            if (isExist) {
                                //map 遍历每一项 返回每一项，形成新数组
                                // cart = cart.map( shop => {
                                //     if(shop.id === this.id) shop.num += count;
                                //     return shop;
                                // })
                                alert('用户名已存在，请重新输入！')
                            } else {
                                //有其他商品，本商品是第一次加入购物车
                                this.cookie.push({ username, password })
                                alert('注册成功,请登录！')
                            }
                            this.cookie = JSON.stringify(this.cookie);
                            $.cookie('userinfo', this.cookie, { expires: 7, path: '/' });
                        } else {
                            let arr = [{ username, password }];
                            $.cookie('userinfo', JSON.stringify(arr), { expires: 7, path: '/' });
                            alert('注册成功,请登录！')
                        }

                        console.log($.cookie('userinfo'))
                    } else {
                        alert('用户名或密码不能为空！')
                    }
                })
            }

            //登录点击事件
            checkClick() {
                this.login.onclick = e => {
                    e = e || window.event;
                    let username = this.username.value,
                        password = this.password.value;
                    if (this.username.value === "Jun" && this.password.value === "123") {
                        tools.setCookies({ username }, { path: '/' });
                        // console.log('a')
                        if (this.checkbox.checked) {
                            tools.setCookies({ password }, { path: '/' });
                        } else {
                            tools.setCookies({ password }, { expires: -1, path: '/' });
                        }
                    }
                    location.href = "2login.html";
                    // e.preventDefault();
                }
            }

            //登录事件
            login1() {
                this.login.on('click', () => {
                    let username = this.username.value,
                        password = this.password.value;
                    this.getCookie();
                    this.is = -1;
                    if (this.cookie) {
                        this.cookie = this.cookie.map((item, index) => {
                            delete item['checkbox'];
                            delete item['checked'];

                            if (item.username === username && item.password === password) {
                                this.is = index;
                                item.checked = $('#checkbox').prop('checked');
                                item.checkbox = $('#checkbox').prop('checked')
                            }
                            return item
                        })
                        $.cookie('userinfo', JSON.stringify(this.cookie), { expires: 7, path: '/' });
                        // console.log(this.cookie)
                        if (this.is != -1) {

                            window.history.go(-1);
                            // console.log(this.cookie)
                            // console.log($('#checkbox').prop('checked'))
                        } else {
                            alert('账号或密码错误，请重新输入！')
                        }
                    } else {
                        alert('账号不存在， 请注册！')
                    }





                })
            }

            //背景动画
            back () {
                
                setInterval ( function () {
                    let count = Math.random() * 50 + 50;
                   
                    let str = ''
                   for(var i = 0; i < count; i++){
                    let left = Math.random() * $(document.body).width();
                    let top =  Math.random() * $(document.body).height();
                    let a = Math.random() * 255;
                    let b = Math.random() * 255;
                    let c = Math.random() * 255;
                    // console.log(left)
                        str += `<li style="left:${left}px;top:${top}px;background-color: rgba(${a},${b},${c})"></li>`;
                   }
                    $('ul').html(str);
                    // console.log(left)
                },1000)
            }
        }

        new Login();
    })
})
