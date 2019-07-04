const express = require('express');

const router = express.Router();


router.get('/data', (req, res) => {


    return res.json({
        items: [
            'item 1',
            'item 2',
            'item 3',
            'item 4'
        ]
    });

});

module.exports.ApiRouter = router;