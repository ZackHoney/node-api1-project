// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model')
const server = express();
server.use(express.json())

server.get('/api/users', (req, res) => {
    try {
        const user = User.find()
        res.status(200).json(user)
        
    } catch {
        res.status(500).json({
            message: res.message
        })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
