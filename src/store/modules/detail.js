import {reqDetailInfo} from '@/api'
const state = {
    Detail:{}
}
const mutations  = {
    RECEIVE_DETAIL(state, skuDetailInfo) {
        state.Detail = skuDetailInfo
    }
}
const actions = {
    async getDetail({ commit },skuId) {
        const result = await reqDetailInfo(skuId);
        if (result.code === 200) {
            commit('RECEIVE_DETAIL',result.data)
        }
    }
}
const getters = {
    //todo 商品分类
    categoryView(state) {
        return state.Detail.categoryView || {}
    },
    //todo 商品的详情
    skuInfo(state) {
        return state.Detail.skuInfo || {}
    },
    //todo 商品的销售属性   
    spuSaleAttrList(state) {
        return state.Detail.spuSaleAttrList || []
    }
}
export default {
    getters, actions, mutations, state
}