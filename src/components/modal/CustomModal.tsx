"use client";
import * as React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import CustomButton from "../inputs/Button";
import { Close } from "@mui/icons-material";
import { Box, Slide } from "@mui/material";
import { BootstrapDialog } from "@/styles/Dialog";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  customButton?: {
    label?: string;
    icon?: any;
    onClick?: (e: any) => void;
  };
  dialog: {
    title?: string;
    actions?: {
      submit?: {
        label?: string;
        icon?: any;
        onclick?: (e: any) => void;
      };
      reset?: {
        label?: string;
        icon?: any;
        onclick?: (e: any) => void;
      };
      AdditionalButtons?: React.ReactNode;
    };
  };
  open?: boolean;
  setOpen?: (e?: boolean) => void;
  children?: React.ReactNode;
}

const CustomModal: React.FC<Props> = ({
  customButton,
  open,
  setOpen,
  dialog,
  children,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    if (setOpen) {
      setOpen(true);
    } else {
      throw new Error("you must define a setOpen function for your modal");
    }
  };

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
    } else {
      throw new Error("you must define a setOpen function for your modal");
    }
  };
  return (
    <React.Fragment>
      {customButton && (
        <CustomButton onClick={customButton?.onClick || handleClickOpen}>
          {customButton?.label} {customButton?.icon}
        </CustomButton>
      )}
      <BootstrapDialog
        fullScreen={fullScreen}
        open={open || false}
        keepMounted
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          color: "var(--text-color)",
          background: "rgba(0 0 0 /.4)",
          "& .MuiPaper-root": {
            background: "var(--secondary-color) !important",
            minWidth: { md: "400px", lg: "500px" },
            color: "inherit",
            position: "relative",
          },
        }}
        scroll="body"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle
            sx={{ m: 0, p: 2, maxWidth: "fit-content" }}
            id="customized-dialog-title"
          >
            {dialog?.title}
          </DialogTitle>
          <CustomButton
            buttonType="icon"
            onClick={handleClose}
            className="absolute top-3 end-3"
          >
            <Close />
          </CustomButton>
        </Box>
        <DialogContent dividers>{children}</DialogContent>
        {!!dialog.actions && (
          <DialogActions>
            {!!dialog.actions.reset && (
              <CustomButton
                autoFocus
                onClick={async (e) => {
                  if (dialog.actions?.reset?.onclick) {
                    await dialog.actions?.reset?.onclick(e);
                    await handleClose();
                  }
                }}
                sx={{
                  background: "var(--error-color) !important",
                  boxShadow: "none",
                }}
                className="hover:bg-transparent"
              >
                {dialog.actions.reset?.label}
                {dialog.actions.reset?.icon}
              </CustomButton>
            )}
            {!!dialog.actions.submit && (
              <CustomButton
                autoFocus
                onClick={async (e) => {
                  if (dialog.actions?.submit?.onclick) {
                    await dialog.actions?.submit?.onclick(e);
                    await handleClose();
                  }
                }}
                sx={{
                  background: "var(--primary-color)",
                  boxShadow: "none",
                }}
              >
                {dialog.actions.submit?.label}
                {dialog.actions.submit?.icon}
              </CustomButton>
            )}
            {!!dialog?.actions?.AdditionalButtons &&
              dialog.actions.AdditionalButtons}
          </DialogActions>
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default CustomModal;
