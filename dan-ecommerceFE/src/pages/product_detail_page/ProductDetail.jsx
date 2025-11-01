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







    return (
        <>
            <div className='w-full aspect-[1440/1024] '>
                {/* Nav Section Start */}
                <div className="relative w-full aspect-[1440/132]">
                    <Nav />
                </div>
                {/* Nav Section End */}

                {/* Main  section */}
                <div className="flex w-full aspect-[1440/892] ps-[2.9%] pe-[3.95%] justify-between flex-col md:flex-row">


                    {/* Main image section        */}
                    <div className="relative  md:w-[51.23%] w-[100%] aspect-[687/892]  ">
                        <div className="absolute w-[8vw] aspect-[5/3.5] top-[0vw] right-[0vh] bg-white rounded-bl-[1vw] flex justify-center items-center 
                        before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                        before:top-[0vw] before:-left-[1.5vw] before:mask-shape
                        after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                        after:-bottom-[1.5vw] after:right-[0vw]"
                        >
                            <div onClick={() => addToCart(products._id)} className="h-[90%] aspect-square bg-[#f4f4f4] rounded-full flex justify-center items-center cursor-pointer">
                                <img src={carticon} alt=""
                                    className='rounded-full w-[50%] hover:scale-[1.02]' />
                            </div>
                        </div>
                        <div className="w-full h-[91.4%] flex flex-col justify-between">
                            <div className="w-full h-[84%]  rounded-[1vw]">
                                <img src={selectedImage} alt=""
                                    className='w-full h-full rounded-[1vw]' />
                            </div>
                            <div className="w-full h-[13.4%]  flex justify-center ">
                                <div className="w-[54.5%]  flex gap-3.5">
                                    {/* <ProductSmallImageCard
                                    image={pimage1} />
                                <ProductSmallImageCard
                                    image={pimage1} />
                                <ProductSmallImageCard
                                    image={pimage1} /> */}
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
                        <div className="w-full h-[8.6%]"></div>
                    </div>
                    <div className="md:w-[46.76%] w[100%] aspect-[624/892]">
                        <div className="w-full h-[85%] flex flex-col justify-between">
                            <div className="w-full h-[68.3%] flex flex-col justify-between">
                                <div className="w-full h-[68.3%] flex flex-col justify-between">
                                    <div className="w-full h-[72.9%]  flex">
                                        <div className="w-[90.12%] h-full flex flex-col justify-between">
                                            <div className="w-full h-[69.26%] flex flex-col justify-between">
                                                <div className="w-full h-[15.16%] flex justify-start items-center">
                                                    <p className='text-[1.3vw] text-black/50 font-semibold'>{products.brandName}</p>
                                                </div>
                                                <div className="w-full h-[53.4%] flex flex-col justify-between">
                                                    <div className="w-full h-[23.15%] flex items-center">
                                                        <p className='text-[1.8vw] font-semibold'>{products.productName}</p>
                                                    </div>
                                                    <div className="w-full h-[56.85%] flex items-center ">
                                                        <p className='text-[1.25vw]'>{products.subTitle}</p>
                                                    </div>
                                                </div>
                                                <div className="w-full h-[14%]  flex justify-start items-center">
                                                    <p className='text-[1.25vw] text-black/50'> (4.5/5 • 120 reviews)</p>
                                                </div>
                                            </div>
                                            <div className="w-full h-[16%] ">
                                                <div className="h-full aspect-[165/47] flex gap-2 items-center">
                                                    {/* Original Price (Strikethrough) */}
                                                    <p className="text-[13px] text-gray-500 line-through flex">
                                                        AED{products.rate}
                                                    </p>

                                                    {/* Discounted Price */}
                                                    <p className="text-[33px] text-[#7C0101] flex font-semibold">
                                                        AED{products.discountedRate}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="w-[9.88%] h-full "></div>
                                    </div>


                                    {/* Button Section */}
                                    <div className="w-full h-[18%]  flex justify-between">
                                        <div className="w-[48%] h-full border-2 border-black rounded-[1vw] flex">
                                            <div className="w-[34.88%] h-full  rounded-l-[1vw] border-r flex items-center justify-center">
                                                {/* <div className="w-[85.7%] h-[42.85%]  flex justify-between items-center px-[.3vw] ">
                                                <button className='text-[1vw] '>
                                                    <FaMinus />
                                                </button>
                                                <p className=' text-[1.8vw]'>50</p>
                                                <button className='text-[1vw] font-extrabold '>
                                                    <FaPlus />
                                                </button>
                                            </div> */}
                                                <div className="w-[85.7%] h-[42.85%] flex justify-between items-center px-[.3vw]">
                                                    <button
                                                        onClick={decrease}
                                                        className="text-[1vw] disabled:opacity-50 cursor-pointer"
                                                        disabled={quantity === 1}
                                                    >
                                                        <FaMinus />
                                                    </button>

                                                    <p className="text-[1.8vw]">{quantity}</p>

                                                    <button
                                                        onClick={increase}
                                                        className="text-[1vw] font-extrabold cursor-pointer"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-[65.12%] h-full rounded-r-[1vw] flex justify-center items-center">
                                                <a onClick={() => addToCart(products._id)} href='#' className="w-[80%] h-[70%] flex justify-center items-center gap-[.3vw]">
                                                    <img src={carticon} alt=""
                                                        className='h-[70%] aspect-square ' />
                                                    <p className='font-semibold text-[1.3vw]'>Add to cart</p>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="w-[48.4%] h-full">
                                            <button onClick={()=>makePayment(products, quantity)} className='bg-black w-full h-full rounded-[1vw] text-white text-[1.2vw] font-semibold'>Buy now</button>
                                        </div>
                                    </div>
                                    {/* End of button section */}
                                </div>

                                {/* Description Section */}
                                <div className="w-full h-[27.3%] flex flex-col justify-between">
                                    <div className="w-full h-[22.5%]">
                                        <h5 className='text-[1.2vw] font-semibold '>Description</h5>
                                    </div>
                                    <div className="w-full h-[100%] ">
                                        {/* <p className='text-[1.2vw] text-black/65'>{products?.discription}</p> */}
                                        <p className={`text-[1.2vw] text-black/65 transition-all duration-300 ${expanded ? "line-clamp-none" : "line-clamp-3"
                                            }`}>
                                            {products?.discription}
                                        </p>

                                        <button
                                            onClick={() => setExpanded(!expanded)}
                                            className="text-blue-500 text-[1vw] mt-1 underline"
                                        >
                                            {expanded ? "Show Less" : "Read More"}
                                        </button>
                                    </div>
                                </div>
                                {/* Description section End */}

                            </div>

                            {/* You may also like Setion */}
                            {/* <div className="w-full h-[28.2%]  flex flex-col justify-between">
                                <div className="w-full h-[12.61%] ">
                                    <h5 className='text-[1.2vw] font-semibold'>You may also like</h5>
                                </div>

                                
                                <div className="w-full h-[82.24%]  flex gap-3.5 ">
                                    {relatedProducts.map((product) => (
                                        <RelatedItemsCard
                                            image={product?.images[0]}
                                            title={product?.productName}
                                            itemLink={product?._id} />
                                    ))}
                                </div>
                               
                            </div> */}


                            <div className="w-full flex flex-col justify-between">
                                <div className="w-full h-[12.61%] flex justify-between items-center">
                                    <h5 className='text-[1.2vw] font-semibold'>You may also like</h5>

                                    {/* Navigation Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={scrollLeft}
                                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={scrollRight}
                                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Scrollable Container - Show 3 items */}
                                <div
                                    ref={scrollContainerRef}
                                    className="w-full h-[100%] flex gap-3.5 overflow-x-auto scrollbar-hide scroll-smooth mt-3.5"
                                >
                                    {relatedProducts.map((product) => (
                                        <div key={product?._id} className="flex-shrink-0 w-1/3"> {/* Each card takes 1/3 of container */}
                                            <RelatedItemsCard
                                                image={product?.images[0]}
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






                            {/* <div className="w-full mt-[1vw] relative">
  
  <div className="w-full mb-[0.5vw] flex justify-between items-center">
    <h5 className="text-[1.2vw] font-semibold">You may also like</h5>
    <div className="flex gap-2">
      <button
        onClick={scrollLeft}
        className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-600 transition"
      >
        ‹
      </button>
      <button
        onClick={scrollRight}
        className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-600 transition"
      >
        ›
      </button>
    </div>
  </div>


  <div
    ref={scrollRef}
    className="w-full flex gap-[0.8vw] overflow-x-auto scroll-smooth no-scrollbar"
  >
    {relatedProducts.map((product, index) => (
      <div
        key={index}
        className="min-w-[calc(33.333%-0.8vw)] flex-shrink-0"
      >
        <RelatedItemsCard
          image={product?.images[0]}
          title={product?.productName}
          itemLink={product?._id}
        />
      </div>
    ))}
  </div>
</div> */}

                            {/* You may also like section */}
                        </div>
                        <div className="w-full h-[15%]"></div>
                    </div>
                </div>
            </div>
            <div className='ml-5 mr-5'>
                <Footer />
            </div>
        </>
    )
}

export default ProductDetail