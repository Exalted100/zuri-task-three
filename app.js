//Installed dependencies
const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bodyParser = require("body-parser");

//Native dependencies
const MONGO_URI = process.env.MONGO_URI || require("./keys").MONGO_URI

//Express function call
const app = express();

//Body parser
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

//Database connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(con => {
    console.log("connected to database!")
  }).catch(err => console.log("Failed to connect to the database!"))

//Database schema
const userSchema = new Schema({
    name: {
        type: String, 
        required: [true, "Add a name"]
    },
    email: {
        type: String, 
        required: [true, "Add a mail"]
    },
    country: {
        type: String, 
        required: [true, "Add a country"]
    }
})
  
const User = mongoose.model("User", userSchema);

//Functions for requests to server

//Get request
const getRequest = async (req, res) => {
    try {
        const doc = await User.find({})

        res.status(200).send({
            message: "success",
            data: doc
        })
    } catch(err) {
        res.status(404).send("fail")
    }   
}

//Post request
const postRequest = async (req, res) => {
    try {
        const newUser = new User({...req.body})
        const doc = await newUser.save()
        res.status(200).send({
            message: "success",
            data: doc
        })
    } catch(err) {
        res.status(404).send("fail")
    }   
}

//Update request
const putRequest = async (req, res) => {
    try {
        const doc = await User.findByIdAndUpdate(req.query.id, req.body, {new: true});

        res.status(200).send({
            message: "success",
            data: doc
        })
      } catch(err) {
        res.status(404).send("fail")
    } 
}

//Delete request
const deleteRequest = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.query.id);

        res.status(200).send({
            message: "success",
            data: null
        })   
    } catch(err) {
        res.status(404).send("fail")
    } 
}

//Requests to server
app.route("/")
    .get(getRequest)
    .post(postRequest)
    .put(putRequest)
    .delete(deleteRequest)

//Server
const PORT = process.env.PORT || 4000;
app.listen(PORT);