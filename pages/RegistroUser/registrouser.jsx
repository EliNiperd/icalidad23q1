import LINK from 'next/link';
import Image from 'next/image';
import Registerimage from '../../public/registro_image.svg';

const registrouser = () => {
  return (
    <>
      <div className="bg-sky-100 absolute content-start w-3/4 h-full pr-24 pt-10   -z-10  ">
        <Image
          className=" "
          layout="responsive"
          width={300}
          height={165}
          src={Registerimage}
          priority={true}
          alt="Registro"
        />
      </div>
      <div
        className=" p-8  w-1/2  
                absolute inset-y-0 right-0  grid place-items-center    "
      >
        <form className="rounded-xl border-2 boder-[48,169,238] bg-white p-6  pt-4 shadow-xl shadow-[48,169,238]   ">
          <h2 className="text-4xl font-bold text-left pb-9">
            Registrarse en iCalidad
          </h2>
          <div className="flex flex-col font-bold py-2">
            <label>Correo Electrónico</label>
            <input
              type="text"
              className="mt-0 block w-full px-0.5  border-0 border-b-2
                            border-gray-200 focus:ring-0 focus:border-black"
              placeholder="john@example.com"
              name="correoElectrocnico"
              id="correoElectronico"
            />
          </div>
          <div className="flex flex-col font-bold py-2">
            <label>Crea una contraseña</label>
            <input
              type="password"
              className="mt-0 block w-full px-0.5 border-0 border-b-2
                            border-gray-200 focus:ring-0 focus:border-black"
              placeholder="contraseña"
              name="password"
              id="password"
            />
          </div>
          <div className="flex flex-col font-bold py-2">
            <label>Confirma tu contraseña</label>
            <input
              type="password"
              className="mt-0 block w-full px-0.5 border-0 border-b-2
                            border-gray-200 focus:ring-0 focus:border-black"
              placeholder="confirmar "
              name="confirmpassword"
              id="confirmpassord"
            />
          </div>
          <button
            className="w-full my-5 py-3 mt-3 bg-[#30a9ee] shadow-md shadow-[#30a9ee]/50 
                            hover:shadow-[#30a9ee]/50 hover:bg-[#30a9ee]/50 text-white font-semibold rounded-full"
          >
            Registrarse
          </button>
          <div className="flex justify-between text-gray-400 py-2">
            <label>
              ¿Ya cuentas con una cuenta? <LINK href="/#">Inicia sesión</LINK>
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default registrouser;
