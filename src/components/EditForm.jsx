import { useState, useCallback, useEffect } from 'react'
import { formatISO9075 } from 'date-fns/'
import PropTypes from 'prop-types'
import { TextField, Button, Box, FormControlLabel, RadioGroup, Radio } from '@mui/material'

export function EditForm({ item, status, onAddItem, onSaveTask, handleChangeStatus }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fieldsWarning, setFieldsWarning] = useState(false)
  const handleDescriptionInput = useCallback((event) => {
    setDescription(event.target.value)
    setFieldsWarning(false)
  }, [])

  const handleTitleInput = useCallback((event) => {
    setTitle(event.target.value)
    setFieldsWarning(false)
  }, [])

  useEffect(() => {
    if (item?.id) {
      setTitle(item?.title)
      setDescription(item?.description)
    }
  }, [item])

  const onAddTask = useCallback(() => {
    if (title && description) {
      if (item?.id) {
        onSaveTask({ ...item, title, description, status: status || item.status })
      } else {
        const creationDate = formatISO9075(new Date())
        onAddItem({ title, description, creationDate })
      }
    } else {
      setFieldsWarning(!fieldsWarning)
    }

    setTitle('')
    setDescription('')
  }, [title, description, onAddItem, item, onSaveTask, status, fieldsWarning])

  const clearFields = useCallback(() => {
    setTitle('')
    setDescription('')
  }, [])

  return (
    <div>
      <TextField
        fullWidth
        label='Task title'
        id='fullWidth'
        onChange={handleTitleInput}
        sx={{ marginBottom: '20px', bgcolor: '#fff' }}
        value={title}
        error={fieldsWarning}
      />
      <TextField
        fullWidth
        label='Task description'
        onChange={handleDescriptionInput}
        value={description}
        sx={{ mb: 1.5, bgcolor: '#fff' }}
        error={fieldsWarning}
      />

      {item?.id && (
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={status}
          onChange={handleChangeStatus}
          sx={{ mb: 1.5, display: 'flex', flexDirection: 'row' }}
        >
          <FormControlLabel value='Open' control={<Radio />} label='Open' />
          <FormControlLabel value='In Progress' control={<Radio />} label='In Progress' />
          <FormControlLabel value='Done' control={<Radio />} label='Done' />
        </RadioGroup>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 1.5 }}>
        <Button
          variant='outlined'
          sx={{ bgcolor: '#464544', width: '45%', py: 1.2, color: '#fff' }}
          onClick={clearFields}
        >
          Clear form
        </Button>
        <Button
          variant='contained'
          sx={{ width: '45%', py: 1.2 }}
          onClick={onAddTask}
          onKeyDown={onAddTask}
          color='success'
        >
          {item ? 'Save' : 'Add task'}
        </Button>
      </Box>
    </div>
  )
}

EditForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
  onSaveTask: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
}
