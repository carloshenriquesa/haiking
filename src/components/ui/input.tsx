import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { 
    error?: string
    mask?: (value: string) => string 
  }
>(({ className, error, type, mask, onChange, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mask) {
      e.target.value = mask(e.target.value)
    }
    onChange?.(e)
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <input
        type={type}
        className={cn(
          `flex h-12 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-xl shadow-sm transition-colors 
          file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none 
          focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm 
          dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
      {error && (
          <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  )
})
Input.displayName = "Input"

export { Input }
