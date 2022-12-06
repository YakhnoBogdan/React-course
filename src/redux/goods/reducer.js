import * as ActionsType from './actions'

const initialState = {
  goodsList: [],
  errorGetRequest: null,
  errorRemove: null,
  errorPostGoods: null,
  errorEdit: null,
  isLoadingGetAllGoods: 'unset',
  isLoadingRemove: {},
  isLoadingAdd: false,
  isLoadingEdit: false,
  fieldFilter: 'title',
  stringFilter: '',
}

export const goodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.GET_ALL_GOODS_REQUEST:
      return {
        ...state,
        isLoadingGetAllGoods: 'waiting',
      }
    case ActionsType.GET_ALL_GOODS_FAILURE:
      return {
        ...state,
        errorGetRequest: action.error,
        isLoadingGetAllGoods: 'failure',
      }
    case ActionsType.GET_ALL_GOODS_SUCCESS:
      return {
        ...state,
        goodsList: action.goods,
        isLoadingGetAllGoods: 'success',
      }
    case ActionsType.REMOVE_GOODS_REQUEST:
      return {
        ...state,
        errorRemove: null,
        isLoadingRemove: {
          ...state.isLoadingRemove,
          [action.id]: true,
        },
      }
    case ActionsType.REMOVE_GOODS_FAILURE:
      return {
        ...state,
        errorRemove: action.error,
        isLoadingRemove: {
          ...state.isLoadingRemove,
          [action.id]: false,
        },
      }
    case ActionsType.REMOVE_GOODS_SUCCESS:
      return {
        ...state,
        errorRemove: null,
        isLoadingRemove: {
          ...state.isLoadingRemove,
          [action.id]: false,
        },
        goodsList: [...state.goodsList].filter((item) => item.id !== action.id),
      }
    case ActionsType.ADD_GOODS_REQUEST:
      return {
        ...state,
        errorPostGoods: null,
        isLoadingAdd: true,
      }
    case ActionsType.ADD_GOODS_FAILURE:
      return {
        ...state,
        errorPostGoods: action.error,
        isLoadingAdd: false,
      }
    case ActionsType.ADD_GOODS_SUCCESS:
      return {
        ...state,
        goodsList: [...state.goodsList, action.goodsItem],
        errorPostGoods: null,
        isLoadingAdd: false,
      }
    case ActionsType.UPDATE_GOODS_REQUEST:
      return {
        ...state,
        isLoadingEdit: {
          ...state.isLoadingEdit,
          [action.goodsItem.id]: true,
        },
        errorEdit: null,
      }
    case ActionsType.UPDATE_GOODS_FAILURE:
      return {
        ...state,
        isLoadingEdit: {
          ...state.isLoadingEdit,
          [action.goodsItem.id]: false,
        },
        errorEdit: action.error,
      }
    case ActionsType.UPDATE_GOODS_SUCCESS:
      return {
        ...state,
        isLoadingEdit: {
          ...state.isLoadingEdit,
          [action.goodsItem.id]: false,
        },
        goodsList: [...state.goodsList].map((item) => (item.id === action.goodsItem.id ? action.goodsItem : item)),
      }
    case ActionsType.FILTER_BY_STRING:
      return {
        ...state,
        fieldFilter: action.field,
        stringFilter: action.string,
      }
    case ActionsType.SORT_BY_FIELD:
      return {
        ...state,
        goodsList:
          action.sortingField === 'weight'
            ? action.sortWay === 'desc'
              ? [...state.goodsList].sort((a, b) => a[action.sortingField] - b[action.sortingField])
              : [...state.goodsList].sort((a, b) => b[action.sortingField] - a[action.sortingField])
            : action.sortWay === 'desc'
            ? [...state.goodsList].sort((a, b) => (a[action.sortingField] > b[action.sortingField] ? -1 : 1))
            : [...state.goodsList].sort((a, b) => (a[action.sortingField] < b[action.sortingField] ? -1 : 1)),
      }
    default:
      return state
  }
}
