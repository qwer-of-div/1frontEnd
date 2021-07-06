
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

global.modulePath = (modulePath) => { // 全局变量
  return path.resolve(__dirname, modulePath)
}

// 接口路由
const apiCommon = require('./routes')
const apiFiles = require('./routes/files')

app.use('/public', express.static('./public'))

// app.use(apiCommon)
// app.use(apiFiles)
const use = { apiCommon, apiFiles }

for (const key in use) {
  app.use(use[key])
}

app.listen(9999, () => {
  console.log('server is on 9999')
})
