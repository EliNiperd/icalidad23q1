import { IoCloseSharp } from 'react-icons/io5';
import { MenuPrincipalAdm } from './MenuPrincipalAdm';

export function SideNavBar({ activeMenuId, onCloseMenu, isMenuOpen, menuId }) {
  // const menuArray = [{id: 149}, {id: 150}, {id: 151}, {id: 152}, {id: 153}, {id: 154}, {id: 155}, {id: 156}, {id:157}];

  // md:text-xs lg:text-sm xl:text-text-base
  return (
    <div
      className={`fixed top-0 left-0 w-56 h-full bg-white shadow-md z-10 
      overflow-y-auto transition-all duration-600 transform ${
        isMenuOpen ? '' : '-translate-x-full backdrop-blur-sm'
      }`}
    >
      <div className="flex flex-row-reverse px-6 py-4">
        <IoCloseSharp
          className="text-3xl text-accent hover:cursor-pointer"
          onClick={onCloseMenu}
        ></IoCloseSharp>
      </div>
      <div className="flex flex-col content-between gap-2 pt-4 menu transition-all duration-500">
        <MenuPrincipalAdm activeMenuId={activeMenuId} menuId={menuId} />
      </div>
    </div>
  );
}

export default SideNavBar;
