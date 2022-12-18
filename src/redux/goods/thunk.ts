import * as Actions from './actions'
import * as ApiService from '../../services/goodsFetchApiService'
import { AppDispatch } from '..'
import { GoodsModel } from '../../services/goodsTypes'

export const fetchAllGoodsThunk = () => async (dispatch: AppDispatch) => {
  dispatch(Actions.getAllGoodsAsync.request())
  try {
    const response = await ApiService.fetchAllGoodsApi()
    if (!response.success || !response.response) {
      throw Error('Something went wrong')
    }
    dispatch(Actions.getAllGoodsAsync.success({ goods: response.response.goods }))
  } catch (error) {
    dispatch(Actions.getAllGoodsAsync.failure({ error: new Error('Something went wrong') }))
  }
}

export const fetchAddGoods = (goodsItem: Omit<GoodsModel, 'id'>) => async (dispatch: AppDispatch) => {
  dispatch(Actions.addGoodsAsyncActions.request())
  try {
    const response = await ApiService.addGoodsApi({ goodsItem })
    if (!response.success || !response.response) {
      throw Error('Something went wrong')
    }
    dispatch(Actions.addGoodsAsyncActions.success({ goodsItem: response.response }))
  } catch (error) {
    dispatch(Actions.addGoodsAsyncActions.failure({ error: new Error('Something went wrong') }))
  }
}

export const fetchGoodsToRemove = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(Actions.removeGoodsAsyncAction.request({ id }))
  try {
    const response = await ApiService.removeGoodsApi({ id })
    if (!response.success) {
      throw Error('Something went wrong')
    }
    dispatch(Actions.removeGoodsAsyncAction.success({ id }))
  } catch (error) {
    dispatch(Actions.removeGoodsAsyncAction.failure({ error: new Error('Something went wrong'), id }))
  }
}

export const fetchUpdateGoods = (goodsItem: GoodsModel) => async (dispatch: AppDispatch) => {
  dispatch(Actions.updateGoodsAsyncActions.request({ goodsItem }))
  try {
    const response = await ApiService.updateGoodsApi({ goodsItem })

    if (!response.success || !response.response) {
      throw Error('Something went wrong')
    }
    dispatch(Actions.updateGoodsAsyncActions.success({ goodsItem: response.response }))
  } catch (error) {
    dispatch(Actions.updateGoodsAsyncActions.failure({ error: new Error('Something went wrong'), goodsItem }))
  }
}
