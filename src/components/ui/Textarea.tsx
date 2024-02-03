import * as React from "react"

import { cn } from "@/lib/shadcnUI"

const Textarea = React.forwardRef(({ className, ...props }: React.TextareaHTMLAttributes<any>) => {
  return (
    (<textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:border-black focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
