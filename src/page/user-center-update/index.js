/**
 * @Author: Echo
 * @Date:   2017-07-10T16:07:46+08:00
 * @Last modified by:   Echo
 * @Last modified time: 2017-07-10T17:33:59+08:00
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
    this.bindEvent()
  },
  bindEvent: function() {
    var _this = this
    // 点击提交按钮后的动作
    $(document).on('click', '.btn-submit', function() {
      var userInfo = {
        phone: $.trim($('#phone').val()),
        email: $.trim($('#email').val()),
        question: $.trim($('#question').val()),
        answer: $.trim($('#answer').val())
      },
      validateResult = _this.validateResult(userInfo)
      if(validateResult.status) {
        // 更新个人信息
        _user.updateUserInfo(userInfo, function(res, msg) {
          _mm.successTips(msg)
          window.location.href = './user-center.html'
        }, function(errMsg) {
          _mm.errorTips(errMsg)
        })
      }
      else {
        _mm.errorTips(validateResult.msg)
      }
    })
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
  },
  formValidate: function(formData) {
    var result = {
      status: false,
      msg: ''
    }
    if(!_mm.validate(formData.phone, 'phone')) {
      result.msg = '手机号格式不正确'
      return result
    }
    if(!_mm.validate(formData.email, 'email')) {
      result.msg = '邮箱格式不正确'
      return result
    }
    if(!_mm.validate(formData.question, 'require')) {
      result.msg = '请输入密码提示问题'
      return result
    }
    if(!_mm.validate(formData.answer, 'require')) {
      result.msg = '请输入密码提示问题答案'
      return result
    }
    // 通过验证，返回正确提示
    result.status = true
    result.msg = '验证成功'
    return result
  }
 }

 $(function() {
  page.init()
 })
