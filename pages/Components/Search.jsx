//import Image from "node_modules/next/image";
import Link from "node_modules/next/link";
import { GoBell, GoThreeBars } from "react-icons/go"

const Search = () => {
  return (
    <div>
      <nav is="nav1" className="relative  w-full  flex flex-wrap  items-center justify-start py-2 bg-gray-100 text-gray-500
            hover:text-gray-700  focus:text-gray-700 shadow-lg  navbar navbar-expand-lg navbar-light" >
        <div className="container-fluid w-full flex flex-wrap h-16 bg-[#DEF0FA] items-start py-4 justify-between px-5">
          <button className="navbar-toggler text-gray-500 border-0  hover:shadow-none hover:no-underline py-2
                px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
            type="button" data-bs-toggle="collapse"  data-bs-target="navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation" >
            <GoThreeBars className="block  h-7 w-7" aria-hidden="true" />
          </button>
          <div className="collapse navbar-collapse flex-grow items-center bg-blue-600 " id="navbarSupportedContent" >
            {/*<!-- Colocar Search here!!!! -->*/}
            <a className="flex items-center text-gray-900 over:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0 mr-1" href="#" >
              bien
            </a>
            {/*<!-- Start Left links -->*/}
            <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
              <li className="nav-item p-2">
                <Link href={"/login"}>
                    <a className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" >
                    Dashboard
                    </a>
                </Link>
              </li>
              <li className="nav-item p-2">
                <Link href={"/login"}>
                    <a className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="#" >
                    Team
                    </a>
                </Link>
              </li>
              <li className="nav-item p-2">
                <Link href={"/login"}>
                    <a className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="#" >
                    Projects
                    </a>
                </Link>
              </li>
            </ul>
            {/*<!-- End Left links -->*/}
          </div>
          {/*<!-- End Collapsible wrapper -->*/}

          {/*<!-- Start - Right elements -->*/}
          <div className="flex items-center relative">
            {/*<!-- Start - Icons -->*/}
            <div className="dropdown relative">
              <a className=" text-gray-500  hover:text-gray-700 focus:text-gray-700 mr-4 dropdown-toggle 
                hidden-arrow flex items-center" href="#" id="dropdownMenuButton1" role="button" 
                data-bs-toggle="dropdown" aria-expanded="false" >
                <GoBell className="block  h-8 w-8" />
                <span className="animate-pulse text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5">
                  1
                </span>
              </a>
              
              <ul className="dropdown-menu -w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none
                text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0"
                aria-labelledby="dropdownMenuButton1">
                <li>
                    <Link href={"/login"}>
                        <a className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent
                                text-gray-700 hover:bg-gray-100 "  href="#" >
                            Action
                        </a>
                    </Link>
                </li>
                <li>
                  <a className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap 
                    bg-transparent text-gray-700 hover:bg-gray-100 " href="#" >
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-sm  py-2 px-4 font-normal block w-full whitespace-nowrap
                    bg-transparent text-gray-700 hover:bg-gray-100" href="#" >
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown relative">
              <a className="dropdown-toggle flex items-center hidden-arrow" href="#" id="dropdownMenuButton2" role="button" 
                data-bs-toggle="dropdown" aria-expanded="true">
                ok
              </a>
              <ul className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none 
                text-left rounded-lg shadow-lg mt-1  m-0 bg-clip-padding border-none left-auto right-0" 
                aria-labelledby="dropdownMenuButton2" >
                <li>
                  <a className="dropdown-item text-sm  py-2  px-4 font-normal  block w-full whitespace-nowrap bg-transparent
                         text-gray-700 hover:bg-gray-100"  href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap
                     bg-transparent text-gray-700 hover:bg-gray-100 "  href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap 
                    bg-transparent  text-gray-700  hover:bg-gray-100" href="#" >
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/*<!-- Right elements -->*/}
        </div>
      </nav>
    </div>
  );
};

export default Search;
