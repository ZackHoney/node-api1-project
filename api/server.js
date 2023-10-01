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
        
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if(!user) {
            res.status(401).json({ message: `No user with the id of ${id} can be found `})
        } else {
            res.status(200).json(user)
        }
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
