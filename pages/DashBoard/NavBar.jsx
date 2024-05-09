// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import Breadcrumbs from "../../app/ui/breadcrumbs";

const NavBar = ({ conta, userId }) => {
  // console.log(conta);
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/", active: false },
          {
            label: "Home",
            href: "/",
            active: true,
          },
        ]}
      ></Breadcrumbs>
    </>
  );
};

export default NavBar;
