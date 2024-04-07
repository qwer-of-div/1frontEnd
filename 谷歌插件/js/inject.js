function analysisGitLab() {
    var content = '';
    try {
        var childs = document.getElementsByClassName('col-12 col-md-auto diff-files-holder container-limited limit-container-width mx-lg-auto px-3')[0].children;
        for (var i = 0; i < childs.length; i++) {
            content += childs[i].getElementsByClassName('dropdown-item')[0].href + '\n'
        }
    } catch (e) {
        console.log(e)
        content = '解析错误,请在正确的页面使用'
    }

    return content

}

// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
    if (request.cmd == 'analysisGitLab') {
        sendResponse(analysisGitLab())
    }
    else {
        sendResponse('我收到你的消息了：' + JSON.stringify(request));
    }
});
