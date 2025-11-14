import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function SideTab({
  selectedTab,
  tab,
  setSelectedTab,
  index,
  isShrink,
}) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        Swal.fire({
          title: "Logged out!",
          text: "You have logged out",
          icon: "success",
        }).then(() => {
          dispatch({ type: "ADMIN_LOGOUT" });
        });
      } else {
        setSelectedTab("Dashboard");
      }
    });
  };

  const handleTabClick = () => {
    if (tab === "Logout") {
      handleLogout();
    } else {
      setSelectedTab(tab);
    }
  };

  // Icon mapping for cleaner code
  const tabIcons = {
    Dashboard: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24">
        <path
          fill={selectedTab === tab ? "white" : "#867b7b"}
          d="M11 2v20c-5.1-.5-9-4.8-9-10s3.9-9.5 9-10m2 0v9h9c-.5-4.8-4.2-8.5-9-9m0 11v9c4.7-.5 8.5-4.2 9-9z"
        />
      </svg>
    ),
    Products: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24">
        <path
          fill={selectedTab === tab ? "white" : "#867b7b"}
          d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m10 0h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M10 13H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m7 0a4 4 0 1 1-3.995 4.2L13 17l.005-.2A4 4 0 0 1 17 13"
        />
      </svg>
    ),
    Categories: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24">
        <path
          fill={selectedTab === tab ? "white" : "#867b7b"}
          d="M7.425 9.475L11.15 3.4q.15-.25.375-.363T12 2.925t.475.113t.375.362l3.725 6.075q.15.25.15.525t-.125.5t-.35.363t-.525.137h-7.45q-.3 0-.525-.137T7.4 10.5t-.125-.5t.15-.525M17.5 22q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 20.5v-6q0-.425.288-.712T4 13.5h6q.425 0 .713.288T11 14.5v6q0 .425-.288.713T10 21.5H4q-.425 0-.712-.288T3 20.5"
        />
      </svg>
    ),
    Gemstones: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24">
        <path
          fill={selectedTab === tab ? "white" : "#867b7b"}
          d="M12 2L7 8l-4 0 0 8 4 0 5 6 5 -6 4 0 0 -8 -4 0L12 2zm0 2.236L15.899 8 12 13.764 8.101 8 12 4.236z"
        />
      </svg>
    ),
    Materials: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24">
        <path
          fill={selectedTab === tab ? "white" : "#867b7b"}
          d="M12 2L8 8l-4 0 0 8 4 0 4 4 4-4 4 0 4 0 0-8-4 0z"
        />
      </svg>
    ),

    Metals: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke={selectedTab === tab ? "white" : "#867b7b"} fill="none" />
        <path
          fill={selectedTab === tab ? "white" : "#867b7b"}
          d="M12 6L9 12l3 6 3-6-3-6z"
        />
      </svg>
    ),
    


    Header: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24">
        <path
          fill={selectedTab === tab ? "white" : "#867b7b"}
          d="M8 18c-2.828 0-4.243 0-5.121-.879C2 16.243 2 14.828 2 12s0-4.243.879-5.121C3.757 6 5.172 6 8 6h8c2.828 0 4.243 0 5.121.879C22 7.757 22 9.172 22 12s0 4.243-.879 5.121C20.243 18 18.828 18 16 18z"
        />
      </svg>
    ),
    Orders: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4"
        viewBox="0 0 24 24"
      >
        <path
          fill={selectedTab === tab ? "white" : "#867b7b"}
          d="M7 4h10l1 2h3v2h-1l-2 12H6L4 8H3V6h3l1-2zm3 0v2h4V4h-4zm1 8v6h2v-6h-2z"
        />
      </svg>
    ),
    Testimonials: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4"
        viewBox="0 0 24 24"
      >
        <path
          fill={selectedTab === tab ? "white" : "#867b7b"}
          d="M2 3h20v14H6l-4 4V3zm2 2v11.17L5.17 14H20V5H4z"
        />
      </svg>
    ),

    Users: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 16 16">
        <path
          fill={selectedTab === tab ? "white" : "#867b7b"}
          d="M8.5 4.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m2.4 7.506c.11.542-.348.994-.9.994H2c-.553 0-1.01-.452-.902-.994a5.002 5.002 0 0 1 9.803 0M14.002 12h-1.59a3 3 0 0 0-.04-.29a6.5 6.5 0 0 0-1.167-2.603a3 3 0 0 1 3.633 1.911c.18.522-.283.982-.836.982M12 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
        />
      </svg>
    ),
    Logout: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24">
        <path
          fill={selectedTab === tab ? "white" : "red"}
          fillRule="evenodd"
          d="M10.796 2.244C12.653 1.826 14 3.422 14 5v14c0 1.578-1.347 3.174-3.204 2.756C6.334 20.752 3 16.766 3 12s3.334-8.752 7.796-9.756m5.497 6.049a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L17.586 13H9a1 1 0 1 1 0-2h8.586l-1.293-1.293a1 1 0 0 1 0-1.414"
          clipRule="evenodd"
        />
      </svg>

    ),
  };


  // console.log('tableIcons', tabIcons);


  return (
    <div
      onClick={handleTabClick}
      className={`${isShrink ? "w-12" : "w-[90%]"
        } overflow-hidden cursor-pointer flex mx-auto h-12 text-sm text-center items-center gap-4 p-3 transition-all rounded-lg ${selectedTab === tab
          ? "bg-white shadow-custom-soft font-semibold"
          : "font-light"
        }`}
    >
      <div
        className={`w-fit h-fit p-[5px] rounded-md ${selectedTab === tab ? "bg-[#6e6c6c]" : "bg-white shadow-md"
          }`}
      >
        {tabIcons[tab] || null}
      </div>
      {!isShrink && (
        <h3 className={tab === "Logout" ? "text-red-500" : ""}>
          {tab}
        </h3>
      )}
    </div>
  );
}