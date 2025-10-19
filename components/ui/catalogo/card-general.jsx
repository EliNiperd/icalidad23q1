import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import DialogCatalogo from "@/components/ui/catalogo/dialog-catologo";
import clsx from "clsx";
import { UpdateCatalogo } from "@/components/ui/catalogo/button-catalogos";

export default function CardGeneral({
    title,
    description,
    footer,
    id,
    status,
    onClick,
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
    const handleClick = React.useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClick) {
            onClick();
        }
    }, [onClick]);

    const defaultTrigger = <UpdateCatalogo />;

    const editDialog = renderEditDialog ? renderEditDialog() : (
        <DialogCatalogo
            mode='edit'
            initialData={{
                'ClaveGerencia': title,
                'NombreGerencia': description,
                'IdGerencia': id,
                'IdEstatusGerencia': status
            }}
        >
            <DialogCatalogo.Button asChild>
                {renderTrigger ? renderTrigger() : defaultTrigger}
            </DialogCatalogo.Button>
        </DialogCatalogo>
    );

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
                <div>
                    {showEditButton && (
                        <div className="text-end w-full" onClick={(e) => e.stopPropagation()}>
                            {editDialog}
                        </div>
                    )}
                </div>

                <CardTitle
                    className={clsx(onClick && 'cursor-pointer hover:bg-gray-100', titleClassName)}
                    onClick={handleClick}
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