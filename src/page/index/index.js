/**
 * @Author: Echo
 * @Date:   2017-06-26T17:16:55+08:00
 * @Last modified by:   Echo
 * @Last modified time: 2017-07-10T22:26:28+08:00
 */


require('./index.css')
require('page/common/nav/index.js')
require('page/common/header/index.js')
require('util/slider/index.js')
var templateBanner = require('./banner.string')
var _mm = require('util/mm.js')

$(function() {
    // 渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner)
    $('.banner-con').html(bannerHtml)
    // 初始化banner
    var $slider = $('.banner').unslider({
      dots: true
    })
    // 前一张和后一张的事件绑定
    $('.banner-con .banner-arrow').click(function() {
      var forward = $(this).hasClass('prev') ? 'prev' : 'next'
      $slider.data('unslider')[forward]()
    })
})
