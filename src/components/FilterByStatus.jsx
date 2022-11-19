import PropTypes from 'prop-types'
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'

export function FilterByStatus({ statusFilter, handleChangeFilter }) {
  return (
    <FormControl variant='standard' sx={{ m: 1.2, minWidth: 250, flexBasis: '20%' }}>
      <InputLabel id='demo-simple-select-standard-label'>Filter by status</InputLabel>
      <Select
        labelId='demo-simple-select-standard-label'
        id='demo-simple-select-standard'
        value={statusFilter}
        onChange={handleChangeFilter}
        label='Age'
      >
        <MenuItem value='all'>All</MenuItem>
        <MenuItem value='Open'>Open</MenuItem>
        <MenuItem value='In Progress'>In Progress</MenuItem>
        <MenuItem value='Done'>Done</MenuItem>
      </Select>
    </FormControl>
  )
}

FilterByStatus.propTypes = {
  statusFilter: PropTypes.string.isRequired,
  handleChangeFilter: PropTypes.func.isRequired,
}
