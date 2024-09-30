import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionId, orderId } = useParams(); // Extract sessionId and orderId from URL params
 

  useEffect(() => {
    if (sessionId && orderId) {
      console.warn('orderId:', orderId)
      console.warn('sessionId:', sessionId)
      // Dispatch the capturePayment action with the extracted parameters
      dispatch(capturePayment({ sessionId, orderId  })).then((data) => {
        console.log("🚀 ~ dispatch ~ data:", data)
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId"); // Clean up session storage
          navigate("/shop/payment-success"); // Redirect on success
        } else {
          useToast().toast({ title: "Payment Failed", description: "Please try again.", variant: "destructive" });
          navigate("/shop"); // Redirect on failure
        }
      }).catch(() => {
        useToast().toast({ title: "Payment Failed", description: "Please try again.", variant: "destructive" });

        navigate("/shop"); // Handle any errors
      });
    } else {
      console.error("Session ID or Order ID missing.");
      useToast().toast({ title: "Payment Failed", description: "Please try again.", variant: "destructive" });

      navigate("/shopre"); // Redirect if parameters are missing
    }
  }, [sessionId, orderId, dispatch, navigate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
