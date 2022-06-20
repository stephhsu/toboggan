const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const userRoutes = require('./src/routes/users.routes.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/users', userRoutes.router)

app.get('/', (req, res) => {
  res.send('Hello World! this is a test')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})