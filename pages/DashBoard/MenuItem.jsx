// import dynamic from 'next/dynamic';
import Link from 'next/link';
import GetIcon from '../Components/GetIcon';

// const GetIcon = dynamic(() => import('../Components/GetIcon'));

const MenuItem = ({
  icon,
  className,
  classMenu,
  classH1Menu,
  classSelected,
  href,
  handleMenuItemIClick,
  idMenu,
  MenuDataidMenu,
  NameMenu,
}) => {
  return (
    <>
      <div className={classMenu}>
        <Link key="idMenu" href={href}>
          <a
            onClick={() => handleMenuItemIClick(idMenu)}
            className={MenuDataidMenu === idMenu ? classSelected : ''}
          >
            <GetIcon icon={icon} className={className} />
            <h1 className={classH1Menu}>{NameMenu}</h1>
          </a>
        </Link>
      </div>
    </>
  );
};

export default MenuItem;
