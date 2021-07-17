const express = require('express')
const router = express.Router();

const {
    getUsers ,
    signUp, 
    signIn
} = require ('../controllers/userController')




router.route('/').get(getUsers).post(signUp)
router.post('/login' , signIn)

module.exports = router
