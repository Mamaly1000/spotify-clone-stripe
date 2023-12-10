import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Box, DialogTitle, Divider, IconButton } from "@mui/material";
import CustomButton from "../inputs/Button";

export default function CustomList({
  routes,
  background,
  title,
  children,
}: {
  children?: React.ReactNode;
  title?: {
    text: string;
    icon: any;
    action?: {
      text?: string;
      icon?: React.ReactNode;
      onClick: () => void;
      disable?: boolean;
    };
  };
  routes?: Array<{
    label: string;
    active: boolean;
    href: string;
    icon: React.JSX.Element;
  }>;
  background?: string;
}) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <List
      sx={{
        background: background || "var(--secondary-color)",
        color: "inherit",
        minWidth: "100%",
        maxWidth: "100%",
      }}
    >
      {!!title && (
        <Box sx={{ minWidth: "100%" }}>
          <DialogTitle
            sx={{
              fontSize: { xs: "1.1rem", md: "1.5rem" },
              textTransform: "capitalize",
              margin: 0,
              paddingInlineEnd: 6,
              paddingInlineStart: 0,
            }}
            className="min-w-full flex items-center justify-between "
          >
            <div className="min-w-full flex items-center justify-start gap-3 ">
              {title.icon}
              {title.text}
            </div>

            {!!title.action && (
              <CustomButton
                disabled={title.action.disable}
                buttonType="icon"
                onClick={title.action.onClick}
                className={`${
                  title.action.disable ? "animate-pulse" : "animate-none"
                }`}
              >
                {title.action.icon || title.action.text}
              </CustomButton>
            )}
          </DialogTitle>
          <Divider color="primary" sx={{ mb: "10px", minWidth: "100%" }} />
        </Box>
      )}
      {routes?.map((route, i) => {
        return (
          <ListItemButton
            selected={selectedIndex === 0 || route.active}
            onClick={(event) => {
              router.push(route.href);
              handleListItemClick(event, 0);
            }}
            className={twMerge(!route.active ? `text-text` : `text-primary`)}
            key={route.href}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{route.icon}</ListItemIcon>
            <ListItemText primary={route.label} />
          </ListItemButton>
        );
      })}
      {children}
    </List>
  );
}
