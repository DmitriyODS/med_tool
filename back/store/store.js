const { join: joinPath } = require('path');
const pgp = require('pg-promise')();

const connectionDB = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 30,
};

const db = pgp(connectionDB);

function sqlQueryFile(file) {
  const fullPath = joinPath(__dirname, file);
  return new pgp.QueryFile(fullPath, { minify: true });
}

module.exports = {
  db,
  sqlQueryFile,
};
