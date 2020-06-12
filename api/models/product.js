const mongoose = require('mongoose');

// making schemas for datasets
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

// making model for importing the schemas
module.exports = mongoose.model('Product', productSchema);