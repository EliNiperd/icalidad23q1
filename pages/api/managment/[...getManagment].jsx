import { usegetPool, typeParameter } from 'lib/database/connection';

export default async function handlerUserAction(req, res) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
    method: req.method,
  };
  const { id } = req.query;
  // console.log('req.method: ', req.method, 'req.query: ', req.query);
  switch (requestOptions.method) {
    case 'GET':
      if (id === 'ALL') {
        try {
          // console.log('getManagment: ', req.query);
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
      } else {
        try {
          // console.log('getManagment: ', req.query);
          const typeParam = await typeParameter();
          const pool = await usegetPool('Default');
          const request = await pool.request();
          // console.log('dashBoardUser', dashBoardUser);
          await request.input('p_IdGerencia', typeParam.Int, req.query.id);
          const result = await request.execute('PFK_Gen_TGerencia');
          const { rowsAffected, recordset } = result;
          // console.log(result.recordset[0]);
          // const recordset = result.recordset;
          res.status(200).json({ recordset, rowsAffected });
          // res.status(200).json({ data, rowsAffected });
        } catch (error) {
          console.log('mensaje de error: ', error);
          res.status(500).json({ error: error.message });
        }
      }
      break;
    case 'POST':
      // console.log('req.body: ', req.body);
      try {
        const {
          idEmpleado,
          claveGerencia,
          nombreGerencia,
          idRegistro,
          idEstatusGerencia,
        } = req.body;
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();

        await request.input(
          'p_ClaveGerencia',
          typeParam.NVarChar(40),
          claveGerencia
        );
        await request.input(
          'p_NombreGerencia',
          typeParam.NVarChar(100),
          nombreGerencia
        );

        let procedureName = '';
        let parameterIdEmpleado = '';
        if (idRegistro) {
          await request.input('p_IdGerencia', typeParam.Int, idRegistro);
          await request.input(
            'p_IdEstatusGerencia',
            typeParam.Bit,
            idEstatusGerencia
          );
          parameterIdEmpleado = 'p_IdEmpleadoActualiza';
          procedureName = 'PU_Gen_TGerencia';
        } else {
          parameterIdEmpleado = 'p_IdEmpleadoAlta';
          procedureName = 'PI_Gen_TGerencia';
        }
        /*
        console.log(
          'procedureName: ',
          procedureName,
          'idRegistro: ',
          idRegistro
        );
        */
        await request.input(parameterIdEmpleado, typeParam.Int, idEmpleado);
        const result = await request.execute(procedureName);
        // console.log('result: ', result);
        const { rowsAffected, recordset } = result;
        const Mensaje = recordset[0].Mensaje;
        const Resultado = recordset[0].Resultado;
        console.log('recordset: ', recordset, 'Mensaje: ', Mensaje);
        console.log(Resultado === -1);
        // console.log('rowsAffected: ', rowsAffected, 'resultado: ', Resultado);
        if (Resultado === -1) {
          res.status(400).json({ message: Mensaje });
        } else
          res.status(200).json({
            message: Mensaje,
            requestOptions,
            Resultado,
            recordset,
            rowsAffected,
          });
      } catch (error) {
        console.log('mensaje de error: ', error);
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(405).json({
        message: `El método HTTP ${req.method} no está disponible para este objeto`,
      });
      break;
  }
}
