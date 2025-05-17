// scripts/create-db.js
require("dotenv").config();
const mysql = require("mysql2/promise");

(async () => {
  const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USERNAME,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`Database '${DB_NAME}' ensured.`);
    await connection.end();
  } catch (err) {
    console.error("Unable to create database:", err.message);
    process.exit(1);
  }
})();
