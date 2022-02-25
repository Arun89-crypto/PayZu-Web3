const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/getData', async (req, res) => {
    try {
        console.log(req.body);
        let user = await User.findOne({ address: req.body.address });
        if (!user) {
            user = await User.create({
                name: 'Username',
                address: req.body.address
            })
            user = await User.findOne({ address: req.body.address });
        }

        return res.json({ user });

    } catch (error) {
        console.log(error);
    }
})

router.post('/changeUsername/:id', async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400).json({ "Error": "No account linked" })
        }

        const newUser = {
            name: req.body.newuname
        }

        await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        user = await User.findOne({ _id: req.params.id });
        res.json({ user });

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;