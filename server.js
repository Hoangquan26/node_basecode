const app = require('./src/app')
const appConfig = require('./src/configs/app.config')
const PORT = appConfig[process.env.APP_MODE].port ?? 5000
app.listen(PORT, () => {
    console.log(`Listen on port: ${PORT}`)
})