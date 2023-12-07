const express = require("express");
const date = require("date-fns")
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

const datetime = new Date();
const newDate = ("0" + datetime.getDate()).slice(-2);
const newMonth = ("0" + (datetime.getMonth() + 1)).slice(-2)
const newYear = datetime.getFullYear()
const fullDate = newDate + "-" + newMonth + "-" + newYear
console.log(fullDate)


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

//User Query Registration

app.post("/user_query/", async (request, response) => {
  const { organizationName, correspondentName, email, contactNumber, address } = request.body;
  const id = uuidv4()
  const selectUserQuery = `
    SELECT 
      * 
    FROM 
      user_query 
    WHERE 
      email = '${email}';`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    const createUserQuery = `
     INSERT INTO
      user_query (id, organization_name, correspondent_name, email, contact_number, address)
     VALUES
      ('${id}',
        '${organizationName}',
        '${correspondentName}',
       '${email}',
       '${contactNumber}',
       '${address}'
      );`;
    await db.run(createUserQuery);
    response.send({success_msg:`Congratulations ${correspondentName} !! You have registered successfully with us. Our team will contact you as soon as possible. Thank you for your interest.`});
  } else {
    response.status(400);
    response.send({error_msg:"This email already exists"});
  }
});

//User query details

app.get("/user_query/", authenticateToken, async (request, response) => {
  const {offset, limit, search = ""} = request.query
  const getUserQuery = `
    SELECT
      *
    FROM
      user_query
    WHERE
    organization_name LIKE '%${search}%'
    LIMIT ${limit} OFFSET ${offset}`;
  const userQueryArray = await db.all(getUserQuery);
  response.send({queries : userQueryArray});
});


// Admin Register API
app.post("/admin/", async (request, response) => {
  const { name, username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4()
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
      admin (id, name, username, password)
     VALUES
      ('${id}',
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

//Admin Login

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

  //Admin Profile
  
  app.get("/admin/profile/", authenticateToken, async (request, response) => {
    let { username } = request;
    const selectUserQuery = `SELECT * FROM admin WHERE username = '${username}'`;
    const userDetails = await db.get(selectUserQuery);
    response.send(userDetails);
  });

  //Register School

  app.post("/schools/", authenticateToken, async (request, response) => {
    const schoolDetails = request.body
    const {schoolName, username, password, adminId} = schoolDetails
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4()
    const selectUserQuery = `
    SELECT 
      * 
    FROM 
      school 
    WHERE 
      username = '${username}';`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    const createSchoolQuery = `
     INSERT INTO
      school (id, school_name, username, password, admin_id)
     VALUES
      ('${id}',
        '${schoolName}',
       '${username}',
       '${hashedPassword}',
       '${adminId}'
      );`;
    await db.run(createSchoolQuery);
    response.send("School created successfully");
  } else {
    response.status(400);
    response.send("School already exists");
  }
})

app.get("/admin/:adminId/schools/", authenticateToken, async (request, response) => {
  const { adminId } = request.params;
  const getAdminSchoolsQuery = `
    SELECT
     *
    FROM
     school
     WHERE
     admin_id = '${adminId}';`;
  const schoolsArray = await db.all(getAdminSchoolsQuery);
  response.send({schoolsList : schoolsArray});
});