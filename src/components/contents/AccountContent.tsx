"use client"

import { toast } from "react-hot-toast";
import { Subscription } from "@/types/custom.types";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { formatDate, postData } from "@/libs/helpers";
import { useState } from "react";
import Button from "@/components/customButtons/Button";

interface AccountContentProps {
  subscription: Subscription | null
}


const AccountContent: React.FC<AccountContentProps> = ({
  subscription 
}) => {
  const onOpen = useSubscribeModal((state) => state.onOpen);

  const [ isPending, setIsPending ] = useState(false);

  async function redirectToCustomerPortal() {
    setIsPending(true)
    try {
      const { url } = await postData({
        url: "/api/create-portal-link"
      })
      window.location.assign(url);
      
    } catch (err) {
      console.error(err)
      if(err instanceof Error) {
        toast.error(err.message)
      }     
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="mb-7 px-6">
      {!subscription &&
        <div className="flex flex-col gap-y-6">
          <p>No active plan.</p>
          <Button
            className="w-[300px]"
            onClick={onOpen}
          >
            Subscribe
          </Button>
        </div>
      }
      {subscription &&
        <div className="flex flex-col gap-y-6">
          <p>
            You are currently on the{" "} 
            <span className="font-bold">
              {subscription.prices?.products?.name}
            </span>{" "}
            plan.
          </p>
          <p>
            {subscription.current_period_end && 
              `Your plan will be cancelled on ${formatDate(subscription.current_period_end)}`
            }
          </p>
          <Button
            className="w-[300px]"
            disabled={isPending}
            onClick={redirectToCustomerPortal}
          >
            Open customer portal
          </Button>
        </div>
      }  
    </div>
  )
}

export default AccountContent;