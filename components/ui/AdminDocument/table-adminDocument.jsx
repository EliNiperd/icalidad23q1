import { getDocumentsAdmin } from '@/app/AdminDocument/actions.jsx';

export default async function TableAdminDocument({ PageNumber = 1, PageSize = 10 }) {
    const result = await getDocumentsAdmin(PageNumber, PageSize);

    if (!result) {
        console.error('No se recibió respuesta del servidor');
        throw new Error('No se recibió respuesta del servidor');
    }
    const { recordset: documents, rowsAffected: rows } = JSON.parse(result);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                {/* Tabla responsiva */}
                <div className="rounded-lg bg-accent p-2 overflow-x-auto">
                    <table className="min-w-full text-primary-foreground md:table">
                        <thead className="bg-neutral text-sm font-semibold text-center">
                            <tr>
                                <th scope="col" className="px-4 py-3">Código Documento</th>
                                <th scope="col" className="px-4 py-3">Rev.</th>
                                <th scope="col" className="px-4 py-3 text-left">Nombre Documento</th>
                                <th scope="col" className="px-4 py-3">Responsable</th>
                                <th scope="col" className="px-4 py-3">Estatus</th>
                                <th scope="col" className="px-4 py-3">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {documents.map((document, index) => (
                                <tr
                                    key={document.IdDocumento}
                                    className={`border-b ${index % 2 === 0
                                        ? 'bg-neutral' // Fondo para filas pares
                                        : 'bg-neutral/20' // Fondo para filas impares
                                        } hover:bg-neutral/40`}
                                >
                                    <td className="px-4 py-3 text-center text-foreground">
                                        {document.CodigoDocumento}
                                    </td>
                                    <td className="px-4 py-3 text-center text-foreground">
                                        {document.Revision}
                                    </td>
                                    <td className="px-4 py-3 text-left text-foreground">
                                        {document.NombreDocumento}
                                    </td>
                                    <td className="px-4 py-3 text-center text-foreground">
                                        {document.Responsable}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${document.EstatusDocumento === 'I'
                                                ? 'bg-success text-success-foreground'
                                                : 'bg-error text-error-foreground'
                                                }`}
                                        >
                                            {document.EstatusDocumento}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            className="text-primary hover:underline"
                                            aria-label={`Editar documento ${document.NombreDocumento}`}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}
