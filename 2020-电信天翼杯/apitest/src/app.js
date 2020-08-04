const express = require("express");
const cors = require("cors");
const app = express();
const {"v4": uuidv4} = require('uuid');
const md5 = require("md5");
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const server = require("http").createServer(app);

const { flag, secret, jwtSecret } = require("./flag");

const config = {
  port: process.env.PORT || 8081,
  adminValue: 1000,
  message: "Can you get flag?",
  secret: secret,
  adminUsername: "kirakira_dokidoki",
  whitelist: ["/", "/login", "/init", "/source"],
};

let users = {
  0: {
    username: config.adminUsername,
    isAdmin: true,
    rights: Object.keys(config)
  }
};

app.use(express.json());

app.use(cors());

app.use(
  jwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({
    path: config.whitelist
  })
);

app.use(function(error, req, res, next) {
  if (error.name === "UnauthorizedError") {
    res.json(err("Invalid token or not logged in."));
  }
});

function sign(o) {
  return jsonwebtoken.sign(o, jwtSecret);
}

function ok(data = {}) {
  return { status: "ok", data: data };
}

function err(msg = "Something went wrong.") {
  return { status: "error", message: msg };
}

function isValidUser(u) {
  return (
    u.username.length >= 6 &&
    u.username.toUpperCase() !== config.adminUsername.toUpperCase() && u.username.toUpperCase() !== config.adminUsername.toLowerCase()
  );
}

function isAdmin(u) {
  return (u.username.toUpperCase() === config.adminUsername.toUpperCase() && u.username.toUpperCase() === config.adminUsername.toLowerCase()) || u.isAdmin;
}

function checkRights(arr) {
  let blacklist = ["secret", "port"];

  if(blacklist.includes(arr)) {
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (blacklist.includes(element)) {
      return false;
    }
  }
  return true;
}

app.get("/", (req, res) => {
  res.json(ok({ hint:  "You can get source code from /source"}));
});

app.get("/source", (req, res) => {
    res.sendFile( __dirname + "/" + "app.js");
});

app.post("/login", (req, res) => {
  let u = {
    username: req.body.username,
    id: uuidv4(),
    value: Math.random() < 0.0000001 ? 100000000 : 100,
    isAdmin: false,
    rights: [
      "message",
      "adminUsername"
    ]
  };
  if (isValidUser(u)) {
    users[u.id] = u;
    res.send(ok({ token: sign({ id: u.id }) }));
  } else {
    res.json(err("Invalid creds"));
  }
});

app.post("/init", (req, res) => {
  let { secret } = req.body;
  let target = md5(config.secret.toString());

  let adminId = md5(secret)
    .split("")
    .map((c, i) => c.charCodeAt(0) ^ target.charCodeAt(i))
    .reduce((a, b) => a + b);

  res.json(ok({ token: sign({ id: adminId }) }));
});


// Get server info
app.get("/serverInfo", (req, res) => {
  let user = users[req.user.id] || { rights: [] };
  let info = user.rights.map(i => ({ name: i, value: config[i] }));
  res.json(ok({ info: info }));
});

app.post("/becomeAdmin", (req, res) => {
  let {value} = req.body;
  let uid = req.user.id;
  let user = users[uid];

  let maxValue = [value, config.adminValue].sort()[1];
  if(value >= maxValue && user.value >= value) {
    user.isAdmin = true;
    res.send(ok({ isAdmin: true }));
  }else{
    res.json(err("You need pay more!"));
  }
});

// only admin can update user
app.post("/updateUser", (req, res) => {
  let uid = req.user.id;
  let user = users[uid];
  if (!user || !isAdmin(user)) {
    res.json(err("You're not an admin!"));
    return;
  }
  let rights = req.body.rights || [];
  if (rights.length > 0 && checkRights(rights)) {
    users[uid].rights = user.rights.concat(rights).filter((value, index, self)=>{
      return self.indexOf(value) === index;
    });
  }
  res.json(ok({ user: users[uid] }));
});

// only uid===0 can get the flag
app.get("/flag", (req, res) => {
  if (req.user.id == 0) {
    res.send(ok({ flag: flag }));
  } else {
    res.send(err("Unauthorized"));
  }
});

server.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}!`)
);