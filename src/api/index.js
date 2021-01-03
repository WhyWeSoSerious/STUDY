/* 
包含应用的所有接口的接口请求函数
  函数内部调用ajax函数发送请求
  函数返回的是promise对象
*/
import ajax from './ajax'
import mockAjax from './mockAjax'

/* 
首页三级分类
/api/product/getBaseCategoryList  GET
*/
export function reqCategoryList () {
  // return ajax.get('/product/getBaseCategoryList')
  // return ajax('/product/getBaseCategoryList') // 发不带参数的get请求
  return ajax({
    url: '/product/getBaseCategoryList',
    // method: 'get'
  })
}

/* 
获取首页广告轮播列表
/api/cms/banner  GET
*/
export const reqBannerList = () => mockAjax('/banners')


/* 
mock接口函数
*/
export const reqRecommends = () => mockAjax('/recommends')
export const reqFloors = () => mockAjax('/floors')

// reqFloors().then(result => {
//   console.log('result--', result)
// })

/* 
搜索分页列表
/api/list  POST

*/
export const reqSearch = (searchParams) => ajax.post('/list', searchParams)
//todo   详情页的
export const reqDetailInfo = (skuId) => {
  return ajax({
    url: `/item/${skuId}`,
    method: 'get'
  })
}
//todo发送添加购物车
export const reqAddOrUpdataCart = (skuId, skuNum) => {
  return ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}
//todo 购物车订单详情
export const reqShopCar = () => {
  return ajax({
    url: '/cart/cartList',
    method: 'get'
  })
}
//todo 更新购物车的选中情况
export const requpdataCartChecked = (skuId, isChecked) => {
  return ajax({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}
//todo 删除一个
export const reqDeleteCart = (skuId) => {
  return ajax({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}
