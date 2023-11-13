require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

app.use(express.json())

const User = require('./models/User')

app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({msg: 'Usuário não encontrado.'})
    }

    res.status(200).json({user})
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({msg: 'Acesso negado.'})
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)

        next()
    } catch(error) {
        res.status(400).json({msg: 'Token inválido.'})
    }
}

app.post('/auth/register', async (req, res) => {
    const {name, email, password, confirmPassword} = req.body

    if (!name) {
        return res.status(422).json({msg: 'Insira um nome válido.'})
    }

    if (!email) {
        return res.status(422).json({msg: 'Insira um e-mail válido.'})
    }

    if (!password) {
        return res.status(422).json({msg: 'Insira uma senha válida.'})
    }

    if (password !== confirmPassword) {
        return res.status(422).json({msg: 'As senham precisam ser iguais.'})
    }

    const userExists = await User.findOne({ email: email })
    if (userExists) {
        return res.status(422).json({msg: 'Por favor, utilize outro e-mail.'})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {
       await user.save()

       res.status(201).json({msg: 'Usuário criado com sucesso!'})
    } catch(error) {
        console.log('error', error)
        res.status(500).json({msg: 'Um erro conteceu. Tente novamente mais tarde.'})
    }
})

app.post("/auth/login", async (req, res) => {
    const { email, password} = req.body

    if (!email) {
        return res.status(422).json({msg: 'Insira um e-mail válido.'})
    }

    if (!password) {
        return res.status(422).json({msg: 'Insira uma senha válida.'})
    }

    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(422).json({msg: 'Usuário não encontrado.'})
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword) {
        return res.status(422).json({msg: 'Senha inválida.'})
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret
        )

        res.status(200).json({msg: 'Logado com sucesso!', token})
    } catch(error) {
        console.log('error', error)
        res.status(500).json({msg: 'Um erro conteceu. Tente novamente mais tarde.'})
    }
})

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.zuhtjrh.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3001)
        console.log('conectou mongo')
}).catch((err) => console.log(err))

