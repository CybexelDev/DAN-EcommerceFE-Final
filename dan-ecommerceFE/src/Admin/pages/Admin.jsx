import { useState, useEffect } from "react";
// import Header from "../../Layout/Admin/Header/Header";
// import UsersList from "../../Layout/Admin/UsersList/UsersList";
// import AdminEnquiry from "../../Layout/Admin/Enquiry/AdminEnquiry";
// import SubCategories from "../../Layout/Admin/SubCategories/SubCategories";
import Sidebar from "../layouts/sidebar/Sidebar";
import DashBoard from "../layouts/dashboard/Dashboard";
import Products from "../layouts/products/Products";
import Categories from "../layouts/categories/Categories";



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
            // case "Users":
            //     return <UsersList />;
            // case "Enquiry":
            //     return <AdminEnquiry />;
            // case "Header":
            //     return <Header />;
            // case "SubCategories":
            //     return <SubCategories />;
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