import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { applayVoucher, checkoutSession, getSummery } from "../../API/userApi";
import { loadStripe } from "@stripe/stripe-js";
import aedicon from "../../assets/images/main/aedicon.png"

function PaymentCard({ userIds, cart }) {

    const { userId } = useSelector((state) => state.auth);
    const [Summary, setSummery] = useState({});
    const [tottelAmmount, setTotelAmmount] = useState('');
    const [discountRate, setDiscountRate] = useState('');
    const [voucherDiscount, setVoucherDiscount] = useState('');
    const [code, setCode] = useState('');
    const [productCart, setProductCart] = useState([]);
    const address = useSelector((state) => state.deliveryAddress);

    console.log(address, "redux adresssssssssssssssssssssss");
    

    // console.log(productCart, "code data >>>>>>>00000000000000000000");


    // console.log(Summary, "summary data >>>>>>>00000000000000000000");


    useEffect(() => {
        const fetchTotal = async () => {
            const data = await getSummery(userId);
            // console.log(data, "total ammount data >>>>>>> uuuuuuuuuuuuuuuuuu");
            
            setTotelAmmount(data.totalDiscountedPrice);
            setDiscountRate(data.totalSavings)
            setProductCart(data.cart);
        }
        fetchTotal();

    }, [userId, userIds, cart]);


    const fetchVoucher = async () => {
        try {
            if (!code) {
                // console.log("Please enter a voucher code");
                return;
            }
            const data = await applayVoucher(code, tottelAmmount);
            setTotelAmmount(data.finalAmount)
            setVoucherDiscount(data?.discount)
            console.log(data, "voucher data >>>>>>>");

        } catch (error) {
            console.log(error, "error in voucher >>>>>>>");
        }
  };

  const stripePromise = loadStripe(
    "pk_test_51SKvYGENUDBxwMcPbACxGGAhWGMgVOUPiDCgJxNYOIHe49kHrxp3i3spJM5B3XXo1b2APUejMdPMqwradlutXfZo00I4FbGhTc"
  );

  const makePayment = async () => {
    try {
        
        if(address._id === null || address._id === undefined){
            alert("Please select a delivery address before proceeding to payment.");
            return;
        }

      const stripe = await stripePromise;
      const body = { products: productCart };
      const response = await checkoutSession(body);
      const sessionUrl = response.data.url;

      if (!sessionUrl) return console.error("No session URL returned!");

      window.location.href = sessionUrl;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Something went wrong with payment. Please try again.");
    }
  };

  return (
    <div className="w-full  max-w-[550px] md:max-w-[600px] lg-max-w-[700px]  xl:max-w-[800px] aspect-[440/530]  bg-white rounded-[2vw] md:rounded-[1.5vw] p-[5%] shadow-lg lg:ms-[3%]  flex flex-col justify-between transition-all duration-300">
      {/* Header */}
      <div className="mb-6 text-center md:text-left">
        <p className=" text-[clamp(2rem,2.5rem,3vw)] md:text-[clamp(2.5rem,3vw,3.5rem)] lg:text-[clamp(1.1rem,1.5vw,1.9rem)] font-semibold">
          Order Summary
        </p>
      </div>

      {/* Voucher input */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <input
          onChange={(e) => setCode(e.target.value)}
          placeholder="Discount voucher"
          className="flex-1 bg-[#f4f4f4] rounded-[5vw] md:rounded-[4vw] lg:rounded-[2vw] px-[5%] py-[3%] 
          text-[clamp(1.7rem,1.9rem,2.1vw)] md:text-[clamp(2rem,2.5vw,3rem)] lg:text-[clamp(1rem,1.5vw,2rem)]
          shadow-inner outline-none focus:ring-2 focus:ring-black/40"
        />
        <button
          onClick={fetchVoucher}
          className="bg-black text-white px-5 lg:px-[1.5vw] py-[3%] lg:py-[4%] rounded-[5vw] md:rounded-[4vw] lg:rounded-[2vw] font-semibold 
          text-[clamp(1.5rem,1.7rem,1.9vw)] md:text-[clamp(2rem,2.3vw,2.7rem)] lg:text-[clamp(1.3rem,1.5vw,1.7rem)]
          hover:scale-[1.03] hover:bg-black/80 transition"
        >
          Apply
        </button>
      </div>

      {/* Order Details */}
      <div className="flex flex-col gap-3 
      text-[clamp(1.3rem,1.5rem,1.9vw)] md:text-[clamp(1.7rem,1.9vw,2.3rem)] lg:text-[clamp(1.1rem,1.3vw,1.5rem)]">
        <div className="flex justify-between font-medium">
          <span>Sub Total</span>
          <span className="flex items-center">
            <img
              src={aedicon}
              alt="AED"
              className="h-[.7em] w-auto mr-[0.3em] inline-block align-baseline"
            />
            {tottelAmmount ? Number(tottelAmmount).toFixed(2) : "00"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="flex items-center">
            <img
              src={aedicon}
              alt="AED"
              className="h-[.7em] w-auto mr-[0.3em] inline-block align-baseline"
            /> {discountRate  ? (Number(discountRate)).toFixed(2) : "00"}</span>
        </div>

        {voucherDiscount && (
          <div className="flex justify-between">
            <span>Voucher Discount</span>
            <span className="flex items-center">
              <img
              src={aedicon}
              alt="AED"
              className="h-[.7em] w-auto mr-[0.3em] inline-block align-baseline"
            /> {voucherDiscount ? (Number(voucherDiscount)).toFixed(2) : "00"}</span>
          </div>
        )}

        <div className="flex justify-between border-t pt-2 mt-2">
          <span>Delivery Charges</span>
          <span className="flex items-center">
            <img
              src={aedicon}
              alt="AED"
              className="h-[.7em] w-auto mr-[0.3em] inline-block align-baseline"
            />{tottelAmmount > 0 ? "0.00" : "0.00"}</span>
        </div>
      </div>

      {/* Total */}
      {/* <div className="flex justify-between mt-6 
      text-[clamp(1.7rem,1.9rem,2.1vw)] md:text-[clamp(2rem,2.5vw,3rem)] lg:text-[clamp(1.5rem,2vw,2.2rem)]
      font-semibold border-t pt-3">
        <span>Total</span>
        <span>
          AED {tottelAmmount ? (Number(tottelAmmount) + 6).toFixed(2) : "00"}
        </span>
      </div> */}

      {/* Pay Button */}
      <button
        onClick={makePayment}
        className="mt-6 bg-black text-white rounded-[5vw] md:rounded-[4vw] lg:rounded-[2vw] py-[4%] lg:py-[2%] font-semibold
        text-[clamp(1.3rem,1.5rem,1.7vw)] md:text-[clamp(2rem,2.5vw,3rem)] lg:text-[clamp(1.3rem,1.5rem,1.7rem)]
        hover:scale-[1.02] hover:bg-black/80 transition-all"
      >
        Confirm & Pay
      </button>
    </div>
  );
}

export default PaymentCard;
