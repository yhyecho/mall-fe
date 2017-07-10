/**
 * @Author: Echo
 * @Date:   2017-07-10T17:36:35+08:00
 * @Last modified by:   Echo
 * @Last modified time: 2017-07-10T18:05:43+08:00
 */

 require('./index.css')
 require('page/common/nav/index.js')
 require('page/common/header/index.js')
 var navSide = require('page/common/nav-side/index.js')
 var _user = require('service/user-service.js')
 var _mm = require('util/mm.js')

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
        password: $.trim($('#password').val()),
        passwordNew: $.trim($('#passwordNew').val()),
        passwordConfirm: $.trim($('#password-confirm').val()),
      },
      validateResult = _this.validateResult(userInfo)
      if(validateResult.status) {
        // 更改用户密码
        _user.updatePassword({
          passwordOld: userInfo.password,
          passwordNew: userInfo.passwordNew
        }, function(res, msg) {
          _mm.successTips(msg)
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
  },
  formValidate: function(formData) {
    var result = {
      status: false,
      msg: ''
    }
    if(!_mm.validate(formData.password, 'require')) {
      result.msg = '原密码不能为空'
      return result
    }
    if(!formData.passwordNew || formData.passwordNew.length < 6) {
      result.msg = '密码长度不得少于6位'
      return result
    }
    if(formData.passwordNew != formData.passwordConfirm) {
      result.msg = '两次输入的密码不一致'
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
