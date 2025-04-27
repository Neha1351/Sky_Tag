const express=require('express')
const app=express()
const cors=require('cors') //allows API request between two ends, allows cors origin policy
const bodyParser=require('body-parser')
const routes=require('./routes')
var multer = require('multer'); //to handle multipart / form-data, used for file uploading 
var upload = multer();
var fs = require('fs');
var path = require('path');

const dbconnection=require('./DBConnection')
app.use(bodyParser.json()); // plain json data
app.use(bodyParser.urlencoded({extended:true})) // file data

app.use(express.json())
app.use(cors())
app.use('/flight_ims_api',routes)

app.use(express.static('public'))


app.listen (4004,function(data){console.log("connected to 4004")})