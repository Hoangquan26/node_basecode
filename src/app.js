const express = require('express')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express()
const cookieParser = require('cookie-parser')
require('dotenv').config()

//initial database
require('./databases/init.database')


//inititla middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(helmet())
app.use(cookieParser())

app.use(morgan("dev"))

app.use(compression())
app.use(express.json())

//initial routers
app.use('', require('./routers/index'))


//initial catch error
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