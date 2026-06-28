// import { forwardRef } from "react";

// type InputProps = {
//     label: string;
//     placeholder: string;
//     type?: string;
// } & React.InputHTMLAttributes<HTMLInputElement>;

// const Input = forwardRef<HTMLInputElement, InputProps>(
//     ({ label, type, placeholder, ...props }, ref) => {
//         return (
//             <div>
//                 <label className="mb-2 block text-sm font-semibold text-[#D93F68]">
//                     {label}
//                 </label>

//                 <input
//                     type={type}
//                     placeholder={placeholder} ref={ref}
//                     {...props}
//                     className="w-full border-b border-gray-200 pb-2 outline-none transition focus:border-[#D93F68]"
//                 />
//             </div>
//         );
//     }
// );

// Input.displayName = "Input";
// export default Input;

import { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

type InputProps = {
  label: string;
  placeholder: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const StyledInput = styled("input")({
  width: "100%",
  border: "none",
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: "8px",
  outline: "none",
  transition: "border-color 0.2s ease",

  "&:focus": {
    borderBottom: "1px solid #D93F68",
  },
});

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", placeholder, ...props }, ref) => {
    return (
      <div>
        <Typography
          sx={{
            mb: 1,
            color: "#D93F68",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>

        <StyledInput
          ref={ref}
          type={type}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
