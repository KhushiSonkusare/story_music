const express = require('express');
const router = express.Router();
const IpRegistration = require('../models/IpRegistration');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename to prevent overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Add file filter to control accepted file types if needed
const fileFilter = (req, file, cb) => {
  // Accept all files for now - you can restrict by type if needed
  cb(null, true);
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB file size limit
});

// Register an IP
router.post('/register', upload.array('files'), async (req, res) => {
    try {
        const { title, description, date, rights } = req.body;
        
        // Validate required fields
        if (!title || !description || !date || !rights) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required',
                missingFields: Object.entries({title, description, date, rights})
                              .filter(([_, val]) => !val)
                              .map(([key]) => key)
            });
        }

        // Process uploaded files
        const files = req.files ? req.files.map(file => ({
            originalName: file.originalname,
            filename: file.filename,
            path: file.path,
            contentType: file.mimetype,
            size: file.size
        })) : [];

        // Generate unique registration ID
        const registrationId = `ZPK-${new Date().toISOString().slice(0, 10)}-${Math.floor(Math.random() * 10000)}`;

        const newIP = new IpRegistration({
            title,
            description,
            date: date ? new Date(date) : new Date(),
            rights,
            files,
            registrationId
        });
        
        await newIP.save();

        res.status(201).json({ 
            success: true,
            message: 'IP registered successfully', 
            data: {
                registrationId: newIP.registrationId,
                title: newIP.title,
                date: newIP.date,
                filesCount: files.length
            }
        });
    } catch (error) {
        console.error('IP registration error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server Error', 
            error: error.message 
        });
    }
});

// Get all registered IPs with formatted response
router.get('/all', async (req, res) => {
    try {
        const ips = await IpRegistration.find().sort({ createdAt: -1 });
        const formattedIps = ips.map(ip => ({
            registrationId: ip.registrationId,
            title: ip.title,
            description: ip.description,
            date: ip.date ? ip.date.toLocaleDateString() : 'N/A',
            rights: ip.rights,
            files: ip.files.map(file => ({
                name: file.originalName || file.filename,
                type: file.contentType,
                size: file.size,
                url: `/uploads/${file.filename}`
            })),
            createdAt: ip.createdAt ? ip.createdAt.toLocaleString() : 'N/A'
        }));
        res.status(200).json({
            success: true,
            count: formattedIps.length,
            data: formattedIps
        });
    } catch (error) {
        console.error('Error fetching IP registrations:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server Error', 
            error: error.message 
        });
    }
});

// Get a single IP by registration ID
router.get('/:registrationId', async (req, res) => {
    try {
        const ip = await IpRegistration.findOne({ registrationId: req.params.registrationId });
        if (!ip) {
            return res.status(404).json({ 
                success: false,
                message: 'IP registration not found' 
            });
        }
        
        // Format the response - properly using the single 'ip' object
        const formattedIp = {
            registrationId: ip.registrationId,
            title: ip.title,
            description: ip.description,
            date: ip.date ? ip.date.toLocaleDateString() : 'N/A',
            rights: ip.rights,
            files: ip.files.map(file => ({
                name: file.originalName || file.filename,
                type: file.contentType,
                size: file.size,
                url: `/uploads/${file.filename}`
            })),
            createdAt: ip.createdAt ? ip.createdAt.toLocaleString() : 'N/A'
        };
        
        res.status(200).json({
            success: true,
            data: formattedIp
        });
    } catch (error) {
        console.error('Error fetching IP registration:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server Error', 
            error: error.message 
        });
    }
});

// Update an IP registration
router.put('/:registrationId', upload.array('newFiles'), async (req, res) => {
    try {
        const { title, description, date, rights } = req.body;
        
        // Find the IP registration
        const ip = await IpRegistration.findOne({ registrationId: req.params.registrationId });
        if (!ip) {
            return res.status(404).json({ 
                success: false,
                message: 'IP registration not found' 
            });
        }
        
        // Process any new uploaded files
        const newFiles = req.files ? req.files.map(file => ({
            originalName: file.originalname,
            filename: file.filename,
            path: file.path,
            contentType: file.mimetype,
            size: file.size
        })) : [];
        
        // Update fields
        ip.title = title || ip.title;
        ip.description = description || ip.description;
        ip.date = date ? new Date(date) : ip.date;
        ip.rights = rights || ip.rights;
        
        // Add new files if any
        if (newFiles.length > 0) {
            ip.files = [...ip.files, ...newFiles];
        }
        
        await ip.save();
        
        res.status(200).json({
            success: true,
            message: 'IP registration updated successfully',
            data: {
                registrationId: ip.registrationId,
                updatedAt: new Date().toLocaleString()
            }
        });
    } catch (error) {
        console.error('Error updating IP registration:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server Error', 
            error: error.message 
        });
    }
});

// Delete an IP registration
router.delete('/:registrationId', async (req, res) => {
    try {
        const ip = await IpRegistration.findOne({ registrationId: req.params.registrationId });
        if (!ip) {
            return res.status(404).json({ 
                success: false,
                message: 'IP registration not found' 
            });
        }
        
        // Delete associated files from storage
        ip.files.forEach(file => {
            try {
                fs.unlinkSync(file.path);
            } catch (err) {
                console.error(`Could not delete file ${file.path}:`, err);
                // Continue even if file deletion fails
            }
        });
        
        await IpRegistration.deleteOne({ registrationId: req.params.registrationId });
        
        res.status(200).json({
            success: true,
            message: 'IP registration deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting IP registration:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server Error', 
            error: error.message 
        });
    }
});

module.exports = router;