import { Theme } from "@emotion/react";
import { Button, IconButton, SxProps } from "@mui/material";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "simple" | "icon";
  className?: string;
  sx?: SxProps<Theme> | undefined;
  background?: string;
}
const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      disabled,
      onClick,
      children,
      type = "button",
      buttonType = "simple",
      sx = undefined,
      background,
    },
    ref
  ) => {
    return buttonType === "simple" ? (
      <Button
        className={twMerge(
          `px-3 py-2 rounded-lg bg-primary drop-shadow-2xl text-text font-bold capitalize`,
          className
        )}
        disabled={disabled}
        onClick={onClick}
        type={type}
        ref={ref}
        sx={sx}
      >
        {children}
      </Button>
    ) : (
      <IconButton
        sx={{
          color: "var(--text-color)",
          boxShadow: "0 0 10px 0 var(--primary-color)",
          ":hover": {
            background: "var(--primary-color) !important",
          },
          padding: 0,
          margin: 0,
          background: background || "var(--secondary-color) !important",
        }}
        disabled={disabled}
        onClick={onClick}
        type={type}
        ref={ref}
        className={twMerge(`w-[45px] h-[45px] rounded-full `, className)}
      >
        {children}
      </IconButton>
    );
  }
);
export default CustomButton;
