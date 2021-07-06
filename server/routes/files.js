const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const utils = require(global.modulePath('utils')) // 获取模块路径
const baseUrl = '/files'

router.post(`${baseUrl}/upload`, multer({
  // 设置文件存储路径
  dest: 'public/img'
}).array('file', 4), (req, res, next) => { // 4 最大上传个数
  const files = req.files
  for (const item of files) {
    const date = new Date()
    const path = `public/img/${utils.dateFormat(date)}_${item.originalname}`
    fs.renameSync('./public/img/' + item.filename, path)
  }
  console.log(req, 99, utils.dateFormat(new Date()), req.files)
  res.json({
    code: 200,
    msg: 'OK'
  })
})

// router.post(`${baseUrl}/upload`, multer({
//   // 设置文件存储路径
//   dest: 'public/img'
// }).array('file', 1), (req, res, next) => {
//   const files = req.files
//   const file = files[0]
//   console.log(files, 99, utils)
//   const fileInfo = {}
//   const path = 'public/img/' + Date.now().toString() + '_' + file.originalname
//   fs.renameSync('./public/img/' + file.filename, path)
//   // 获取文件基本信息
//   fileInfo.type = file.mimetype
//   fileInfo.name = file.originalname
//   fileInfo.size = file.size
//   fileInfo.path = path
//   res.json({
//     code: 200,
//     msg: 'OK',
//     data: fileInfo
//   })
// })

module.exports = router
