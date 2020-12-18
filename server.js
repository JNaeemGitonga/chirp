const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const port  = process.env.PORT || 8080;
const app = express();
require('dotenv').config()

const assert = require('assert')

let db;
const state = {
    chirps: [{
        author: "Jaha Naeem Gitonga",
        content: "asfdasdfasd",
        likes: 1789,
        _id: "5c4bd58ce7179a090e0a4e34"
    }]
}
app.use(bodyParser.json())
app.use(cors())
app.get('/api/chirps', async (req, res) => {
    const chirps = await db.collection('chirps').find({}).toArray();
    console.log(chirps)
  res.json(chirps)
})

app.post('/api/chirps', (req, res) => {
    state.chirps = [...state.chirps, req.body]
    res.json(state.chirps)
})

app.post('/api/chirps/like', async (req, res) => {
    await db.collection('chirps').updateOne({_id}).toArray()
})

app.listen(port, () => {
    console.log(process.env.DB__URL)
    MongoClient.connect(process.env.DB__URL, (err, c) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
       
        db = c.db('chirp');
    })
  console.log('May the force be with you on server port ' + port);
});