
let lastSrcArr;

async function extractNewScripts () {
  const scriptReg = /<script[^>]*>([^<]|<(?!\/script))*<\/script>/gm;
  let baseUrl = process.env.BASE_URL || '';
  if (!baseUrl.endsWith("/")) {
    baseUrl = baseUrl + "/";
  }
  let html = "";
  try {
    const resp = await fetch(baseUrl + '?timestamp=' + Date.now(), {
      method: 'GET',
    });
    html = await resp.text();
    scriptReg.lastIndex = 0;
  } catch (error) { }
  return html.match(scriptReg);
}

async function needUpdate () {
  const newScripts = await extractNewScripts();
  if (!lastSrcArr) {
    lastSrcArr = newScripts;
    return false;
  }
  let result = false;
  if (lastSrcArr.length != newScripts.length) {
    result = true;
  }
  for (let i = 0; i < lastSrcArr.length; i++) {
    if (lastSrcArr[i] !== newScripts[i]) {
      result = true;
      break;
    }
  }
  lastSrcArr = newScripts;
  return result;
}

const DURATION = 1000;
function autoRefresh () {
  setTimeout(async () => {
    try {
      const willUpdate = await needUpdate();
      if (willUpdate) {
        const result = confirm('页面有更新，点击确定刷新页面');
        if (result) {
          location.reload();
        }
      } else {
        console.log('无更新');
      }
    } catch (error) {
      console.log(error);
    }
    autoRefresh();
  }, DURATION);
}
autoRefresh();