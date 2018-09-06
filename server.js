const express = require('express');
const bodyParser = require('body-parser');	
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
	client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'danielhayes',
    password : '',
    database : 'face-detect'
  }
});

const register = require('./Containers/register');
const signin = require('./Containers/signin');
const profile = require('./Containers/profile');
const image = require('./Containers/image');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.json('app is working fine') })

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, knex, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, knex) })

app.put('/image', (req, res) => { image.handleImage(req, res, knex)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})