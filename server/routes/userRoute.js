const express = require("express");
const {
    signup,
    login,
    register
} = require("../Controllers/UserController");

const router = express.Router();

router.get('/register', register)
router.post('/login', login)
router.post('/register', signup)

module.exports = router;











// import express from 'express'
// import bcrypt from 'bcrypt'
// import UserModel from '../models/userModel.js'
// import jwt from 'jsonwebtoken'
// import cookieParser from 'cookie-parser'
// // import Login from '../../client/src/components/Login.js'


// const router = express.Router();
// router.use(cookieParser());

// router.post("/register", async (req, res) => {
//     const { username, mailID, password } = req.body;
//     UserModel.create({ username, mailID, password })
//         .then(user => res.json(user))
//         .catch(err => res.json(err))
// })

// router.post('/login', async (req, res) => {
//     const { mailID, password } = req.body;
//     const user = await UserModel.findOne({ mailID })
//         .then(user => {
//             if (user) {
//                 if (user.password === password) {
//                     const accessToken = jwt.sign({ mailID: mailID }, "jwt-access-token-secret-key", { expiresIn: "30s" })
//                     const refreshToken = jwt.sign({ mailID: mailID }, "jwt-refresh-token-secret-key", { expiresIn: "30s" })

//                     res.cookie('accessToken', accessToken, { maxAge: 60000 })

//                     res.cookie('refreshToken', refreshToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' })
//                     return res.json({ Login: true, Message: "Login Successful" })
//                 }
//             } else {
//                 res.json({ Login: false, Message: "Invalid Credentials" })
//             }
//         })
//         .catch(err => res.json(err))
// })

// const verifyUser = (req, res, next) => {
//     const accesstoken = req.cookies.accessToken;
//     if (!accesstoken) {
//         if (renewToken(req, res)) {
//             next()
//         }
//     } else {
//         jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err, decoded) => {
//             if (err) {
//                 return res.json({ valid: false, message: "Invalid Token" })
//             } else {
//                 req.mailID = decoded.mailID
//                 next()
//             }
//         })
//     }
// }

// const renewToken = (req, res) => {
//     const refreshtoken = req.cookies.refreshToken;
//     let exist = false;
//     if (!refreshtoken) {
//         return res.json({ valid: false, message: "No refresh token" })
//     } else {
//         jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err, decoded) => {
//             if (err) {
//                 return res.json({ valid: false, message: "Invalid Refresh Token" })
//             } else {
//                 const accessToken = jwt.sign({ mailID: decoded.mailID }, "jwt-access-token-secret-key", { expiresIn: "30s" })
//                 res.cookie('accessToken', accessToken, { maxAge: 60000 })
//                 exist = true
//             }
//         })
//     }
//     return exist
// }

// router.get('/mainlayout', verifyUser, (req, res) => {
//     return res.json({ valid: true, message: "authorized" })
// })

// export { router as UserRouter }