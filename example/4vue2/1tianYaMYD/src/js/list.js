
require(['/js/modules/config.js'], () => {
    require(['url', 'template', 'header','footer'], (url,template) => {
        // console.log(123)
        class List {
            constructor () {
                this.getData().then( resp => {
                    this.showData(resp);
                    this.classClick();
                    this.priceRank()
                })
            }
            
            //获取数据
            getData () {
                this.id = Number(window.location.search.slice(4));
                return new Promise( resolve => {
                    $.get(`${url.rapUrl}list`, {id: this.id}, resp => {
                        resolve(resp);
                    })
                })
            }

            //渲染数据
            showData (resp) {
                if (resp.code === 200) {
                    this.list = resp.body.list;
                    let str = template('list-template', {...this.list});
                    $('#list').html(str);
                }
            }

            //分类点击事件
            classClick () {
                $('.fltbox1 dd').on('click', () => {
                    this.getData().then( resp => {
                        this.showData(resp);
                        // this.classClick();
                    })
                })
            }

            //价格排序
            priceRank () {
                console.log(JSON.parse(localStorage.getItem('cart')));
                let flag = 0
                $('.priceRank').on('click', () => {
                    let eles = $('#list li')
                    flag++;
                    var a = [];
                    for(var i=0;i<eles.length;i++){
                        a[i] = eles[i];
                    }
                    a.sort(function(li1,li2){
                        console.log($(li1).find('.new-pri').html().slice(1))
                        var n = parseFloat($(li1).find('.new-pri').html().slice(1));
                        var m = parseFloat($(li2).find('.new-pri').html().slice(1));
                        return n-m;
                    });
                    if (flag % 2) {
                        for(var i=0;i<a.length;i++){
                            $('#list').append(a[i]);
                        }
                    } else {
                        for(var i=0;i<a.length;i++){
                            $('#list').append(a[a.length-1-i]);
                        }
                    }
                   
                })
            }
        }

        new List();
    })
})