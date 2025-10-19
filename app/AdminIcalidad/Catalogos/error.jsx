'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    // let errorGlobal = '';
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
        // errorGlobal = errorGlobal.concat(error);
    }, [error])

    return (
        <div>
            <h2>{error.error}

            </h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}