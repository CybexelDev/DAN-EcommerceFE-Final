import React, { useEffect, useRef } from 'react';
import Nav from "../../components/nav/Nav"
import ProductSmallImageCard from './ProductSmallImageCard';
import pimage1 from "../../assets/images/productdetail/pimage1.png"
import carticon from "../../assets/images/productdetail/carticon.png"
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import RelatedItemsCard from './RelatedItemsCard';
import { useParams } from "react-router-dom";
import { addCart, checkoutSession, getRelatedProduct, getSingleProduct } from '../../API/userApi';
import { useState } from 'react';
import Footer from '../home/homeitems/Footer';
import { loadStripe } from '@stripe/stripe-js';
import MobileNav from '../../components/nav/MobileNav';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import SubNav from '../../components/nav/SubNav';
import aedicon from "../../assets/images/main/aedicon.png"



function ProductDetail() {
    // function for image section 

    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [categoryId, setCorrentCategoryId] = useState("");
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1); // default value = 1
    const [selectedImage, setSelectedImage] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const userId = localStorage.getItem("userId");

    // console.log(categoryId, "categoryValue iddddd>>>>>>>>>>>>>>");

    console.log(products, "productValue>>>>>>>>>>>>>>");

    console.log(relatedProducts, "relatedProducts>>>>>>>>>>>>>>");

    const decrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // prevent going below 1
    };

    const increase = () => {
        setQuantity((prev) => prev + 1);
    };
    useEffect(() => {

        // const data = getSingleProduct(id);
        // console.log(data, "single product data >>>>>>>>>>>>");  

        if (id) {
            const fetchProducts = async () => {
                try {
                    const data = await getSingleProduct(id);
                    setProducts(data);
                    setCorrentCategoryId(data.categoryId);

                    // Set default selected image
                    if (data.images && data.images.length > 0) {
                        setSelectedImage(data.images[0])
                    }
                } catch (error) {
                    console.error("Error fetching category products:", error);
                }
            };
            fetchProducts();
        }

    }, [id])



    useEffect(() => {
        if (categoryId) {
            const fetchRelatedProducts = async () => {
                try {
                    const data = await getRelatedProduct(categoryId);
                    setRelatedProducts(data.data);
                } catch (error) {
                    console.error("Error fetching related products:", error);
                }
            }
            fetchRelatedProducts();
        }
    }, [categoryId])


    const addToCart = async (productId) => {
        console.log(productId, "productIdddddddddddddddddd");
        // const userId = "68c7c33bea2c350bb430b20d";
        const data = await addCart(userId, productId, quantity);
        console.log("Cart updated:", data);
        setQuantity(1); 
        alert("Product added to cart!");
    }



    const scrollContainerRef = useRef(null);

    // Simple scroll functions to show 3 items at a time
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.children[0]?.offsetWidth + 14; // card width + gap
            container.scrollBy({ left: -cardWidth * 3, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.children[0]?.offsetWidth + 14; // card width + gap
            container.scrollBy({ left: cardWidth * 3, behavior: 'smooth' });
        }
    };



    const stripePromise = loadStripe(
        "pk_test_51SKvYGENUDBxwMcPbACxGGAhWGMgVOUPiDCgJxNYOIHe49kHrxp3i3spJM5B3XXo1b2APUejMdPMqwradlutXfZo00I4FbGhTc"
    );

    const makePayment = async (products, quantity) => {

        console.log(products, "productsssssssssssssssss $$$$$$$$$$$$$$$");
        
        try {
            const stripe = await stripePromise;

            const productData = {
                productId: products._id,
                productName: products.productName,
                rate: products.rate,
                discountedRate: products.discountedRate,
                quantity: quantity, 
                totalDiscountValue: products.discountedRate,
            };

            const body = { products: [productData] };

            // 💳 Create checkout session
            const response = await checkoutSession(body);



            // ✅ Stripe now provides a session URL (not sessionId)
            const sessionUrl = response.data.url;

            if (!sessionUrl) {
                console.error("No session URL returned from backend!");
                return;
            }

            // 🚀 Redirect to Stripe Checkout (new method)
            window.location.href = sessionUrl;
        } catch (error) {
            console.error("Error creating checkout session:", error);
            alert("Something went wrong with payment. Please try again.");
        }
    };

    // Description Section Functions
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const description = products?.discription || "";






    return (
        <div className=' my-[5vw] pt-[9%] md:pt-[0%] lg:my-[0vw]'>
            <div className='w-full  '>
                {/* Nav Section Start */}
                <div className="relative w-full aspect-[1440/132] hidden lg:block">
                    <Nav />
                </div>
                <div className="block lg:hidden ">
                    <MobileNav />
                </div>
                <SubNav subMinDiv={`w-[100%]  h-[35px]  flex gap-4 items-center justify-end pr-2 absolute right-[3.12%] top-1 z-40`} />
                {/* Nav Section End */}

                {/* Main  section */}
                <div className="flex w-full px-[3vw]   justify-between flex-col lg:flex-row">


                    {/* Main image section */}
                    <div className="relative lg:w-[51.23%] w-full">
                      {/* Aspect ratio wrapper — maintains fixed shape */}
                      <div className="aspect-[687/684] max-md:aspect-[4/5] relative  rounded-[5%] overflow-hidden">
                        
                        {/* Cart icon container */}
                        <div
                          className="absolute w-[15%] aspect-[5/3.5] top-0 right-0 bg-white rounded-bl-[15%] flex justify-center items-center 
                          before:content-[''] before:absolute before:w-[20%] before:h-[25%] before:z-10 before:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,transparent_75%,white_76%,white_100%)] 
                          before:top-0 before:-left-[20%]
                          after:content-[''] after:absolute after:w-[20%] after:h-[25%] after:z-10 after:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,transparent_75%,white_76%,white_100%)]
                          after:-bottom-[25%] after:right-0"
                        >
                          <div
                            onClick={() => addToCart(products._id)}
                            className="aspect-square w-[55%]  bg-[#f4f4f4] rounded-full flex justify-center items-center cursor-pointer"
                          >
                            <img
                              src={carticon}
                              alt=""
                              className="rounded-full w-[40%] hover:scale-[1.02]"
                            />
                          </div>
                        </div>



                        {/* Main product image */}
                        <img
                          src={selectedImage}
                          alt=""
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Thumbnails below (outside the fixed aspect area) */}
                      <div className="w-full flex justify-center mt-3">
                        <div className="w-[54.5%] flex gap-3.5">
                          {products.images?.map((img, idx) => (
                            <ProductSmallImageCard
                              key={idx}
                              image={img}
                              isSelected={selectedImage === img}
                              onClick={() => setSelectedImage(img)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Main Image Section Ends */}
                    <div className="lg:w-[46.76%]  w[100%]  ">
                        <div className="w-full h-[85%]   flex flex-col justify-between">
                            <div className="w-full flex flex-col justify-between">
                                <div className="w-full h-[55%] flex flex-col justify-between">
                                    <div className="w-full h-[%]  flex">
                                        <div className="w-[90.12%] h-full flex flex-col justify-between">
                                            <div className="w-full h-[] flex flex-col justify-start gap-[.5rem] lg:gap-[2rem]">
                                                <div className="w-full h-[15.16%] flex justify-start items-center ">
                                                    <p className='text-[1.3rem] text-black/50 font-semibold'>{products.brandName}</p>
                                                </div>
                                                <div className="w-full h-[53.4%] flex flex-col justify-between ">
                                                    <div className="w-full h-[23.15%] flex items-center">
                                                        <p className='text-[1.35rem] md:text-[1.5rem] font-semibold'>{products?.productName?.toUpperCase() || " "}</p>
                                                    </div>
                                                    <div className="w-full h-[56.85%] flex items-center ">
                                                        <p className='text-[] lg:text-[1.25rem] text-[#474646]'>{products.subTitle}</p>
                                                    </div>
                                                </div>
                                                <div className="w-full h-[14%] flex justify-start items-center gap-[1rem]">
                                                    {/* ⭐ Star Rating */}
                                                    <div className="flex items-center gap-[0.35rem] ">
                                                      {Array.from({ length: 5 }, (_, index) => {
                                                        const ratingValue = index + 1;
                                                        const isHalf =
                                                          products.starRating >= ratingValue - 0.5 &&
                                                          products.starRating < ratingValue;

                                                        return (
                                                          <span key={index} className=" text-[1.3rem] md:text-[1.5rem]">
                                                            {products.starRating >= ratingValue ? (
                                                              <FaStar className="text-yellow-500" />
                                                            ) : isHalf ? (
                                                              <FaStarHalfAlt className="text-yellow-500" />
                                                            ) : (
                                                              <FaRegStar className="text-gray-400" />
                                                            )}
                                                          </span>
                                                        );
                                                      })}
                                                    </div>

                                                    {/* Rating Text */}
                                                    <p className="text-[1rem] md:text-[1.5rem] text-black/50 font-medium">
                                                    ({(products.starRating ?? 0).toFixed(1)}/5 • 120 reviews)
                                                  </p>

                                                </div>

                                            </div>
                                            <div className="w-full h-[%] my-[2%] ">
                                              <div className="h-full flex items-center justify-start gap-[3%] ">

                                                {/* Original Price */}
                                                <div className="text-[13px] text-gray-500 line-through flex items-center">
                                                  <img
                                                    src={aedicon}
                                                    alt="AED"
                                                    className="h-[0.8em] w-auto mr-[0.3em] inline-block"
                                                  />
                                                  {products?.rate?.toFixed(2)}
                                                </div>

                                                {/* Discounted Price */}
                                                <div className="text-[31px] text-[#7C0101] font-semibold flex items-center">
                                                  <img
                                                    src={aedicon}
                                                    alt="AED"
                                                    className="h-[0.9em] w-auto mr-[0.1em] inline-block"
                                                  />
                                                  {products?.discountedRate?.toFixed(2)}
                                                </div>

                                              </div>
                                            </div>

                                        </div>
                                        <div className="w-[9.88%] h-full "></div>
                                    </div>


                                    {/* Button Section */}
                                    <div className="w-full h-[15%]  flex justify-between ">
                                        <div className="w-[48%] h-[3.7rem] border-1 border-black rounded-[.7rem] flex">
                                            <div className="w-[34.88%] h-full  rounded-l-[1vw] border-r flex items-center justify-center">
                                                <div className="w-[93%] md:w-[85.7%] h-full flex justify-between items-center px-[.3vw]">
                                                    <button
                                                        onClick={decrease}
                                                        className="text-[.7rem] md:text-[1.3rem] disabled:opacity-50 cursor-pointer"
                                                        disabled={quantity === 1}
                                                    >
                                                        <FaMinus />
                                                    </button>

                                                    <p className="text-[.9rem] md:text-[1.5rem]">{quantity}</p>

                                                    <button
                                                        onClick={increase}
                                                        className="text-[.7rem] md:text-[1.3rem] font-extrabold cursor-pointer"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-[65.12%] h-full rounded-r-[1vw] flex justify-center items-center">
                                                <a onClick={() => addToCart(products._id)} href='#' className="w-[93%] md:w-[80%] h-[70%] flex justify-center items-center gap-[.3vw]">
                                                    <img src={carticon} alt=""
                                                        className='h-[50%] aspect-square ' />
                                                    <p className='font-bold text-[.7rem] md:text-[1.05rem]'>Add to cart</p>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="w-[48.4%] h-[3.7rem]">
                                            <button onClick={()=>makePayment(products, quantity)} className='bg-black w-full h-full rounded-[1vw] text-white text-[1.2rem] font-semibold'>Buy now</button>
                                        </div>
                                    </div>
                                    {/* End of button section */}
                                </div>


                               {/* Description Section */}
                                <div
                                    className={`w-full flex flex-col justify-between transition-all duration-500 ${
                                      expanded ? "pb-[3vw]" : "pb-[1vw]"
                                    }`}
                                  >
                                    <div className="w-full my-[1rem]">
                                      <h5 className="text-[1.5rem] font-semibold">Description</h5>

                                    </div>

                                    {/* ✅ Auto-expand on small screens, toggle on desktop */}
                                    <div
                                      className={`relative overflow-hidden transition-[max-height] duration-700 ease-in-out ${
                                        isDesktop
                                          ? expanded
                                            ? "max-h-[100vh]"
                                            : "max-h-[7vw]"
                                          : "max-h-none"
                                      }`}
                                    >
                                      <p className="text-[1.1rem] text-black/65 leading-[1.8] whitespace-pre-line">
                                        {description}
                                      </p>

                                    </div>

                                    {/* ✅ Show button only on desktop */}
                                    {isDesktop && description.length > 100 && (
                                      <button
                                        onClick={() => setExpanded(!expanded)}
                                        className="text-blue-500 text-[1vw] mt-2 font-semibold self-start"
                                      >
                                        {expanded ? "Show Less" : "Read More"}
                                      </button>
                                    )}
                                  </div>
                                {/* Description Section End */}

                            </div>

                           

                              <div className="w-full flex flex-col justify-between">
                                {/* Header + Buttons */}
                                <div className="w-full h-[12.61%] flex justify-between items-center">
                                  <h5 className="text-[1.5rem] font-semibold">You may also like</h5>

                                  {/* Navigation Buttons (Desktop Only) */}
                                  <div className="gap-2 hidden lg:flex">
                                    <button
                                      onClick={scrollLeft}
                                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                                    >
                                      <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M15 19l-7-7 7-7"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      onClick={scrollRight}
                                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                                    >
                                      <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>

                                {/* Scrollable Container */}
                                <div
                                  ref={scrollContainerRef}
                                  className="w-full h-full flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth mt-4 px-1"
                                >
                                  {relatedProducts.map((product) => (
                                    <div
                                      key={product?._id}
                                      className="
                                        flex-shrink-0 
                                        w-1/3            /* Desktop: 3 per row */
                                        max-md:w-1/2     /* Tablet: 2 per row */
                                        max-sm:w-[85%]   /* Mobile: 1 per view (bigger card) */
                                        transition-all duration-300
                                      "
                                    >
                                      <RelatedItemsCard
                                        image={product?.images?.[0]}
                                        title={product?.productName}
                                        itemLink={product?._id}
                                      />
                                    </div>
                                  ))}
                                </div>

                                <style jsx>{`
                                  .scrollbar-hide::-webkit-scrollbar {
                                    display: none;
                                  }
                                  .scrollbar-hide {
                                    -ms-overflow-style: none;
                                    scrollbar-width: none;
                                  }
                                `}</style>
                              </div>


                            {/* You may also like section */}
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='mx-[3vw]'>
                <Footer />
            </div>
        </div>
    )
}

export default ProductDetail