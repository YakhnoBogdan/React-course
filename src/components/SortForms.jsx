import PropTypes from 'prop-types'
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { useCallback, useState } from 'react'

const styles = {
  selectContainer: {
    m: 1.2,
    minWidth: 250,
    flexBasis: '20%',
  },
}

export function SortForms({ handleSortByCreation, handleSortByUpdating }) {
  const [sortByCreation, setSortByCreation] = useState('')
  const [sortByUpdating, setSortByUpdating] = useState('')

  const handleSelectSortByCreation = useCallback(
    (event) => {
      setSortByCreation(event.target.value)
      handleSortByCreation(event.target.value)
    },
    [handleSortByCreation],
  )

  const hadleSelectSortByUpdating = useCallback(
    (event) => {
      setSortByUpdating(event.target.value)
      handleSortByUpdating(event.target.value)
    },
    [handleSortByUpdating],
  )
  return (
    <>
      <FormControl variant='standard' sx={styles.selectContainer}>
        <InputLabel id='demo-simple-select-standard-label'>Sort by creation</InputLabel>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={sortByCreation}
          onChange={handleSelectSortByCreation}
          label='Sort by creation'
        >
          <MenuItem value='newFirst'>New first</MenuItem>
          <MenuItem value='oldFirst'>Old first</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant='standard' sx={styles.selectContainer}>
        <InputLabel id='demo-simple-select-standard-label'>Sort by updating</InputLabel>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={sortByUpdating}
          onChange={hadleSelectSortByUpdating}
          label='Sort by updating'
        >
          <MenuItem value='newFirst'>New first</MenuItem>
          <MenuItem value='oldFirst'>Old first</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

SortForms.propTypes = {
  handleSortByCreation: PropTypes.func.isRequired,
  handleSortByUpdating: PropTypes.func.isRequired,
}
