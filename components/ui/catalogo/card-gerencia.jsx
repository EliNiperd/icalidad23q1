// import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
// import DialogCatalogo from "@/components/ui/catalogo/dialog-catologo";
// import DialogCatalogoGerencia from "@/components/ui/catalogo/dialog-gerencia";
import clsx from "clsx";
// import { UpdateCatalogo } from "@/components/ui/catalogo/button-catalogos";

export default function CardGerencia({
    title,
    description,
    footer,
    id,
    status,
    // onClick,
    isSelected,
    showEditButton = true,
    renderTrigger,
    renderEditDialog,
    className,
    headerClassName,
    titleClassName,
    contentClassName,
    footerClassName,
}) {


    //  const defaultTrigger = <UpdateCatalogo />;

    // const editDialog = renderEditDialog ? renderEditDialog() : (
    //     <DialogCatalogoGerencia
    //         mode='edit'
    //         initialData={{
    //             'ClaveGerencia': title,
    //             'NombreGerencia': description,
    //             'IdGerencia': id,
    //             'IdEstatusGerencia': status
    //         }}
    //     >
    //         <DialogCatalogoGerencia.Button asChild>
    //             {renderTrigger ? renderTrigger() : defaultTrigger}
    //         </DialogCatalogoGerencia.Button>
    //     </DialogCatalogoGerencia>
    // );


    return (
        <Card
            className={clsx(
                status ? 'border-success shadow-inner' : 'border-error shadow-error shadow-sm/2 shadow-inner',
                'rounded-xl bg-whiteOwn shadow-md',
                isSelected && 'ring-2 ring-primary',
                className
            )}
        >
            <CardHeader className={headerClassName}>
                {/* {showEditButton && (
                    <div className="text-end w-full" >
                        {editDialog}
                    </div>
                )} */}

                <CardTitle
                    className={titleClassName}
                >
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className={contentClassName}>
                <CardDescription className="text-blackOwn text-xl">{description}</CardDescription>
            </CardContent>
            {footer && <CardFooter className={footerClassName}>{footer}</CardFooter>}
        </Card>
    );
}