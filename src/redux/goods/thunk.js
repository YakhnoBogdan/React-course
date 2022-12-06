import * as Actions from './actions'

export const fetchAllGoodsThunk = () => async (dispatch) => {
  dispatch(Actions.getAllGoodsRequest())

  try {
    const response = await fetch('http://localhost:8080/goods')

    if (!response.ok) throw Error('Something wrong')

    const result = await response.json()
    dispatch(Actions.getAllGoodsSuccess(result.goods))
  } catch (error) {
    dispatch(Actions.getAllGoodsFailure(error))
  }
}

export const fetchGoodsToRemove = (id) => async (dispatch) => {
  dispatch(Actions.removeGoodsRequest(id))
  try {
    const response = await fetch(`http://localhost:8080/goods/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      dispatch(Actions.removeGoodsSuccess(id))
    } else throw Error('Something wrong')
  } catch (error) {
    dispatch(Actions.removeGoodsFailure(error, id))
  }
}

export const fetchAddGoods = (goodsItem) => async (dispatch) => {
  dispatch(Actions.addGoodsRequest())
  try {
    const response = await fetch('http://localhost:8080/goods/', {
      method: 'POST',
      body: JSON.stringify(goodsItem),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw Error('Something wrong')

    const result = await response.json()
    dispatch(Actions.addGoodsSuccess(result))
  } catch (error) {
    dispatch(Actions.addGoodsFailure(error))
  }
}

export const fetchUpdateGoods = (goodsItem) => async (dispatch) => {
  dispatch(Actions.updateGoodsRequest(goodsItem))

  try {
    const response = await fetch(`http://localhost:8080/goods/${goodsItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goodsItem),
    })
    if (!response.ok) throw Error('Something wrong')

    const result = await response.json()
    dispatch(Actions.updateGoodsSuccess(result))
  } catch (error) {
    dispatch(Actions.updateGoodsFailure(error, goodsItem))
  }
}
