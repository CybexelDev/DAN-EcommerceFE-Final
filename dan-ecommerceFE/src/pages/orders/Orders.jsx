import React, { useEffect, useState } from "react";
import OrderCard from "../cart/OrderCard";
import Nav from "../../components/nav/Nav";
import { getOrders } from "../../API/userApi";
import { useSelector } from "react-redux";
import Footer from "../home/homeitems/Footer";

const mockOrders = [
  {
    _id: "6752abcd8f2c",
    totalAmount: 95,
    status: "pending",
    date: "Oct 28, 2025",
    products: [
      {
        productId: "68cbaa7511d0f66272239543",
        name: "Mogu Mogu Strawberry Juice",
        price: 18,
        quantity: 1,
        image:
          "https://res.cloudinary.com/djedeaw0l/image/upload/v1758177910/daralnahdatrading/p33ty5hvaloshwibqvqt.jpg",
      },
      {
        productId: "68cbadf611d0f66272239547",
        name: "Red Balloons and Red Confetti Balloon",
        price: 45,
        quantity: 1,
        image:
          "https://res.cloudinary.com/djedeaw0l/image/upload/v1758178806/daralnahdatrading/sumzpwfspbl2rarprkxu.jpg",
      },
    ],
  },
  {
    _id: "6752abcd8f2d",
    totalAmount: 120,
    status: "shipped",
    date: "Oct 25, 2025",
    products: [
      {
        productId: "68cbaa7511d0f66272239544",
        name: "Party Supplies Bundle",
        price: 120,
        quantity: 1,
        image:
          "https://res.cloudinary.com/djedeaw0l/image/upload/v1758178806/daralnahdatrading/sumzpwfspbl2rarprkxu.jpg",
      },
    ],
  },
  {
    _id: "6752abcd8f2e",
    totalAmount: 65,
    status: "delivered",
    date: "Oct 20, 2025",
    products: [
      {
        productId: "68cbaa7511d0f66272239545",
        name: "Beverage Pack",
        price: 65,
        quantity: 2,
        image:
          "https://res.cloudinary.com/djedeaw0l/image/upload/v1758177910/daralnahdatrading/p33ty5hvaloshwibqvqt.jpg",
      },
    ],
  },
];

 function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const userId = useSelector((state) => state.auth.userId);


    console.log( orders, "777777777777777777777777");
    

    useEffect(() => {
          const fetchOrders = async () => {
            const data = await getOrders(userId);
            setOrders(data.orders);
          }
            fetchOrders();
    }, []);



  const handleViewDetails = (orderId) => {
    console.log("View details for order:", orderId);
  };

  const handleTrack = (orderId) => {
    console.log("Track order:", orderId);
  };

  return (
    <>
    <Nav />
    <main className="min-h-screen bg-background p-6 mt-28">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            View and manage your recent orders
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              {...order}
              onViewDetails={() => handleViewDetails(order._id)}
              onTrack={() => handleTrack(order._id)}
            />
          ))}
        </div>
      </div>
    </main>

   <div className="p-3"><Footer /></div> 
    </>
  );
}



export default OrdersPage;
