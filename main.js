const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000;

var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())