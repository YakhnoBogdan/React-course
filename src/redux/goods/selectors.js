export const selectGoodsList = (state) => state.goods.goodsList

export const selectIsLoadingAllGoods = (state) => state.goods.isLoadingGetAllGoods
export const selectErrorGetRequest = (state) => state.goods.errorGetRequest

export const selectIsLoadingAdd = (state) => state.goods.isLoadingAdd
export const selectErrorAdd = (state) => !!state.goods.errorPostGoods || !!state.goods.errorEdit

export const selectIsLoadingRemove = (state) => state.goods.isLoadingRemove

export const selectGoodsToEdit = (state) => state.goods.goodsToEdit
export const selectIsLoadingEdit = (state) => state.goods.isLoadingEdit

export const selectFieldFilter = (state) => state.goods.fieldFilter
export const selectStringFilter = (state) => state.goods.stringFilter
