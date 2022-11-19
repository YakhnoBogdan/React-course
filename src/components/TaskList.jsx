import { React } from 'react'
import PropTypes from 'prop-types'
import { Task } from './Task'

export function TaskList({ tasksItems, removeTask, onEditTask, onSetStatus, statusFilter }) {
  return (
    <div style={{ padding: '30px 0' }}>
      {tasksItems.map((item) => {
        localStorage.setItem(item.id, item)
        return (
          <div key={item.id}>
            {item.status === statusFilter || statusFilter === 'all' ? (
              <Task task={item} removeTask={removeTask} onEditTask={onEditTask} onSetStatus={onSetStatus} />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

TaskList.propTypes = {
  removeTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onSetStatus: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
  tasksItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      creationDate: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
}
