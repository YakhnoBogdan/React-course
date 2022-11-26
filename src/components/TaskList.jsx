import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Task } from './Task'
import { selectFilter } from '../redux/tasks/selectors'

const styles = {
  nothingToDispay: {
    textAlign: 'center',
    padding: '20px 0',
    fontSize: '24px',
  },
}
export function TaskList({ tasks }) {
  const filter = useSelector(selectFilter)

  if (!tasks?.length) {
    return <div style={styles.nothingToDispay}>No tasks to display</div>
  }
  return (
    <div>
      {tasks.map((task) => {
        if (task.status === filter || filter === 'all') {
          return <Task key={task.id} task={task} />
        }
        return null
      })}
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      creationDate: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
}
