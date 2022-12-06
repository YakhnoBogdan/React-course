import { useDispatch } from 'react-redux'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { sortByField } from '../../redux/goods/actions'
import './SortField.css'

export function SortField() {
  const dispatch = useDispatch()

  const [sortingField, setSortField] = useState('weight')
  const [sortWay, setSortWay] = useState('desc')

  const handleChangeSortField = useCallback((event) => {
    setSortField(event.target.value)
  }, [])

  const handleChangeSortWay = useCallback((event) => {
    setSortWay(event.target.value)
  }, [])

  useEffect(() => {
    dispatch(sortByField(sortWay, sortingField))
  }, [dispatch, sortWay, sortingField])

  return (
    <Box className='sortField'>
      <FormControl className='sortFieldSelect'>
        <InputLabel id='demo-simple-select-label'>Sort by field</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={sortingField}
          label='Sort by field'
          onChange={handleChangeSortField}
        >
          <MenuItem value='title'>Title</MenuItem>
          <MenuItem value='description'>Description</MenuItem>
          <MenuItem value='weight'>Weight</MenuItem>
          <MenuItem value='category'>Category</MenuItem>
        </Select>
      </FormControl>

      <FormControl className='sortWaySelect'>
        <InputLabel id='demo-simple-select-label'>Sort way</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={sortWay}
          label='Sort Way'
          onChange={handleChangeSortWay}
        >
          <MenuItem value='desc'>Desc</MenuItem>
          <MenuItem value='asc'>Asc</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
