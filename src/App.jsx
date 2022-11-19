import React, { useState, useCallback } from 'react'
import { parseISO, getUnixTime, formatISO9075 } from 'date-fns/'
import { Box } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { TaskList } from './components/TaskList'
import { EditForm } from './components/EditForm'
import { FilterByStatus } from './components/FilterByStatus'
import { SortForms } from './components/SortForms'

const styles = {
  container: {
    margin: '0 auto',
    padding: '30px 20px 0 20px',
  },
}

function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortByCreation, setSortByCreation] = useState('')
  const [sortByUpdating, setSortByUpdating] = useState('')
  const [status, setStatus] = useState('Open')

  const onAddItem = useCallback(
    (item) => {
      setTasks([...tasks, { ...item, id: uuidv4(), status }])
      setStatusFilter('Open')
    },
    [tasks, status],
  )

  const removeTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((el) => el.id !== taskId))
    },
    [tasks],
  )

  const onEditTask = useCallback(
    (taskId) => {
      const currentTask = tasks.find((item) => item.id === taskId)
      setEditingTask(currentTask)
      setStatus(currentTask.status)
    },
    [setEditingTask, tasks],
  )

  const onSaveTask = useCallback(
    (item) => {
      const updatingDate = formatISO9075(new Date())
      setTasks(tasks.map((task) => (task.id === item.id ? { ...item, updatingDate } : task)))
      setEditingTask(null)
      setStatus('Open')
    },
    [tasks],
  )

  const onSetStatus = useCallback(
    (item, currentStatus) => {
      onSaveTask({ ...item, status: currentStatus })
    },
    [onSaveTask],
  )

  const handleChangeSortByCreation = useCallback(
    (event) => {
      setSortByCreation(event.target.value)
      event.target.value === 'newFirst'
        ? setTasks(tasks.sort((a, b) => getUnixTime(parseISO(a.creationDate)) - getUnixTime(parseISO(b.creationDate))))
        : setTasks(tasks.sort((a, b) => getUnixTime(parseISO(b.creationDate)) - getUnixTime(parseISO(a.creationDate))))
    },
    [tasks],
  )

  const handleChangeSortByUpdating = useCallback(
    (event) => {
      setSortByUpdating(event.target.value)
      const filteredUpdating = tasks.filter((item) => item.updatingDate)
      const filteredWithoutUpdating = tasks.filter((item) => !item.updatingDate)
      event.target.value === 'newFirst'
        ? setTasks(() => {
            return [...filteredUpdating, ...filteredWithoutUpdating].sort(
              (a, b) => getUnixTime(parseISO(a.updatingDate)) - getUnixTime(parseISO(b.updatingDate)),
            )
          })
        : setTasks(() => {
            return [...filteredUpdating, ...filteredWithoutUpdating].sort(
              (a, b) => getUnixTime(parseISO(b.updatingDate)) - getUnixTime(parseISO(a.updatingDate)),
            )
          })
    },
    [tasks],
  )

  const handleChangeFilter = useCallback((event) => {
    setStatusFilter(event.target.value)
  }, [])

  const handleChangeStatus = useCallback((event) => {
    setStatus(event.target.value)
  }, [])

  return (
    <div className='App' style={styles.container}>
      <EditForm
        onAddItem={onAddItem}
        item={editingTask}
        onEditTask={onEditTask}
        onSaveTask={onSaveTask}
        editingTask={editingTask}
        onSetStatus={onSetStatus}
        status={status}
        handleChangeStatus={handleChangeStatus}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '0 auto', justifyContent: 'center' }}>
        <FilterByStatus statusFilter={statusFilter} handleChangeFilter={handleChangeFilter} />
        <SortForms
          sortByCreation={sortByCreation}
          handleChangeSortByCreation={handleChangeSortByCreation}
          sortByUpdating={sortByUpdating}
          handleChangeSortByUpdating={handleChangeSortByUpdating}
        />
      </Box>
      <TaskList
        tasksItems={tasks}
        removeTask={removeTask}
        onEditTask={onEditTask}
        onSetStatus={onSetStatus}
        statusFilter={statusFilter}
      />
    </div>
  )
}

export default App
