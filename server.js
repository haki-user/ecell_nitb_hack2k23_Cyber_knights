const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const PORT = 4000
const mongoose = require('mongoose')

const csv = require('csv-parser')
const fs = require('fs')

const multer = require('multer')
const upload = multer();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/images', express.static(__dirname+'/public/images'))
app.use('public', express.static(__dirname + '/public'))




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



app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname+"/index.html"))
})
app.post("/api/v1/upload", (req, res)=>{
  // res.send("<h1>aditya</h1>")
  res.sendFile(path.join(__dirname + "/public/login.html"))
  console.log('a')
})

//from csv
app.post("/api/v1/fromcsv", (req, res)=>{
  
  fs.createReadStream('public/students.csv')
  .pipe(csv())
  .on('data', (data)=>{
    console.log(data);
    const student = new Record(data);
    student.save();
  })
  .on('end', ()=>{
    console.log('csv data saved')
  });
  res.send("<h1>ok</h1>")
});

app.listen(PORT, ()=>{
  console.log(`ok port ${PORT}`)
})
  