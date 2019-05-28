const express = require('express')
const { setUpMiddlewares } = require('./src/services/middlewares')
const { connect } = require('./src/services/database')

const app = express()
connect()
setUpMiddlewares(app)

// - This is your main route /api => call all others routes
app.use('/api', require('./src/api'))

app.listen(process.env.PORT || 3001, () => {
  console.log('Server started')
})
