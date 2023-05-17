import { useRef, useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';

import { motion, useCycle } from 'framer-motion';

import { MenuToggle } from './MenuToggle';
import { SideNavBar } from '../DashBoard/SideNavBar';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 48px 48px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 44px 44px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const DetailUser = () => {
  const { data: session } = useSession();
  // console.log('session', session);

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useWindowSize();

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
      >
        <motion.div
          className="absolute top-0 left-0 bottom-0 w-72 bg-white"
          variants={sidebar}
        >
          <SideNavBar idUser={session.user.id} />
        </motion.div>

        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </>
  );
};
export default DetailUser;

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  // const dimensions = useRef({ width: 0, height: 0 });
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  // console.log('session', session);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
