import { cn } from "../../lib/utils";

export function Table({ className, children, ...props }) {
  return (
    <table
      className={cn(
        "w-full border-collapse text-sm",
        className
      )}
      {...props}
    >
      {children}
    </table>
  );
}
