import { cn } from "@/lib/cn";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

const Button = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<"button">>(
    ({ children, className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center",
                    "px-2 py-1",
                    "text-sm",
                    "border border-gray-300 rounded-md",
                    "bg-white",
                    "shadow-sm",
                    "hover:bg-gray-50",
                    "active:bg-gray-100",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    "disabled:opacity-50 disabled:pointer-events-none",
                    "transition-colors duration-150",
                    className,
                )}
                {...props}
            >
                {children}
            </button>
        );
    },
);

export default Button;
