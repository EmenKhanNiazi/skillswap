const express = require('express');
const router = express.Router();
const SwapRequest = require('../models/requestschema'); // Update path as needed

router.post('/', async (req, res) => {
    try {
        const { requester, serviceProvider, skill, message } = req.body;

        if (!requester || !serviceProvider || !skill || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newRequest = new SwapRequest({ requester, serviceProvider, skill, message, status: 'pending' });
        await newRequest.save();

        res.status(201).json({ message: 'Request submitted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit the request.' });
    }
});

module.exports = router;
