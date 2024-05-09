import { usegetPool, typeParameter } from 'lib/database/connection';

export default async function handlerUserAction(req, res) {
  /* const requestOptions = {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
    method: req.method,
  }; */

  const { id, param, status } = req.query;
  switch (req.method) {
    case 'GET':
      if (param === 'ALL') {
        try {
          const typeParam = await typeParameter();
          const pool = await usegetPool('Default');
          const request = await pool.request();
          await request.input(
            'p_ClaveDepartamento',
            typeParam.NVarChar(50),
            '%'
          );
          await request.input(
            'p_NombreDepartamento',
            typeParam.NVarChar(100),
            '%'
          );
          await request.input('p_IdGerencia', typeParam.NVarChar(5), id);
          await request.input('p_IdEstatus', typeParam.NVarChar(5), status);
          const result = await request.execute('PF_Gen_TDepartamento');
          const { rowsAffected, recordset } = result;
          res.status(200).json({ recordset, rowsAffected });
        } catch (error) {
          console.log('mensaje de error: ', error);
          res.status(500).json({ error: error.message });
        }
      } else {
        try {
          const typeParam = await typeParameter();
          const pool = await usegetPool('Default');
          const request = await pool.request();
          await request.input(
            'p_IdGerencia',
            typeParam.NVarChar(5),
            req.query.id
          );
          const result = await request.execute('PFK_Gen_TDepartamento');
          const { rowsAffected, recordset } = result;
          res.status(200).json({ recordset, rowsAffected });
        } catch (error) {
          console.log('mensaje de error: ', error);
          res.status(500).json({ error: error.message });
        }
      }
      break;
  }
}
