import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const Loader = ({
  message,
  size,
}: {
  message?: string;
  size?: {
    width?: number;
    height?: number;
  };
}) => {
  return (
    <Box
      sx={{
        minWidth: "100%",
        minHeight: "400px",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <CircularProgress
        color="primary"
        sx={{
          width: size?.width || 50,
          height: size?.height || 50,
        }}
      />
      {message && (
        <Typography textTransform="capitalize" component="text">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
