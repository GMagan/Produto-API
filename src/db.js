require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
   user: process.env.PGUSER,
   host: process.env.PGHOST,
   database: process.env.PGDATABASE,
   password: process.env.PGPASSWORD,
   port: process.env.PGPORT
});

const runScript = async (filePath) => {
   const script = fs.readFileSync(path.join(__dirname, filePath)).toString();
   try {
      await pool.query(script);
      console.log(`${filePath} running`);
   } catch (error) {
      console.error(`Error in ${filePath}:`, error.message);
   }
};

const runAllScripts = async () => {
   await runScript(`database/tablecreator.sql`);
   await runScript(`database/seed.sql`); 
};

runAllScripts();

module.exports = pool;
