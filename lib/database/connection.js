
import msql from 'mssql';

/* global Map */
const pools = new Map();

const dbSettings = {
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASS,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  server: process.env.NEXT_PUBLIC_DB_HOST,
  port: +process.env.NEXT_PUBLIC_DB_PORT,
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

export const usegetPool = async (name) => {
  // console.log(process.env.NEXT_PUBLIC_DB_USER)
  // console.log(dbSettings);

  if (!pools.has(name)) {
    if (!dbSettings) {
      throw new Error('Pool does not exists');
    }
    const pool = new msql.ConnectionPool(dbSettings);

    const close = pool.close.bind(pool);
    pool.close = (...args) => {
      pools.delete(name);
      return close(...args);
    };
    pools.set(name, pool.connect());
  }
  return pools.get(name);
};
/* global Promise */
export const closePools = async () =>
  Promise.all(
    Array.from(pools.values()).map((connect) => {
      return connect.then((pool) => pool.close());
    })
  );

export const connectDB = async () => {
  try {
    const pool = await msql.connect(dbSettings);
    // pool().connected()
    return pool;
  } catch (error) {
    console.log(error);
  }
};

export const typeParameter = async () => {
  const types = msql.TYPES;
  return types;
};

export default usegetPool;

// import sql from 'mssql'

/*
const dbSettings = {
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASS,
    database: process.env.NEXT_PUBLIC_DB_NAME,
    server: process.env.NEXT_PUBLIC_DB_HOST,
    port: 1433,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }
*/
// const Context = React.creacteContext({})
/*
export function PoolContextProvider({ children}){

} */
/*
   export default async function getPool() {

        //try {
            const pool = await sql.connect(dbSettings);
            return pool;
            //const result = await pool.request().query('select * from gen_templeado');
            //console.log(result);
            ///return poolSQL
            // make sure that any items are correctly URL encoded in the connection string where id = ${value}
           //await sql.connect('Server=localhost,1433;Database=iCalidadLamesa;User Id=sa;Password=Niperd2012;Encrypt=true')
            //const result = await sql.query('select * from Gen_TEmpleado ')
            //console.dir(result)
        //} catch (err) {
        //    console.log(err)
            // ... error checks
        //}
    } */
// getConnection();
