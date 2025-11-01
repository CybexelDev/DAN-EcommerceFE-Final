import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import PaymentCard from '../../components/cards/PaymentCard'
import CartItemCard from './CartItemCard'
import cartItemImage from "../../assets/images/collections_page/drinkpurple.png"
import cartItemImage2 from "../../assets/images/collections_page/drinkgreen.png"
import { getCart, removeCart, updateQuantity } from '../../API/userApi'
import Footer from '../home/homeitems/Footer'

function CartHome() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const userId = localStorage.getItem("userId");

  const fetchCart = async () => {
    const data = await getCart(userId);
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDelete = async (produtId) => {
    const data = await removeCart(produtId, userId)
    if(data.message === "Item removed from cart successfully"){
      fetchCart();
    }
    console.log(data, "data after delete >>>>>>");
  }

  // Update quantity dynamically
  const handleQuantityChange = async (id, newQty) => {
    // update local state instantly
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item
      )
    );

    try {
      const data = await updateQuantity(userId, id, newQty)
      console.log(data, 'product Qty upadate');

    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <>
      <div className='relative w-full aspect-[1440/1024]   px-[2.43%] '>
        <Nav />
        <div className="w-full h-[25.55%] pt-[13vw]">
          <div className="w-[18%] aspect-[215/27] mb-[2vw] ">
            <h5 className='font-bold text-[2.1vw]'>Shopping Cart.</h5>
          </div>
        </div>
        {/* Main Section Start */}
        <div className=" flex justify-between  w-full h-[51.75%] mb-[vw] ">
          <div className=" w-[65%] h-[95.28%] overflow-y-auto  border rounded-[1vw] flex justify-center 
          shadow-[0_0_8px_rgba(0,0,0,0.3)] [scrollbar-width:none] 
                [-ms-overflow-style:none] 
                [&::-webkit-scrollbar]:hidden">
            <div className="w-[97.8%]  mt-[1vw] flex flex-col ">
              <div className="w-full aspect-[887/44] flex border-b ">
                <div className="w-[48%] aspect-[443/27] flex justify-start items-center px-[3vw] ">
                  <h6 className="text-[1.5vw] font-semibold">Products</h6>
                </div>
                <div className="w-[52%] aspect-[443/27] flex items-center pr-[1vw]">
                  <div className="w-full flex justify-start ">
                    <h6 className='font-semibold text-[1.5vw]'>
                      Quantity
                    </h6>
                  </div>
                  <div className="w-full flex justify-end ">
                    <h6 className='font-semibold text-[1.5vw]'>
                      Total Price
                    </h6>
                  </div>
                  <div className="w-full  flex justify-end">
                    <h6 className='font-semibold text-[1.5vw]'>
                      Action
                    </h6>
                  </div>
                </div>
              </div>
              <div className=" ">
                {cart?.map((item) => {
                  const rate = item.productId.rate || 0;
                  const discount = item.productId.discount || 0;

                  // Calculate discounted price
                  const discountedPrice = rate - (rate * discount) / 100;

                  return (
                    <CartItemCard
                      key={item._id}
                      id={item._id}
                      name={item.productId.productName}
                      brand={item.productId.brandName}
                      image={item.productId.images[0]}
                      productId={item.productId._id}
                      price={discountedPrice.toFixed(2)} // optional: round to 2 decimals
                      qty={item.quantity}
                      onDelete={handleDelete}
                      onQuantityChange={handleQuantityChange}
                    />
                  );
                })}
                {cart.length === 0 && (
                  <div className="w-full h-[20vw] flex justify-center items-center">
                    <h5 className="text-[1.5vw] font-semibold">Your cart is empty.</h5>
                  </div>)}
              </div>

            </div>
          </div>
          <div className="w-[32.5%]">
            <PaymentCard userIds={userId} cart={cart} />
          </div>
        </div>
        {/* Main Section End */}
        <div className="w-full h-[25.7%] flex flex-col items-start justify-between  ">
          <div className="w-full h-[56.27%]  flex flex-col justify-between">
            <div className="h-[42.5%] bg-green-">
              <button className='h-full aspect-[260/63]  bg-[#EDE4FC] rounded-[2vw] text-[1.5vw] font-semibold'>Update Cart</button>
            </div>
            <div className="h-[24.82%] ">
              <a href="#" className=' h-full aspect-[231/36] text-[1.5vw] mx-[4vw]'><span className='font-extrabold'>&#8592;</span> Continue Shopping</a>
            </div>
          </div>
          <div className="w-full h-[43.73%]"></div>
        </div>
      </div>
      <div className='ml-5 mr-5'>
        <Footer />
      </div>
    </>
  )
}

export default CartHome