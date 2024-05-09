import { usegetPool, typeParameter } from 'lib/database/connection';

export default async function handlerDocumentAdmin(req, res) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  };

  switch (req.method) {
    case 'GET':
      try {
        const { documentAdmin } = req.query;
        /* console.log(
          'documentAdmin[1]: ',
          documentAdmin,
          'objeto1: ',
          documentAdmin[1],
          'objeto2: ',
          documentAdmin[2],
          'objeto3:',
          documentAdmin[3],
          'Fin'
        ); */
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        // pool.timeout = 60000;
        const request = await pool.request();
        await request.input(
          'p_IdResponsable',
          typeParam.VarChar(8),
          documentAdmin[11] === undefined ? '%' : documentAdmin[11]
        );
        await request.input(
          'p_IdNormativa',
          typeParam.VarChar(8),
          documentAdmin[12] === undefined ? '%' : documentAdmin[12]
        );
        await request.input(
          'p_IdTipoDocumento',
          typeParam.VarChar(8),
          documentAdmin[3] === undefined ? '%' : documentAdmin[3]
        );
        await request.input(
          'p_IdDepartamento',
          typeParam.VarChar(8),
          documentAdmin[4] === undefined ? '%' : documentAdmin[4]
        );
        await request.input(
          'p_IdProceso',
          typeParam.VarChar(8),
          documentAdmin[5] === undefined ? '%' : documentAdmin[5]
        );
        await request.input(
          'p_IdEstatusDocumento',
          typeParam.VarChar(8),
          documentAdmin[6] === undefined ? '%' : documentAdmin[6]
        );
        await request.input(
          'p_CodigoDocumento',
          typeParam.VarChar(50),
          documentAdmin[7] === undefined ? '%' : documentAdmin[7]
        );
        await request.input(
          'p_NombreDocumento',
          typeParam.VarChar(1000),
          documentAdmin[8] === undefined ? '%' : documentAdmin[8]
        );
        await request.input(
          'p_IdDocumento',
          typeParam.VarChar(10),
          documentAdmin[9] === undefined ? '%' : documentAdmin[9]
        );
        await request.input(
          'p_PageSize',
          typeParam.Int,
          documentAdmin[1] === undefined ? 10 : documentAdmin[1]
        );
        await request.input(
          'p_PageNumber',
          typeParam.Int,
          documentAdmin[2] === undefined ? 0 : documentAdmin[2]
        );
        await request.input(
          'p_AplicaExamen',
          typeParam.VarChar,
          documentAdmin[13] === undefined ? '%' : documentAdmin[13]
        );
        const result = await request.execute('PF_Doc_TDocumento');
        // console.log('result: ', result);
        const { rowsAffected, recordset } = result;
        // console.log('result: ', recordset);
        res.status(200).json({ recordset, rowsAffected });
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
