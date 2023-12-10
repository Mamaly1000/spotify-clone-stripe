import { TextField } from "@mui/material";
import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
interface InputProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  register: UseFormRegister<any>;
  onchange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  disabled?: boolean;
  name: string;
}

const CustomTextField = forwardRef<HTMLInputElement, InputProps>(
  ({ label, value, className, type, disabled, name, register }, ref) => {
    return (
      <TextField
        {...ref}
        disabled={disabled}
        type={type}
        autoFocus
        id={name}
        className={twMerge(`rounded-[5px]`, className)}
        label={label}
        value={value}
        variant="outlined"
        color="primary"
        {...register(name, { required: true })}
        fullWidth
        name={name}
        sx={{
          border: "inherit",
          color: "#ffffff !important",
        }}
        InputLabelProps={{
          sx: {
            background: "var(--secondary-color)",
          },
        }}
        inputProps={{
          style: {
            color: "#ffffff",
          },
        }}
      />
    );
  }
);

export default CustomTextField;
