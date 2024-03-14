const User = require('../models/user')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

const usersignal = (req, res) => {

    const { name, email,  password } = req.body
    // const token = jwt.sign(
    //     { name: req.body.name, password: req.body.password },
    //     process.env.TOKEN)
    User.findOne({ email: { $eq: email } })
        .then((user) => {
            if (user)
                res.status(404).send({ mass: `email has been exist` })
        })
    const newuser = new User(req.body)
    bcrypt.hash(password, 10, (error, hash) => {
        if (error)
            return res.status(500).send({ error: error.message })
        newuser.password = hash
        return newuser.save().then((user) => {
            res.status(200).send({ message: `create article ${user.name} succeed!${newuser.password}` })
        })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    })



}
const userLogin = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email: { $eq: email } })
        .then(user => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (error || !result) {
                    return res.status(500).send({ error: 'Email and password are not matches!', result })
                }
                const token = jwt.sign({ email,password }, process.env.TOKEN, {
                    expiresIn: '1H'
                })
                // שליחת הצופן לצד שרת בכניסה למערכת
                res.status(200).send({ message: 'login succeefull!', token })
                // res.status(200).send({ message: 'login succeefull!'})
            })
        })
        .catch(error => {
            res.status(404).send({ error: error.message })
        })
}

module.exports = { usersignal, userLogin }