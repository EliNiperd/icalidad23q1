import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const IcalidadContext = createContext();

export const IcalidadProvider = ({ children }) => {
  const [menuDataMenu, setDataMenu] = useState(menuDataInitial);

  return (
    <IcalidadContext.Provider value={{ menuDataMenu, setDataMenu }}>
      {children}
    </IcalidadContext.Provider>
  );
};

const menuDataInitial = {
  idMenuFather: 149,
  idMenu: 149,
};

menuDataInitial.propTypes = {
  idMenuFather: PropTypes.number.isRequired,
  idMenu: PropTypes.number.isRequired,
};

IcalidadProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IcalidadProvider;
