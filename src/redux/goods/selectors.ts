import { GlobalAppState } from '../rootReducer'

export const selectGoodsList = (state: GlobalAppState) => state.goods.goodsList

export const selectIsLoadingAllGoods = (state: GlobalAppState) => state.goods.isLoadingGetAllGoods
export const selectErrorGetRequest = (state: GlobalAppState) => state.goods.errorGetRequest

export const selectIsLoadingAdd = (state: GlobalAppState) => state.goods.isLoadingAdd
export const selectErrorAdd = (state: GlobalAppState) => !!state.goods.errorPostGoods || !!state.goods.errorEdit

export const selectIsLoadingRemove = (state: GlobalAppState) => state.goods.isLoadingRemove

export const selectIsLoadingEdit = (state: GlobalAppState) => state.goods.isLoadingEdit

export const selectFieldFilter = (state: GlobalAppState) => state.goods.fieldFilter
export const selectStringFilter = (state: GlobalAppState) => state.goods.stringFilter
