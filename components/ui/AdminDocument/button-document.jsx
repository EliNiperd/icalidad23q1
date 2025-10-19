import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'next/link';
import { deleteDocument } from '@/app/AdminDocument/action';

export default function CreateDocument() {
    return (
        <Link
            href="AdminDocument/create"
            className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md p-2 hover:bg-primary/70"
        >
            <span className="hidden md:block">Crear Documento</span>
            {""}
            <PlusCircleIcon className="w-6 h-6 md:ml-2" />
        </Link>
    )
}

export function UpdateDocument({ id }) {
    return (
        <Link
            href={`AdminDocument/${id}/edit`}
            className="flex items-center gap-2 bg-primary text-primary-foreground rounded-md p-2 hover:bg-primary/70"
        >
            <span className="hidden md:block">Editar</span>
            <PencilSquareIcon className="w-6 h-6 md:ml-2" />
        </Link>
    )
}

export function DeleteDocument({ id }) {
    return (
        <>
            <form action={deleteDocument}>
                <button className="rounded-md border bg-destructive p-2 hover:bg-destructive/70 text-primary-foreground">
                    <span className="sr-only">Eliminar</span>
                    <TrashIcon className="w-5" />
                </button>
            </form>
        </>
    )
}