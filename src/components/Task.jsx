import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { Card, CardActions, CardContent, Typography, Button, Box, Radio, FormControlLabel } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useDispatch } from 'react-redux'
import { editTask, removeTask } from '../redux/tasks/actions'

const styles = {
  cardContaner: {
    minWidth: 275,
    mb: 1.5,
    display: 'flex',
    justifyContent: 'space-between',
  },
  actionsContainer: {
    dispay: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexBasis: '30%',
    alignItems: 'flex-end',
  },
  buttonsContainer: {
    dispay: 'flex',
    padding: '10px',
  },
  desciptionText: {
    fontSize: '16px',
    wordBreak: 'break-word',
  },
  titleText: {
    wordBreak: 'break-word',
  },
  datesContainer: {
    paddingTop: '40px',
  },
  updatingDateMargin: {
    marginBottom: '10px',
  },
}

export function Task({ task }) {
  const dispatch = useDispatch()

  const handleRemoveTask = useCallback(() => {
    dispatch(removeTask(task))
  }, [dispatch, task])

  const handleEditTask = useCallback(() => {
    dispatch(editTask(task))
  }, [task, dispatch])

  return (
    <Card variant='outlined' sx={styles.cardContaner}>
      <CardContent>
        <Box>
          <Typography variant='h5' component='div' sx={styles.titleText}>
            {task.title}
          </Typography>
          <Typography sx={styles.desciptionText} color='text.secondary' gutterBottom>
            {task.description}
          </Typography>
        </Box>

        <Box sx={styles.datesContainer}>
          <Typography color='text.secondary' sx={styles.updatingDateMargin}>
            {task?.updatingDate ? `Updating date: ${task.updatingDate}` : null}
          </Typography>
          <Typography color='text.secondary'>Creation date: {task.creationDate}</Typography>
        </Box>
      </CardContent>

      <CardActions sx={styles.actionsContainer}>
        <FormControlLabel value='open' control={<Radio />} label={task.status} checked />
        <Box sx={styles.buttonsContainer}>
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
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}
