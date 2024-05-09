import { useContext, useState } from 'react';

import { IoMenuSharp } from 'react-icons/io5';
import SideNavBar from './SideNavBar';
import Avatar from './Avatar';
import Search from './Search';
import { IcalidadContext } from '../../contexts/IcalidadContext';

const HomeDashBoard = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [contador, setContador] = useState(0);

  const { menuDataMenu, setDataMenu } = useContext(IcalidadContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setContador(contador + 1);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveMenuId(null);
  };

  return (
    <div className="flex flex-col h-screen ">
      <header className=" text-neutral-900 bg-secondary flex justify-between items-center shadow-lg rounded-br rounded-bl p-3">
        <div className="flex flex-row">
          <IoMenuSharp
            className="hover:scale-125 basis-1/4 text-3xl hover:cursor-pointer peer"
            onClick={toggleMenu}
          />
          <h1 className="pl-1 font-semibold text-xl">iCalidad</h1>
        </div>
        <div className="flex flex-row ">
          {' '}
          <Search></Search>
        </div>
        <div className="w-max ">
          <Avatar></Avatar>
        </div>
      </header>

      <div className="flex flex-1 ">
        <div
          className={`fixed top-0 left-0 w-56 h-full bg-white shadow-md z-10 overflow-y-auto 
        transition-all duration-500 transform ${isMenuOpen ? '' : '-translate-x-full'
            }`}
        >
          <SideNavBar
            activeMenuId={activeMenuId}
            isMenuOpen={isMenuOpen}
            menuId={activeMenuId}
            onCloseMenu={closeMenu}
            menuDataMenu={menuDataMenu}
            setDataMenu={setDataMenu}
          />
        </div>
        <div className="flex-1 ml-6 p-4 " onClick={closeMenu}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomeDashBoard;