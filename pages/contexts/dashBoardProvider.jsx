import { createContext, useContext, useState } from 'react';

export const DashBoardContext = createContext();

export const useDashBoard = () => useContext(DashBoardContext);

/*
const initialState = {
    chat: false,
    userProFile: false,
    notification: false,
}
*/

export const DashBoardProvider = ({ children }) => {
  //setActiveMenu(true)
  const [activeMenu, setActiveMenu] = useState(true);
  const [idMenuFather, setIdMenuFather] = useState(1);

  return (
    <DashBoardContext.Provider
      value={{ activeMenu, idMenuFather, setIdMenuFather, setActiveMenu }}
    >
      {children}
    </DashBoardContext.Provider>
  );
};

export default DashBoardProvider;

//export const useStateContext = () => useContext(StateContext);
