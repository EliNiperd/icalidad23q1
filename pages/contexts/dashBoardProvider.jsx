import { createContext, useContext, useState } from 'react';

export const DashBoardContext = createContext();

export const useDashBoard = () => useContext(DashBoardContext);

const initialState = {
    chat: false,
    userProFile: false,
    notification: false,
}

export const DashBoardProvider = ( { children } ) => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [idMenuFather, setIdMenuFather] = useState(1)

    return (
        <DashBoardContext.Provider value={{ activeMenu, idMenuFather, setIdMenuFather }} >
            { children }
        </DashBoardContext.Provider>
    );
};



//export const useStateContext = () => useContext(StateContext);