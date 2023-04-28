import { usegetPool, typeParameter } from "lib/database/connection";

export default async function handlerUserAction(req, res) {
  //console.log("req", req.method);
  
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  };
  switch (req.method) {
    case "GET":
      try {
        const { dashBoardUser } = req.query;
        const typeParam = await typeParameter();
        const pool = await usegetPool("Default");
        const request = await pool.request();
        //console.log('dashBoardUser', dashBoardUser);
        await request.input("p_IdEmpleado", typeParam.Int, dashBoardUser[1]);
        await request.input("p_Version", typeParam.Int, dashBoardUser[2]);
        await request.input("p_IdMenuFather", typeParam.Int, dashBoardUser[3]);
        const result = await request.execute("PF_Gen_TMenu");
        const { rowsAffected , recordsets } = result;
        //console.log(JSON.stringify(recordsets));
        //const recordset = result.recordset;
        
        res.status(200).json({ recordsets, rowsAffected });
      } catch (error) {
        console.log('mensaje de error: ', error);
        res.status(500).json({ error: error.message });
      }

      break;
    case "POST":
      res
        .status(200)
        .json({ message: "Success in POST request", requestOptions });
      break;
    default:
      res
        .status(405)
        .json({
          message: `El método HTTP ${req.method} no está disponible para este objeto`,
        });
      break;
  }
}
