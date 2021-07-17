const users = require('../models/user')
const bcrypt = require('bcrypt')


/* getUsers is intended to retrieve user details stored in the database
  the password in this case is hashed 
*/
const getUsers = (req , res) => {
    res.status(200).json({
        success: true ,
        data: users
    })
}

/* in signUp the user is able to sign up and then retrieve his registration data
    except in this case the user does not see his hashed password, the password
    is sent back exactly as it was entered, just so the user doesn't freak out
*/

const signUp = async (req , res) => {
    try {
    const {fullName, email , password , confirmPassword} = req.body
    const hashedPassword = await bcrypt.hash(password , 10)
    if (password !== confirmPassword) {
        res.status(404).json(`Passwords did not match`)
    } else {
            let User = users.find((user) => user.email === email )
            if (User) {
                res.status(404).json(`Email already exists`)
            } else {
              const newUser =  {id : users.length + 1 , fullName, email, password: hashedPassword}
              users.push(newUser)
              return res.status(200).json({
                success: true ,
                msg: 'your account was successfully created' ,
                data: {id: newUser.id , fullName: newUser.fullName , email : newUser.email, password}
            })
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

            
/*
on successful signin, the user gets all his data and again in this case the exact password 
is sent back not the hashed version, we don't want our users freaking out right?
(chuckles)
*/

const signIn = async (req , res) => {
        const {email , password} = req.body
         const User = users.find( (user) => email === user.email )
            if (!User) {
               return res.status(404).json(`Email does not exist`)
            } 
            
         try { 
           if ( await bcrypt.compare(password, User.password)){
                    res.status(200).json({
                        success: true ,
                        msg: 'you were successfully loggedin' ,
                        data: {id: User.id , fullName: User.fullName , email : User.email, password}
                    })
            } else {
                res.status(404).json('your password is incorrect')
            }
        } catch (err) {
            res.status(500).json(err)
        }
        }

module.exports = {
    getUsers ,
    signUp, 
    signIn
}