import { cn } from "../../lib/utils";

export function Button({ className, variant = "default", size = "default", children, ...props }) {
  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-all duration-200 shadow-sm",
        {
          "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-indigo-200": variant === "default",
          "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700": variant === "outline",
          "bg-red-500 hover:bg-red-600 text-white shadow-red-200": variant === "destructive",
        },
        {
          "h-10 px-4 py-2": size === "default",
          "h-9 px-3 text-sm": size === "sm",
          "h-11 px-6 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
