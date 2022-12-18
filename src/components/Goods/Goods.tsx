import { Card, CardActions, CardContent, Button, Typography, CircularProgress } from '@mui/material'
import { useCallback } from 'react'
import './Goods.css'
import { GoodsModel } from '../../services/goodsTypes'

interface GoodsProps {
  goods?: GoodsModel
  onRemoveItem?: (id: string) => void
  onEditItem?: (goods: GoodsModel) => void
  isLoadingRemove?: boolean
  isLoadingAdd?: boolean
  isLoadingEdit?: boolean
}

export function Goods({ goods, onRemoveItem, onEditItem, isLoadingRemove, isLoadingAdd, isLoadingEdit }: GoodsProps) {
  const handleRemove = useCallback(() => {
    if (goods?.id && onRemoveItem) {
      onRemoveItem(goods.id)
    }
  }, [goods, onRemoveItem])

  const handleEditClick = useCallback(() => {
    if (goods && onEditItem) {
      onEditItem(goods)
    }
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
