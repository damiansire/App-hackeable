const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", (req, res) => {
  const userData = req.body;
  saveUserInDataBase(
    userData.name,
    userData.surname,
    userData.age,
    userData.password
  );
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const users = await getUserInDataBase();
  res.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function saveUserInDataBase(name, surname, age, password) {
  try {
    const client = new Client({
      user: "irxhksjlasmmgx",
      host: "ec2-52-86-96-53.compute-1.amazonaws.com",
      database: "d1vfn2igql9eil",
      password:
        "191162e3289ae01e697c44484a2bc388048b646947b473f7fb244cd32303c74e",
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    await client.connect();

    const queryToInsert =
      "INSERT INTO users VALUES ('" +
      name +
      "','" +
      surname +
      "', '" +
      age +
      "', '" +
      password +
      "' )";
    console.log("Se esta ejecutando:", queryToInsert);
    const res = await client.query(queryToInsert);
    console.log(res.rows); // Hello world!
    await client.end();
  } catch (error) {
    console.log(error);
  }
}

async function getUserInDataBase() {
  try {
    const client = new Client({
      user: "irxhksjlasmmgx",
      host: "ec2-52-86-96-53.compute-1.amazonaws.com",
      database: "d1vfn2igql9eil",
      password:
        "191162e3289ae01e697c44484a2bc388048b646947b473f7fb244cd32303c74e",
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    await client.connect();

    const res = await client.query("SELECT * FROM users");
    console.log(res.rows); // Hello world!
    await client.end();
    return res.rows;
  } catch (error) {
    console.log(error);
  }
}
