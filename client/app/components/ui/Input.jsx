import { forwardRef } from 'react';

const Input = forwardRef(({ className = '', label, error, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-2">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={`w-full bg-transparent border-b border-gray-300 px-0 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 transition-colors ${error ? 'border-red-500' : ''
                    } ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-2 text-xs text-red-600">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
