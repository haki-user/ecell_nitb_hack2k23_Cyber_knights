const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const PORT = 4000
const mongoose = require('mongoose')

const csv = require('csv-parser')
const fs = require('fs')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




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



// const adder = async()=>{
//     const rr = new Record({
//         studentName:"Kishan Gupta",
//         gender:"unknown",
//         company:"Apple",
//         package:10,
//         year:2023
//     })

//     await rr.save();
// }
// adder();




app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname+"/index.html"))
})
app.post("/api/v1/upload", (req, res)=>{
  // res.send("<h1>aditya</h1>")
  res.sendFile(path.join(__dirname + "/login.html"))
  console.log('a')
})

//from csv
app.post("/api/v1/fromcsv", (req, res)=>{
  //read csv
  fs.createReadStream('students.csv')
  .pipe(csv())
  .on('data', (row)=>{
    //create a new student record
    const student = new Record({
      studentName:row.name,
      gender:row.gender,
      company:row.company,
      package:row.package,
      year:row.year
    })
    // save student record to the database
    student.save((err)=>{
      if(err) throw err;

    });
  })
  .on('end', ()=>{
    console.log('csv processed successfully')
  });
  res.sendFile(path.join(__dirname + "/index.html"))

});
app.listen(PORT, ()=>{
  console.log(`ok port ${PORT}`)
})






// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');

// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost/placement', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Load the Student model
// const Student = require('./models/Student');

// // Use body-parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Use handlebars as the templating engine
// app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// // GET / - Show all student records
// app.get('/', (req, res) => {
//   Student.find({}, (err, students) => {
//     if (err) throw err;
//     res.render('index', { data: students });
//   });
// });

// // GET /analysis - Show analysis of student records
// app.get('/analysis', (req, res) => {
//   Student.aggregate([
//     {
//       $group: {
//         _id: '$department',
//         averagePackage: { $avg: '$packageOffered' }
//       }
//     }
//   ], (err, result) => {
//     if (err) throw err;
//     res.render('analysis', { data: result });
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });