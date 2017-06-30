/**
 * @Author: Echo
 * @Date:   2017-06-26T17:16:55+08:00
 * @Last modified by:   Echo
 * @Last modified time: 2017-06-28T14:51:04+08:00
 */


// $('body').html('HELLO INDEX');
// require('../module.js')
// require('./index.css')
// var $$ = require('jquery')
// $$('body').html('Hello World')
//
// console.log('hello index')
var _mm = require('util/mm.js');

// _mm.request({
//   url: 'http://localhost:4000/posts',
//   success: function(data, msg) {
//     console.log(data);
//     console.log(msg);
//   },
//   error: function(errMsg) {
//     console.log(errMsg);
//   }
// })
console.log(_mm.getUrlParam('test'))

var html = '<div>{{data}}</div>'
var data = {
  data: 'hello'
}
console.log(_mm.renderHtml(html, data))
