
export const getLocalStorage = (key) => {
  return localStorage.getItem(key)
}
export const setLocalStorage = (key, value) => {
  try {
    localStorage.removeItem(key)
    localStorage.setItem(key, value)
  } catch (_) {
    console.log('该功能无法使用，请关闭浏览器无痕模式（隐身模式）后重试')
  }
}
export const removeLocalStorage = function (key) {
  try {
    localStorage.removeItem(key)
  } catch (_) {
    console.log('该功能无法使用，请关闭浏览器无痕模式（隐身模式）后重试')
  }
}
export const getSessionStorage = (key) => {
  return sessionStorage.getItem(key)
}
export const setSessionStorage = (key, value) => {
  try {
    sessionStorage.removeItem(key)
    sessionStorage.setItem(key, value)
  } catch (_) {
    console.log('该功能无法使用，请关闭浏览器无痕模式（隐身模式）后重试')
  }
}
export const removeSesssionStorage = function (key) {
  try {
    sessionStorage.removeItem(key)
  } catch (_) {
    console.log('该功能无法使用，请关闭浏览器无痕模式（隐身模式）后重试')
  }
}
export const setCookie = (cname,cvalue,exdays) => {
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname+"="+cvalue+"; "+expires;
}
export const getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
  }
  return "";
}
