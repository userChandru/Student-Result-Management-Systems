import { cn } from "../../lib/utils";

export function Button({ className, variant = "default", size = "default", children, ...props }) {
  return (
    <button
      className={cn(
        "rounded-md font-medium transition-colors",
        {
          "bg-primary text-white hover:bg-primary/90": variant === "default",
          "border border-input bg-background hover:bg-accent": variant === "outline",
        },
        {
          "h-10 px-4 py-2": size === "default",
          "h-9 px-3": size === "sm",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
