const mongoose = require('mongoose');
const express = require('express')
const passport = require('passport');
const app = express()
const port = 3000
const userRoute = require('./routes/userRoute');
const blogRoutes = require('./routes/blogRoute');

mongoose.connect('mongodb://127.0.0.1:27017/ITI').then(() => {
  console.log("connect to db");
}).catch(err => {
  console.log(err);
})

app.use(express.urlencoded({ extended: true }));

app.post('/register', userRoute);
app.post('/login', userRoute);

app.use('/blogs', blogRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
























