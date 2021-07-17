const express = require ('express')
const app = express()
const productRoute = require ('./routes/productRoute')
const userRoute = require('./routes/userRoute')
app.use(express.json());

app.use('/api/products' , productRoute )
app.use('/users' , userRoute)

app.listen(8080, () => {
    console.log(`Server is Listening on port 8080`)
})