const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// Register User
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new Registration({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
});

module.exports = router;
