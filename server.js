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


const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const PORT = 4000




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname+"/index.html"))
})
app.post("/api/v1/upload", (req, res)=>{
  // res.send("<h1>aditya</h1>")
  res.sendFile(path.join(__dirname + "/login.html"))
  console.log('a')
})

app.listen(PORT, ()=>{
  console.log(`ok port ${PORT}`)
})