//import getPool from "../../database/connection"
import sql from 'mssql';

const dbSettings = {
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASS,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  server: process.env.NEXT_PUBLIC_DB_HOST,
  port: process.env.NEXT_PUBLIC_DB_PORT,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export default async function handler(req, res) {
  try {
    const poolSQL = await sql.connect(dbSettings);
    const result = await poolSQL
      .request()
      .query('select * from Gen_TEmpleado ');
    res.status(200).json({ result });

    //console.dir(result)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
  res.json();
}
