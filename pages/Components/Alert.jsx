import { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";

const Alert = ({ position, duration, onClose, type, text, highlightedWords }) => {

    
    //console.log( "Alert se ejecuta: type - ", type, " texto - ", text, " words - ", highlightedWords);
    //Definir los estados de la alerta
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
        setVisible(false); // Ocultar la alerta después de la duración especificada
        }, duration);

        return () => {
        clearTimeout(timeout);
        };
    }, [duration]);

  const handleClose = () => {
    setVisible(false); // Ocultar la alerta cuando el usuario cierre manualmente
    () => onClose
  };

    const alertClasses = "alert alert-" + type + " rounded-lg text-xs animate-normal open:animate-fade-down open:animate-ease-out animate-fade-up animate-ease-in";
   
    // if(position){
    //     alertClasses += ` alert-${position}`;
    // }
//console.log("visble: ", visible, "alertClasses: ", alertClasses, "type: ", type, "text: ", text, "highlightedWords: ", highlightedWords, "duration: ", duration, "onClose: ", onClose, "position: ", position, "successText: ", "infoText: ", "warningText:)");
    if(!visible){
        return null; //No renderiza la alert si no es visible
    }

    let alertContent;
    switch (type) {
        case 'error':
            alertContent = (
              <div className={alertClasses}>
                <div className="flex flex-row p-0 items-center ">
                    <div onClick={handleClose} className='self-start place-self-end' >
                        <IoCloseSharp className="text-sm  ring-white ring-1 ring-offset-1 rounded-full text-white hover:cursor-pointer "  ></IoCloseSharp>
                    </div>
                  <span>
                   {highlightedWords && highlightedWords.length > 0 ? (
                        // Resaltar las palabras que coincidan con el texto de la alerta
                        text.split(" ").map((word, index) =>
                        highlightedWords.includes(word + ' ') ? (
                            <span key={index} className="font-bold">
                            {word}
                            </span>
                        ) : (
                            <span key={index}>{word + ' '}</span>
                        )
                        )
                        ) : (
                        <span>{text}</span>
                        )}
                  </span>
                </div>
                
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
                    <div className="text-sm font-medium text-red-500"><span>
                   Prueba
                  </span></div>
                </div>
            );
            break;
        }


  return (
    <div>{alertContent}</div>
  );
};

export default Alert