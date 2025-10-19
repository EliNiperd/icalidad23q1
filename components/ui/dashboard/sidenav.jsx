import NavLinks from "@/components/ui/dashboard/nav-links";
import { auth } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/20/solid';

export default async function SideNav() {
  const sessionUser = await auth();
  const idEmpleado = sessionUser?.user.id;

  // const initialMenuData = await getElementsMenu(idEmpleado, 23, 149);
  return (
    <>
      <div>
        <nav className="group fixed w-20 h-full bg-secondary text-secondary-foreground p-4 rounded-lg transition-all duration-500 ease-in-out hover:w-60">
          <div className="flex justify-between items-center mb-2">
            <button className="absolute top-2 right-[-25px] p-2 bg-secondary rounded-full transform transition-transform duration-250 ease-in-out ">
              <ChevronDoubleRightIcon className="w-6 h-6 group-hover:hidden" />
              <ChevronDoubleLeftIcon className="hidden w-6 h-6 group-hover:block" />
            </button>
          </div>
          <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
            <NavLinks idEmpleado={idEmpleado} />
          </div>
          <div className="mt-auto">
            <div className="flex items-center gap-5 p-2 border-t border-neutral mt-4 group">
              <PowerIcon className="w-6 h-6" />
              <div className="hidden group-hover:block">
                <p className="text-sm font-semibold">Salir</p>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="relative left-20">
      </div>
    </>
  );
}

/*
{ <div className="flex bg-secondary  justify-between items-center shadow-lg rounded-br rounded-bl p-3">
          <div className="flex flex-row">
            <button formAction={toggleMenu} >
              <Bars3Icon
                className="hover:scale-125 h-7 w-7 hover:cursor-pointer peer"
              />
            </button>
            <h1 className="pl-1 font-semibold text-xl">{state.isMenuOpen}iCalidad</h1>
          </div>
        </div> }
        <div className={clsx("fixed top-16 left-0 w-56 h-full shadow-md z-10 bg-secondary overflow-y-auto transition-all duration-600 transform", {
          "-translate-x-full backdrop-blur-xs": isMenuOpen,
        })} >
          <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
              <div>
                <NavLinks />
              </div>
              <div className="flex grow justify-between items-center">
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button className="flex w-full grow items-center justify-center gap-2 rounded-md bg-primary p-3 text-sm font-medium hover:bg-primary/2 hover:text-primary-foreground md:flex-none md:justify-start md:p-2 md:px-3">
                    <PowerIcon className="w-6" />
                    <div className="hidden md:block">Salir</div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
*/