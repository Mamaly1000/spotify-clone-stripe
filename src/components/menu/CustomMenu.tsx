import { StyledMenu } from "@/styles/Menu";
import { Theme } from "@emotion/react";
import { MenuItem, PopoverOrigin, SxProps } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import CustomMenuItem from "./CustomMenuItem";

const CustomMenu = ({
  anchorElUser,
  handleCloseUserMenu,
  anchorOrigin,
  transformOrigin,
  sx,
  children,
  Routes = undefined,
  keepMounted,
  onclickHandler,
}: {
  Routes?: { label: string; href?: string; icon: any; fn?: () => void }[];
  children?: ReactNode;
  keepMounted?: boolean;
  anchorElUser: HTMLElement | null;
  transformOrigin?: PopoverOrigin | undefined;
  sx?: SxProps<Theme> | undefined;
  handleCloseUserMenu: (
    event?: {},
    reason?: "backdropClick" | "escapeKeyDown"
  ) => void;
  anchorOrigin?: PopoverOrigin | undefined;
  onclickHandler?: (e: HTMLLIElement) => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <StyledMenu
      sx={sx}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={anchorOrigin}
      keepMounted={keepMounted}
      transformOrigin={transformOrigin}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {Routes?.map((route) => (
        <CustomMenuItem
          key={route.label + Math.random()}
          onClickHandler={() => {
            handleCloseUserMenu();
            if (route.fn !== undefined) {
              route.fn();
            } else if (route.href) {
              router.push(route.href);
            }
          }}
          text={route.label}
          icon={route.icon}
          selected={pathname === route.href}
        />
      ))}
      {children}
    </StyledMenu>
  );
};

export default CustomMenu;
