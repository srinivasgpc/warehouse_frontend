import React, { useEffect, useState } from "react"
import { Container, Box, Card, CardContent, Typography, Button, CircularProgress } from "@material-ui/core"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { productsServices } from "../services/product_services"

const { getAllProducts, sellProduct, resetStock } = productsServices

const Products = () => {
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(false)
  const [buttonLoader, setButtonLoader] = useState(null)

  useEffect(() => {
    getAllProductsCall()
  }, [])

  const refreshPage = async () => {
    await resetStock()
      .then(() => {
        window.location.reload(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const getAllProductsCall = async () => {
    setLoading(true)
    await getAllProducts()
      .then((response) => {
        const { results } = response
        const productsWithInventrory = formatProductsWithInventory(results)

        setProducts(productsWithInventrory)
        setInventory(results.inventory)
        setLoading(false)
      })
      .catch((e) => {
        alert(e.message)
        setLoading(false)
      })
  }

  const initializeSellProduct = async (payload) => {
    const product = payload.contain_articles
    setButtonLoader(payload.name)
    await sellProduct({ product })
      .then((response) => {
        const { results } = response
        const productsWithInventrory = formatProductsWithInventory(results)

        setProducts(productsWithInventrory)
        setInventory(results.inventory)
        setButtonLoader(null)
      })
      .catch((err) => {
        alert(err.message)
        setButtonLoader(null)
      })
  }

  const formatProductsWithInventory = (results) => {
    return results.products.map((product, i) => {
      const productArticle = product.contain_articles.map((article) => {
        const getArticle = results.inventory.find((x) => x.art_id === article.art_id)
        return { ...article, name: getArticle.name }
      })
      return { ...product, contain_articles: productArticle }
    })
  }

  const ProductsList = () => {
    return (
      <>
        {products &&
          products.map((product, key) => {
            const { contain_articles } = product
            console.log(buttonLoader)
            return (
              <Card variant="outlined" key={key} className="product_card">
                <CardContent className="product_card_content">
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6" component="h6" className="product_title">
                      {product.name} ({product.quantity_available})
                    </Typography>

                    <Button variant="contained" size="small" onClick={() => initializeSellProduct(product)} disabled={product.quantity_available === 0 || buttonLoader === product.name}>
                      {buttonLoader === product.name ? (
                        <Box display="flex" alignItems="center">
                          <span className="product_button"> Selling</span>
                          <CircularProgress size={15} />
                        </Box>
                      ) : (
                        "Sell"
                      )}
                    </Button>
                  </Box>

                  <List component="nav" aria-label="secondary">
                    {contain_articles.map((article, i) => {
                      return (
                        <ListItem key={i}>
                          <ListItemText primary={article.name} />
                          <ListItemText secondary={article.amount_of} className="product_list_text" />
                        </ListItem>
                      )
                    })}
                  </List>
                </CardContent>
              </Card>
            )
          })}
      </>
    )
  }
  const InventoryList = () => {
    return (
      <Card variant="outlined" className="product_card">
        <CardContent className="product_card_content">
          <Typography variant="h6" component="h6" className="product_title">
            Inventory
          </Typography>
          {inventory && (
            <List component="nav" aria-label="secondary">
              {inventory.map((article, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemText primary={article.name} />
                    <ListItemText secondary={article.stock} className="product_list_text" />
                  </ListItem>
                )
              })}
            </List>
          )}
        </CardContent>
      </Card>
    )
  }
  return (
    <Container fluid="true" className="stock_container">
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Box paddingLeft="20px">
          <Button onClick={refreshPage} variant="contained" color="primary">
            Reset Stock
          </Button>
        </Box>

        {!loading ? (
          <Box display="flex" className="products" flexWrap="wrap">
            <ProductsList />
            <InventoryList />
          </Box>
        ) : (
          <Box textAlign="center" width="100%">
            <CircularProgress color="primary" size={20} />
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default Products
