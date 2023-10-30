const { Pool, Client } = require("pg");
const config = require("../database/config/config.json");
const Sequelize = require("sequelize");
const { host, user, password, database } = config.development;

const credentials = {
  user: "amizcydpfrkjrd",
  host: "ec2-52-206-36-147.compute-1.amazonaws.com",
  database: "dbbkkauj2qrq9a",
  password: "e455af1385fd0baeff9f60c9494a3734921e362d1c9fbc7d63818014557338dd",
  uri: process.env.uri,
  port: 5432,
  dialectOptions: {
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