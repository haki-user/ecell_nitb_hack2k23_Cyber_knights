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

// show
// app.get('/records.ejs', (req, res)=>{
//   Record.find({}, (err, records)=>{
//     if(err) return res.status(500).send(err);
//     return res.render('records', {records:records});
//   })
//   // res.sendFile(path.join(__dirname + '/views/records.ejs'))
// })
app.get('/records.ejs', function(req, res) {
  Record.find({}, function(err, records) {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data from MongoDB');
    } else {
      res.send(`
        <html>
          <head>
            <title>Records</title>
          </head>
          <body>
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Gender</th>
                  <th>Company</th>
                  <th>Package</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                ${records.map(record => `
                  <tr>
                    <td>${record.studentName}</td>
                    <td>${record.gender}</td>
                    <td>${record.company}</td>
                    <td>${record.package}</td>
                    <td>${record.year}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
    }
  });
});
app.set('view engine', path.join(__dirname, 'views'))

app.listen(PORT, ()=>{
  console.log(`ok port ${PORT}`)
})  
    