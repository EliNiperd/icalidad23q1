// import Link from 'next/link';
// import GetIcon from '../Components/GetIcon';

const MenuItem = ({ menuDataArray = [], href }) => {
  return (
    <>
      <div className=""></div>
    </>
  );
};

export default MenuItem;

/*

{classMenu}

const {
    icon,
    className,
    classMenu,
    classH1Menu,
    classSelected,
    handleMenuItemIClick,
    idMenu,
    MenuDataidMenu,
    NameMenu,
  } = menuDataArray;

<Link key="idMenu" href={href}>
          <a
            onClick={() => handleMenuItemIClick(idMenu)}
            className={MenuDataidMenu === idMenu ? classSelected : ''}
          >
            <GetIcon icon={icon} className={className} />
            <h1 className={classH1Menu}>{NameMenu}</h1>
          </a>
        </Link>

        */
