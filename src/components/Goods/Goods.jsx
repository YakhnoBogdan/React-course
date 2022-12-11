import PropTypes from 'prop-types'
import { Card, CardActions, CardContent, Button, Typography, CircularProgress } from '@mui/material'
import React from 'react'
import './Goods.css'

export class Goods extends React.Component {
  handleRemove = () => {
    const { onRemoveItem, goods } = this.props
    onRemoveItem(goods.id)
  }

  handleEditClick = () => {
    const { onEditItem, goods } = this.props
    onEditItem(goods)
  }

  render() {
    const { goods, isLoadingEdit, isLoadingRemove, isLoadingAdd } = this.props

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
            <Button size='small' onClick={this.handleEditClick}>
              Edit
            </Button>
          )}
          {isLoadingRemove ? (
            <CircularProgress />
          ) : (
            <Button size='small' onClick={this.handleRemove}>
              Remove
            </Button>
          )}
        </CardActions>
      </Card>
    )
  }
}

Goods.propTypes = {
  goods: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  onRemoveItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isLoadingRemove: PropTypes.bool,
  isLoadingEdit: PropTypes.bool,
  isLoadingAdd: PropTypes.bool,
}
