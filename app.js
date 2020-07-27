const express = require('express');
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e){ console.error(e); });
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', 'views');

// definimos el schema
var schema = mongoose.Schema({ name: String, email: String, password: String });
// definimos el modelo
var User = mongoose.model("User", schema);

app.get('/', (req, res) => {
  User.find(function(err, users) {
    console.log(users)
    if (err) return console.error(err);
    res.render('index', { users: users });
  });
});

app.get('/register', (req, res) => {
  res.render('form');
});

app.post('/register', (req, res) => {
  var user = new User(req.body);
  user.save(function(err){
    if (err) return console.error(err);
  })
  console.log(user)
  res.redirect('/');
});

app.listen(3000, () => console.log('listening 3000'));