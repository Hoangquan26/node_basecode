const appConfig = {
    dev: {
        port: process.env.DEV_PORT,
        db_conn:  process.env.DEV_DB_CONN,
    },
    product: {
        port: process.env.PRODUCT_PORT,
        db_conn:  process.env.PRODUCT_DB_CONN,
    }
}

module.exports = appConfig