const express = require("express");  
const mongoose = require("mongoose"); 
const ejs = require("ejs");
const inventoryModal = require("./inventory-modal")
const customerModal = require("./customer-modal")
const orderModal = require("./order-modal")

const app = express();
app.use(express.json());                                  //body praser
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");

app.listen(5000, (err)=> {
    if(!err) {
        console.log("Server Started at 5000...");
    } else {
        console.log(err);
    }
});
let db = "mongodb+srv://sewanik:sewanik@api-assignment.5nhshw2.mongodb.net/api_web_tech_assignment?retryWrites=true&w=majority"
mongoose.connect(db,()=> {
    console.log("Connected to MongoDB...")
}, (err)=> {
    console.log(err);
});


app.get("/inventory", (req, res)=> {
    inventoryModal.find().then((inventory)=> {
        res.render("inventory", {inventory});
    })
})


app.post("/inventory/add",(req,res)=>{
    inventoryModal.create({inventory_id:req.body.inventory_id,
        inventory_type:req.body.inventory_type,
        item_name:req.body.item_name,
        available_quantity:req.body.available_quantity
    }).then(()=>{
        res.send("inventory added")
    })
})

app.get("/customer", (req, res)=> {
    customerModal.find().then((customer)=> {
        res.render("customer", {customer});
    })
})

app.post("/customer/add",(req,res)=>{
    customerModal.create({customer_id:req.body.customer_id,
        customer_name:req.body.customer_name,
        email:req.body.email,
    }).then(()=>{
        res.send("customer added")
    })
})

app.get("/", (req, res)=> {
    
    customerModal.find().then((cust)=>{
        for(let i=0;i<cust.length;i++){
            inventoryModal.find().then((inv)=>{
                orderModal.create({customer_id:cust[i].customer_id,
                inventory_id:inv[i].inventory_id,
                item_name:inv[i].item_name,
                quantity:inv[i].available_quantity
            }).then((order)=>{
                console.log(order)
                orderModal.find().then((order)=>{
                    console.log(order)
                    res.render("order",{order})
                })
            })
            })
        }
    })
})
app.post("/order/add",(req,res)=>{
    let inv = inventoryModal.find()
    console.log(inv)
})
