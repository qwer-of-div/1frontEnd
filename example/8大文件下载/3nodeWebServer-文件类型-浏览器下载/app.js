var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var comJS = require('./lib/index.js');

http.createServer(function (req, res) {
  console.log(999);
  if (pathname != '/favicon.ico') {
    // 获取打开页面的路径
    var pathname = url.parse(req.url).pathname;
    // var pathname = req.url;
    // 获取加载内容的 扩展名
    var extname = path.extname(pathname);

    if (pathname == '/') {
      pathname = '/index.html';
    }

    fs.readFile('static/' + pathname, function (err, data) {
      if (err) {
        console.log('404');
        fs.readFile('static/404.html', function (error, data404) {
          if (error) throw error;

          res.writeHead(404, {
            "Content-Type": "text/html;charset='utf-8'"
          });
          res.write(data404);
          res.end();
        });
      } else {
        console.log(comJS.getextName(extname))
        res.writeHead(200, {
          "Content-Type": "" + comJS.getextName(extname) + ";charset='utf-8'"
        });
        res.write(data);
        res.end();
      }
    });
  }


}).listen(7000, () => {
  console.log("Server running on http://localhost:7000");
});
