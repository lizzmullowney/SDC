//require pg (not sure exactly what that is/does other than allows us to connect to postgres db)
const Pool = require('pg').Pool;

//set up access to the DB I have created
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

//export pool so we can query from DB in other files
module.exports = pool;