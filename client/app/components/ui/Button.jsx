export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-black text-white hover:bg-gray-900 shadow-sm hover:shadow-md",
        secondary: "bg-white text-black border border-gray-200 hover:border-black hover:bg-gray-50",
        outline: "bg-transparent text-black border border-black hover:bg-black hover:text-white",
        ghost: "bg-transparent text-black hover:bg-gray-100",
    };

    const sizes = {
        sm: "px-4 py-2 text-xs uppercase tracking-widest",
        md: "px-8 py-3 text-sm tracking-widest uppercase",
        lg: "px-10 py-4 text-sm tracking-widest uppercase",
        full: "w-full py-4 text-sm tracking-widest uppercase",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
