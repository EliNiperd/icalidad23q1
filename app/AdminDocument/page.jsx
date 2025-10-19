import LayoutDashboard from "@/app/dashboard/layout";
import TableAdminDocument from "@/components/ui/AdminDocument/table-adminDocument";

function DashboadAdminDocument() {
    return (
        <>
            <LayoutDashboard>
                <div className="p-4 min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
                    <header className="mb-6">
                        <h2 className="text-2xl font-semibold text-[hsl(var(--primary))]">
                            AdminDocument
                        </h2>
                        <p className="text-[hsl(var(--foreground))]">
                            Gestión de documentos Administrador CRUD.
                        </p>
                    </header>

                    <div className="bg-[hsl(var(--white-own))] shadow-md rounded-lg p-4 text-[hsl(var(--white-own-foreground))]">
                        <TableAdminDocument PageNumber={1} PageSize={10} />

                        {/* Paginado */}
                        <div className="flex justify-between mt-6">
                            <button className="px-4 py-2 bg-[hsl(var(--neutral))] text-[hsl(var(--neutral-foreground))] rounded-md hover:bg-[hsl(var(--neutral-foreground))] hover:text-[hsl(var(--neutral))]">
                                Anterior
                            </button>
                            <button className="px-4 py-2 bg-[hsl(var(--neutral))] text-[hsl(var(--neutral-foreground))] rounded-md hover:bg-[hsl(var(--neutral-foreground))] hover:text-[hsl(var(--neutral))]">
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>

            </LayoutDashboard>
        </>
    );
};

export default DashboadAdminDocument;
