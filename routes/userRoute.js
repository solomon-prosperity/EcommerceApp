const express = require('express')
const router = express.Router();

const {
    getUsers ,
    signUp, 
    signIn
} = require ('../controllers/userController')




router.route('/').get(getUsers)
router.route('/signup').post(signUp)
router.post('/signin' , signIn)

module.exports = router
