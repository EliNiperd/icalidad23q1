import { usegetPool, typeParameter } from "lib/database/connection";

export default async function handlerUserAction(req, res) {
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
        await request.input("p_IdEmpleado", typeParam.Int, dashBoardUser[1]);
        await request.input("p_Version", typeParam.Int, dashBoardUser[2]);
        await request.input("p_IdMenuFather", typeParam.Int, dashBoardUser[3]);
        const result = await request.execute("PF_Gen_TMenu");
        //console.log(JSON.stringify(result.result));
        const recordset = result.recordset;
        //const { rowsAffected , recordsets } = result;
        res.status(200).json({ recordset });
      } catch (error) {
        console.log(error);
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
