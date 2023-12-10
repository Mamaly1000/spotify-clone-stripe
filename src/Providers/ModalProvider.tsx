"use client";
import AuthModal from "@/components/modal/AuthModal";
import SubscribeModal from "@/components/modal/SubscribeModal";
import UploadModal from "@/components/modal/UploadModal";
import { ProductWithPrice } from "@/types/stripe";
import React, { useEffect, useState } from "react";

const ModalProvider = ({ products }: { products: ProductWithPrice[] }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
