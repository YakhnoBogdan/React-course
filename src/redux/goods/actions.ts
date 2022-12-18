import { createAction, createAsyncAction } from 'typesafe-actions'
import { GoodsModel } from '../../services/goodsTypes'

export enum GoodsActions {
  GET_ALL_GOODS_REQUEST = '@goods/GET_ALL_GOODS_REQUEST',
  GET_ALL_GOODS_SUCCESS = '@goods/GET_ALL_GOODS_SUCCESS',
  GET_ALL_GOODS_FAILURE = '@goods/GET_ALL_GOODS_FAILURE',

  ADD_GOODS_REQUEST = '@goods/ADD_GOODS_REQUEST',
  ADD_GOODS_SUCCESS = '@goods/ADD_GOODS_SUCCESS',
  ADD_GOODS_FAILURE = '@goods/ADD_GOODS_FAILURE',

  REMOVE_GOODS_REQUEST = '@goods/REMOVE_GOODS_REQUEST',
  REMOVE_GOODS_SUCCESS = '@goods/REMOVE_GOODS_SUCCESS',
  REMOVE_GOODS_FAILURE = '@goods/REMOVE_GOODS_FAILURE',

  UPDATE_GOODS_REQUEST = '@goods/UPDATE_GOODS_REQUEST',
  UPDATE_GOODS_SUCCESS = '@goods/UPDATE_GOODS_SUCCESS',
  UPDATE_GOODS_FAILURE = '@goods/UPDATE_GOODS_FAILURE',

  FILTER_BY_STRING = '@goods/FILTER_BY_FIELD',

  SORT_BY_FIELD = '@goods/SORT_BY_FIELD',
}

export const getAllGoodsAsync = createAsyncAction(
  GoodsActions.GET_ALL_GOODS_REQUEST,
  GoodsActions.GET_ALL_GOODS_SUCCESS,
  GoodsActions.GET_ALL_GOODS_FAILURE,
)<undefined, { goods: GoodsModel[] }, { error: Error }>()

export const removeGoodsAsyncAction = createAsyncAction(
  GoodsActions.REMOVE_GOODS_REQUEST,
  GoodsActions.REMOVE_GOODS_SUCCESS,
  GoodsActions.REMOVE_GOODS_FAILURE,
)<{ id: string }, { id: string }, { error: Error; id: string }>()

export const addGoodsAsyncActions = createAsyncAction(
  GoodsActions.ADD_GOODS_REQUEST,
  GoodsActions.ADD_GOODS_SUCCESS,
  GoodsActions.ADD_GOODS_FAILURE,
)<undefined, { goodsItem: GoodsModel }, { error: Error }>()

export const updateGoodsAsyncActions = createAsyncAction(
  GoodsActions.UPDATE_GOODS_REQUEST,
  GoodsActions.UPDATE_GOODS_SUCCESS,
  GoodsActions.UPDATE_GOODS_FAILURE,
)<{ goodsItem: GoodsModel }, { goodsItem: GoodsModel }, { error: Error; goodsItem: GoodsModel }>()

export const filterByFieldString = createAction(
  GoodsActions.FILTER_BY_STRING,
  ({ value, field }: { value: string; field: string }) => ({ value, field }),
)()

export const sortByField = createAction(
  GoodsActions.SORT_BY_FIELD,
  ({ sortWay, sortingField }: { sortWay: string; sortingField: string }) => ({ sortWay, sortingField }),
)()
