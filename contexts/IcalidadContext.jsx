"use client";
import { createContext, useState } from 'react';
//, useEffect
import PropTypes from 'prop-types';
// import { useSession } from 'next-auth/react';

export const IcalidadContext = createContext();

export const IcalidadProvider = ({ children }) => {
  // const { data: session, status } = useSession();
  const [menuDataMenu, setDataMenu] = useState(menuDataInitial);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     setUser(session.user);
  //   } else {
  //     setUser(null);
  //   }
  // }, [session, status]);

  return (
    <IcalidadContext.Provider value={{ menuDataMenu, setDataMenu }}>
      {children}
    </IcalidadContext.Provider>
  );
};

//, user

const menuDataInitial = {
  idMenuFather: 149,
  idMenu: 149,
};

IcalidadProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IcalidadProvider;
