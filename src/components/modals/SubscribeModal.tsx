"use client";

import { Price, ProductWithPrice } from "@/types/custom.types";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Modal } from "./Modal";
import Button from "@/components/customButtons/Button";
import { formatPrice, postData } from "@/libs/helpers";
import { useUserStore } from "@/hooks/useUserStore";
import { getStripe } from "@/libs/stripeClient";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";

export function SubscribeModal({ products }: { products: ProductWithPrice[] }) {
  const [isPending, setIsPending] = useState(false);

  const subscribeModal = useSubscribeModal();
  const user = useUserStore((state) => state.user);

  async function handleCheckout(price: Price) {
    if (!user) {
      return toast.error("User must be authenticated");
    }
    try {
      setIsPending(true);
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error(err);
      toast.error((err as Error)?.message);
    } finally {
      setIsPending(false);
    }
  }

  function onChange(open: boolean) {
    if (!open) {
      subscribeModal.onClose();
    }
  }

  return (
    <Modal
      title="Subscribe Plans TEST Mode"
      description="Listen to music with Spotify Premium"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {products.length === 0 ? (
        <p className="text-center">No products available</p>
      ) : (
        products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }
          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => {
                handleCheckout(price);
              }}
              disabled={isPending}
              className="mb-4 hover:scale-[1.02]"
            >
              {`${product.name} for ${formatPrice(price)} / ${price.interval}`}
            </Button>
          ));
        })
      )}
    </Modal>
  );
}
