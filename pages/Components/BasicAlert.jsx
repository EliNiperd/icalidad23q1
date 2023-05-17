import { useCallback, useState } from 'react';
import stylesA from '/styles/BasicAlert/BasicAlert.module.css';
import styles from '/styles/Home.module.css';

export const BasicAlert = () => {
  return (
    <div>
      <div role="alert">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times-circle"
          className="w-4 h-4 mr-2 fill-current"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
          ></path>
        </svg>
        <div className={stylesA.alertSlidIn}>
          <p className={styles.container}>
            A simple danger alert - check it out!
          </p>
        </div>
        A simple danger alert - check it out!
      </div>
    </div>
  );
};

export const BasicAlertTran = () => {
  const useToggle = (initialState = false) => {
    // Initialize the state
    const [state, setState] = useState(initialState);

    // Define and memorize toggler function in case we pass down the component,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback(() => setState((state) => !state), []);

    return [state, toggle];
  };

  const [estadomodal, setEstadomodal] = useToggle();

  return (
    <div>
      <div x-data="{ isOpen: false }" className="relative ...">
        <button
          type="button"
          onClick={() => setEstadomodal(!estadomodal)}
          className="..."
        >
          Options
        </button>

        <BasicAlert />
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
          <div className="rounded-md bg-white shadow-xs">
            <div className="bg-red-400">Mostrar mensaje</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Validador = ({ Children }) => {
  return (
    <>
      <div
        className="invisible peer-invalid:visible peer-valid:h-0 bg-red-100 
                    rounded-lg py-2 px-2 mb-3 pt-2 text-1/2
                     text-red-700 inline-flex items-center w-full"
        role="alert"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times-circle"
          className="peer-valid:h-0 w-3 h-3 mr-1 fill-current"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
          ></path>
        </svg>
        {Children}
      </div>
    </>
  );
};

export default BasicAlert;
