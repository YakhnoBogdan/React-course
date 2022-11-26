import PropTypes from 'prop-types'
import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Box, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import {
  selectTaskToEdit,
  selectTasks,
  selectSortWayByUpdating,
  selectSortWayByCreation,
} from '../redux/tasks/selectors'
import { changeFilterByStatus, createTask, saveTask } from '../redux/tasks/actions'

const styles = {
  inputs: {
    marginBottom: '20px',
    bgcolor: '#fff',
  },
  statusRadioGroup: {
    mb: 1.5,
    display: 'flex',
    flexDirection: 'row',
  },
  formButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    mb: 1.5,
  },
  clearFieldsButton: {
    bgcolor: '#464544',
    width: '45%',
    py: 1.2,
    color: '#fff',
  },
  addButton: {
    width: '45%',
    py: 1.2,
  },
}

export function EditForm({ handleSortByUpdating, handleSortByCreation }) {
  const tasks = useSelector(selectTasks)
  const sortWayByUpdating = useSelector(selectSortWayByUpdating)
  const sortWayByCreation = useSelector(selectSortWayByCreation)
  const taskToEdit = useSelector(selectTaskToEdit)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fieldsWarning, setFieldsWarning] = useState(false)
  const [status, setStatus] = useState('Open')

  useEffect(() => {
    taskToEdit?.title ? setTitle(taskToEdit.title) : setTitle('')
    taskToEdit?.description ? setDescription(taskToEdit.description) : setDescription('')
    taskToEdit?.status ? setStatus(taskToEdit.status) : setStatus('Open')
    if (sortWayByUpdating) {
      handleSortByUpdating(sortWayByUpdating, tasks)
    }
  }, [taskToEdit])

  const clearFields = useCallback(() => {
    setTitle('')
    setDescription('')
  }, [])

  const addTask = useCallback(() => {
    if (title && description) {
      if (!taskToEdit) {
        dispatch(createTask({ title, description }))
        dispatch(changeFilterByStatus('Open'))
        if (sortWayByCreation) handleSortByCreation(sortWayByCreation, tasks)
      } else {
        dispatch(saveTask({ ...taskToEdit, title, description, status }))
        setStatus('Open')
      }
    } else {
      setFieldsWarning(!fieldsWarning)
    }
    clearFields()
  }, [
    dispatch,
    title,
    description,
    clearFields,
    taskToEdit,
    status,
    fieldsWarning,
    sortWayByCreation,
    tasks,
    handleSortByCreation,
  ])

  const handleDescriptionInput = useCallback((event) => {
    setDescription(event.target.value)
    setFieldsWarning(false)
  }, [])

  const handleTitleInput = useCallback((event) => {
    setTitle(event.target.value)
    setFieldsWarning(false)
  }, [])

  const handleChangeStatus = useCallback((event) => {
    setStatus(event.target.value)
  }, [])

  return (
    <div>
      <TextField
        fullWidth
        label='Task title'
        id='fullWidth'
        onChange={handleTitleInput}
        sx={styles.inputs}
        value={title}
        error={fieldsWarning}
      />
      <TextField
        fullWidth
        label='Task description'
        onChange={handleDescriptionInput}
        value={description}
        sx={styles.inputs}
        error={fieldsWarning}
      />

      {taskToEdit?.id && (
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={status}
          onChange={handleChangeStatus}
          sx={styles.statusRadioGroup}
        >
          <FormControlLabel value='Open' control={<Radio />} label='Open' />
          <FormControlLabel value='In Progress' control={<Radio />} label='In Progress' />
          <FormControlLabel value='Done' control={<Radio />} label='Done' />
        </RadioGroup>
      )}

      <Box sx={styles.formButtons}>
        <Button variant='outlined' sx={styles.clearFieldsButton} onClick={clearFields}>
          Clear form
        </Button>
        <Button variant='contained' sx={styles.addButton} color='success' onClick={addTask}>
          {taskToEdit ? 'Save' : 'Add task'}
        </Button>
      </Box>
    </div>
  )
}

EditForm.propTypes = {
  handleSortByCreation: PropTypes.func.isRequired,
  handleSortByUpdating: PropTypes.func.isRequired,
}
