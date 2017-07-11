/**
 * @Author: Echo
 * @Date:   2017-07-11T10:43:48+08:00
 * @Last modified by:   Echo
 * @Last modified time: 2017-07-11T22:28:55+08:00
 */

 var _mm = require('util/mm.js')
 var _product = {
   // 获取商品列表
   getProductList: function(listParam, resolve, reject) {
     _mm.request({
       url     : _mm.getServerUrl('/product/list.do'),
       data    : listParam,
       success : resolve,
       error   : reject
     })
   },
   // 加载商品详情的数据
   getProductDetail: function(productId, resolve, reject) {
     _mm.request({
       url     : _mm.getServerUrl('/product/detail.do'),
       data    : {
         productId: productId
       },
       success : resolve,
       error   : reject
     })
   }
 }

 module.exports = _product
