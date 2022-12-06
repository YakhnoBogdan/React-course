import { Box, TextField, Button } from '@mui/material'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchAddGoods, fetchUpdateGoods } from '../../redux/goods/thunk'
import './EditForm.css'

const initialGoods = {
  title: '',
  description: '',
  weight: '',
  category: '',
}

export function EditForm({ editItem, onSaveEditItem, errorAdd }) {
  const [goods, setGoods] = useState(initialGoods)
  const [inputError, setInputError] = useState(errorAdd)

  const dispatch = useDispatch()

  useEffect(() => {
    setInputError(errorAdd)
  }, [errorAdd])

  const onChangeText = useCallback(
    (event) => {
      setInputError(false)
      setGoods({
        ...goods,
        [event.target.name]: event.target.value,
      })
    },
    [goods],
  )

  useEffect(() => {
    if (editItem?.id) {
      setGoods(editItem)
    }
  }, [editItem])

  const clearForm = useCallback(() => {
    setGoods(initialGoods)
  }, [])

  const onSaveItem = useCallback(() => {
    if (editItem?.id) {
      dispatch(fetchUpdateGoods(goods))
      onSaveEditItem()
    } else {
      dispatch(fetchAddGoods(goods))
    }
    clearForm()
  }, [dispatch, editItem, goods, clearForm, onSaveEditItem])

  return (
    <Box className='form'>
      <TextField
        name='title'
        id='filled-basic'
        label='Title'
        variant='filled'
        onChange={onChangeText}
        value={goods.title}
        error={inputError}
      />
      <TextField
        name='description'
        id='filled-basic'
        label='Description'
        variant='filled'
        onChange={onChangeText}
        value={goods.description}
        error={inputError}
      />
      <TextField
        name='weight'
        id='filled-basic'
        label='Weight'
        variant='filled'
        onChange={onChangeText}
        value={goods.weight}
        error={inputError}
      />
      <TextField
        name='category'
        id='filled-basic'
        label='Category'
        variant='filled'
        onChange={onChangeText}
        value={goods.category}
        error={inputError}
      />
      <Box>
        <Button variant='contained' color='success' onClick={onSaveItem} className='form__button'>
          {editItem ? 'Save' : 'Add'}
        </Button>
      </Box>
    </Box>
  )
}

EditForm.propTypes = {
  editItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onSaveEditItem: PropTypes.func.isRequired,
  errorAdd: PropTypes.bool.isRequired,
}
