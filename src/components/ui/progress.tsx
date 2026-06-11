import * as React from "react"

import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentProps<"div"> & {
    value?: number
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
    const normalizedValue = Math.max(0, Math.min(100, value))

    return (
        <div
            data-slot="progress"
            role="progressbar"
            aria-valuenow={normalizedValue}
            aria-valuemin={0}
            aria-valuemax={100}
            className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
            {...props}
        >
            <div
                className="h-full w-full flex-1 bg-primary transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${100 - normalizedValue}%)` }}
            />
        </div>
    )
}

export { Progress }
