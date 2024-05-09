import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import LINK from 'next/link';
import Image from 'next/image';

import Loginimage from '../public/login_Secure.png';
import LogoNiperd from '../public/logoNiperd_image.png';

import { signIn, csrfToken, getSession } from 'next-auth/react';
// , getCsrfToken, getSession, useSession
// import Image from 'next/image';

import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as Yup from 'yup';
import { IoCheckmarkCircle } from 'react-icons/io5';

import RecoverpassModal from './RecoverPass/RecoverpassModal';
import Alert from './Components/Alert';

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
  const router = useRouter();
  const [estadomodal, setEstadomodal] = useToggle();

  // Call the hook which returns, current value and the toggler function
  const [alert, setAlert] = useToggle();

  const titleModal = 'Recuperar Contraseña';

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full ">
        <div className=" flex flex-col px-8 bg-white   ">
          <div className="flex items-stretch  ">
            <div className="flex w-10 text-[102,102,102]  relative top-1">
              <Image className=" " src={LogoNiperd} alt="Logo Niperd" />
            </div>
            <div
              className="text-2xl text-[102,102,102]  tracking-wide ml-2 font-semibold
                   self-center "
            >
              NIPERD
            </div>
          </div>
          <div className=" flex h-full self-center  ">
            <Formik
              initialValues={{ email: '', password: '', error: '' }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .required('Favor de teclear tu usuario.')
                  .min(3, 'El usuario debe tener al menos 3 caracteres.'),
                password: Yup.string()
                  .required('Favor de teclear tu contraseña.')
                  .min(3, 'La contraseña debe tener al menos 3 caracteres.'),
              })}
              onSubmit={async (values, { setSubmitting, setStatus }) => {
                const result = await signIn('credentials', {
                  email: values.email,
                  password: values.password,
                  redirect: false,
                  callbackUrl: '/',
                  error: values.error,
                  user: values.user,
                });

                if (result?.error) {
                  const { error } = result;
                  // console.log(error);
                  setStatus({ success: false, message: error });
                  setSubmitting(false);
                } else {
                  const session = await getSession();
                  if (session?.user) {
                    router.push('/DashBoard');
                  }
                }

                setSubmitting(false);
              }}
            >
              {({
                handleSubmit,
                isSubmitting,
                status,
                msg = status?.message,
                handleCloseAlert,
              }) => (
                <Form
                  onSubmit={handleSubmit}
                  className=" rounded-lg place-self-center border-4 p-6
                shadow-xl shadow-neutral"
                >
                  <h2 className="text-4xl font-bold text-left  ">
                    Iniciar sesión en iCalidad
                  </h2>
                  <div className="flex flex-col font-bold py-2">
                    <label>Usuario</label>
                    <Field
                      className="peer mt-0 block w-full px-0.5, px-0.5 py-2 pl-2
                                outline-1 outline-gray-300  focus:outline-black rounded-md"
                      placeholder="johnD"
                      name="email"
                      autoComplete="email"
                    />
                    <div className="text-error text-xs ">
                      <ErrorMessage name="email"></ErrorMessage>
                    </div>
                  </div>
                  <div className="flex flex-col font-bold py-2">
                    <label>Contraseña</label>
                    <Field
                      type="password"
                      className="peer mt-0 block w-full px-0.5, px-0.5 py-2 pl-2
                                outline-1 outline-gray-300  focus:outline-black rounded-md"
                      placeholder="Ingresa tu contraseña"
                      name="password"
                      autoComplete="current-password"
                    />
                    <div className="text-error text-xs ">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-400 py-2">
                    <p className="flex items-center">
                      <input
                        className="mr-2"
                        type="checkbox"
                        id="remember"
                        name="remember"
                      />
                      Recordarme
                    </p>
                    <p>
                      {' '}
                      <button
                        type="button"
                        onClick={() => setEstadomodal(!estadomodal)}
                      >
                        olvidé mi contraseña
                      </button>{' '}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full my-5 py-3 mt-3 bg-primary shadow-md shadow-primary/50
                        hover:shadow-primary/50 hover:bg-primary/50 text-white font-semibold rounded-lg"
                  >
                    {isSubmitting ? 'Procesando...' : 'Iniciar Sesión'}
                  </button>
                  {status && status.success === false && (
                    <div>
                      <Alert
                        type="error"
                        postion="top"
                        text={msg}
                        duration={40000}
                        onClose={handleCloseAlert}
                        highlightedWords={['error', 'Failed']}
                      />
                    </div>
                  )}
                  <div className="flex justify-between text-gray-400 py-2">
                    <label>
                      ¿No cuentas con una cuenta?{' '}
                      <LINK href="/RegistroUser/registrouser">
                        Regístrate aquí
                      </LINK>
                    </label>
                  </div>
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="bg-secondary bl-neutral border-2 grid grid-cols-1 gap-2 grid-rows-1 w-full h-full inset-y-0 right-0">
          <div className="  object-center ">
            <Image
              src={Loginimage}
              layout="responsive"
              placeholder="blur"
              as="image"
              blurDataURL=""
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
        <form
          className="p-2 justify-between border-2 rounded-lg  shadow-xl shadow-[48,169,238] outline-1 outline-gray-500 "
          onSubmit={setAlert}
        >
          <p className="text-xs text-justify">
            por favor completa la información para recuperar tu contraseña.
          </p>
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
              <IoCheckmarkCircle with="20" />
              Se envió el correo exitosamente
            </div>
          )}
        </form>
      </RecoverpassModal>
    </div>
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
} */
