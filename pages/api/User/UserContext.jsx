import React from 'react';
import sql from 'mssql';

const user = {
  userName: 'erodriguez',
  password: 'xyz123',
  fullName: 'Elí Rodríguez S',
  avatarUser: 'ok',
};

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

export const getPool = async () => {
  try {
    const poolSQL = await sql.connect(dbSettings);
    //return poolSQL
    // make sure that any items are correctly URL encoded in the connection string where id = ${value}
    //await sql.connect('Server=localhost,1433;Database=iCalidadLamesa;User Id=sa;Password=Niperd2012;Encrypt=true')
    const result = await poolSQL
      .request()
      .query('select * from Gen_TEmpleado ');
    return result.json();
    //console.dir(result)
  } catch (err) {
    console.log(err);
    // ... error checks
  }
};

const UserContext = React.createContext({
  user: user,
});

export default UserContext;
