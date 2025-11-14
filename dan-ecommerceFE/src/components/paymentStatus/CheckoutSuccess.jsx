import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.userId);
  console.log(userId, "userId in checkoutsuccess page >>>>>>>");

  const ranOnce = useRef(false);

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    const saveOrder = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId || !userId) return;

      await axios.post("http://localhost:3000/users/PaymentSuccess", {
        sessionId,
        userId,
      });
    };

    saveOrder();
  }, []);


  return (
    <div className="flex flex-col items-center bg-green-600 justify-center h-screen">
      <h1 className="text-4xl font-bold text-white">
        Payment Successful!
      </h1>
      <p className="text-gray-300 mt-2">Your order has been placed.</p>

      <p onClick={() => navigate('/collections')} className="text-[#ffffff] mt-8 flex items-center gap-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z" /></svg>
        Back to shoping </p>
    </div>
  );
}

export default CheckoutSuccess;
