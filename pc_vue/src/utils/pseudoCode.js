
/**
 * 伪代码
 * 
 * 个数 新需求时 多方案可采用时 更要仔细斟酌 一个页面至少三个入口 首次进入 返回 刷新
 * 
 * 修改 赤橙黄绿青蓝紫 时间节点
 * 应用场景-->兼容性-->浏览器窗口缩放事件-->宽高适配（自适应）
 * 登录-->手机号一键登录-->第三方-->小程序授权-->账号密码
 * 用户类型-->同一类型级别 eg:高级 低级 用户角色权限重叠
 * html-->body--header--content--footer 自上而下（整体） 自左到右（局部） 找到所有存在处 找出区别 增加多余项 设为传参 html使用是否
 * css-->全局
 * components-->全局 局部组件
 * api-->全局 局部
 * mixin-->全局方法
 * vuex-->全局变量 localstorage缓存 dic字典
 * utils 优先弹框样式:纯提示(提示语)、一个按钮带操作、两个按钮带操作 功能区分：删除、确认 数量区分：1、2、3、提示文字居中还是靠左，单行/多行
 * js-->多情况时，先分析有几种情况
 * 每个页面都可独立存在-->前端缓存输入数据 实时请求的字典返显 需要后台存储name Code判断 name语言为中文 英文
 * Pc划不动手机划不动
 * 需求、测试、更多时间
 * 循环定时器发请求
 * 中文、英文、符号以前面为准
 * 赋值不会触发input事件
 * Radio字符串
 * 前端不接受null
 * 路由传参自动修改为字符串类型
 * 切换 对每一个数据影响 新增数据 对原来数据的影响 原来数据对它的影响
 * Watch SettimeOut(0) idtype birthday
 * code name 标识位 写注释
 * 
 * @return {listHtml} 列表
 * @return {countDown} 验证码倒计时
 * @return {queryList} 查询 保留查询参数 重置 恢复到初始页面
 * @return {backList} 返回列表
 * @return {nextPage} 下一页
 * @return {fromPage} 来自哪个页面
 * @return {formInput} 表单输入
 * @return {formLeave} 表单分离
 * @return {listSubmit} 列表提交
 */

/**
 * 列表
 * 分页 拆分组件
 */
export const listHtml = () => {
  // watch记录下上次数组长度，下拉进行长度比较
  <div class="page-contatiner">
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
  </div>
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
  // 各个查询条件的组合，每个查询条件选项值是否可以手动赋空
  // 在发请求方法内,保存请求参数，后面刷新保存
  // 刷新保存请求参数
  // 首页清除请求参数
  // 每存在一个查询页面，每有一个查询对象相对应
  // vuex+localStorage
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
  return function beforeRouteEnter (to, from, next) {
    // 返回和首次不同

    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // created之前
    console.log('beforeRouteEnter')
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



