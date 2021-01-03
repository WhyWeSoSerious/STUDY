import { reqShopCar, reqAddOrUpdataCart, requpdataCartChecked, reqDeleteCart} from '@/api'
const state = {
    //todo   购物车列表
    ShopCarList: []

};
const mutations = {
    RECEIVE_SHOPCAR_LIST(state, ShopCarList) {
        state.ShopCarList = ShopCarList
        console.log('mut')
    }

};
const actions = {
    async getShopCarList({ commit }) {
        const result = await reqShopCar();
        if (result.code === 200) {
            console.log('act')
            commit('RECEIVE_SHOPCAR_LIST', result.data)
        }
    },

    async addOrUpdateCart({ commit }, { skuId, skuNum }) {
        const result = await reqAddOrUpdataCart(skuId, skuNum)

        // 如果和以下写法一样，那么这个异步函数返回的promise只有成功
        // if(result.code === 200){
        //   return 'ok'
        // }else{
        //   return 'failed'
        // }

        // 下面的写法会让这个promise 有成功也有失败
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }

    },
    //todo更新购物车的选中
    async updataCartChecked({ commit }, { skuId , isChecked }) {
        const result = await requpdataCartChecked(skuId, isChecked);
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //todo 更新全选的装填
    async updataAllChecked({ commit, dispatch, state }, isChecked) {
        let promises = [];
        state.ShopCarList.forEach((item) => {
            if (item.isChecked === isChecked) return;
            let promise = dispatch('updataCartChecked', { skuId: item.skuId, isChecked });
            promises.push(promise)
        })
        return Promise.all(promises)
    },
    //todo 删除一个
    async deleteCart({ commit }, skuId) {
        const result = await reqDeleteCart(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //todo 删除多个
    async deleteCartAll({ commit, dispatch, state }) {
        let promises = []
        state.shopCartList.forEach(item => {
            if (!item.isChecked) return
            let promise = dispatch('deleteCart', item.skuId)
            promises.push(promise)
        })
        return Promise.all(promises)
    }

};
const getters = {}
export default {
    state, mutations, actions, getters
}