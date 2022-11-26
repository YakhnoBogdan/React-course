import { useDispatch, useSelector } from 'react-redux'
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { useCallback } from 'react'
import { changeFilterByStatus } from '../redux/tasks/actions'
import { selectFilter } from '../redux/tasks/selectors'

const styles = {
  formControl: {
    m: 1.2,
    minWidth: 250,
    flexBasis: '20%',
  },
}

export function FilterByStatus() {
  const dispatch = useDispatch()
  const filter = useSelector(selectFilter)

  const handleChangeFilter = useCallback(
    (event) => {
      dispatch(changeFilterByStatus(event.target.value))
    },
    [dispatch],
  )

  return (
    <FormControl variant='standard' sx={styles.formControl}>
      <InputLabel id='demo-simple-select-standard-label'>Filter by status</InputLabel>
      <Select
        labelId='demo-simple-select-standard-label'
        id='demo-simple-select-standard'
        value={filter}
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
