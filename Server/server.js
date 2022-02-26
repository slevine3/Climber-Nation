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
    header: "Content-Type: application/json",
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  })
);

app.use("/images", express.static(__dirname + "/Images"));

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
    const userExists = await db("users")
      .select("username")
      .where("username", username);

    if (!first_name || !username || !req.body.password) {
      res.send(null);
    } else if (userExists[0]?.username === username) {
      res.send("username exists");
      return;
    } else if (req.body.password.length < 6) {
      res.send("longer password");
      return;
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const password = hashedPassword;
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
    .select("filename")
    .where("username", username);

  const imageFile = "http://localhost:5000/images/" + image[0]?.filename;

  res.json({ allUserInfo: allUserInfo[0], imageFile: imageFile });
});

app.get("/fetch-image", async (req, res) => {
  const user_id = req.query.user_id;
  const image = await db("images")
    .innerJoin("users", "images.image_id", "users.user_id")
    .select("filename")
    .where("user_id", user_id);

  const imageFile = "http://localhost:5000/images/" + image[0]?.filename;

  res.json({ imageFile: imageFile });
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
      res.send("This username does not exist");
    } else if (!password) {
      res.send("Please enter a password");
    } else if (
      (await bcrypt.compare(password, userPassword[0].password)) &&
      username === userExists[0].username
    ) {
      //ACCESS TOKEN
      const accessToken = generateAccessToken(userExists[0]);

      res.json({
        auth: true,
        accessToken: accessToken,

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
    expiresIn: "300m",
  });
};

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
      const filename = req.file?.filename;
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

app.post("/data", async (req, res) => {
  const current_city = req.body.current_city;
  const climbing_preference = req.body.climbing_preference;
  const bouldering = req.body.bouldering;
  const top_rope = req.body.top_rope;
  const lead_climb = req.body.lead_climb;
  const user_id = req.body.user_id;
  const zip_code = req.body.zipCode;

  try {
    await db("data").where("user_data_id", user_id).del();
    await db("data")
      .where("user_data_id", user_id)
      .insert({
        current_city: current_city,
        climbing_preference: climbing_preference,
        bouldering: bouldering,
        top_rope: top_rope,
        lead_climb: lead_climb,
        zip_code: zip_code,
        user_data_id: user_id,
      })
      .into("data");
  } catch (error) {
    console.log(error);
  }
});

app.get("/select-users", async (req, res) => {
  const climbing_preference = req.query.climbPreference;
  const climbType = req.query.climbType;
  const climbLevel = req.query.climbLevel;
  const user_id = req.query.user_id;

  const zip_code = await db("data")
    .select("zip_code")
    .where("user_data_id", user_id);

  const image = await db("images")
    .innerJoin("users", "images.image_id", "users.user_id")
    .innerJoin("data", "images.image_id", "data.user_data_id")
    .select("*")
    .where(climbType, climbLevel)
    .where("climbing_preference", climbing_preference)
    .whereNot("user_id", user_id);

  const users_zip_code = await db("data")
    .select("zip_code")
    .where(climbType, climbLevel)
    .where("climbing_preference", climbing_preference)
    .whereNot("user_data_id", user_id);

  const MappedUsers_zip_code = users_zip_code.map(
    (data) => "|" + data.zip_code
  );

  try {
    await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${zip_code[0].zip_code}&destinations=${MappedUsers_zip_code}&key=${process.env.GOOGLE_API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        res.json({ distance: json.rows[0]?.elements, imageFile: image });
      });
  } catch (error) {
    console.log(error);
  }
});

app.get("/visit_user_profile", async (req, res) => {
  const visiting_user_id = req.query.visiting_user_id;

  try {
    const allUserData = await db("images")
      .innerJoin("users", "images.image_id", "users.user_id")
      .innerJoin("data", "images.image_id", "data.user_data_id")
      .select("*")
      .where("user_id", visiting_user_id);

    const image = await db("images")
      .innerJoin("users", "images.image_id", "users.user_id")
      .select("filename")
      .where("user_id", visiting_user_id);

    const imageFile = "http://localhost:5000/images/" + image[0]?.filename;

    res.send({ visiting_user_data: allUserData, imageFile: imageFile });
  } catch (error) {
    console.log(error);
  }
});

app.get("/my_profile", async (req, res) => {
  const user_id = req.query.user_id;
  const allUserData = await db("images")
    .innerJoin("users", "images.image_id", "users.user_id")
    .innerJoin("data", "images.image_id", "data.user_data_id")
    .select("*")
    .where("user_id", user_id);

  res.json({ allUserData: allUserData });
});

app.get("/random-users", async (req, res) => {
  let array = [];
  let initialUsersId = await db("images")
    .innerJoin("users", "images.image_id", "users.user_id")
    .innerJoin("data", "images.image_id", "data.user_data_id")
    .select("*");
  initialUsersId.map((data) => array.push(data.user_id));

  const random = Math.floor(Math.random() * array.length);

  const allUserData = await db("images")
    .innerJoin("users", "images.image_id", "users.user_id")
    .innerJoin("data", "images.image_id", "data.user_data_id")
    .select("*")
    .whereBetween("user_id", [array[random], 1000])
    .limit(3);

  console.log("random num in array", array[random]);
  console.log(allUserData);

  res.json({ allUserData: allUserData });
});
