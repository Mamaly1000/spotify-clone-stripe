import { MenuItem } from "@mui/material";
import React from "react";

const CustomMenuItem = ({
  selected,
  disabled,
  onClickHandler,
  text,
  icon,
}: {
  text?: string;
  icon?: any;
  onClickHandler?: (e: any) => void;
  selected: boolean;
  disabled?: boolean;
}) => {
  return (
    <MenuItem
      sx={{
        ":hover": {
          background: "var(--primary-color)",
          color: "var(--text-color)",
        },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        color: "var(--text-color)",
      }}
      selected={selected}
      disabled={disabled}
      onClick={onClickHandler}
    >
      {text}
      {icon}
    </MenuItem>
  );
};

export default CustomMenuItem;
