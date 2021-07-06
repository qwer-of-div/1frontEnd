const express = require('express')
const router = express.Router()
const baseUrl = '/common'

router.post(`${baseUrl}/login`, (req, res) => {
  console.log(req) // 打印到控制台
  setTimeout(() => {
    res.send(req.body) // 发送给前端
  }, 5000)
})

module.exports = router
