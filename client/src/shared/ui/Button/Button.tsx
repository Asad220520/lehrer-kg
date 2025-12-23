import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Утилита для объединения классов (вынеси потом в shared/lib/utils.ts)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
