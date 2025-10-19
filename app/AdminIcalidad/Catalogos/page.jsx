import LayoutDashboard from "@/app/dashboard/layout";
import DialogoGerencia from "@/components/ui/catalogo/DialogoGerencia";

// import CatalogoGeneral from "@/components/ui/catalogo/catalogo-general";
import WrappCardGerencia from "@/components/ui/catalogo/Wrapp-CardGerencia";

// import DialogCatalogo from "@/components/ui/catalogo/dialog-catologo";
// import { CreateCatalogo } from "@/components/ui/catalogo/button-catalogos";
// import { DialogCatalogo } from "@/components/ui/catalogo/dialog-catologo";
// import CardGeneral from "@/components/ui/catalogo/card-general";


export default function CatalogoAdminIcalidad() {
    return (
        <LayoutDashboard>
            <title>Catálogos Configuración iCalidad</title>
            <div className="flex pl-12 pr-12  justify-between">
                <h1 className="text-2xl h-full text-black text-left bg-whiteOwn  self-center " >
                    Catálogos Configuración iCalidad
                </h1>
                <div className="flex justify-end">

                    <DialogoGerencia />
                </div>
                {/* <CreateCatalogo /> */}
                {/* <DialogCatalogo
                    mode='create'
                    type='gerencia'
                    initialData={{
                        'ClaveGerencia': '',
                        'NombreGerencia': '',
                        'IdGerencia': '',
                        'IdEstatusGerencia': ''
                    }}
                />
                <DialogCatalogo >
                    <DialogCatalogo.Button asChild  >
                        <CreateCatalogo />
                    </DialogCatalogo.Button>
                </DialogCatalogo> */}
            </div>
            <div className="text-4xl  bg-white text-center text-black p-4 grid row-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5  ">
                {/* <CatalogoGeneral /> */}
                <WrappCardGerencia />
            </div>
        </LayoutDashboard>
    );
}

