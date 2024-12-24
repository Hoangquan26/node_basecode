'use strict'
const mongoose = require('mongoose')
const { countConnect } = require('../helpers/countConnect')
class InitDatabase{
    constructor() {
        this.devMode = process.env.APP_MODE === 'dev'
        this.connectString = process.env.DEV_DB_CONN
        console.log(process.env.APP_MODE, process.env.DEV_DB_CONN)
        this.connect()
    }
    static dataType = {
        mongo: '#MONGO',
        sql: '#SQL',
        redis: '#REDIS'
    }

    connect = (type = InitDatabase.dataType.mongo) => {
        try {
            if(this.devMode === true) {
                mongoose.set('debug', true)
                mongoose.set('debug', {color: true})
            }

            mongoose.connect(this.connectString)
            .then(_ => {
                console.log(`Connected MongoDb By Mongoose`)
                countConnect()
            })
            .catch(err => console.log(`Connect To MongoDb Fail!\nError: ${err} `))
        }
        catch{

        }
    }

    static getInstance = () => {
        if([null, undefined].includes(this.instance)) {
            this.instance = new InitDatabase()
        }
        return this.instance
    }
}

module.exports = InitDatabase.getInstance()