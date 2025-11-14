import { useState } from "react";
import SideTab from "../../components/tabs/SideTab";
import logo from "../../../assets/images/home/logo.png";


export default function Sidebar({ isShrink, selectedTab, setSelectedTab }) {
  const [arrayOfTabs, setArrayOfTabs] = useState([
    "Dashboard",
    "Products",
    "Categories",
    "Header",
    "Orders",
    "Testimonials",
    "Users",
    "Logout",
  ]);

  return (
    <>
      <div
        className={`${isShrink ? "w-[6%]" : "w-[15%]"} transition-all duration-150 h-screen p-2 bg-[#f8f9fa] fixed`}
      >
        <div className="w-full h-full rounded-lg">
          <div className="w-full h-24 content-center items-center">
            <img
              className="mx-auto object-contain"
              src={logo}
              alt="logo"
            ></img>
          </div>
          <hr className="w-[80%] mx-auto mb-10"></hr>

          {arrayOfTabs.map((tab, i) => {
            return (
              <>
                <SideTab
                  selectedTab={selectedTab}
                  tab={tab}
                  index={i}
                  setSelectedTab={setSelectedTab}
                  isShrink={isShrink}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
