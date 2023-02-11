const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express();
const PORT = 4000;


mongoose.connect('mongodb://localhost:27017/nitb',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('mongodb connected')
}).catch((err)=>{
    console.log(err)
})


const record = mongoose.Schema({
    studentName:{type:String, required:true},
    gender:{type:String, required:true},
    company:{type:String, required:true},
    package:{type:Number, required:true},
    year:{type:Number, required:true}
})


const Record = mongoose.model("Record", record)



const adder = async()=>{
    const rr = new Record({
        studentName:"Kishan Gupta",
        gender:"unknown",
        company:"Apple",
        package:10,
        year:2023
    })

    await rr.save();
}
adder();



app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + "/index.html"))
})

app.post('/login', (req, res)=>{
    res.send("<h1>lllll</h1>");
    console.log("name")
});

app.listen(PORT, ()=>{
    console.log(`login page port ${PORT}`)
})