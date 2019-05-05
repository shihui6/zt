let commonMethods = commonMethods || {};
commonMethods = {
  // 时间转化 Date类型 => YYYY-MM-DD hh:mm:ss
  formatDateTime(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s;
  },
  // 时间转化 Date类型 => YYYY-MM-DD
  formatDateTime2(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + m + '-' + d;
  },
  // 去除特殊字符
  checkName(val) {
    let reg = new RegExp("[`~!%@#$^&*=|{}';',\\[\\].<>/?~！@#￥……&*——|{}”“'。，、？]");
    let rs = "";
    for (let i = 0, l = val.length; i < val.length; i++) {
      rs = rs + val.substr(i, 1).replace(reg, '');
    }
    return rs;
  }
}
export default commonMethods;