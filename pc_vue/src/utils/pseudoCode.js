
/**
 * 伪代码
 *
 * 个数 新需求时 多方案可采用时 更要仔细斟酌 一个页面至少三个入口 首次进入 返回 刷新
 *
 * 应用场景-->兼容性-->浏览器窗口缩放事件-->宽高适配（自适应）
 * 登录-->手机号一键登录-->第三方-->小程序授权-->账号密码
 * 用户类型-->同一类型级别 eg:高级 低级 用户角色权限重叠
 * html-->body--header--content--footer 自上而下（整体） 自左到右（局部） 找到所有存在处 找出区别 增加多余项 设为传参 html使用是否
 * css components api mixin-->全局 局部 staticData.js
 * vuex-->全局变量 localstorage缓存 dic字典
 * utils 优先弹框样式:纯提示(提示语)、一个按钮带操作、两个按钮带操作 功能 区分：删除、确认 数量区分：1、2、3、提示文字居中还是靠左，单行/多行
 * js-->多情况时，先分析有几种情况
 * 每个页面都可独立存在-->前端缓存输入数据 实时请求的字典返显 需要后台存储name Code判断 name语言为中文 英文
 * Pc划不动手机划不动
 * 需求、测试、更多时间
 * 赋值不会触发input事件
 * Radio字符串
 * 路由传参自动修改为字符串类型
 * 下载文件请求返回都要加跨域
 * 分页不重置 total
 * 组件清空
 * loading 0无数据 || 1加载中 || 2有数据 || 3初始化 || 4失败
 * 全页面loading 禁止加载期间的其他操作
 * 传功能type，类别type，提示信息不同(type, params)
 *  @click.native.stop="onInput"
 * Function和undefined 无法拷贝
 * publicPath: "/admin",
 * Id label
 * // 1 添加子路由，第一个参数是父路由的name名，后面是子路由的数据
 * router.addRoute({ name: 'admin', path: '/admin', component: Admin })//1 父路由
 * router.addRoute('admin', { path: 'settings', component: AdminSettings })//1 子路由
 * 如果上面添加的路由页面没有变化，那么就添加这行代码
 * router.replace(router.currentRoute.value.fullPath)//替换当前路由页面的路由
 * 初始和后面分开
 * for (let item of list || []) {上
 * 全局对局部无影响时请求放全局
 * console.dir(err)错误打印
 * 增加为空判断，增加重复判断
 * 修改为空判断，修改重复判断,对子级标识位影响
 * 关闭前清空，type
 * 按钮权限
 * 菜单权限
 * 路由权限
 * 接口权限
 *
 * 有前端筛选的 要 保存原始数据
 * date.getTime() 比较大小
 * 1.列表提交-详情页为组件，详情页修改，表单验证，保存至列表数据，返回列表验证，进行提交
 * 2.分页、导出-保存请求参数，使用保存过的请求参数进行分页或者导出查询
 * 不同环境：本地、beta、蓝区、正式，不同服务名
 * 后续加入功能对之前功能的影响
 * fileUrl: "D:\\\\riskclean\\\\", // 文件下载路径
 * Copilot
 * 分区块 使用不同的form
 * console.dir(err)错误打印
 * 组件自己发请求、销毁还原数据
 * 页面与页面传参只需要最终需要的结果
 * 保存请求参数在调接口之前
 * statisticEcharts(params, type) {
 * 自测：正向验证、反向验证
 * 成功 失败 等待 失效 自定义
 * // 要转义
 * 参数的先后顺序，前面参数修改要初始化后面参数
 * 设置api请求参数apiParams(无法改变) 保存请求参数 参数格式化同一处理
 * App - /login 不写组件首页函数不会触发 写组件触发组件内方法
 * 初始赋form的值--关闭form后继续使用form的值
 * 笔记本 最外层要有一个最小高度和宽度
 * 全局接口写在'/'的component内，redirect
 * echarts在哪些页面使用了 便于之后组件版本升级检查
 *

 * @return {listHtml} 列表 div
 * @return {countDown} 验证码倒计时
 * @return {queryList} 查询 保留查询参数 重置 恢复到初始页面
 * @return {backList} 返回列表
 * @return {nextPage} 下一页
 * @return {fromPage} 来自哪个页面
 * @return {formInput} 表单输入
 * @return {formLeave} 表单分离
 * @return {listSubmit} 列表提交
 * @return {formatParams} get请求参数格式化
 * @return {optionFormat} 数据格式化
 */

/**
 * 列表 div
 * 分页 拆分组件
 */
export const listHtml = () => {
  const firstClass = 'firstClass'
  const cellValue = []
  const resLi = (li) => {
    return (<li>{li.fileName}</li>)
  }
  const repOfficeKlTable = this.$refs.repOffice_KlTable
  repOfficeKlTable.initTableData()

  // ref改变值
  if (this.$refs.deliverTableRef) {
    this.$refs.deliverTableRef.toget = 'togeted'
  }

  // watch记录下上次数组长度，下拉进行长度比较
  return (<div class="page-contatiner">
    <div class="page-content">
      <div class="search-wrap"></div>
      <div class="list-wrap">
        <div class="list">
          <div class="item" v-for="item in list"></div>
        </div>
        {/* <div class="initData"></div>
        <div class="empty"></div>
        <div class="error"></div> */}
        <my-loading></my-loading>
      </div>
    </div>
  </div>)

  return (<ul
    class={firstClass}
    onClick={() => { }}
  >
    {
      cellValue.map(item => {
        return resLi(item)
      })
    }
  </ul>
  )
}

// 以功能区分 close open type 有一点不同赋值就不同
export const childClose = ({ type = 'oneSelf', data: { } = {} }) => {
  if (type === '') {
  }
  this.page.siteInventoryDetailShow = false
}

/**
 * 验证码倒计时
 */
export const countDown = () => {
  const timer = setInterval(() => {
    this.daojishi--
    if (this.daojishi === 0) {
      this.daojishiShow = true
      this.daojishi = 60
      clearInterval(timer)
    }
  }, 1000)
}

/**
 * 查询 保留查询参数 重置 恢复到初始页面
 */
export const queryList = () => {
  return {
    code: 200,
    msg: '获取数据成功！',
    data: {}
  }
  // 各个查询条件的组合，每个查询条件选项值是否可以手动赋空
  // 在发请求方法内,保存请求参数，后面刷新保存
  // 刷新保存请求参数
  // 首页清除请求参数
  // 每存在一个查询页面，每有一个查询对象相对应
  // vuex+localStorage
}

/**
 * get请求参数格式化
 * @param {obj} params
 */
export const formatParams = (params) => {
  let _payload = JSON.stringify(payload)
  _payload = _payload.replace(/id/g, 'value')

  let resParams = '?'
  for (const key in params) {
    const val = params[key]
    if (val) {
      resParams += key + '=' + params[key] + '&'
    }
  }
  return resParams.slice(0, resParams.length - 1)
}

// 数据格式化
export const optionFormat = (list) => {
  list.forEach(item => {
    item.value = item.id
    item.label = item.text
    if (item.children) this.optionFormat(item.children)
  })
  return list
}

// format数据
export const formatData = (item, row) => {
  let res = '--'
  if (item.options) {
    for (const it of item.options) {
      if (it.value === row[item.value]) res = it.label
    }
  } else {
    res = row[item.value] || '--'
  }
  return res
}

/**
 * 返回列表
 */
export const backList = () => {
  // 保存数据
  // 其他页面进入重置数据
  // 当前页面刷新、返回、刷新返回、直接路由进入
  // 数据、scroll、tabs、单选、多选
  // 刷新是否保存数据？
  // this.$router.go(-1) 返回和首次进入相同 使用路由传参params eg：title
  const beforeRouteEnter = function (to, from, next) {
    // 返回和首次不同

    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // created之前
    next(vm => {
      vm.page.from = 'back'
      // created之后 mounted获取
      console.log(vm.page.from, from)
    })
  }
  return function mounted () {
    if (['/', 'home'].includes(this.page.from)) {
      this.storage.tabs = '0'
      this.storage.scroll = '0'
      this.storage.query = {}
      // 分页查询
      this.storage.list = []
    }
    this.apiQuery(this.storage.query)
    // 分页查询
    this.list = JSON.parse(JSON.stringify(this.storage.list))
  }
}

/**
 * 下一页
 */
export const nextPage = () => {
  // localStorage
  // 返回是否在当前页 tabs,scroll
  // 后台数据返回判断下一页是否存在，使用localstorage,vuex
  // 判断localstorage,vuex是否可进入路径
  // 是否进入下一个页面，由上一个页面获取数据决定，带返回功能请赋值
  // 页面数据，是当前页面决定
  // beforeRouteLeave (to, from, next) {
  //   this.page.scrollTop = document.querySelector('.patch-delivery-page').scrollTop
  //   next()
  // }
}

/**
 * 来自哪个页面
 */
export const fromPage = () => {
  // 下一个页面
  // from: {} vuex and Local
}

/**
 * 表单
 */
export const formInput = () => {
  // 数据来源 只属于本系统 来自其他系统

  // 禁用 重置放入一个对象 由另一个对象引起
  // computed pageNew formNew flagNew计算值变化

  // 输入 回显 code+name判断

  // 纯code code还原name 后端无法判断code、name是否匹配 最正确 选择项computed
  // 使用code判断 即时转换 最正确

  // code、name 后端可以判断 最简单
  // 使用name判断 统一转换 提交也使用name判断 code判断给后端 最简单
}

/**
 * 表单分离
 */
export const formLeave = () => {
  // 表单分离组件模块 for in 循环 .sync
}

/**
 * 列表提交
 */
export const listSubmit = () => {
  // 发请求的才分页面 列表提交使用body遮罩层 注意清空body遮罩层内的数据
  // 列表提交校验
}
// 循环找数组中某一项
export const findItem = (list = [], id = 'test', key = 'path') => {
  for (const item of list || []) {
    if (item[key] == id) return item
    const item1 = this.findItem(item.children, id)
    if (item1) return item1
  }
}

// "dev": "cross-env NODE_ENV=dev vue-cli-service serve --open --hot",
//     "build:alpha": "cross-env NODE_ENV=alpha  vue-cli-service build  --mode alpha",
//     "build:beta": "cross-env NODE_ENV=beta  vue-cli-service build  --mode beta",
//     "build:prod": "cross-env NODE_ENV=prod vue-cli-service build --mode prod",
//     "build:report": "vue-cli-service build --open --report",
//     "fix": "vue-cli-service lint"
// "dev": "concurrently \"npm run mock\" \"npm run serve:dev\"",
//     "serve:dev": "cross-env NODE_ENV=development dotenv -e .env.dev.serve vue-cli-service serve",
//     "build:dev": "cross-env NODE_ENV=production  dotenv -e .env.dev.build vue-cli-service build",
//     "serve:prod": "cross-env NODE_ENV=development dotenv -e .env.prod.serve vue-cli-service serve",
//     "build:prod": "cross-env NODE_ENV=production  dotenv -e .env.prod.build vue-cli-service build",
//     "mock": "cd mock && ts-node-dev mock.ts"
