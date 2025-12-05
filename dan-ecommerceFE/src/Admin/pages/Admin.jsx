import { useState, useEffect } from "react";
import Sidebar from "../layouts/sidebar/Sidebar";
import DashBoard from "../layouts/dashboard/Dashboard";
import Products from "../layouts/products/Products";
import Categories from "../layouts/categories/Categories";
import Header from "../layouts/header/Header";
import Orders from "../layouts/orders/Orders";
import Testimaonials from "../layouts/testimonials/Testimaonials";
import Users from "../layouts/users/Users";
import { useSelector } from "react-redux";


export default function Admin() {
    const [isShrink, setIsShrink] = useState(false);
    const [selectedTab, setSelectedTab] = useState(
        () => localStorage.getItem("selectedTab") || "Dashboard"
    );

    useEffect(() => {
        localStorage.setItem("selectedTab", selectedTab);
    }, [selectedTab]);







    const renderTabContent = () => {


        switch (selectedTab) {
            case "Dashboard":
                return <DashBoard />;
            case "Products":
                return <Products />;
            case "Categories":
                return <Categories />;
                case "Header":
                return <Header/>;
            case "Orders":
                return <Orders/>;
            case "Testimonials":
                return <Testimaonials/>;
            case "Users":
                return <Users />;
            default:
                return <></>;
        }
    };

    return (
        <div className="poppins flex">
            <Sidebar
                isShrink={isShrink}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />

            <div
                className={`w-full min-h-screen px-8 bg-[#f8f9fa] ${isShrink ? "ml-[6%]" : "ml-[15%]"
                    } transition-all duration-150 flex flex-col`}
            >
             
                {renderTabContent()}
            </div>
        </div>
    );
}