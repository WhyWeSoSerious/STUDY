/* 
管理登陆用户数据的vuex子模块
*/
import { reqUserLogin, reqUserRegister, reqUserInfo, reqUserLogout } from '@/api'
import { getUserTempId ,getToken,setToken,removeToken} from '@/utils/userabout'

const state = {
  //getUserTempId()  获取临时标识id
  userTempId: getUserTempId(),
  //todo 获取token
  token: getToken(),
  userInfo:{}
}
const mutations = {
  //todo 登录的token
  RECEIVE_TOKEN (state,token) {
    state.token = token
  },
  //todo 用户信息
  RECEIV_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  //todo  清空
  RESET_USERINFO(state) {
    state.userInfo = {};
    state.token = ''
  }
}
const actions = {
  //todo 用户注册
  async userRegister({ commit }, userInfo) {
    const result = await reqUserRegister(userInfo);
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject( new Error('failed'))
    }
  } ,
  //todo 用户登录
  async userLogin({ commit }, userInfo) {
    const result = await reqUserLogin(userInfo);
    if (result.code === 200) {
      commit('RECEIVE_TOKEN', result.data.token)//?把返回的data里面的token添加到state中
      setToken(result.data.token)//?吧拿到的token存到locatorage中
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  //todo 获得用户数据
  async getUserInfo({ commit }){
  const result = await reqUserInfo()
  if (result.code === 200) {
    commit('RECEIV_USERINFO', result.data)
    return 'ok'
  } else {
    return Promise.reject(new Error('failed'))
  }
  },
  async resetUserInfo({ commit }) {
    removeToken() //先调用函数清空localStorage当中的token信息
    commit('RESET_USERINFO')
  },
  //todo 退出登录 
  async userLogout({ commit }) {
    const result = await reqUserLogout();
    if (result.code === 200) {
      removeToken();
      commit('RESET_USERINFO');
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }

  }
}
const getters={}
export default {
  state, getters, actions, mutations
 
}