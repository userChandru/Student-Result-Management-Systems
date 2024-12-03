import { cn } from "../../lib/utils";

export function Select({ className, options, label, labelClassName, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className={cn("text-sm font-medium", labelClassName)}>{label}</label>}
      <select
        className={cn(
          "rounded-md border px-3 py-2 text-sm bg-white",
          className
        )}    
        {...props}
      >
        {options.map((option) => (
          <option 
            key={typeof option === 'string' ? option : option.value} 
            value={typeof option === 'string' ? option : option.value}
          >
            {typeof option === 'string' ? option : option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
