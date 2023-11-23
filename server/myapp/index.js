const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {v4 : uuidv4} = require('uuid')
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, "database.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3009, () => {
      console.log("Server Running at http://localhost:3009/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        request.username = payload.username;
        next();
      }
    });
  }
};

// Admin Register API
app.post("/admin/", async (request, response) => {
  const { name, username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const adminId = uuidv4()
  const selectUserQuery = `
    SELECT 
      * 
    FROM 
      admin 
    WHERE 
      username = '${username}';`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    const createUserQuery = `
     INSERT INTO
      admin (admin_id, name, username, password)
     VALUES
      ('${adminId}',
        '${name}',
       '${username}',
       '${hashedPassword}'
      );`;
    await db.run(createUserQuery);
    response.send("User created successfully");
  } else {
    response.status(400);
    response.send("User already exists");
  }
});

app.get("/admin_details/", authenticateToken, async (request, response) => {
  const getAdminsQuery = `
    SELECT
      *
    FROM
      admin
    ORDER BY
    username`;
  const adminsArray = await db.all(getAdminsQuery);
  response.send(adminsArray);
});

app.post("/admin_login/", async (request, response) => {
    const {username, password} = request.body
    const selectUserQuery = `SELECT * FROM admin WHERE username = '${username}'`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
      response.status(400);
      response.send({status_code : 400, error_msg : "Invalid username"});
    } else {
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
      if (isPasswordMatched === true) {
        const payload = {
          "username": username,
        };
        const jwt_token = jwt.sign(payload, "MY_SECRET_TOKEN");
        response.send({ jwt_token });
      } else {
        response.status(400);
        response.send({status_code : 400, error_msg : "Invalid Password"});
      }
    }
  });
  
  app.get("/admin/profile/", authenticateToken, async (request, response) => {
    let { username } = request;
    const selectUserQuery = `SELECT * FROM admin WHERE username = '${username}'`;
    const userDetails = await db.get(selectUserQuery);
    response.send(userDetails);
  });