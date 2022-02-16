const express = require("express");
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
const knex = require("knex");
const env = require("dotenv");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

env.config();
app.use(express.urlencoded());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

app.listen(process.env.port, () => {
  console.log(`Listening on ${process.env.port}`);
});

const db = knex({
  client: "pg",
  connection: {
    host: process.env.HOSTDB,
    port: process.env.DBPORTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASEDB,

    //Need to lookup what this is for
    // ssl: { rejectUnauthorized: false },
  },
});
app.set("db", db);

app.post("/register", async (req, res) => {
  try {
    const first_name = req.body.first_name;
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const password = hashedPassword;

    const userExists = await db("users")
      .select("username")
      .where("username", username);

    if (!first_name || !username || !password) {
      res.send("Sorry, please enter all fields");
      return;
    } else if (userExists[0]?.username === username) {
      res.send("Sorry, this user already exists");

      return;
    } else {
      await db("users")
        .returning(["first_name", "username", "password"])
        .insert({
          first_name: first_name,
          username: username,
          password: password,
        });

      res.send("Account Created!");
      return;
    }
  } catch (error) {
    console.log(error);
  }
});

//VALIDATE AUTHENTICATION TOKEN
const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (token == null) {
      return res.sendStatus(401);
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.sendStatus(403);
        } else {
          req.user = decoded;

          return next();
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

//AUTHENTICATION

app.get("/authentication", authenticateToken, async (req, res) => {
  const username = req.user.username;
  const allUserInfo = await db("users")
    .select("user_id", "first_name")
    .where("username", username);

  const image = await db("images")
    .innerJoin("users", "images.image_id", "users.user_id")
    .select("filename").where("username", username)

  res.json({ allUserInfo: allUserInfo[0], image: image });
});

//LOGIN

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const id = await db("users").select("user_id").where("username", username);
  const userExists = await db("users")
    .select("username")
    .where("username", username);
  const userPassword = await db("users")
    .select("password")
    .where("username", username);
  const userFirstName = await db("users")
    .select("first_name")
    .where("username", username);
  try {
    if (username !== userExists[0]?.username) {
      res.send("Sorry this username does not exist");
    } else if (!password) {
      res.send("You must enter a password!");
    } else if (
      (await bcrypt.compare(password, userPassword[0].password)) &&
      username === userExists[0].username
    ) {
      //ACCESS TOKEN
      const accessToken = generateAccessToken(userExists[0]);
      // const refreshToken = jwt.sign(userExists[0], process.env.REFRESH_TOKEN_SECRET);
      res.json({
        auth: true,
        accessToken: accessToken,
        // refreshToken: refreshToken,
        username: username,
      });

      return;
    } else res.send("Incorrect password. Please try again!");
    return;
  } catch (error) {
    console.log(error);
  }
});

//GENERATE TOKEN

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5s",
  });
};
//REFRESH TOKEN

// app.post("/token", (req, res) => {
// const refreshToken = req.body.token;
// if (refreshToken == null) return res.sendStatus(401)

// });

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);

      return cb(new Error());
    }
  },
  limits: { fileSize: 1 * 1024 * 1024 },
}).single("image");

app.post("/upload", (req, res) => {
  upload(req, res, async function (error) {
    try {
      const filename = req.file.filename;
      const user_id = req.body.user_id;

      if (error) {
        res.send({
          error:
            "Sorry only png, jpg, and jpeg files allowed. Please try uploading something else!",
        });
      } else {
        await db("images").where("image_id", user_id).del();
        await db("images")
          .where("image_id", user_id)
          .insert({
            filename: filename,
            image_id: user_id,
          })
          .into("images");
      }
    } catch (error) {
      console.log(error);
    }
  });
});

// fetch('http://api.amp.active.com/v2/search/?near=california&current_page=1&per_page=10&sort=distance&exclude_children=true&api_key=ps36nt6jjz6g7mhgwa7h9fx9')
//   .then(response => response)
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => console.log(err))
