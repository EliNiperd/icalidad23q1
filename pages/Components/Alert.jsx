import { useEffect, useState } from 'react';

const Alert = ({ position, duration, onClose, type, text, highlightedWords }) => {
const [visible, setVisible] = useState(true);
    console.log( "Alert se ejecuta: ");
    useEffect(() => {
        //Lógica para controlar que el tiempo de duración del alerta sea el correcto y el devanecimiento 
        const timeout = setTimeout(() => {
            setVisible(false); // ocultar la alerta cuando el tiempo de duración se acaba
            console.log( "useEffect se ejecuta: ");
        }, duration);

        return () =>{
            clearTimeout(timeout); //Limpia el timeout para que no se acumulen
        };
    }, []);


    const handleClose = () => {
        setVisible(false); // ocultar la alerta cuando el usuario cierre la alerta
        onClose();
    };

    let alertClasses  = 'alert';
   
    if(position){
        alertClasses += ` alert-${position}`;
    }

    if(!visible){
        return null; //No renderiza la alert si no es visible
    }

    let alertContent;
    switch (type) {
        case 'error':
            alertContent = (
              <div className={alertClasses}>
                <div className="flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    {highlightedWords && highlightedWords.length > 0 ? (
                      // Resaltar las palabras que coincidan con el texto de la alerta
                      text.split(" ").map((word, index) =>
                        highlightedWords.includes(word) ? (
                          <span key={index} className="highlighted">
                            {word}
                          </span>
                        ) : (
                          <span key={index}>{word}</span>
                        )
                      )
                    ) : (
                      <span>{text}</span>
                    )}
                  </span>
                </div>
                <button className="close" onClick={handleClose}>
                  Cerrar
                </button>
              </div>
            );
            break;
        case 'success':
            alertContent = (
                <div className="flex flex-row items-center">
                    <div className="w-6 h-6 mr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-green-500">{successText}</div>
                </div>
            );
            break;
        case 'info':
            alertContent = (
                <div className="flex flex-row items-center">
                    <div className="w-6 h-6 mr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-blue-500">{infoText}</div>
                </div>
            );
            break;
        case 'warning':
            alertContent = (
                <div className="flex flex-row items-center">
                    <div className="w-6 h-6 mr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-yellow-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-yellow-500">{warningText}</div>
                </div>
            );
            break;
        default:
            alertContent = (
                <div className="flex flex-row items-center">
                    <div className="w-6 h-6 mr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-red-500">{errorText}</div>
                </div>
            );
            break;
        }

                                
                            


  return (
    <div>{alertContent}</div>
  );
};

export default Alert