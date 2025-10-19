import SideNav from "@/components/ui/dashboard/sidenav";
import AvatarUser from "@/components/ui/dashboard/avatar-user";
import Search from "@/components/ui/dashboard/search";
import ModeToggle from "@/components/theme-toggle";


import React, { Suspense } from "react";

export default function LayoutDashboard({ children }) {
    // const { user } = useContext(IcalidadContext);
    return (
        <>

            <header className=" flex bg-secondary  justify-between items-center shadow-lg rounded-br rounded-bl p-3">
                <div className="flex flex-row">
                    <h1 className="pl-1 font-semibold text-xl">iCalidad</h1>
                </div>
                <div className="flex flex-row ">
                    {' '}
                    <Suspense fallback={<div>Loading...</div>} >
                        <Search />
                    </Suspense>
                </div>
                <div className="flex w-max   ">
                    <AvatarUser />
                    <ModeToggle />
                </div>
            </header>
            <div className="flex h-full md:overflow-hidden">
                <div className=" md:w-8 ">
                    <SideNav />
                </div>
                <div className="grow md:overflow-y-auto md:pl-16 h-full bg-whiteOwn ">{children}</div>
            </div>

        </>
    );
}