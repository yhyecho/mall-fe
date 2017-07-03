/**
 * @Author: Echo
 * @Date:   2017-07-03T18:00:44+08:00
 * @Last modified by:   Echo
 * @Last modified time: 2017-07-03T20:07:02+08:00
 */

require('./index.css')
require('page/common/nav-simple/index.js')
var _mm = require('util/mm.js')

$(function() {
  var type = _mm.getUrlParam('type') || 'default',
      $element = $('.' + type + '-success')
  $element.show();
})
