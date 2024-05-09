import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { mutate } from 'swr';
import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
// import Alert from 'pages/Components/Alert';

const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function cha00nge the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

function CreateManagment({
  setEstadomodal,
  estadomodal,
  title,
  idRegistro,
  claveRegistro,
  nombreRegistro,
  idEstatusRegistro,
  tipoRegistro,
}) {
  const { data: session } = useSession();
  const idEmpleado = session?.user?.id;
  /*
  console.log(
    'idEmpleado: ',
    idEmpleado,
    'claveRegistro: ',
    claveRegistro,
    'nombreRegistro: ',
    nombreRegistro,
    'idEstatusRegistro: ',
    idEstatusRegistro
  );
  */
  // Call the hook which returns, current value and the toggler function
  const [alert, setAlert] = useToggle();

  const validationSchema = Yup.object({
    claveGerencia: Yup.string()
      .required('* La clave es requerida')
      .max(3, 'La clave debe ser menor a 3 caracteres')
      .min(2, 'La clave debe tener mínimo de 2 caracteres'),
    nombreGerencia: Yup.string()
      .required('* El nombre es requerido')
      .max(100, 'Debe ser menor a 100 caracteres')
      .min(5, 'Debe ser mayor a 5 caracteres'),
    idEmpleado: Yup.number(),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await fetch('/api/managment/getManagment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      // console.log('response - handleSubmit: ', response);
      // console.log('reponse.resultado: ', response.headers);
      if (response.status === 400) {
        setStatus({ success: false, message: 'Ya existe el registro' });
        setAlert();
        console.log('alert: ', alert);
      } else if (response.status === 200) {
        setStatus({ success: true, message: 'Datos guardados con éxito' });
        // console.log('response: ', response);
        // Actualizar los datos en la caché y cerrar la ventana modal
        setTimeout(() => {
          mutate('/api/managment/getManagment?GET&id=ALL');
          setEstadomodal(!estadomodal);
        }, 1000);
      } else {
        setStatus({ success: false, message: 'ocurrió algún error' });
      }
    } catch (error) {
      console.log('error: ', error);
      setStatus({ success: false, message: error });
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 ">
        <button
          className="flex justify-end "
          onClick={() => {
            setEstadomodal(!estadomodal);
            // setIdRegistro(Managment.IdGerencia);
            // setClaveGerencia(Managment.ClaveGerencia);
            // setNombreGerencia(Managment.NombreGerencia);
          }}
        ></button>
        <header className=" ">
          <div className="animate-jump-in animate-once animate-normal"> </div>
        </header>
        <main>
          <section>
            <Formik
              initialValues={
                idRegistro && tipoRegistro === 'Gerencia'
                  ? {
                      claveGerencia: claveRegistro,
                      nombreGerencia: nombreRegistro,
                      idEstatusGerencia: idEstatusRegistro,
                      idEmpleado,
                      idRegistro,
                    }
                  : idRegistro === 0 && tipoRegistro === 'Gerencia'
                    ? {
                        claveGerencia: '',
                        nombreGerencia: '',
                        idEmpleado,
                      }
                    : null
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                isSubmitting,
                // msg = status?.message,
                handleCloseAlert,
                errors,
                touched,
              }) => (
                <Form>
                  <div className="p-2 justify-between border-2 border-base-300 rounded-lg  shadow-xl shadow-[48,169,238] outline-1 outline-primary-content ">
                    <p className="text-xl text-justify">
                      <b>{title}</b>
                    </p>
                    <div
                      className=" text-left text-base mt-4 mb-4 block w-full px-0.5 border-0 border-b-2
                                    border-primary-content focus:ring-0 focus:border-black"
                    >
                      <label
                        htmlFor="claveGerencia"
                        className="text-sm font-semibold"
                      >
                        Clave Gerencia
                      </label>
                      <Field
                        className="bg-base-300 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        // dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        type="text"
                        name="claveGerencia"
                        placeholder="Clave Gerencia"
                      />
                      <ErrorMessage name="claveGerencia">
                        {(msg) => (
                          <div className="text-error text-xs font-medium ">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div
                      className=" text-left text-base mt-4 mb-4 block w-full px-0.5 border-0 border-b-2
                                    border-primary-content focus:ring-0 focus:border-black"
                    >
                      <label
                        className="text-sm font-semibold"
                        htmlFor="nombreGerencia"
                      >
                        Nombre Gerencia
                      </label>
                      <Field
                        className="bg-base-300 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        // dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        type="text"
                        name="nombreGerencia"
                        placeholder="Nombre Gerencia"
                      />
                      <ErrorMessage name="nombreGerencia">
                        {(msg) => (
                          <div className="text-error text-xs font-medium">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    {idRegistro ? (
                      <div
                        className=" flex flex-row gap-1 text-base mt-4 mb-4  w-full px-0.5 border-0 border-b-2
                                    border-primary-content focus:ring-0 focus:border-black"
                      >
                        <div className=" ">
                          <label
                            className="text-sm font-semibold  place-self-start "
                            htmlFor="idEstatusGerencia"
                          >
                            Estatus:
                          </label>
                        </div>
                        <div className=" self-center ">
                          <Field
                            className=" w-4 h-4 bg-base-300 border-gray-400 px-0.5 border-0 border-b-2 text-gray-900 focus:border-black hover:border-back"
                            // dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            type="checkbox"
                            name="idEstatusGerencia"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="grid cols-2 gap-2 pt-2 content-center ">
                    <button
                      type="button"
                      onClick={() => {
                        setEstadomodal(!estadomodal);
                        // setAlert();
                      }}
                      className="w-full col-start-1 col-span-1 py-3 text-base text-error border border-error rounded-lg shadow-md shadow-error/50 font-semibold
                          hover:bg-error hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 "
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      onClick={setAlert}
                      disabled={isSubmitting}
                      className="w-full col-start-2 col-span-1 py-3 text-base bg-primary shadow-md shadow-[#30a9ee]/50
                    hover:shadow-[#30a9ee]/50 hover:bg-[#30a9ee]/50 text-white font-semibold rounded-lg disabled:bg-[#30a9ee]/50 "
                    >
                      {isSubmitting ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </section>
        </main>
      </div>
    </>
  );
}
export default CreateManagment;
