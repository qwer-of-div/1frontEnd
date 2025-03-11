
let docs;
function analysisGitLab() {
    var content = '';
    try {
        var childs = document.getElementsByClassName('_2rhmJa')[0].children;

console.log(childs[0].innerText, 963);

	

        for (var i = 0; i < childs.length; i++) {
            content += childs[i].innerText + '\n'
        }
    } catch (e) {
        console.log(e)
        content = 'a'
    }

    return content

}

// 监听消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  docs = analysisGitLab()
console.log(docs, 444)
  sendResponse({bb: docs});
});




