/** 淡出 */
export function fadeOut(id) {
  const element = document.getElementById(id);
  let op = 1; // initial opacity
  const timer = setInterval(function() {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = 'none';
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ')';
    op -= op * 0.3;
  }, 50);
}

/** 淡入 */
export function fadeIn(id) {
  const element = document.getElementById(id);
  console.log('e', element)
  let op = 0.1; // initial opacity
  console.log('display', element.style.display)
  element.style.display = 'block';
  console.log('display2', element.style.display)
  const timer = setInterval(function() {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ')';
    op += op * 0.05;
  }, 10);
}

/** 溢出横向左右自动滚动 */
export function AutoScroll(id, resetScrollLeft = false){
  const e = document.getElementById(id);
  const c_w = e.clientWidth;
  const s_w = e.scrollWidth;
  if(s_w - 16 <= c_w){ return false; }

  // 重置滚动位置
  if (resetScrollLeft) {
    e.scrollLeft = 0
    return
  }

  let flag = true
  const timer = setInterval(function() {
    if (flag) {
      sleep(50)
      e.scrollLeft += 1;
      if (e.scrollLeft === s_w - c_w) {
        flag = false;
      }
    } else {
      sleep(50)
      e.scrollLeft -= 1;
      if (e.scrollLeft === 0) {
        flag = true;
      }
    }
    // console.log('e.scrollLeft', e.scrollLeft)
  }, 30);
  return timer
}

/** 延时函数 */
export function sleep(time) {
  const startTime = new Date().getTime() + parseInt(time, 10);
  while(new Date().getTime() < startTime) {} // eslint-disable-line
}

export function getAuthHeader() {
  const userCode = getCookie('usercode');
  const userName = getCookie('username');
  const userToken = getCookie('usertoken');
  const user = escape(escape(`usercode:${userCode}&username:${userName}`));
  const headers = {
    Authorization: `bearer ${userToken}`,
    'us-app': escape(escape('source:基础架构&version:1.0.0.1')),
    User: user,
  };
  return headers;
}

export function getCookie(name) {
  var arr, // eslint-disable-line
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)'); // eslint-disable-line
  if ((arr = document.cookie.match(reg))) {
    return unescape(decodeURI(arr[2]));
  } else {
    return '';
  }
}

export function setCookie(name, value) {
  document.cookie = `${name}=${escape(value)};path=/`;
}