function analysisGitLab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {action: 'copy'}, (res) => {
          document.getElementById('main').innerText = res.bb
		
        });
      });

}

// popup.js中添加下面的逻辑
const createDemoBtn = document.getElementById("create-demo");

createDemoBtn.addEventListener("click",  () => {


analysisGitLab()
let a = 'a'
 localStorage.setItem('psbc_msg',a)
if(a === 'a') return
  // 事件触发后会创建一个新的html
  chrome.tabs.create({
    url: "demo.html",
  });
});


