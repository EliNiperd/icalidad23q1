import { useContext } from "react";
import { IcalidadContext } from "../Contexts/IcalidadContext";
import HomeDashBoard from "../DashBoard";

const AdminIcalidad = () => {
    const { menuDataMenu, setDataMenu } = useContext(IcalidadContext);
  return (
    <>
      <HomeDashBoard>
        <div className="text-4xl max-h-screen max-w-screen bg-slate-500 items-center text-slate-500">Admin iCalidad</div>
      </HomeDashBoard>
    </>
  );
};

export default AdminIcalidad;
