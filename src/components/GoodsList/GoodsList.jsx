import PropTypes from 'prop-types'
import { Goods } from '../Goods/Goods'
import './GoodsList.css'

export function GoodsList({
  goodsList,
  onRemoveItem,
  isLoadingAdd,
  onEditItem,
  stringFilter,
  fieldFilter,
  isLoadingRemove,
  isLoadingEdit,
}) {
  if (!goodsList?.length) {
    return <div>No items to display</div>
  }

  return (
    <div className='goodsList'>
      {goodsList.map((goods) => {
        const stringFilterLower = stringFilter.toLowerCase()
        const goodsFieldLower = goods[fieldFilter].toLowerCase()

        if (goodsFieldLower.includes(stringFilterLower) || stringFilter === '') {
          return (
            <Goods
              goods={goods}
              key={goods.id}
              onRemoveItem={onRemoveItem}
              onEditItem={onEditItem}
              isLoadingRemove={isLoadingRemove[goods.id]}
              isLoadingEdit={isLoadingEdit[goods.id]}
            />
          )
        }
        return null
      })}
      {isLoadingAdd && <Goods isLoadingAdd={isLoadingAdd} />}
    </div>
  )
}

GoodsList.propTypes = {
  goodsList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      weight: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  isLoadingAdd: PropTypes.bool.isRequired,
  stringFilter: PropTypes.string.isRequired,
  fieldFilter: PropTypes.string.isRequired,
  isLoadingRemove: PropTypes.objectOf(PropTypes.bool).isRequired,
  isLoadingEdit: PropTypes.objectOf(PropTypes.bool).isRequired,
}
