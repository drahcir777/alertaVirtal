const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors')

const app = express()

app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect('mongodb://richard:richard123@cluster0-shard-00-00.ogdl3.mongodb.net:27017,cluster0-shard-00-01.ogdl3.mongodb.net:27017,cluster0-shard-00-02.ogdl3.mongodb.net:27017/alerta?ssl=true&replicaSet=atlas-hdn49o-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(3333);