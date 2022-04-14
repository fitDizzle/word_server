const { Pool, Client } = require("pg");
const config = require("../database/config/config.json");
const Sequelize = require("sequelize");
const { host, user, password, database } = config.development;

const credentials = {
  user: "jlwafmgpcrpzcw",
  host: "ec2-34-207-12-160.compute-1.amazonaws.com",
  database: "dd9bjopg329br2",
  password: "f62a583125324e6eaf2d2e3261c6321549acfab53ab4a5cb01ea7afc0676f077",
  uri: "postgres://jlwafmgpcrpzcw:f62a583125324e6eaf2d2e3261c6321549acfab53ab4a5cb01ea7afc0676f077@ec2-34-207-12-160.compute-1.amazonaws.com:5432/dd9bjopg329br2",
  port: 5432,
  dialectOptions:{
    allowPublicKeyRetrieval: true,
    skipSetTimeZone: true,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}


// Connect with a client.
async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();

  return now;
}

// Use a self-calling function so we can use async / await.

(async () => {
  const poolResult = await poolDemo();
  console.log("Time with pool: " + poolResult.rows[0]["now"]);

  const clientResult = await clientDemo();
  console.log("Time with client: " + clientResult.rows[0]["now"]);
})();


module.exports = credentials