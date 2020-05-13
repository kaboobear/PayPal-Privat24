const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const db = require("./config/keys").mongoURI;
var paypal = require('paypal-rest-sdk');


const user_route = require("./routes/user_route");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({secret:'kaboo',resave:true,saveUninitialized:true}))
app.use(passport.initialize());
app.use(passport.session());



paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQ9Jo0b8h41aVMprMhIJTxWPbG9wuUq3gmDNZKh7sgvK83mDxcbAQoa0NH1GTh3tQ6c2W-HBucLInesT',
    'client_secret': 'EF3i6C4al_ZC1hxVAEdhqK3GApcQ14A-yg_yJdCy-hrV7YbRApHo8bdRp4LQ6ishat6DqjhsfuuVB75Y'
  });



mongoose
    .connect(db,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true })
    .then(()=>{console.log("MongoDb was connected")})
    .catch((err)=>{console.log(err);})

app.use('/user',user_route);

app.post('/pay',(req,res)=>{
    const summary = req.body.summary;

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/success",
            "cancel_url": "http://localhost:5000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Kaboo Wood",
                    "sku": "001",
                    "price": summary.toString(),
                    "currency": "RUB",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "RUB",
                "total": summary.toString()
            },
            "description": "You're buying Kaboo's Woods"
        }]
    };



    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i =0;i<payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                    res.json({'href':payment.links[i].href});
                }
            }
        }
    });
})

app.get('/success',(req,res)=>{
    const {PayerID,paymentId} = req.query;

    paypal.payment.execute(paymentId,{'payer_id':PayerID},(error,payment)=>{
        if(error) res.send(error);
        else res.redirect('http://localhost:3000/');
    })
})

app.get("/cancel",(req,res)=>res.redirect('http://localhost:3000/'));






if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(port,()=>{console.log(`Server started on port ${port}`)}) 