let versionTag = null; // 版本标识
let timer = undefined;

/**
 * 获取首页的 ETag 或 Last-Modified 值，作为当前版本标识
 * @returns {Promise<string|null>} 返回 ETag 或 Last-Modified 值
 */
const getVersionTag = async () => {
  const response = await fetch('/', {
    cache: 'no-cache',
  });
  return response.headers.get('etag') || response.headers.get('last-modified');
};

/**
 * 比较当前的 ETag 或 Last-Modified 值与最新获取的值
 */
const compareTag = async () => {
  const newVersionTag = await getVersionTag();

  if (versionTag === null) {
    // 初次运行时，存储当前的 ETag 或 Last-Modified 值
    versionTag = newVersionTag;
  } else if (versionTag !== newVersionTag) {
    // 如果 ETag 或 Last-Modified 发生变化，则认为有更新
    console.info('更新了', {
      oldVersionTag: versionTag,
      newVersionTag: newVersionTag,
    });
    // 清除定时器
    clearInterval(timer);
    // 提示用户更新
    console.log('请更新');
  } else {
    // 没有更新
    console.info('没更新', {
      oldVersionTag: versionTag,
      newVersionTag: newVersionTag,
    });
  }
};

// 每60秒检查一次是否有新的 ETag 或 Last-Modified 值
timer = setInterval(compareTag, 1000);