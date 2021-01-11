import { reqTradeInfo } from "@/api";
const state = {
    tradeInfo:{}
}
const mutations = {
    RECEIVE_TRADEINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    }
}
const actions = {
    //todo 獲取交易页的信息
    async getTradeInfo({commit}) {
        const result = await reqTradeInfo();
        if (result.code === 200) {
            commit('RECEIVE_TRADEINFO',result.data)
        }
    }
}
const getters = {
    //todo 商品列表
    detailArrayList(state) {
        return state.tradeInfo.detailArrayList||[]
    },
    //todo 、获取购买人的信息
    userAddressList(state) {
        return state.tradeInfo.userAddressList||[]
    }
}
export default {
    state, mutations, actions, getters
}