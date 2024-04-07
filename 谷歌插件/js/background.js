chrome.contextMenus.create({
    title: "导出代码走查单",
	onclick: function(){
        sendMessageToContent({cmd:'analysisGitLab'}, function(response){
            chrome.extension.getBackgroundPage().newTabMsg(response);
        });
	}
});

function msg(msg){
    alert(msg)
}

function newTabMsg(msg){
    localStorage.setItem('psbc_msg',msg)
    chrome.tabs.create({url:'gitlab_content.html'})
}

// 向content-script主动发送消息
function sendMessageToContent(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}