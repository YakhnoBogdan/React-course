import PropTypes from 'prop-types'
import { Card, CardActions, CardContent, Button, Typography, CircularProgress } from '@mui/material'
import { useCallback } from 'react'
import './Goods.css'

export function Goods({ goods, onRemoveItem, onEditItem, isLoadingRemove, isLoadingAdd, isLoadingEdit }) {
  const handleRemove = useCallback(() => {
    onRemoveItem(goods.id)
  }, [goods, onRemoveItem])

  const handleEditClick = useCallback(() => {
    onEditItem(goods)
  }, [goods, onEditItem])

  if (isLoadingAdd) {
    return (
      <Card className='card card_loading'>
        <CircularProgress />
      </Card>
    )
  }
  return (
    <Card className='card'>
      <CardContent>
        <Typography color='text.secondary' gutterBottom>
          {goods?.category}
        </Typography>
        <Typography variant='h5' component='div'>
          {goods?.title}
        </Typography>
        <Typography color='text.secondary'>{goods?.description}</Typography>
        <Typography variant='body2'>{goods?.weight}</Typography>
      </CardContent>
      <CardActions className='card__actions'>
        {isLoadingEdit ? (
          <CircularProgress />
        ) : (
          <Button size='small' onClick={handleEditClick}>
            Edit
          </Button>
        )}
        {isLoadingRemove ? (
          <CircularProgress />
        ) : (
          <Button size='small' onClick={handleRemove}>
            Remove
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

Goods.propTypes = {
  goods: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  isLoadingRemove: PropTypes.objectOf(PropTypes.bool).isRequired,
  isLoadingEdit: PropTypes.objectOf(PropTypes.bool).isRequired,
  isLoadingAdd: PropTypes.bool.isRequired,
}
