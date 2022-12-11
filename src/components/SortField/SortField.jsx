import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { sortByField } from '../../redux/goods/actions'
import './SortField.css'

class SortField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortingField: 'weight',
      sortWay: 'desc',
    }
  }

  componentDidUpdate() {
    const { dispatchSortByField } = this.props
    const { sortWay, sortingField } = this.state
    dispatchSortByField(sortWay, sortingField)
  }

  handleChangeSortField = (event) => {
    this.setState({ sortingField: event.target.value })
  }

  handleChangeSortWay = (event) => {
    this.setState({ sortWay: event.target.value })
  }

  render() {
    const { sortingField, sortWay } = this.state

    return (
      <Box className='sortField'>
        <FormControl className='sortFieldSelect'>
          <InputLabel id='demo-simple-select-label'>Sort by field</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={sortingField}
            label='Sort by field'
            onChange={this.handleChangeSortField}
          >
            <MenuItem value='title'>Title</MenuItem>
            <MenuItem value='description'>Description</MenuItem>
            <MenuItem value='weight'>Weight</MenuItem>
            <MenuItem value='category'>Category</MenuItem>
          </Select>
        </FormControl>

        <FormControl className='sortWaySelect'>
          <InputLabel id='demo-simple-select-label'>Sort way</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={sortWay}
            label='Sort Way'
            onChange={this.handleChangeSortWay}
          >
            <MenuItem value='desc'>Desc</MenuItem>
            <MenuItem value='asc'>Asc</MenuItem>
          </Select>
        </FormControl>
      </Box>
    )
  }
}

SortField.propTypes = {
  dispatchSortByField: PropTypes.func,
}
const mapDispatchToProps = (dispatch) => ({
  dispatchSortByField: (sortWay, sortingField) => dispatch(sortByField(sortWay, sortingField)),
})

export default connect(null, mapDispatchToProps)(SortField)
