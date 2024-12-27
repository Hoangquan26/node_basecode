const { createClient } = require("redis");

const client = createClient({
    socket: {
        reconnectStrategy: (times) => {
            if(times > 20){
                console.log("Too many attempts to reconnect. Redis connection was terminated");
                return new Error("Too many retries.")
            }
            else {
                return times * 500;
            }
        }
    }
})
client.on('connect', () => {
    console.log('Redis client connected');
});
client.on('error', error => {
    console.error(`Redis client error:`, error);
});