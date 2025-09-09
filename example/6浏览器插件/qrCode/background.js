chrome.runtime.onInstalled.addListener(() => {
 chrome.contextMenus.create({
   id: "generateQRCode",
   title: "Generate QR Code",
   contexts: ["page"]
 });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
 if (info.menuItemId === "generateQRCode") {
 const url = tab.url;
 const apiUrl = `https://api.cl2wm.cn/api/qrcode/code?text=${url}&mhid=sELPDFnok80gPHovKdI`;

 chrome.scripting.executeScript({
   target: { tabId: tab.id },
   func: showQRCode,
   args: [apiUrl]
 });
 }
});

function showQRCode(apiUrl) {
 const iframe = document.createElement('iframe');
 iframe.style.position = 'fixed';
 iframe.style.top = '50%';
 iframe.style.left = '50%';
 iframe.style.transform = 'translate(-50%, -50%)';
 iframe.style.width = '500px';
 iframe.style.height = '500px';
 iframe.style.border = 'none';
 iframe.style.zIndex = '1000'; // 确保在最上层
 iframe.src = apiUrl;

 document.body.appendChild(iframe);

 setTimeout(() => {
   iframe.remove();
 }, 5000);
}
