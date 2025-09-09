alert('欢迎使用jason的服务');

download.onclick = function () {
  window.location.href = document.location.protocol + '//' + document.location.hostname + ':' + document.location.port + '/hzx.zip';
}