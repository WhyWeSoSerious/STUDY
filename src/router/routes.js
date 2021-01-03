/* 
所有路由匹配的数组
*/
import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Deatail'
import addOrUpdataCarts from '@/pages/AddOruPudataCarts'
import ShopCar from '@/pages/ShopCar'

export default [
  {
    path: '/',
    component: Home
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    // props: true, // 只映射params参数
    props: (route) => ({keyword3: route.params.keyword, keyword4: route.query.keyword2}) 
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true
    }
  },
  {
    path: '/detail/:skuId',
    component: Detail,
    
  },
  {
    path: '/addOrUpdataCarts',
    component: addOrUpdataCarts
  },
  {
    path: '/shopcar',
    component:ShopCar
  }
]