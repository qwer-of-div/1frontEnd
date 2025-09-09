const path = require('path');
const fse = require('fs-extra');
const request = require("request");
const CACHE_TIME = 3000;

/**
 * 模拟 curl
 */
const curl = (option) =>
  new Promise((resolve, reject) => {
    request(option, (err, response, body) => {
      if (err) reject(err);
      resolve(body);
    });
  });
/**
 * 序列化登录态中的用户信息
 */
function serializeUserData(data) {
  let result = {};
  if (!data) return result;
  try {
    result.profile = JSON.parse(data.profile);
    result.token = data.token;
  } catch (e) {
    result.profile = {};
    result.token = "";
  }
  return result;
}

const now = () => new Date() - 0;
const isExpired = (expires) => expires < now();
const addExpires = (delta) => {
  if (delta) return now() + (delta * 1000);
  return now() + CACHE_TIME;
};
const readDefaultFile = (path) => fse.readFileSync(path, {
  encoding: "utf8"
});

const readDataFile = (path) => fse.readFileSync(path, {
  encoding: "utf8"
});

const saveDataFile = (path, data) => fse.writeFileSync(path, data, {
  encoding: "utf8"
});


/**
 * 禁用缓存
 */
function nocache(req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
}
/**
 * 判断是否有这个目录
 * @param {*} dirname 目录名称
 * @returns 有则返回true，没有就创建该目录
 */
const mkdirsSync = (dirname) => {
  if (fse.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fse.mkdirSync(dirname);
      return true;
    }
  }
}

module.exports = {
  curl,
  now,
  isExpired,
  addExpires,
  readDataFile,
  readDefaultFile,
  saveDataFile,
  nocache,
  serializeUserData,
  mkdirsSync
};