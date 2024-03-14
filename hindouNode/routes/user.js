const express = require('express')

const router = express.Router()

// const { checkAuth, upload } = require('../middlewares')

const {
    usersignal,
     userLogin
} = require('../controllers/user')

router.get('/', userLogin)
router.post('/', usersignal)
module.exports = router