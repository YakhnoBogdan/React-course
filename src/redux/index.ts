import { Store, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Dispatch } from 'react'
import { rootReducer, GlobalAppState } from './rootReducer'

export const store: Store<GlobalAppState> = createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatch = typeof store.dispatch

// export const useAppDispatch = () => useDispatch<AppDispatch>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>
