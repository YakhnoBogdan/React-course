import { useCallback, useEffect, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { EditForm } from './components/EditForm/EditForm'
import { GoodsList } from './components/GoodsList/GoodsList'
import {
  selectGoodsList,
  selectIsLoadingAllGoods,
  selectErrorGetRequest,
  selectIsLoadingAdd,
  selectStringFilter,
  selectFieldFilter,
  selectIsLoadingRemove,
  selectIsLoadingEdit,
  selectErrorAdd,
} from './redux/goods/selectors'
import { fetchAllGoodsThunk, fetchGoodsToRemove } from './redux/goods/thunk'
import { FilterField } from './components/FilterField/FilterField'
import { SortField } from './components/SortField/SortField'

function App() {
  const goodsList = useSelector(selectGoodsList)
  const isLoadingAllGoods = useSelector(selectIsLoadingAllGoods)
  const isLoadingAdd = useSelector(selectIsLoadingAdd)
  const isLoadingRemove = useSelector(selectIsLoadingRemove)
  const isLoadingEdit = useSelector(selectIsLoadingEdit)
  const errorGetRequest = useSelector(selectErrorGetRequest)
  const errorAdd = useSelector(selectErrorAdd)
  const fieldFilter = useSelector(selectFieldFilter)
  const stringFilter = useSelector(selectStringFilter)
  const dispatch = useDispatch()

  const [editItem, setEditItem] = useState(null)

  const fetchAllGoodsThunkCallback = useCallback(() => {
    dispatch(fetchAllGoodsThunk())
  }, [dispatch])

  useEffect(() => {
    fetchAllGoodsThunkCallback()
  }, [fetchAllGoodsThunkCallback])

  const onRemoveItem = useCallback(
    (id) => {
      dispatch(fetchGoodsToRemove(id))
    },
    [dispatch],
  )
  const onEditItem = useCallback((goodsItem) => {
    setEditItem(goodsItem)
  }, [])
  const onSaveEditItem = useCallback(() => {
    setEditItem(null)
  }, [])

  return (
    <div className='App'>
      <Box>
        <FilterField />
        <SortField />
        <Box className='App__content'>
          <EditForm editItem={editItem} onSaveEditItem={onSaveEditItem} errorAdd={errorAdd} />
          {isLoadingAllGoods !== 'success' && (
            <div className='App__content_loading'>
              <CircularProgress />
            </div>
          )}
          {isLoadingAllGoods === 'success' && !errorGetRequest ? (
            <GoodsList
              goodsList={goodsList}
              onRemoveItem={onRemoveItem}
              isLoadingAdd={isLoadingAdd}
              isLoadingRemove={isLoadingRemove}
              isLoadingEdit={isLoadingEdit}
              onEditItem={onEditItem}
              fieldFilter={fieldFilter}
              stringFilter={stringFilter}
            />
          ) : null}
        </Box>
      </Box>
    </div>
  )
}

export default App
