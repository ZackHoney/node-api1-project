// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model')
const server = express();
server.use(express.json())

server.get('/hello-world', (req, res) => {
    res.status(200).json({ message: 'hello world' })
});

server.get('/api/users', async (req, res) => {
    try {
        const user =  await User.find()
        res.status(200).json({
            message: "You have retrieved users!",
            data: user
        })
        
    } catch {
        res.status(500).json({
            message: res.message
        })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
