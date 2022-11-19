import PropTypes from 'prop-types'
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'

export function SortForms({ sortByCreation, handleChangeSortByCreation, sortByUpdating, handleChangeSortByUpdating }) {
  return (
    <>
      <FormControl variant='standard' sx={{ m: 1.2, minWidth: 250, flexBasis: '20%' }}>
        <InputLabel id='demo-simple-select-standard-label'>Sort by creation</InputLabel>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={sortByCreation}
          onChange={handleChangeSortByCreation}
          label='Sort by creation'
        >
          <MenuItem value='newFirst'>New first</MenuItem>
          <MenuItem value='oldFirst'>Old first</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant='standard' sx={{ m: 1.2, minWidth: 250, flexBasis: '20%' }}>
        <InputLabel id='demo-simple-select-standard-label'>Sort by updating</InputLabel>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={sortByUpdating}
          onChange={handleChangeSortByUpdating}
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
  handleChangeSortByCreation: PropTypes.func.isRequired,
  handleChangeSortByUpdating: PropTypes.func.isRequired,
  sortByCreation: PropTypes.string.isRequired,
  sortByUpdating: PropTypes.string.isRequired,
}
