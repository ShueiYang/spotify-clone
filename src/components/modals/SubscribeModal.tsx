"use client";

import { Price, ProductWithPrice } from "@/types/custom.types";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Modal from "./Modal";
import Button from "@/components/customButtons/Button";
import { formatPrice, postData } from "@/libs/helpers";
import { useUserStore } from "@/hooks/useUserStore";
import { getStripe } from "@/libs/stripeClient";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";



const SubscribeModal = ({ 
  products 
}: {
  products: ProductWithPrice[]
}) => {
  const [ priceIdLoading, setPriceIdLoading ] = useState<string>("");
  const [ isPending, setIsPending ] = useState(false);

  const subscribeModal = useSubscribeModal();
  const user = useUserStore((state) => state.user);
  const subscription = useUserStore((state) => state.subscription);


  async function handleCheckout(price: Price) {
    // setPriceIdLoading(price.id);
    if(!user) {
      return toast.error("User must be authenticated")
    }
    if(subscription) {
      return toast("User already subscribed")
    }
    try {
      setIsPending(true);
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price }
      })
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });

    } catch (err) {
      console.error(err)
      toast.error((err as Error)?.message)
    } finally {
      // setPriceIdLoading("")
      setIsPending(false)
    }
  }
  
  function onChange(open: boolean) {
    if(!open) {
      subscribeModal.onClose();
    }
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {subscription ?
        <p className="text-center">
          Already subscribed
        </p>
      : products.length === 0 ?    
          <p className="text-center">
            No products available
          </p>
      : products.map(product => {
          if(!product.prices?.length) {
            return (
              <div key={product.id}>
                No prices available
              </div>
            )
          }
          return product.prices.map(price => (
            <Button
              key={price.id}
              onClick={()=> {handleCheckout(price)}}
              disabled={isPending}
              className="mb-4"
            >
              {`Subscribe for ${formatPrice(price)} / ${price.interval}`}
            </Button>
          ))
        })
      }
    </Modal>
  )
}

export default SubscribeModal;