const express = require('express');
const router = express.Router();
const IpRegistration = require('../models/IpRegistration');

// Register an IP
router.post('/register', async (req, res) => {
    try {
        const { ipAddress } = req.body;
        if (!ipAddress) return res.status(400).json({ message: 'IP Address is required' });

        const existingIP = await IpRegistration.findOne({ ipAddress });
        if (existingIP) return res.status(400).json({ message: 'IP already registered' });

        const newIP = new IpRegistration({ ipAddress });
        await newIP.save();

        res.status(201).json({ message: 'IP registered successfully', data: newIP });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Get all registered IPs
router.get('/', async (req, res) => {
    try {
        const ips = await IpRegistration.find();
        res.status(200).json(ips);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
