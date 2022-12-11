import PropTypes from 'prop-types'
import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { connect } from 'react-redux'
import EditForm from './components/EditForm/EditForm'
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
} from './redux/goods/selectors'
import { fetchAllGoodsThunk, fetchGoodsToRemove } from './redux/goods/thunk'
import { updateGoodsToEdit } from './redux/goods/actions'
import FilterField from './components/FilterField/FilterField'
import SortField from './components/SortField/SortField'

class App extends React.Component {
  componentDidMount() {
    this.fetchAllGoodsThunkCallback()
  }

  fetchAllGoodsThunkCallback = () => {
    const { dispatchFetchAllGoods } = this.props
    dispatchFetchAllGoods()
  }

  onRemoveItem = (id) => {
    const { dispatchFetchGoodsToRemove } = this.props
    dispatchFetchGoodsToRemove(id)
  }

  onEditItem = (goodsItem) => {
    const { dispatchGoodsToEdit } = this.props
    dispatchGoodsToEdit(goodsItem)
  }

  onSaveEditItem = () => {
    this.setState({ editItem: null })
  }

  render() {
    const {
      isLoadingAllGoods,
      errorGetRequest,
      goodsList,
      isLoadingAdd,
      isLoadingRemove,
      isLoadingEdit,
      fieldFilter,
      stringFilter,
    } = this.props

    return (
      <div className='App'>
        <Box>
          <FilterField />
          <SortField />
          <Box className='App__content'>
            <EditForm onSaveEditItem={this.onSaveEditItem} />
            {isLoadingAllGoods !== 'success' && (
              <div className='App__content_loading'>
                <CircularProgress />
              </div>
            )}
            {isLoadingAllGoods === 'success' && !errorGetRequest ? (
              <GoodsList
                goodsList={goodsList}
                onRemoveItem={this.onRemoveItem}
                isLoadingAdd={isLoadingAdd}
                isLoadingRemove={isLoadingRemove}
                isLoadingEdit={isLoadingEdit}
                onEditItem={this.onEditItem}
                fieldFilter={fieldFilter}
                stringFilter={stringFilter}
              />
            ) : null}
          </Box>
        </Box>
      </div>
    )
  }
}

App.propTypes = {
  goodsList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      weight: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      id: PropTypes.string,
    }),
  ),
  isLoadingAllGoods: PropTypes.string,
  isLoadingAdd: PropTypes.bool,
  isLoadingRemove: PropTypes.objectOf(PropTypes.bool),
  isLoadingEdit: PropTypes.objectOf(PropTypes.bool),
  errorGetRequest: PropTypes.string,
  fieldFilter: PropTypes.string,
  stringFilter: PropTypes.string,
}

const mapStateToProps = (state) => ({
  goodsList: selectGoodsList(state),
  isLoadingAllGoods: selectIsLoadingAllGoods(state),
  isLoadingAdd: selectIsLoadingAdd(state),
  isLoadingRemove: selectIsLoadingRemove(state),
  isLoadingEdit: selectIsLoadingEdit(state),
  errorGetRequest: selectErrorGetRequest(state),
  fieldFilter: selectFieldFilter(state),
  stringFilter: selectStringFilter(state),
})

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchAllGoods: () => dispatch(fetchAllGoodsThunk()),
  dispatchFetchGoodsToRemove: (id) => dispatch(fetchGoodsToRemove(id)),
  dispatchGoodsToEdit: (goodsItem) => dispatch(updateGoodsToEdit(goodsItem)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
