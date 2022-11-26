import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import { EditForm } from './components/EditForm'
import { TaskList } from './components/TaskList'
import { SortForms } from './components/SortForms'
import { FilterByStatus } from './components/FilterByStatus'
import { selectTasks } from './redux/tasks/selectors'
import { sortByCreation, sortByUpdating } from './redux/tasks/actions'

const styles = {
  mainContainer: {
    margin: '0 auto',
    padding: '30px 20px 0 20px',
  },
  filtersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px auto',
    justifyContent: 'center',
  },
}

function App() {
  const tasks = useSelector(selectTasks)
  const dispatch = useDispatch()

  const handleSortByCreation = useCallback(
    (sortWay) => {
      dispatch(sortByCreation(sortWay))
    },
    [dispatch],
  )

  const handleSortByUpdating = useCallback(
    (sortWay) => {
      dispatch(sortByUpdating(sortWay, tasks))
    },
    [tasks, dispatch],
  )

  return (
    <div className='App' style={styles.mainContainer}>
      <EditForm handleSortByUpdating={handleSortByUpdating} handleSortByCreation={handleSortByCreation} />
      <Box sx={styles.filtersContainer}>
        <FilterByStatus />
        <SortForms handleSortByUpdating={handleSortByUpdating} handleSortByCreation={handleSortByCreation} />
      </Box>
      <TaskList tasks={tasks} />
    </div>
  )
}

export default App
