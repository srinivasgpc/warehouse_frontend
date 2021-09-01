import { get, post } from "../helpers/httpshandler"
const api = `http://localhost:3001`
const getAllProducts = () => get(`${api}/products`)
const sellProduct = (payload) => post(`${api}/products`, payload)
const resetStock = () => get(`${api}/products/resetStock`)
export const productsServices = { getAllProducts, sellProduct, resetStock }
