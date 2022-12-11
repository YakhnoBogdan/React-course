import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, TextField, Button } from '@mui/material'
import { fetchAddGoods, fetchUpdateGoods } from '../../redux/goods/thunk'
import { selectGoodsToEdit, selectErrorAdd } from '../../redux/goods/selectors'
import './EditForm.css'

const initialGoods = {
  title: '',
  description: '',
  weight: '',
  category: '',
}

class EditForm extends React.Component {
  constructor(props) {
    super(props)
    const { errorAdd } = this.props
    this.state = {
      goods: initialGoods,
      inputError: errorAdd,
    }
  }

  componentDidUpdate() {
    this.checkGoodsToUpdate()
  }

  checkGoodsToUpdate = () => {
    const { editItem } = this.props
    if (this.editItem !== editItem) {
      this.editItem = editItem
      if (editItem?.id) {
        this.setState({ goods: editItem })
      }
    }
  }

  onChangeText = (event) => {
    const { goods } = this.state

    this.setState({
      inputError: false,
      goods: {
        ...goods,
        [event.target.name]: event.target.value,
      },
    })
  }

  clearForm = () => {
    this.setState({ goods: initialGoods })
  }

  onSaveItem = () => {
    const { editItem, dispatchFetchAddGoods, dispatchFetchUpdateGoods, onSaveEditItem } = this.props
    const { goods } = this.state
    if (editItem?.id) {
      dispatchFetchUpdateGoods(goods)
      onSaveEditItem()
    } else {
      for (const inputField in goods) {
        if (Object.hasOwnProperty.call(goods, inputField)) {
          const element = goods[inputField]
          if (element === '' && inputField !== 'category') this.setState({ inputError: true })
        }
      }
      dispatchFetchAddGoods(goods)
    }
    this.clearForm()
  }

  render() {
    const { editItem } = this.props
    const { goods, inputError } = this.state

    return (
      <Box className='form'>
        <TextField
          name='title'
          id='filled-basic'
          label='Title'
          variant='filled'
          onChange={this.onChangeText}
          value={goods.title || ''}
          error={inputError}
        />
        <TextField
          name='description'
          id='filled-basic'
          label='Description'
          variant='filled'
          onChange={this.onChangeText}
          value={goods.description || ''}
          error={inputError}
        />
        <TextField
          name='weight'
          id='filled-basic'
          label='Weight'
          variant='filled'
          onChange={this.onChangeText}
          value={goods.weight || ''}
          error={inputError}
        />
        <TextField
          name='category'
          id='filled-basic'
          label='Category'
          variant='filled'
          onChange={this.onChangeText}
          value={goods.category || ''}
          error={inputError}
        />
        <Box>
          <Button variant='contained' color='success' onClick={this.onSaveItem} className='form__button'>
            {editItem ? 'Save' : 'Add'}
          </Button>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  editItem: selectGoodsToEdit(state),
  errorAdd: selectErrorAdd(state),
})
const mapDispatchToProps = (dispatch) => ({
  dispatchFetchUpdateGoods: (goods) => dispatch(fetchUpdateGoods(goods)),
  dispatchFetchAddGoods: (goods) => dispatch(fetchAddGoods(goods)),
})

EditForm.propTypes = {
  onSaveEditItem: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)
