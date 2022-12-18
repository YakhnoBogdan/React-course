import { Box, TextField, Button } from '@mui/material'
import React, { useCallback, useState, useEffect } from 'react'
import { fetchAddGoods, fetchUpdateGoods } from '../../redux/goods/thunk'
import './EditForm.css'
import { GoodsModel } from '../../services/goodsTypes'
import { dispatchStore } from '../../redux'

interface EditFormProps {
  editItem: GoodsModel | null
  onSaveEditItem: () => void
  errorAdd: boolean
}

type InitialGoods = Omit<GoodsModel, 'id'> & { id?: string }

const initialGoods = {
  title: '',
  description: '',
  weight: '',
  category: '',
}

export function EditForm({ editItem, onSaveEditItem, errorAdd }: EditFormProps) {
  const [goods, setGoods] = useState<InitialGoods>(initialGoods)
  const [inputError, setInputError] = useState(errorAdd)

  useEffect(() => {
    setInputError(errorAdd)
  }, [errorAdd])

  const onChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
      dispatchStore(fetchUpdateGoods({ ...goods, id: editItem.id }))
      onSaveEditItem()
    } else {
      dispatchStore(fetchAddGoods(goods))
    }
    clearForm()
  }, [editItem, goods, clearForm, onSaveEditItem])

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
