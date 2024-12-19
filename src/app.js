const express = require('express')
const cors = require('cors')

const helmet = require('helmet')
const app = express()

require('dotenv').config()
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(helmet())

app.get('/', (req, res, next) =>{
    return res.status(200).json('find out')
})

app.use((req, res, next) => {
    const statusCode = 404
    const error = new Error('Not Found')
    error.status = statusCode
    return next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error',
        stack: process.env.APP_MODE = 'dev' ? error.stack : '',
        
    })
})


module.exports = app