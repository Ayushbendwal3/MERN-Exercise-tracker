const express = require('express')
const cors = require('cors')
const moongose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
moongose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const connection = moongose.connection
connection.once('open', () => {
  console.log(`MongoDB database connection established successfully`)
})

const exerciseRouter = require('./routes/exercise')
const userRouter = require('./routes/users')

app.use('/exercises', exerciseRouter)
app.use('/users', userRouter)
app.use(express.static('frontend/build'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'))
}

app.listen(port, () => {
  console.log(`server is running on the port: ${port}`)
})
