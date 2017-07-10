/**
 * @Author: Echo
 * @Date:   2017-07-10T16:01:28+08:00
 * @Last modified by:   Echo
 * @Last modified time: 2017-07-10T16:51:47+08:00
 */

require('./index.css')
require('page/common/nav/index.js')
require('page/common/header/index.js')
var navSide = require('page/common/nav-side/index.js')
var _user = require('service/user-service.js')
var _mm = require('util/mm.js')
var templateIndex = require('./index.string')

// page 逻辑部分
var page = {
 init: function() {
   this.onLoad()
 },
 onLoad: function() {
   // 初始化左侧菜单
   navSide.init({
     name: 'user-center'
   })
   // 加载用户信息
   this.loadUserInfo()
 },
 loadUserInfo: function() {
   var userHtml = ''
   _user.getUserInfo(function(res) {
     userHtml = _mm.renderHtml(templateIndex, res)
     $('.panel-body').html(userHtml)
   }, function(errMsg) {
     _mm.errorTips(errMsg)
   })
 }
}

$(function() {
 page.init()
})
