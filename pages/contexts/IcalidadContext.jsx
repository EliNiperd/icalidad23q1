import { createContext, useState } from "react";

export const IcalidadContext = createContext();

export const menuDataInitial = {
    idMenuFather: 0,
    idMenu: 0,
}

export const IcalidadProvider = ({ children }) => {

    const [menuDataMenu, setDataMenu] = useState(menuDataInitial)

  return (
    <IcalidadContext.Provider value={{ menuDataMenu, setDataMenu }}>
        {children}
    </IcalidadContext.Provider>
  )
}
