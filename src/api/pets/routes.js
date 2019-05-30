const express = require('express')
const router = express.Router()
const controller = require('./controllers')

router.post('/calculdailyneeds', controller.calculDailyNeeds)

module.exports = router
