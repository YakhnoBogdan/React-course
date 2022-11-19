import { useCallback } from 'react'
import { Card, CardActions, CardContent, Typography, Button, Box, Radio, FormControlLabel } from '@mui/material'
import PropTypes from 'prop-types'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

const styles = {
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}

export function Task({ task, removeTask, onEditTask }) {
  const handleRemoveTask = useCallback(() => {
    removeTask(task.id)
  }, [removeTask, task])

  const handleEditTask = useCallback(() => {
    onEditTask(task.id)
  }, [onEditTask, task])

  return (
    <Card variant='outlined' sx={{ minWidth: 275, display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
      <CardContent sx={styles.flexContainer}>
        <Box>
          <Typography variant='h5' component='div'>
            {task.title}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color='text.secondary' gutterBottom>
            {task.description}
          </Typography>
        </Box>

        <Box sx={{ paddingTop: '40px' }}>
          <Typography color='text.secondary' sx={{ mb: 1.1 }}>
            {task?.updatingDate ? `Updating date: ${task.updatingDate}` : null}
          </Typography>
          <Typography color='text.secondary'>Creation date: {task.creationDate}</Typography>
        </Box>
      </CardContent>

      <CardActions sx={styles.flexContainer}>
        <FormControlLabel value='open' control={<Radio />} label={task.status} checked />
        <Box sx={{ display: 'flex', padding: '10px' }}>
          <Button size='small' onClick={handleEditTask}>
            Edit
          </Button>
          <Button size='small' onClick={handleRemoveTask}>
            <DeleteOutlinedIcon />
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}

Task.propTypes = {
  removeTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}
