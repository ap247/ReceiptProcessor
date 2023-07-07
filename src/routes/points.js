const express = require('express');
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.get('/:id/points', (req, res) => {
    const id = req.params.id;
    if(!req.session.receiptPoints.hasOwnProperty(id)) {
        res.json({
            error: "Id: " + id + " not found"
        });
    } else {
        res.json(
            { points: req.session.receiptPoints[id] }
        );
    } 
});

module.exports = router;