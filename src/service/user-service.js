/**
 * @Author: Echo
 * @Date:   2017-07-03T15:28:20+08:00
 * @Last modified by:   Echo
 * @Last modified time: 2017-07-03T15:43:57+08:00
 */
var _mm = require('util/mm.js')
var _user = {
  // 检查登录状态
  checkLogin: function(resolve, reject) {
    _mm.request({
      url     : _mm.getServerUrl('/user/get_user_info.do'),
      method  : 'POST',
      success : resolve,
      error   : reject
    })
  },
  // 登出
  logout: function(resolve, reject) {
    _mm.request({
      url     : _mm.getServerUrl('/user/logout.do'),
      method  : 'POST',
      success : resolve,
      error   : reject
    })
  }
}

module.exports = _user
