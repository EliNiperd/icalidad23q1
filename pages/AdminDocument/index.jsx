import { useContext } from "react";
import { IcalidadContext } from "../Contexts/IcalidadContext";
import HomeDashBoard from "../DashBoard";

const AdminDocument = () => {
  const { menuDataMenu, setDataMenu } = useContext(IcalidadContext);
  return (
    <>
      <HomeDashBoard>
        <div className="text-4xl  bg-slate-500 items-center text-slate-500">Admin iCalidad</div>
      </HomeDashBoard>
    </>
  );
}

export default AdminDocument;
