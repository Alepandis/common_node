var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const db = require('./app/config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});

require('./app/route/user.route.js')(app);

// Create a Server
var server = app.listen(8080, function () {

  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})

function initial(){

  let users = [
    {
      id: 1,
      username: "Joe",
      email: "joe@mail.com",
      password: 12345
    },
    {
      id: 2,
      firstname: "Cara",
      email: "cara@mail.com",
      password: 12345
    },
    {
      id: 3,
      firstname: "Laura",
      email: "laura@mail.com",
      age: 12345
    },
    {
      id: 4,
      firstname: "Brenda",
      lastname: "brenda@mail.com",
      age: 12345
    },
    {
      id: 5,
      firstname: "David",
      lastname: "david@mail.com",
      age: 12345
    },
    {
      id: 6,
      firstname: "Alberto",
      lastname: "beto@mail.com",
      age: 123456
    }
  ]

  // Init data -> save to MySQL
  const User = db.users;
  for (let i = 0; i < users.length; i++) {
    User.create(users[i]);
  }
}
