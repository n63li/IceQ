'use strict';
const log = console.log;

const express = require('express');
const bodyParser = require('body-parser')

// Express
const port = process.env.PORT || 8000
const app = express();
app.use(bodyParser.json());

const request = require('request');
let teamName

// Get teams
const getTeams = () => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://statsapi.web.nhl.com/api/v1/teams/1`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject("Can't connect to server")
      } else if (response.statusCode !== 200) {
        reject('issue with getting resource')
      } else {
        // console.log(body)
        resolve (body.teams[0].name)
      }
    })
  })
}

const other = getTeams()
// app.use(getTeams())

app.get('/express_backend', (req, res) => {
  // console.log(getTeams())
  // res.send({name:"test"})
    other.then(function(value){
        res.send({express: value})
    })
});

//////////
app.listen(port, () => {
  log(`Listening on port ${port}...`)
});