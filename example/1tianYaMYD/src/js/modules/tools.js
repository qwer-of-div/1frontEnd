var tools = {
    /** 1 获取外部样式方法
     * @param   obj     <DOM object>    获取样式的DOM元素
     * @param   attr    <string>        要获取的属性名      eg：left    color
     * @return          <string>        样式属性值          eg：100px   #f96
     */
    getStyle: function (obj,attr) {
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return getComputedStyle(obj,false)[attr];
        }
    },

    /** 2 设置元素样式
     * @param   obj     <DOM object>    要设置样式的DOM元素
     * @param   attr    <object>        设置样式的键值对    eg：{left: '100px',color: '#f96'}
     */
    css: function (obj,attr) {
        for(var key in attr){
            obj.style[key] = attr[key];
        }
    },

    /** 3 给元素添事件监听
     * @param   obj         <DOM object>    条件事件监听的DOM元素
     * @param   type        <string>        事件类型('不带on')                                                          eg：click   keydown
     * @param   fn          <function>      事件处理函数
     * @param   isCapture   <boolean>       是否捕获（true代表在捕获阶段处理事件，false代表在冒泡阶段处理，默认为false）    eg：true    false
     */
    on: function (obj,type,fn,isCapture) {
        //判断isCapture是否被传递，如果没传值是undefined，这个时候就应该赋值为false，否则就等于传递进来的值
        isCapture = isCapture === undefined ? false : isCapture;
        if(obj.attachEvent){
            obj.attachEvent('on' + type,fn)
        }else{
            obj.addEventListener(type,fn,isCapture)
        }
    },

    /** 4 获取浏览器宽高
     * @return  <object>    
     */
    getBodySize: function () {
        return {
            width: document.documentElement.clientWidth || document.body.clientWidth,
            height: document.documentElement.clientHeight || document.body.clientHeight
        }
    },
    
    /** 让元素在固定时间内某个属性匀速运动到某点
     * @param obj       <DOM object>    要运动的元素
     * @param attr      <string>        运动的属性名称
     * @param end       <number>        运动终点
     * @param duration  <number>        运动持续时间，单位ms
     * @param fn        <function>      回调函数，动画结束后调用的函数
     */
    move: function (obj, attr, end, duration, fn) {
        clearInterval(obj.timer);
        //起点值
        var start = parseInt(this.getStyle(obj, attr));
        //总距离
        var distance = end - start;
        //总步数
        var steps = parseInt(duration / 30);
        //速度
        var speed = distance / steps;
    console.log(speed);
        //记录当前是第几步
        var n = 0;
        obj.timer = setInterval(function () {
            //每运动一步  +1
            n++;
            //起始值加上当前步数乘以速度
            obj.style[attr] = start + n * speed + 'px';
            if (n === steps) {
                clearInterval(obj.timer);
                obj.style[attr] = end + 'px';
                //结束之后的回调函数，判读是否传入回调函数undefined
                fn && fn();
            }
        }, 30)
    },
    
    /**减速运动
     * 
     * @param   obj     <DOM object>    要运动的元素
     * @param   attr    <string>        要运动的属性
     * @param   end     <number>        运动终点
     */
    slowMove: function (obj,attr,end) {
        clearInterval(obj.timer);
        //起点
        var start = parseInt(this.getStyle(obj,attr));
       
        obj.timer = setInterval(function () {
            //距离
            var distance = end - start;
            //速度
            var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10);
            start += speed;
            obj.style[attr] = start + 'px';
            if(distance === 0){
                clearInterval(obj.timer);
            }
        },30)
    },
    
    /** 设置cookie
   * @param key <string> 要设置的cookie的名称
   * @param value <string> 要设置的cookie的值
   * @param option <object> {expires, path}
   */
  setCookie (key, value, option) {
    var str = key + '=' + encodeURIComponent(value);
    if (option) {
      if (option.expires) {
        var date = new Date();
        date.setDate(date.getDate() + option.expires);
        str += ';expires=' + date.toUTCString();
      }
      if (option.path) {
        str += ';path=' + option.path;
      }
    }
    document.cookie = str
  },
  
   /** 设置cookie
   * @param obj    <object> {key, value}       要设置的cookie的名称 要设置的cookie的值
   * @param option <object> {expires, path}    要设置的日期，要设置的存储路径            {1,'/'}
   */
   setCookies(obj,option) {
    for(key in obj){
      var str = key + "=" + encodeURIComponent(obj[key]);
      if (option) {
        if (option.expires) {
          var date = new Date();
          date.setDate(date.getDate() + option.expires);
          str += ';expires=' + date.toUTCString();
        }
        if (option.path) {
          str += ';path=' + option.path;
        }
      }
      document.cookie = str;
    }
  },
  
  /** 取cookie
   * @param key <string> 要取的cookie的名称
   * @return <string> 当前要取得那一条cookie的值
   */
  getCookie (key) {
    var str = document.cookie;
    var arr = str.split('; ');
    var obj = {};
    arr.forEach(item => {
      var subArr = item.split('=');
      obj[subArr[0]] = decodeURIComponent(subArr[1]);
    })
    return obj[key];
  },
  
  /** ajax get请求
   * url <string> 请求的地址
   * [query] <object> 请求的时候需要携带的参数
   * fn <function>  回调函数，数据成功返回之后执行的函数
   * [isJson] <boolean> 是否是json格式的数据，默认为true
   */
  get (url, query, fn, isJson = true) {
    if (query) {
      url += '?';
      for (var key in query) {
        url += `${key}=${query[key]}&`;
      }
      // 去除结尾多出的一个 &
      url = url.slice(0, -1);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var txt = isJson ?  JSON.parse(xhr.responseText) : xhr.responseText;
          fn && fn(txt);
        }
      }
    }
  },
  
  /**
   * ajax post请求
   * url <string> 请求的地址
   * [query] <object> 请求的时候需要携带的参数
   * fn <function>  回调函数，数据成功返回之后执行的函数
   * [isJson] <boolean> 是否是json格式的数据，默认为true
   */
  post(url, query, fn, isJson = true){
    if (query) {
      var str = '';
      for (var key in query) {
        str += `${key}=${query[key]}&`;
      }
      // 去除结尾多出的一个 &
      str = str.slice(0, -1);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(str);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var txt = isJson ?  JSON.parse(xhr.responseText) : xhr.responseText;
          fn && fn(txt);
          // console.log(xhr.responseText);
        }
      }
    }
  },
  
  /** jsonp跨域请求
   * url <string> jsonp接口的url地址
   * cb <string>  全局回调函数的名称
   * [query] <object> 请求需要的其他参数
   */
  jsonp: function (url, cb, query) {
    url += '?cb=' + cb;
    if (query) {
      for (var key in query) {
        url += `&${key}=${query[key]}`;
      }
    }
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
    // 过河拆桥
    document.body.removeChild(script);
  },
  
  /** promise ajax get 请求
   * url <string> 请求的地址
   * [query] <object> 请求的时候需要携带的参数
   * [isJson] <boolean> 是否是json格式的数据，默认为true
   */
  fetch: function (url, query, isJson = true) {
    if (query) {
      url += '?';
      for (var key in query) {
        url += `${key}=${query[key]}&`;
      }
      url = url.slice(0, -1);
    }
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
            resolve(res);
          } else {
            reject();
          }
        }
      }
    });
  },
/**
 * json动画
 * @param ele  DOM元素
 * @param json json语句
 * @param fn   回调函数
 */
animate: function(ele,json,fn){
    //先清定时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //开闭原则
        var bool = true;


        //遍历属性和值，分别单独处理json
        //attr == k(键)    target == json[k](值)
        for(var k in json){
            //四部
            var leader;
            //判断如果属性为opacity的时候特殊获取值
            if(k === "opacity"){
                leader = getStyle(ele,k)*100 || 1;
            }else{
                leader = parseInt(getStyle(ele,k)) || 0;
            }

            //1.获取步长
            var step = (json[k] - leader)/10;
            //2.二次加工步长
            step = step>0?Math.ceil(step):Math.floor(step);
            leader = leader + step;
            //3.赋值
            //特殊情况特殊赋值
            if(k === "opacity"){
                ele.style[k] = leader/100;
                //兼容IE678
                ele.style.filter = "alpha(opacity="+leader+")";
                //如果是层级，一次行赋值成功，不需要缓动赋值
                //为什么？需求！
            }else if(k === "zIndex"){
                ele.style.zIndex = json[k];
            }else{
                ele.style[k] = leader + "px";
            }
            //4.清除定时器
            //判断: 目标值和当前值的差大于步长，就不能跳出循环
            //不考虑小数的情况：目标位置和当前位置不相等，就不能清除清除定时器。
            if(json[k] !== leader){
                bool = false;
            }
        }

        
        //只有所有的属性都到了指定位置，bool值才不会变成false；
        if(bool){
            clearInterval(ele.timer);
            //所有程序执行完毕了，现在可以执行回调函数了
            //只有传递了回调函数，才能执行
            if(fn){
                fn();
            }
        }
    },25);
}
}

