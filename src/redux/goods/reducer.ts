import { ActionType, getType } from 'typesafe-actions'
import { GoodsModel } from '../../services/goodsTypes'
import * as ActionsType from './actions'

type GoodsActionsType = ActionType<typeof ActionsType>

export interface GoodsState {
  goodsList: GoodsModel[]
  errorGetRequest: Error | null
  errorRemove: Error | null
  errorPostGoods: Error | null
  errorEdit: Error | null
  isLoadingGetAllGoods: string
  isLoadingRemove: { [index: string]: boolean }
  isLoadingEdit: { [index: string]: boolean }
  isLoadingAdd: boolean
  fieldFilter: string
  stringFilter: string
}

const initialState = {
  goodsList: [],
  errorGetRequest: null,
  errorRemove: null,
  errorPostGoods: null,
  errorEdit: null,
  isLoadingGetAllGoods: 'unset',
  isLoadingRemove: {},
  isLoadingAdd: false,
  isLoadingEdit: {},
  fieldFilter: 'title',
  stringFilter: '',
}

export const goodsReducer = (state = initialState, action: GoodsActionsType): GoodsState => {
  switch (action.type) {
    case getType(ActionsType.getAllGoodsAsync.request):
      return {
        ...state,
        isLoadingGetAllGoods: 'waiting',
      }
    case getType(ActionsType.getAllGoodsAsync.success):
      return {
        ...state,
        goodsList: action.payload.goods,
        isLoadingGetAllGoods: 'success',
      }
    case getType(ActionsType.getAllGoodsAsync.failure):
      return {
        ...state,
        errorGetRequest: action.payload.error,
        isLoadingGetAllGoods: 'failure',
      }
    case getType(ActionsType.removeGoodsAsyncAction.request):
      return {
        ...state,
        errorRemove: null,
        isLoadingRemove: {
          ...state.isLoadingRemove,
          [action.payload.id]: true,
        },
      }
    case getType(ActionsType.removeGoodsAsyncAction.success):
      return {
        ...state,
        errorRemove: null,
        isLoadingRemove: {
          ...state.isLoadingRemove,
          [action.payload.id]: false,
        },
        goodsList: [...state.goodsList].filter((item: GoodsModel) => item.id !== action.payload.id),
      }
    case getType(ActionsType.removeGoodsAsyncAction.failure):
      return {
        ...state,
        errorRemove: action.payload.error,
        isLoadingRemove: {
          ...state.isLoadingRemove,
          [action.payload.id]: false,
        },
      }
    case getType(ActionsType.addGoodsAsyncActions.request):
      return {
        ...state,
        errorPostGoods: null,
        isLoadingAdd: true,
      }
    case getType(ActionsType.addGoodsAsyncActions.success):
      return {
        ...state,
        goodsList: [...state.goodsList, action.payload.goodsItem],
        errorPostGoods: null,
        isLoadingAdd: false,
      }
    case getType(ActionsType.addGoodsAsyncActions.failure):
      return {
        ...state,
        errorPostGoods: action.payload.error,
        isLoadingAdd: false,
      }
    case getType(ActionsType.updateGoodsAsyncActions.request):
      return {
        ...state,
        isLoadingEdit: {
          ...state.isLoadingEdit,
          [action.payload.goodsItem.id]: true,
        },
        errorEdit: null,
      }
    case getType(ActionsType.updateGoodsAsyncActions.success):
      return {
        ...state,
        isLoadingEdit: {
          ...state.isLoadingEdit,
          [action.payload.goodsItem.id]: false,
        },
        goodsList: [...state.goodsList].map((item: GoodsModel) =>
          item.id === action.payload.goodsItem.id ? action.payload.goodsItem : item,
        ),
      }
    case getType(ActionsType.updateGoodsAsyncActions.failure):
      return {
        ...state,
        isLoadingEdit: {
          ...state.isLoadingEdit,
          [action.payload.goodsItem.id]: false,
        },
        errorEdit: action.payload.error,
      }
    case getType(ActionsType.filterByFieldString):
      return {
        ...state,
        fieldFilter: action.payload.field,
        stringFilter: action.payload.value,
      }
    case getType(ActionsType.sortByField):
      return {
        ...state,
        goodsList:
          action.payload.sortingField === 'weight'
            ? action.payload.sortWay === 'desc'
              ? [...state.goodsList].sort((a, b) => a[action.payload.sortingField] - b[action.payload.sortingField])
              : [...state.goodsList].sort((a, b) => b[action.payload.sortingField] - a[action.payload.sortingField])
            : action.payload.sortWay === 'desc'
            ? [...state.goodsList].sort((a, b) =>
                a[action.payload.sortingField] > b[action.payload.sortingField] ? -1 : 1,
              )
            : [...state.goodsList].sort((a, b) =>
                a[action.payload.sortingField] < b[action.payload.sortingField] ? -1 : 1,
              ),
      }
    default:
      return state
  }
}
