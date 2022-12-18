import { combineReducers } from 'redux'
import { goodsReducer, GoodsState } from './goods/reducer'

export interface GlobalAppState {
  goods: GoodsState
}

export const rootReducer = combineReducers({
  goods: goodsReducer,
})
