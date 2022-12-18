import { GoodsModel } from './goodsTypes'

enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  DETELE = 'DELETE',
  PUT = 'PUT',
}

const BASE_URL = 'http://localhost:8080'

const commonHeaders = {
  'Content-Type': 'application/json',
}

interface CallApiEndpointParameters<BodyType> {
  endpoint: string
  method?: HTTP_METHOD
  headers?: { [index: string]: string }
  body?: BodyType
}

interface CallApiEndpointResult<ResponseType> {
  error?: Error
  success: boolean
  response?: ResponseType
}

interface FetchAllGoodsResponse {
  goods: GoodsModel[]
}

export const callApiEndpoint = async <BodyType, ResponseType>({
  endpoint,
  method,
  body,
  headers,
}: CallApiEndpointParameters<BodyType>): Promise<CallApiEndpointResult<ResponseType>> => {
  try {
    const response = await fetch([BASE_URL, endpoint].join('/'), {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: { ...commonHeaders, ...headers },
    })

    if (response.ok) {
      const responseJson = await response.json()
      return {
        success: true,
        response: responseJson,
      }
    }
    return {
      success: false,
      error: new Error('Something went wrong'),
    }
  } catch (error) {
    return {
      success: false,
      error: new Error('Something went wrong'),
    }
  }
}

export const fetchAllGoodsApi = () =>
  callApiEndpoint<undefined, FetchAllGoodsResponse>({
    endpoint: 'goods',
    method: HTTP_METHOD.GET,
  })

export const addGoodsApi = ({ goodsItem }: { goodsItem: Omit<GoodsModel, 'id'> }) =>
  callApiEndpoint<Omit<GoodsModel, 'id'>, GoodsModel>({
    endpoint: 'goods',
    method: HTTP_METHOD.POST,
    body: goodsItem,
  })

export const removeGoodsApi = ({ id }: { id: string }) =>
  callApiEndpoint<undefined, undefined>({
    endpoint: ['goods', id].join('/'),
    method: HTTP_METHOD.DETELE,
  })

export const updateGoodsApi = ({ goodsItem }: { goodsItem: GoodsModel }) =>
  callApiEndpoint<GoodsModel, GoodsModel>({
    endpoint: ['goods', goodsItem.id].join('/'),
    method: HTTP_METHOD.PUT,
    body: goodsItem,
  })
