// 获取token
function getLocal (key = 'heimamm_mobile_token') {
  return window.localStorage.getItem(key)
}
// 保存token
function setLocal (val, key = 'heimamm_mobile_token') {
  window.localStorage.setItem(key, val)
}
// 移除token
function removeLocal (key = 'heimamm_mobile_token') {
  window.localStorage.removeItem(key)
}
// 暴露
export { getLocal, setLocal, removeLocal }
