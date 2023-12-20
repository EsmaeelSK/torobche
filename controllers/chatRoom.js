const Room = require('../models/room');

const chat = async (req, res, next) => {
    try {
        const { massage } = req.body;
        fetch('', {
            method: 'POST',
            body: massage
        })
            .then(res => res.json())
            .then(() => {
                
            })
    } catch (err) {
        next(err);
    }
}