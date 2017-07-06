/**
 * @Author: Echo
 * @Date:   2017-07-06T16:52:49+08:00
 * @Last modified by:   Echo
 * @Last modified time: 2017-07-06T17:44:08+08:00
 */

 require('./index.css')
 require('page/common/nav-simple/index.js')
 var _mm = require('util/mm.js')
 var _user = require('service/user-service.js')

 // 表单里的错误提示
 var formError = {
   show: function(errMsg) {
     $('.error-item').show().find('.err-msg').text(errMsg)
   },
   hide: function() {
     $('.error-item').hide().find('.err-msg').text('')
   }
 }

 // page 逻辑部分
 var page = {
   data: {
     username : '',
     question : '',
     answer   : '',
     token    : ''
   },
   init: function() {
     this.onLoad()
     this.bindEvent()
   },
   onLoad: function() {
     this.loadStepUsername()
   },
   bindEvent: function() {
     var _this = this
     $('#submit-username').click(function() {
       var username = $.trim($('#username').val())
       if(username) {
            _user.getQuestion(username, function() {
                _this.data.username = username
                _this.data.question = res
                _this.loadStepQuestion()
         }, function(errMsg) {
           formError.show(errMsg)
         })
       }
       // 用户名不存在
       else {
         formError.show('请输入用户名')
       }
     })
     $('#submit-question').click(function() {
       var answer = $.trim($('#answer').val())
       if(answer) {
            _user.checkAnswer({
              username: _this.data.username,
              question: _this.data.question,
              answer: answer
            }, function() {
                _this.data.answer = answer
                _this.data.token = res
                _this.loadStepPassword()
         }, function(errMsg) {
           formError.show(errMsg)
         })
       }
       // 答案不存在
       else {
         formError.show('请输入密码提示问题的答案')
       }
     })
     $('#submit-password').click(function() {
       var password = $.trim($('#password').val())
       if(password & password.length >= 6) {
            _user.resetPassword({
              username: _this.data.username,
              passwordNew: password,
              forgetToken: _this.data.token
            }, function() {
                window.loaction.href = './result.html?type=pass-reset'
         }, function(errMsg) {
           formError.show(errMsg)
         })
       }
       // 密码为空
       else {
         formError.show('请输入不少于6位的新密码')
       }
     })
   },
   loadStepUsername: function() {
     $('.step-username').show()
   },
   loadStepQuestion: function() {
     formError.hide()
     $('.step-username').hide().siblings('.step-question').show()
      .find('.question').text(this.data.question)

   },
   loadStepPassword: function() {
     $('.step-question').hide()
        .siblings('.step-password').show()
   }
 }

 $(function() {
   page.init()
 })
