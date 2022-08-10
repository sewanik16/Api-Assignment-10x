const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({   
    customer_id:String,
    customer_name:String,
    email:String,
});

const customerModal = mongoose.model("customer", customerSchema);  

module.exports = customerModal;