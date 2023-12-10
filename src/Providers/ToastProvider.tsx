"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "var(--secondary-color)",
          color: "var(--text-color)",
        },
      }}
    />
  );
};

export default ToastProvider;
