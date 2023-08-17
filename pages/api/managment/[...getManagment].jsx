import { usegetPool, typeParameter } from 'lib/database/connection';

export default async function handlerUserAction(req, res) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  };

  // console.log('req.method: ', req.method, req.query);
  switch (req.method) {
    case 'GET':
      try {
        const { getManagment } = req.query;
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        // console.log('dashBoardUser', dashBoardUser);
        await request.input('p_ClaveGerencia', typeParam.NVarChar(50), '%');
        await request.input('p_NombreGerencia', typeParam.NVarChar(100), '%');
        await request.input('p_IdEstatus', typeParam.NVarChar(5), '%');
        const result = await request.execute('PF_Gen_TGerencia');
        const { rowsAffected, recordset } = result;
        // console.log(result.recordset[0]);
        // const recordset = result.recordset;
        res.status(200).json({ recordset, rowsAffected });
        // res.status(200).json({ data, rowsAffected });
      } catch (error) {
        console.log('mensaje de error: ', error);
        res.status(500).json({ error: error.message });
      }
      break;
    case 'POST':
      res
        .status(200)
        .json({ message: 'Success in POST request', requestOptions });
      break;
    default:
      res.status(405).json({
        message: `El método HTTP ${req.method} no está disponible para este objeto`,
      });
      break;
  }
}
