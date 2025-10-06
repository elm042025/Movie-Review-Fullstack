import "dotenv/config"
import sql from 'mssql'

const dbConfig=
{
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    port: Number(process.env.SQL_PORT),
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    options:
    {
        encrypt: process.env.SQL_ENCRYPT === 'true',
        trustServerCertificate: process.env.SQL_TRUST_CERT === 'true'

    }
}

let pool;

export const getPool = async ()=>
{
    try
    {
        if (pool) return pool;

        pool = await sql.connect(dbConfig);
        console.log("Connected to SQL Server");
        return pool;
    }
catch (error)
    {
        console.log("Database connection failed", error);
        throw error;
    }
}

export { sql };