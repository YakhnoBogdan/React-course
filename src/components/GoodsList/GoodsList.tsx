import { useMemo } from 'react'
import { Goods } from '../Goods/Goods'
import './GoodsList.css'
import { GoodsModel } from '../../services/goodsTypes'

interface GoodsListProps {
  goodsList: Array<GoodsModel>
  onRemoveItem: (id: string) => void
  onEditItem: (goodsItem: GoodsModel) => void
  isLoadingAdd: boolean
  isLoadingRemove: { [index: string]: boolean }
  isLoadingEdit: { [index: string]: boolean }
  stringFilter: string
  fieldFilter: string
}

export function GoodsList({
  goodsList,
  onRemoveItem,
  isLoadingAdd,
  onEditItem,
  stringFilter,
  fieldFilter,
  isLoadingRemove,
  isLoadingEdit,
}: GoodsListProps) {
  const filteredGoodsList = useMemo(() => {
    return goodsList.filter((goods) => {
      const goodsFieldLower = goods[fieldFilter as keyof GoodsModel].toLowerCase()
      const stringFilterLower = stringFilter.toLowerCase()
      return goodsFieldLower.includes(stringFilterLower)
    })
  }, [goodsList, fieldFilter, stringFilter])

  if (!goodsList?.length) {
    return <div>No items to display</div>
  }

  return (
    <div className='goodsList'>
      {filteredGoodsList.map((goods) => {
        return (
          <Goods
            goods={goods}
            key={goods.id}
            onRemoveItem={onRemoveItem}
            onEditItem={onEditItem}
            isLoadingRemove={isLoadingRemove[goods.id]}
            isLoadingEdit={isLoadingEdit[goods.id]}
            isLoadingAdd={false}
          />
        )
      })}
      {isLoadingAdd && <Goods isLoadingAdd={isLoadingAdd} />}
    </div>
  )
}
