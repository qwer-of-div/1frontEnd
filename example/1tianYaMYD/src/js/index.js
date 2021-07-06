require(['/js/modules/config.js'], () => {
    require(['url', 'template', 'header', 'footer'], (url, template) => {
        class Index {
            constructor () {
                // console.log(url)
                this.reqJsonData().then(resp => {
                    this.showJsonData(resp);
                })
            }

            //初始化
            init () {
                // console.log($('inpt_header_search'))
            }

            //请求数据
            reqJsonData () {
                return new Promise(resolve => {
                    $.get(`${url.jsonUrl}index.json`, resp => {
                        resolve(resp);
                    })
                })
            }

            //渲染数据
            showJsonData (resp) {
                if(resp.code === 200){
                let str = template('mainJson-Tmp',{...resp})
                // console.log(resp)
                $('#mainJson').html(str);
            }}
        }
        new Index();
    })
})

