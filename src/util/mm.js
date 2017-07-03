/**
 * @Author: Echo
 * @Date:   2017-06-28T10:31:08+08:00
 * @Last modified by:   Echo
 * @Last modified time: 2017-07-03T20:12:50+08:00
 */

var Hogan = require('hogan.js')
var conf = {
  serverHost: ''
}

var _mm = {
  // 网路请求
  request: function(param) {
    var _this = this;
    $.ajax({
      type      : param.method || 'get',
      url       : param.url || '',
      dataType  : param.type || 'json',
      data      : param.data || '',
      success   : function(res) {
        // 请求成功
        if(0 === res.status) {
          typeof param.success === 'function' && param.success(res.data, res.msg);
        }
        // 没有登录状态，需要强制登录
        else if(10 === res.status) {
          _this.doLogin();
        }
        // 请求数据错误
        else if(1 === res.status) {
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error     : function(err) {
        typeof param.error === 'function' && param.error(err.statusText);
      }
    })
  },
  // 获取服务器地址
  getServerUrl: function(path) {
    return conf.serverHost + path
  },
  // 获取url参数
  getUrlParam: function(name) {
    var reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        queryString = window.location.href.split('?')[1] || '',
        result      = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null
  },
  // 渲染html模版
  renderHtml: function(htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate),
        result   = template.render(data)
    return result
  },
  // 成功提示
  successTips: function(msg) {
    alert(msg || '操作成功了！')
  },
  // 错误提示
  errorTips: function(msg) {
    alert(msg || '出错了！')
  },
  // 字段的验证，支持非空、手机、邮箱的判断
  validate: function(value, type) {
    var value = $.trim(value)
    // 非空验证
    if('require' === type) {
      return !!value // 强转成布尔型
    }
    // 手机号验证
    if('phone' === type) {
      return /^1\d{10}$/.test(value)
    }
    // 邮箱格式验证
    if('email' === type) {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
    }
  },
  // 统一登录处理
  doLogin: function() {
    window.location.href = '#/login?redirect=' + encodeURIComponent(window.location.href) // 处理url中的特殊字符
  }
}

module.exports = _mm;
