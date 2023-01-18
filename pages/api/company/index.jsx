import getPool from 'lib/database/connection';

export default async function handler(req, res){
    
    try {
        const request = req;
        const pool = await getPool();
        const result = await pool.request().query('select TOP 1 * from Gen_TConfiguracionEMpresa')
        console.log(result.recordset, request)
        return res.status(200).json(result.recordset);

    } catch (err) {
       return res.status(500).json({ error: 'failed to load data' })
    }
}