"use client";
import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import toast from "react-hot-toast";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { Price, ProductWithPrice } from "@/types/stripe";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/lib/helpers";
import { getStripe } from "@/lib/stripeClient";
import CustomButton from "../inputs/Button";

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

const SubscribeModal = ({ products }: { products: ProductWithPrice[] }) => {
  const supabaseClient = useSupabaseClient();
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const router = useRouter();
  const { session } = useSessionContext();
  const { isOpen, onClose } = useSubscribeModal();

  useEffect(() => {
    if (session) {
      onClose();
      // router.refresh();
    }
  }, [session, onClose, router]);

  const onChange = (open?: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Must be logged in");
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("Already subscribed");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return toast.error((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className="text-center">No products available.</div>;

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }

          return product.prices.map((price) => (
            <CustomButton
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className="mb-4"
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </CustomButton>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">Already subscribed.</div>;
  }

  return (
    <div>
      <CustomModal
        dialog={{
          title: "Only for Premium users",
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

export default SubscribeModal;
