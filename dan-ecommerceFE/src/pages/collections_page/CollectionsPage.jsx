import React, { useEffect, useState, useRef } from 'react'
import Nav from '../../components/nav/Nav'
import MobileNav from '../../components/nav/MobileNav'
import listicon from "../../assets/images/collections_page/listicon.png"
import listiconcenter from "../../assets/images/collections_page/listiconcenter.png"
import searchicon from "../../assets/images/collections_page/searchicon.png"
import ProductList from './ProductList'
import CategoryList from './CategoryList'
import { getCategorybasedProduct, getSearch, getCategorys, getSubCategories } from '../../API/userApi'
// import { getCategorybasedProduct, getSearch,  } from '../../API/userApi'
import { useNavigate } from "react-router-dom";
import Footer from '../home/homeitems/Footer';
import { useParams } from "react-router-dom";
import SubNav from '../../components/nav/SubNav'

function CollectionsPage() {
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [products, setProducts] = useState([]);
    const [firstCategoryId, setFirstCategoryId] = useState("");
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [subcategoryId, setSubcategoryId] = useState(null);

    const { id } = useParams();

    // console.log(products, "selected sub CategoryNameeeeeeeeee%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5");
    // console.log( selectedFilter, "selcted Fileterrrr");
    // search
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const navigate = useNavigate();


    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (!value.trim()) {
            setResults([]);
            return;
        }
        try {
            const res = await getSearch(value);
            setResults(res || []);
        } catch (error) {
            console.error("Error searching:", error);
        }
    };

    const categoryToggle = () => {
        setIsCategoryOpen(prev => !prev)
    }
    // console.log(isCategoryOpen)

    // Sort section setup
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [isSelected, setIsSelected] = useState("Popularity")
    const dropDownRef = useRef(null)

useEffect(() => {
  const fetchInitialData = async () => {
    try {
      await getCategorys(async (data) => {
        if (data && data.length > 0) {
          const first = data[0];
          setFirstCategoryId(first._id);
          setSelectedCategoryName(first.category);

          const products = await getCategorybasedProduct(first._id);
          setProducts(products);
        }
      });
    } catch (error) {
      console.error("Error fetching initial categories/products:", error);
    }
  };

  fetchInitialData();
}, []);


useEffect(() => {
  const fetchInitialData = async () => {
    try {
      const categories = await getCategorys(); // Fetch all categories

      if (categories && categories.length > 0) {
        const first = categories[0];

        setFirstCategoryId(first._id);
        setSelectedCategoryName(first.name);

        // Fetch products for first category immediately
        const products = await getCategorybasedProduct(first._id);
        setProducts(products);
      }
    } catch (error) {
      console.error("Error fetching initial categories/products:", error);
    }
  };

  fetchInitialData();
}, []);


    // 👇 Detect screen size on mount
useEffect(() => {
  const checkScreenSize = () => {
    if (window.innerWidth < 768) {
      setIsCategoryOpen(false); // Close on small screen
    } else {
      setIsCategoryOpen(true);  // Open on larger screens
    }
  };

  checkScreenSize(); // Run on mount

  // Optional: recheck on window resize
  window.addEventListener("resize", checkScreenSize);
  return () => window.removeEventListener("resize", checkScreenSize);
}, []);


    // Close Dropdown menu click menu outside 
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsSortOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    // send selected option to backend
    const handleSelect = (option) => {
        setSelectedFilter(option);
        // setIsSortOpen(false);
    }

    useEffect(() => {
        if (firstCategoryId) {
            const fetchProducts = async () => {
                try {
                    const data = await getCategorybasedProduct(firstCategoryId);
                    setProducts(data);
                } catch (error) {
                    console.error("Error fetching category products:", error);
                }
            };
            fetchProducts();
        }
    }, [firstCategoryId]);



    useEffect(() => {
        if (subcategoryId) {
            const getSubCategory = async () => {
                try {
                    const data = await getSubCategories(subcategoryId);
                    setProducts(data);
                    console.log(data, "subcategoryyyy");
                } catch (error) {
                    console.error("Error fetching subcategory products:", error);
                }
            };
            getSubCategory(); // ✅ call the function here
        }

    }, [subcategoryId]);


    if (id) {
        useEffect(() => {
            setFirstCategoryId(id);
        }, [id])
    }


    // callback function to receive from child
    const handleCategoryId = (id, selectedCategoryName) => {
        setFirstCategoryId(id);
        setSelectedCategoryName(selectedCategoryName)
        console.log("Received from child:", id, selectedCategoryName);
    };


    const handleSubcategory = (subcategoryId) => {
        setSubcategoryId(subcategoryId);
    }


    // end of selected option
    const sortOptions = ["Popularity", "Newest", "Best Rated", "Price: High to Low", "Price: Low to High"];
    return (

        <div className='mx-[0%] '>
            <div className='relative  w-full  pt-[10%]  lg:pt-[10.9%] mb-[3vw]  '>
                <div className="hidden lg:block">
                    <Nav />
                </div>
                <div className="block lg:hidden ">
                    <MobileNav />
                </div>
           <SubNav subMinDiv={`w-[100%] h-[35px]  flex gap-4 items-center justify-end pr-2 absolute right-[3.5%] top-1 z-40`} />
                <div className="w-full h-full px-[3%]  ">

                    {/* Top bar Section  */}
                    <div className={`w-full h-[4.98%]  flex justify-between  ${isCategoryOpen ? 'pl-[0%] md:pl-[34.5%] lg:pl-[33.7%]  xl:pl-[28%] pr-[0%]' : 'pl-[0%]  pr-[0%] '
                        }`}>
                        <div className="h-[100%] w-[40%] md:w-[27%] flex justify-between gap-[7.5%] items-center">
                            {/* Category Button */}
                            <button
                                onClick={categoryToggle}
                                className="w-[16%] aspect-[50/45] bg-[#F2ECEC] rounded-[.5vw] flex justify-center items-center shadow-md"
                            >
                                <img
                                src={listicon}
                                alt=""
                                className="w-[100%] md:w-[60%] aspect-square"
                                />
                            </button>

                            {/* Text Section */}
                            <div
                                ref={dropDownRef}
                                className="flex  md:flex-col justify-between items-center md:items-start w-[100%] md:w-[79%] aspect-[226/60]"
                            >
                                {/* Category Name */}
                                <div
                                className={`h-auto md:h-[51.6%] flex items-center md:w-full
                                `}
                                >
                                <h5
                                    className={`text-[#803314] font-semibold ${
                                    isCategoryOpen
                                        ? 'text-[3.3vw] md:text-[1.3vw] lg:text-[1.5vw]'
                                        : 'text-[3.3vw] md:text-[1.8vw]'
                                    }`}
                                >
                                    {selectedCategoryName}
                                </h5>
                                </div>

                                {/* Product Count */}
                                <div className="hidden md:flex items-center md:h-[30%]">
                                <p
                                    className={`font-semibold text-black ${
                                    isCategoryOpen
                                        ? 'text-[1vw]'
                                        : 'text-[1.2vw]'
                                    }`}
                                >
                                    Showing all {totalProducts} results
                                </p>
                                </div>
                            </div>
                            </div>

                        <div className="relative  h-full w-[39.3%]  flex justify-between items-center">
                            <div className="w-[85.4%] h-full  flex justify-center items-center">

                                {/* 🔹 Search Form */}
                                <form
                                    onSubmit={(e) => e.preventDefault()}
                                    className="w-full  h-full flex rounded-[.5vw] pl-[3%] shadow-xl text-black"
                                >
                                    <button
                                        type="submit"
                                        className="w-[7.75%] h-full flex justify-center items-center py-[3%]"
                                    >
                                        <img src={searchicon} alt="" className="w-[90%] aspect-square" />
                                    </button>
                                    <div className="w-[92.25%] h-full flex justify-start items-center py-[3%] px-[0vw]">
                                        <input
                                            type="text"
                                            placeholder="Search "
                                            value={query}
                                            onChange={handleChange} // 🔹 call API on each keystroke
                                            className="text-[1.2vw] text-black px-[1vw] font-semibold w-full outline-none"
                                        />
                                    </div>
                                </form>

                                {/* 🔹 Results List */}
                                {results.length > 0 && (
                                    <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-10">
                                        {results.map((item) => (
                                            <li
                                                onClick={() => navigate(`/product/${item._id}`)}
                                                key={item._id}
                                                className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between border-b last:border-b-0"
                                            >   <span className="text-gray-900 flex justify-center"><img src={item?.images[0]} className="w-[45px] h-[25px] rounded-md object-cover" /></span>
                                                <span className="text-gray-900"> {item.productName.length > 16
                                                    ? item.productName.slice(0, 16) + "..."
                                                    : item.productName}
                                                </span>
                                                <span className="text-gray-500 text-sm">{item.brandName.length > 13 ?
                                                    item.brandName.slice(0, 13) + "..."
                                                    : item.brandName}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* No results message */}
                                {results.length === 0 && query && (
                                    <p className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-500">
                                        No products found.
                                    </p>
                                )}
                            </div>
                            {/* Sort Section Start */}
                            <button onClick={() => setIsSortOpen(!isSortOpen)} className=" w-[12%] h-full py-[1%] flex justify-center items-center shadow-xl rounded-[.5vw]">
                                <img src={listiconcenter} alt=""
                                    className='w-[70%] h-[70%] ' />
                            </button>

                            {/* Dropdown menu */}
                            {isSortOpen && (
                                <div className={`absolute right-[3.5vw] top-[.5vw]  w-[54.1%] aspect-[275/314] bg-white shadow-2xl  ${isCategoryOpen ? 'rounded-[1.5vw]' : 'rounded-[2vw]'}  z-10 flex items-center justify-center `}>
                                    <ul className="py-2   w-[92%] h-[87.5%] flex flex-col justify-between ">
                                        {sortOptions.map((option) => (
                                            <li
                                                key={option}
                                                onClick={() => handleSelect(option)}
                                                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 font-semibold ${isCategoryOpen ? ' text-[1.2vw]' : 'text-[1.5vw]'} flex items-center ${selectedFilter === option ? "w-full h-[18.18%] shadow shadow-black/10 rounded-[1vw] font-semibold text-[#BC7050]" : ""
                                                    }`}
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {/* Sort section end */}
                        </div>
                    </div>

                    {/* Items list section */}
                    {!isCategoryOpen ? (
                        <div className="w-full  h-full flex justify-end ">
                            <div className="h-full w-[95.1%]">
                                <ProductList productLengthdata={setTotalProducts} productData={products} />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full  h-full flex justify-end  ">
                            <div className=" w-full flex justify-between gap-[1.5%]">
                                <div className="relative  w-[60%] md:w-[41%] lg:w-[40%] xl:w-[31%] h-full ">
                            {/* Category side */}
                                    {/* List category */}
                                    <div className="w-full h-[2.5%] md:h-[5.9%]  "> <h5 className='text-[#6C090E] text-[4vw] md:text-[2.3vw] text-center font-semibold'>Categories</h5></div>
                                    <div className="w-full h-[97.1%]  rounded-[1.5vw] py-[5%] bg-[#f4f4f4]">
                                        <CategoryList sndSubcategoryId={handleSubcategory} onFirstCategorySelect={handleCategoryId} isCategoryOpen={isCategoryOpen} />

                                    </div>

                                    {/* List category end */}
                                    {/* Category side end */}
                                </div>
                                {/* Products List Section */}
                                <div className="w-[68%] h-[90%] ">
                                    <div className="w-full h-full flex justify-between ">
                                        <ProductList productLengthdata={setTotalProducts} productData={products} isOpen={isCategoryOpen} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
            <div className='mx-[3%]'>
                <Footer />
            </div>
        </div>
    )
}

export default CollectionsPage