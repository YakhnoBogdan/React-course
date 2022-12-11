import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React from 'react'
import { filterByFieldString } from '../../redux/goods/actions'
import './FilterField.css'

class FilterField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      field: 'title',
    }
  }

  componentDidUpdate() {
    const { dispatchFilterByFieldString } = this.props
    const { value, field } = this.state
    dispatchFilterByFieldString(value, field)
  }

  handleChangeFields = (event) => {
    this.setState({ field: event.target.value })
  }

  handleInput = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    const { value, field } = this.state

    return (
      <Box className='filterContainer'>
        <FormControl className='filterSelect'>
          <InputLabel id='demo-simple-select-label'>Filter field</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={field}
            label='Filter field'
            onChange={this.handleChangeFields}
          >
            <MenuItem value='title'>Title</MenuItem>
            <MenuItem value='description'>Description</MenuItem>
            <MenuItem value='weight'>Weight</MenuItem>
            <MenuItem value='category'>Category</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className='filterTextField'
          id='outlined-basic'
          label='Filter by field'
          variant='outlined'
          value={value}
          onChange={this.handleInput}
        />
      </Box>
    )
  }
}

FilterField.propTypes = {
  dispatchFilterByFieldString: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFilterByFieldString: (value, field) => dispatch(filterByFieldString(value, field)),
})

export default connect(null, mapDispatchToProps)(FilterField)
