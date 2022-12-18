import { useDispatch } from 'react-redux'
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { filterByFieldString } from '../../redux/goods/actions'
import './FilterField.css'

export function FilterField() {
  const [value, setValue] = useState('')
  const [field, setField] = useState('title')
  const dispatch = useDispatch()

  const handleChangeFields = useCallback((event: SelectChangeEvent<string>) => {
    setField(event.target.value)
  }, [])

  const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }, [])

  useEffect(() => {
    dispatch(filterByFieldString({ value, field }))
  }, [dispatch, value, field])

  return (
    <Box className='filterContainer'>
      <FormControl className='filterSelect'>
        <InputLabel id='demo-simple-select-label'>Filter field</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={field}
          label='Filter field'
          onChange={handleChangeFields}
        >
          <MenuItem value='title'>Title</MenuItem>
          <MenuItem value='description'>Description</MenuItem>
          <MenuItem value='weight'>Weight</MenuItem>
          <MenuItem value='category'>Category</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className='filterTextField'
        id='outlined-basic'
        label='Filter by field'
        variant='outlined'
        value={value}
        onChange={handleInput}
      />
    </Box>
  )
}
