const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.post('/getTransactions', async (req, res) => {
    try {
        const transactions = await Transaction.find({ fromAddress: req.body.address })
        res.json(transactions)
    } catch (error) {
        console.log(error);
    }
})

router.post('/addTransaction', async (req, res) => {
    try {
        const { transactionHash, fromAddress, toAddress, amount, timestamp } = req.body;
        const transaction = new Transaction({
            transactionHash, fromAddress, toAddress, amount, timestamp
        })
        await transaction.save()
        const transactions = await Transaction.find({ fromAddress: fromAddress })
        res.json(transactions)
    } catch (error) {
        console.log(error);
    }
})

router.delete('/deletealltransactions', async (req, res) => {
    try {
        const query = { fromAddress: { $regex: req.body.address } }
        await Transaction.deleteMany(query);
        res.json({ "Success": "All your transactions are deleted Successfully" })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router