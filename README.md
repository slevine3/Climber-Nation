# Climber Nation

Full stack web application to assist rock climbing enthusiasts in finding climbing partners.

## Technologies

- Node.js
- Express
- React/Redux
- Google Matrix API

## Security Features

### Password Encryption

#### Registration: Insert encrypted password into database

```js
const hashedPassword = await bcrypt.hash(req.body.password, 10);
const password = hashedPassword;
await db("users").returning(["first_name", "username", "password"]).insert({
  first_name: first_name,
  username: username,
  password: password,
});
```

#### Login: Validate encrypted password

```js
 await bcrypt.compare(password, userPassword[0].password)) && username === userExists[0].username
```

### JSON Web Token (JWT Access Token)

#### Generate access token and send to the client

```js
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
    expiresIn: "30m",
  });
};
```

#### Verify token authenticity

```js
//AUTHENTICATION
app.get("/authentication", authenticateToken, async (req, res) => {
  const username = req.user.username;

  const allUserInfo = await db("users").select("*").where("username", username);

  const image = await db("images")
    .innerJoin("users", "images.image_id", "users.user_id")
    .select("filename")
    .where("username", username);

  const imageFile =
    "https://climber-nation.herokuapp.com/images/" + image[0]?.filename;

  res.json({
    allUserInfo: allUserInfo[0],
    imageFile: imageFile,
  });
});
```

#### Middleware

```js
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
```
