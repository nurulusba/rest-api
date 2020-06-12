const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling get requests to /orders'
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if( id === 'special') {
        res.status(200).json({
            message: 'you discovered special id',
            id: id
        });
    }
    else {
        res.status(200).json({
            message: 'you passed an id ',
            id: id
        });
    }
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(200).json({
        message: 'handling post requests to /orders',
        createdOrder: order
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling delete requests to /orders'
    });
});

module.exports = router;