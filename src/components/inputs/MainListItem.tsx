import { PlayArrow } from "@mui/icons-material";
import { Avatar, Icon, Link, Typography } from "@mui/material";

import React from "react";
import { twMerge } from "tailwind-merge";

const MainListItem = ({
  icon,
  label,
  onclick,
  className,
  href,
}: {
  href?: string;
  icon?: any;
  label?: string;
  onclick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}) => {
  return (
    <Link
      sx={{
        padding: 0,
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        cursor: "pointer",
        border: "1px solid var(--text-color)",
        borderRadius: 1,
        width: { xs: "100%", md: "fit-content" },
        height: { xs: "50px", md: "60px" },
        overflow: "hidden",
        background: "var(--secondary-color)",
        color: "var(--text-color)",
        ":hover": {
          color: "var(--primary-color)",
          border: "1px solid var(--primary-color)",
        },
        pe: 3,
      }}
      href={href}
      className={twMerge(
        `drop-shadow-2xl capitalize no-underline group relative`,
        className
      )}
    >
      <>
        <Avatar
          sx={{
            minHeight: "100%",
            minWidth: { xs: "50px", md: "60px" },
            borderRadius: 0,
          }}
          src={icon}
        />
        <Typography
          marginInlineStart={2}
          onClick={onclick}
          minWidth={100}
          color="inherit"
          noWrap
        >
          {label}
        </Typography>
      </>

      <Icon className="bg-primary text-text rounded-full flex items-center justify-center w-[40px] h-[40px] md:w-[45px] md:h-[45px] drop-shadow-2xl scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 me-2">
        <PlayArrow />
      </Icon>
    </Link>
  );
};

export default MainListItem;
