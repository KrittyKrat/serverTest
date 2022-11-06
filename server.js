const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require('mongoose');
const Institution = require('./models/Institution')
const Department = require("./models/Department");
const Specialist = require("./models/Specialist");
const authorization = require("./middle/auth");
const jwt = require('jsonwebtoken')
require('dotenv/config')

mongoose.connect(
  process.env.DB_CONNECTION,
  () => console.log('Connected!')
);

app.use(express.json());

app.get('/', async (req, res) => {
    res.send("Help");
})

const institutionRouter = require('./routes/institutions');
app.use('/institutions', institutionRouter);


app.get('/departments', async (req, res) => {
    try{
        const departments = await Department.find();
        res.json(departments);
    } catch(e){
        res.status(500).json({ message: e.message });
    }
})

app.get('/specialists', async (req, res) => {
    try{
        const specialists = await Specialist.find();
        res.json(specialists);
    } catch(e){
        res.status(500).json({ message: e.message });
    }
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
