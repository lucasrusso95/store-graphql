import http from 'axios'
import { serialize } from 'cookie'
import paths from '../paths'
import { withAuthToken, headers } from '../headers'

const makeRequest = async (ctx, url) => {
  const configRequest = async (ctx, url) => ({
    headers: withAuthToken(headers.profile)(ctx),
    enableCookies: true,
    method: 'GET',
    url,
  })
  return await http.request(await configRequest(ctx, url))
}

export const queries = {
  whoSawAlsoBought: async (_, args, { vtex: ioContext }) => {
    const {productId} = args
    const {account} = ioContext
    const resposta = await makeRequest(ioContext, paths.whoSawAlsoBouht("boticario", productId))
    console.log(resposta.data[0].productName)
    return resposta.data
  },
}