import React from 'react';
import {
    PencilSquareIcon, PlusIcon
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export const CreateCatalogo = React.forwardRef((props, ref) => {
    return (
        <Button className="flex items-center" ref={ref} {...props}>
            <span className="hidden md:block">Crear Gerencia</span>
            <PlusIcon className="h-5 md:ml-2" />
        </Button>
    );
});

CreateCatalogo.displayName = 'CreateCatalogo';

export const UpdateCatalogo = React.forwardRef(({ mode, open, ...props }, ref) => {
    const handleClick = () => {
        if (typeof open === 'function') {
            open(true);
        }
        if (typeof mode === 'function') {
            mode('edit');
        }
    };
    return (
        <Button variant="ghost" ref={ref} onClick={handleClick} {...props}>
            <PencilSquareIcon className="h-5 md:ml-2" />
            <span className="sr-only">Editar</span>
        </Button>
    );
});

UpdateCatalogo.displayName = 'UpdateCatalogo';




/*
export function DeleteCatalogo({ id_location }) {
    const deleteWithId = deleteLocation.bind(null, id_location);

    const handleDelete = async (event) => {
        event.preventDefault();
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta ubicación?");
        if (confirmed) {
            const form = event.target.closest('form');
            if (form) {
                form.submit();
            }
        }
    };

    return (
        <>
            <form action={deleteWithId} method="POST">
                <button onClick={handleDelete} className="rounded-md border bg-destructive p-2 hover:bg-destructive/70 text-primary-foreground">
                    <span className="sr-only">Eliminar</span>
                    <TrashIcon className="w-5" />
                </button>
            </form>
        </>
    );
}
*/