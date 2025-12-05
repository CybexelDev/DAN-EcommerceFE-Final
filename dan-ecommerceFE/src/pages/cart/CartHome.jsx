
import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import PaymentCard from '../../components/cards/PaymentCard'
import CartItemCard from './CartItemCard'
import cartItemImage from "../../assets/images/collections_page/drinkpurple.png"
import cartItemImage2 from "../../assets/images/collections_page/drinkgreen.png"
import { getCart, removeCart, updateQuantity } from '../../API/userApi'
import Footer from '../home/homeitems/Footer'
import SubNav from '../../components/nav/SubNav'
import MobileNav from '../../components/nav/MobileNav';
import { useNavigate } from 'react-router-dom';


function CartHome() {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate()
  const [renderKey, setRenderKey] = useState(0);

  const fetchCart = async () => {
    const data = await getCart(userId);
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDelete = async (productId) => {
    const data = await removeCart(productId, userId);
    if (data.message === "Item removed from cart successfully") {
      fetchCart();
      setRenderKey(prev => prev + 1);
    }
  };

  const handleQuantityChange = async (id, newQty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item
      )
    );

    try {

      const data = await updateQuantity(userId, id, newQty)
      setRenderKey(prev => prev + 1);
      console.log(data, 'product Qty upadate');
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <>
      <div className="relative w-full h-full px-[2.43%]">
        {/* Navigation */}
        <div className="hidden lg:block">
          <Nav />
        </div>
        <div className="block lg:hidden">
          <MobileNav />
        </div>
      <SubNav subMinDiv={`w-[100%] h-[35px] bg-[#fff] flex gap-4 items-center justify-end pr-2 absolute right-10 top-1 z-40`} />
        {/* Header */}
        <div className="w-full pt-[10vw]">
          <h5 className="font-bold text-[clamp(1.2rem,2.1vw,2rem)] mb-[2vw]">Shopping Cart.</h5>
        </div>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-[2vw] w-full mb-[3vw]">
          {/* Cart Items */}
          <div className="w-full lg:w-[65%] h-auto md:max-h-[70vh] overflow-y-auto border border-[#C3C3C3] rounded-[1vw] flex justify-center  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="w-[97.8%] mt-[1vw] flex flex-col">
              {/* Table Header */}
              <div className="hidden md:flex w-full border-b border-[#C3C3C3] pb-[.5vw]">
                <div className="w-[48%] flex justify-start items-center px-[3vw]">
                  <h6 className="text-[clamp(1rem,1.2vw,1.5rem)] font-semibold">Products</h6>
                </div>
                <div className="w-[52%] flex items-center justify-between pr-[1vw]">
                  <h6 className="font-semibold text-[clamp(1rem,1.2vw,1.5rem)]">Quantity</h6>
                  <h6 className="font-semibold text-[clamp(1rem,1.2vw,1.5rem)]">Total Price</h6>
                  <h6 className="font-semibold text-[clamp(1rem,1.2vw,1.5rem)]">Action</h6>
                </div>
              </div>

              {/* Cart Items */}
              {cart?.map((item) => {
                const rate = item.productId.rate || 0;
                const discount = item.productId.discount || 0;
                const discountedPrice = rate - (rate * discount) / 100;

                return (
                  <CartItemCard
                    key={item._id}
                    id={item._id}
                    name={item.productId.productName}
                    brand={item.productId.brandName}
                    image={item.productId.images[0]}
                    productId={item.productId._id}
                    price={discountedPrice.toFixed(2)}
                    qty={item.quantity}
                    onDelete={handleDelete}
                    onQuantityChange={handleQuantityChange}
                  />
                );
              })}

              {/* Empty State */}
              {cart.length === 0 && (
                <div className="w-full h-[20vw] flex justify-center items-center">
                  <h5 className="text-[clamp(1rem,1.5vw,1.5rem)] font-semibold">Your cart is empty.</h5>
                </div>
              )}
            </div>
          </div>


          {/* Payment Card */}
          <div className="w-full lg:w-[32.5%] flex justify-center mt-[5vw] lg:mt-0 p-[3%] md:p-[0%]">
             <PaymentCard key={renderKey} userIds={userId} cart={cart} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col items-start justify-between mb-[5vw]">
          <div className="flex flex-col sm:flex-row gap-[1vw] w-full sm:justify-between items-center">
            {/* <button className="px-[2vw] py-[1vw] bg-[#EDE4FC] rounded-[2vw] text-[clamp(1rem,1.5vw,1.5rem)] font-semibold">
              Update Cart
            </button> */}
            <div onClick={ ()=> navigate("collections/")} className="text-[clamp(1rem,1.5vw,1.5rem)] font-semibold">
              <span className="font-extrabold">&#8592;</span> Continue Shopping
            </div>
          </div>
        </div>
      </div>

      <div className="mx-[2vw]">
        <Footer />
      </div>
    </>
  );
}

export default CartHome;
