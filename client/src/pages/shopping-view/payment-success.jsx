import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="p-10 max-w-md mx-auto text-center"> {/* Increased max-width to make the card bigger */}
      <CardHeader className="p-0">
        <img
          src="https://png.pngtree.com/png-vector/20230122/ourmid/pngtree-flat-style-payment-success-illustration-on-isolated-background-vector-png-image_47735666.jpg"
          alt="Success"
          className="mx-auto w-24 mb-6" 
        />
        <CardTitle className="text-4xl text-teal-500 mb-4">Payment Successful!</CardTitle>
        <p className="mb-8">We are delighted to inform you that we received your payment.</p>
      </CardHeader>
      <div className="flex flex-col gap-4 mt-20" > 
        <Button
          className="bg-sky-800 hover:bg-sky-900"
          onClick={() => navigate("/shop/account")}
        >
          View Orders
        </Button>
        <Button
          variant="outline"
          className="text-teal-500 border-teal-500"
          onClick={() => navigate("/home")}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
