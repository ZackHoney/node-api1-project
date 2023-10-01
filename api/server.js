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
        res.status(200).json(user)
        
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
            res.status(404).json({ message: 'does not exist'})
        } else {
            res.status(200).json(user)
        }
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})


server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        if(!name || !bio) {
            res.status(400).json({
                message: 'provide name and bio'
            })
        } else {
            const createdUser = await User.insert({ name, bio})
            res.status(201).json(createdUser)
        }
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})


server.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, bio } = req.body
        if(!name || ! bio) {
            res.status(400).json({
                message: 'provide name and bio'
            })
        } else {
            const changedUser = await User.update(id, {name, bio})
            if(!changedUser) {
                res.status(404).json({
                    message: 'does not exist'
                })
            } else {
                res.status(200).json(
                 changedUser
                )
            }
        }
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser) {
            res.status(404).json({
                message: 'does not exist'
            })
        } else {
            res.status(200).json(deletedUser)
        }
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
