const router = require('express').Router()

// - Plural is a pattern
router.use('/admins', require('./admins/routes'))
router.use('/users', require('./users/routes'))
router.use('/pets', require('./pets/routes'))

module.exports = router
