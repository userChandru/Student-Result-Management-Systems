import { cn } from "../../lib/utils";

export function Select({ className, options, label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium">{label}</label>}
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
