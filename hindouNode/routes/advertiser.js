const express = require('express')

const router = express.Router()

// const { checkAuth, upload } = require('../middlewares')

const {
    advertisersignal,
    advertiserLogin
} = require('../controllers/advertiser')

router.get('/', advertiserLogin)
router.post('/', advertisersignal)
module.exports = router