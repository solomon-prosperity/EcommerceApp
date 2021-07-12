const express = require ('express')
const app = express()
const {products} = require('./models/product')

app.use(express.json());

app.get('/api/products' , (req , res) => {
    res.status(200).json({ success: true , data: products})
})

app.post('/api/products', (req, res) => {
    const { name, desc , image , price } = req.body
    if (!name || !desc || !image || !price) {
      return res
        .status(400)
        .json({ success: false, msg: 'please provide the name , description, image ,  and price of the product' })
    }

    const newProduct = { id : products.length + 1  , ...req.body}
    products.push(newProduct);
    res.status(200).json({ success: true, data: products})  
})
  
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params
    const { name  , desc , image , price } = req.body
    
    const product = products.find((product) => product.id === Number(id))
  
    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: `no product with id ${id}` })
    }
    const newProducts = products.map((product) => {
      if (product.id === Number(id)) {
        product.id = Number(id)
        product.name = name
        product.desc = desc
        product.image = image
        product.price = price
      }
      return product
    })
    res.status(200).json({ success: true, data: newProducts })
  })
  
  app.delete('/api/products/:id', (req, res) => {
      const {id} = req.params
    const product = products.find((product) => product.id === Number(id))
    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: `no product with id ${id}` })
    }
    const newProduct = products.filter(
      (product) => product.id !== Number(id)
    )
    return res.status(200).json({ success: true, data: newProduct })
    
  })
  


app.listen(5000, () => {
    console.log(`Server is Listening on port 5000`)
})