const { Pool, Client } = require("pg");
const config = require("../database/config/config.json");
const Sequelize = require("sequelize");
const { host, user, password, database } = config.development;

const credentials = {
  user: "rgunrhgljdfqss",
  host: "ec2-34-236-103-63.compute-1.amazonaws.com",
  database: "d75iq9upr8bbj4",
  password: "8d58565f1ba6ca59807b76d5280654e55a7613d1662922197afcfd4e77e6e206",
  uri: "postgres://rgunrhgljdfqss:8d58565f1ba6ca59807b76d5280654e55a7613d1662922197afcfd4e77e6e206@ec2-34-236-103-63.compute-1.amazonaws.com:5432/d75iq9upr8bbj4",
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