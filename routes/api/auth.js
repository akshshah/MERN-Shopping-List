const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');


// api/auth , POST, Authenticate User, Public
router.post('/', (req,res) => {
   const {email, password} = req.body;

   if(!email || !password){
      return res.status(400).json({msg: 'Please enter all fields'});
   }

   //Check for existing User
   User.findOne({ email})
      .then(user => {
         if(!user){
            return res.status(400).json({msg: 'User does not exists'});
         }
         
         // Validating password
         bcrypt.compare(password, user.password)
            .then(isMatch => {
               if(!isMatch){
                  return res.status(400).json( { msg : "Invalid Credentials"});
               }

               jwt.sign(
                  { id: user.id },
                  config.get('jwtSecret'),
                  { expiresIn: 3600 },
                  (err, token) => {
                     if(err){
                        throw err;
                     }
                     res.json({
                        token, // is equal to "token:token"
                        user:{
                           id: user.id,
                           name: user.name,
                           email: user.email
                        
                        }
                     });
                  }
               ) 
            })
      })
});


// api/auth/user , GET, Get user data, Private

router.get('/user', auth, (req,res) => {
   User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user));
})

module.exports = router;