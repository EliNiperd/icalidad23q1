import HomeDashBoard from '../../DashBoard/index';
import Catalogo from '../../Components/Catalogo';

const index = () => {
  return (
    <>
      <HomeDashBoard>
        <title>Catálogos Configuración iCalidad</title>
        <h1 className=" flex justify-center align-middle text-4xl text-gray-900  pb-2 ">
          Catálogos Configuración iCalidad
        </h1>
        <div className="text-4xl h-full bg-white text-center text-black p-10   ">
          <Catalogo />
        </div>
      </HomeDashBoard>
    </>
  );
};

export default index;
