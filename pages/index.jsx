import { signIn, csrfToken } from "next-auth/react";
//, getCsrfToken, getSession, useSession
import Image from "next/image";
import LINK from "next/link";

//import { useForm } from "react-hook-form";
import { Formik } from 'formik';

import { useState, useCallback } from "react";
import { useRouter } from "next/router";

import Loginimage from "../public/login_Secure.svg";
import LogoNiperd from "../public/logoNiperd_image.png";

import RecoverpassModal from "./RecoverPass/RecoverpassModal";


//import {  Validador } from "./Components/BasicAlert";

////"dev": "next-dev-https --https --qr ",

//import DetailUser from './DashBoard/DetailUser';
//import useSWR from 'swr';

// Hook
// Parameter is the boolean, with default "false" value
const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

export default function Home() {


  //const { data, status } = useSession;
  /*const { register, handleSubmit } = useForm({
    mode: "onBlur",
  });*/
  const router = useRouter();
  const [estadomodal, setEstadomodal] = useToggle();

  // Call the hook which returns, current value and the toggler function
  const [alert, setAlert] = useToggle();
 
  const titleModal = "Recuperar Contraseña";

  //console.log('data', data, 'status', status);


   async (data, event) => {
    //console.log('data', data);
    event.preventDefault();
    console.log("event", event);

    const status = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });
    //console.log(status);
    if (status.ok) router.push("/DashBoard");
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full ">
        <div className=" flex flex-col px-8   ">
          <div className="flex items-stretch  ">
            <div className="flex w-10 text-[102,102,102]  relative top-1">
              <Image className=" " src={LogoNiperd} alt="Logo Niperd" />
            </div>
            <div className="text-2xl text-[102,102,102]  tracking-wide ml-2 font-semibold  
                   self-center " >
              NIPERD
            </div>
          </div>
          <div className=" flex h-full self-center  ">
            <Formik 
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors={};
                if (!values.email){
                  errors.email = 'Favor de teclear tu usuario.';
                } 
                if(!values.password){
                  errors.password = 'Favor de teclear tu contraseña.'
                }
                return errors;
              }}
             onSubmit={ async  (values, { setSubmitting }) => {
                //setTimeout(() =>{
                  //console.log(JSON.stringify(values, null, 2));

                  const status = await signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                    callbackUrl: "/",
                  });
                  //console.log(status);
                  if (status.ok) router.push("/DashBoard");


                  setSubmitting(false);

               // }, 400);
            }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                //isSubmitting = false
                /* and other goodies */
            }) => (
              <form  onSubmit={handleSubmit} className=" rounded-lg place-self-center border-4 p-6 
                shadow-xl shadow-[48,169,238]" >
                  <h2 className="text-4xl font-bold text-left  ">
                    Iniciar sesión en iCalidad
                  </h2>
                  <div className="flex flex-col font-bold py-2">
                    <label>Usuario</label>
                    <input className="peer mt-0 block w-full px-0.5 border-0 border-b-2
                                border-gray-200 focus:ring-0 focus:border-black"
                      placeholder="johnD"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <div className="text-red-600 text-xs font-light">
                      {errors.email && touched.email && errors.email}
                    </div>
                  </div>
                  <div className="flex flex-col font-bold py-2">
                    <label>Contraseña</label>
                    <input
                      type="password"
                      className="peer mt-0 block w-full px-0.5, px-0.5 border-0 border-b-2
                                border-gray-200 focus:ring-0 focus:border-black"
                      placeholder="Ingresa tu contraseña"
                      name="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    /> 
                    <div className="text-red-600 text-xs font-light">
                      {errors.password && touched.password && errors.password}
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-400 py-2">
                    <p className="flex items-center">
                      <input className="mr-2" type="checkbox" id="remember" name="remember" />
                      Recordarme
                    </p>
                    <p>
                    {" "}
                    <button type="button" onClick={() => setEstadomodal(!estadomodal)} >
                        olvidé mi contraseña
                    </button>{" "}
                    </p>
                  </div>
                  <button type="submit"  className="w-full my-5 py-3 mt-3 bg-[#30a9ee] shadow-md shadow-[#30a9ee]/50 
                        hover:shadow-[#30a9ee]/50 hover:bg-[#30a9ee]/50 text-white font-semibold rounded-lg">
                    Iniciar Sesión
                  </button>
                  <div className="flex justify-between text-gray-400 py-2">
                    <label>
                      ¿No cuentas con una cuenta?{" "}
                      <LINK href="/RegistroUser/registrouser">Regístrate aquí</LINK>
                    </label>
                  </div>
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className="bg-sky-100 grid grid-cols-1 gap-2 grid-rows-1  w-full h-full  inset-y-0 right-0 ">
        <div className="  object-center ">
          <Image 
            src={Loginimage}
            layout="responsive"
            priority={true}
            alt="Login"
          />
        </div>
      </div>
      </div>
      <RecoverpassModal
        estado={estadomodal}
        cambiarEstado={setEstadomodal}
        titulo={titleModal}
      >
        <form className="p-2 justify-between border-2 border-green-500" onSubmit={setAlert}>
          <p className="text-xs text-justify">
            Completa la información, las instrucciones serán enviadas a tu
            correo registrado.
          </p>
          627
          <input
            type="text"
            className="mt-4 mb-4 block w-full px-0.5 border-0 border-b-2
                                    border-gray-200 focus:ring-0 focus:border-black"
            placeholder="john@example.com"
            name="correoElectronico"
            id="correoElectronico"
          />
          <button
            type="submit"
            className="w-full my-5 py-3 mt-3 bg-[#30a9ee] shadow-md shadow-[#30a9ee]/50 
                   hover:shadow-[#30a9ee]/50 hover:bg-[#30a9ee]/50 text-white font-semibold rounded-lg "
          >
            Confirmar
          </button>
          {alert && (
            <div
              className="bg-green-100 rounded-lg py-5 px-6 mb-3 
                        text-xs text-green-700 inline-flex items-center w-full"
              role="alert"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="check-circle"
                className="w-4 h-4 mr-2 fill-current"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                ></path>
              </svg>
              Se envió el correo exitosamente
            </div>
          )}
        </form>
      </RecoverpassModal>
    </>
  );
}

/*
export  const getServerSideProps = async (context) => {
  
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: { session },
  };
}
*/

/*
getInitialProps = async (context) => {
  //console.log(context)
  const {req, res} = context;
  const session = await getSession({ req });

  if(session && res && session.accessToken){
    res.writeHead(302,{
      Location: "/",
    });
    res.end()
    return;
  }
  return {
    session: undefined,
    providers: await providers(context)//,
    //csrfToken: await csrfToken(context),
  };
};
*/
/*
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}*/
