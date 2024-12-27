const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error:', err);
});

const productService = {
    getProduct: async (productId) => {
        return new Promise((resolve, reject) => {
            client.get(productId, (err, product) => {
                if (err) {
                    return reject(err);
                }
                if (product) {
                    return resolve(JSON.parse(product));
                }
                const fetchedProduct = { id: productId, name: 'Sample Product' }; 
                client.set(productId, JSON.stringify(fetchedProduct));
                resolve(fetchedProduct);
            });
        });
    },

    setProduct: async (product) => {
        return new Promise((resolve, reject) => {
            client.set(product.id, JSON.stringify(product), (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    
};

module.exports = productService;