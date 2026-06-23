import { forwardRef } from "react";

type InputProps = {
    label: string;
    placeholder: string;
    type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, type, placeholder, ...props }, ref) => {
        return (
            <div>
                <label className="mb-2 block text-sm font-semibold text-[#D93F68]">
                    {label}
                </label>

                <input
                    type={type}
                    placeholder={placeholder} ref={ref}
                    {...props}
                    className="w-full border-b border-gray-200 pb-2 outline-none transition focus:border-[#D93F68]"
                />
            </div>
        );
    }
);

Input.displayName = "Input";
export default Input;
