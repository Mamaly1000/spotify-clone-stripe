"use client";
import React, { useEffect, useMemo, useState } from "react";
import CustomModal from "./CustomModal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import toast from "react-hot-toast";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { isOpen, onClose } = useAuthModal();

  useEffect(() => {
    if (session) {
      onClose();
      // router.refresh();
    }
  }, [session, onClose, router]);

  useEffect(() => {
    if (session) {
      toast.success("wellcome back");
    }
  }, []);

  const onChange = (open?: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <div>
      <CustomModal
        dialog={{
          title: "Auth modal",
        }}
        open={isOpen}
        setOpen={onChange}
      >
        <Auth
          supabaseClient={supabaseClient}
          providers={["google", "github"]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "var(--primary-color)",
                },
              },
            },
          }}
          theme="dark"
        />
      </CustomModal>
    </div>
  );
};

export default AuthModal;
