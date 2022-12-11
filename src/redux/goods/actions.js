export const GET_ALL_GOODS_REQUEST = '@goods/GET_ALL_GOODS_REQUEST'
export const GET_ALL_GOODS_SUCCESS = '@goods/GET_ALL_GOODS_SUCCESS'
export const GET_ALL_GOODS_FAILURE = '@goods/GET_ALL_GOODS_FAILURE'

export const ADD_GOODS_REQUEST = '@goods/ADD_GOODS_REQUEST'
export const ADD_GOODS_SUCCESS = '@goods/ADD_GOODS_SUCCESS'
export const ADD_GOODS_FAILURE = '@goods/ADD_GOODS_FAILURE'

export const REMOVE_GOODS_REQUEST = '@goods/REMOVE_GOODS_REQUEST'
export const REMOVE_GOODS_SUCCESS = '@goods/REMOVE_GOODS_SUCCESS'
export const REMOVE_GOODS_FAILURE = '@goods/REMOVE_GOODS_FAILURE'

export const UPDATE_EDIT_GOODS = '@goods/UPDATE_EDIT_GOODS'
export const UPDATE_GOODS_REQUEST = '@goods/UPDATE_GOODS_REQUEST'
export const UPDATE_GOODS_SUCCESS = '@goods/UPDATE_GOODS_SUCCESS'
export const UPDATE_GOODS_FAILURE = '@goods/UPDATE_GOODS_FAILURE'

export const FILTER_BY_STRING = '@goods/FILTER_BY_FIELD'

export const SORT_BY_FIELD = '@goods/SORT_BY_FIELD'

export const getAllGoodsRequest = () => {
  return {
    type: GET_ALL_GOODS_REQUEST,
  }
}

export const getAllGoodsFailure = (error) => {
  return {
    type: GET_ALL_GOODS_FAILURE,
    error,
  }
}

export const getAllGoodsSuccess = (goods) => {
  return {
    type: GET_ALL_GOODS_SUCCESS,
    goods,
  }
}

export const removeGoodsRequest = (id) => ({
  type: REMOVE_GOODS_REQUEST,
  id,
})

export const removeGoodsFailure = (error, id) => ({
  type: REMOVE_GOODS_FAILURE,
  id,
  error,
})

export const removeGoodsSuccess = (id) => ({
  type: REMOVE_GOODS_SUCCESS,
  id,
})

export const addGoodsRequest = () => ({
  type: ADD_GOODS_REQUEST,
})

export const addGoodsFailure = (error) => ({
  type: ADD_GOODS_FAILURE,
  error,
})

export const addGoodsSuccess = (goodsItem) => ({
  type: ADD_GOODS_SUCCESS,
  goodsItem,
})

export const updateGoodsToEdit = (goodsItem) => ({
  type: UPDATE_EDIT_GOODS,
  goodsItem,
})

export const updateGoodsRequest = (goodsItem) => ({
  type: UPDATE_GOODS_REQUEST,
  goodsItem,
})

export const updateGoodsFailure = (error, goodsItem) => ({
  type: UPDATE_GOODS_FAILURE,
  error,
  goodsItem,
})

export const updateGoodsSuccess = (goodsItem) => ({
  type: UPDATE_GOODS_SUCCESS,
  goodsItem,
})

export const filterByFieldString = (string, field) => ({
  type: FILTER_BY_STRING,
  string,
  field,
})

export const sortByField = (sortWay, sortingField) => ({
  type: SORT_BY_FIELD,
  sortWay,
  sortingField,
})
