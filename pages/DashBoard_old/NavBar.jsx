import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

const NavBar = ({ conta, userId }) => {
  console.log(conta);
  return (
    <>
      <Breadcrumb
        separator="-"
        spacing="8px"
        pl="2"
        alignSelf="end"
        className="text-xl text-neutral-900 font-bold  "
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home - userId: {userId}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Docs{conta}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Catálogos</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};

export default NavBar;
