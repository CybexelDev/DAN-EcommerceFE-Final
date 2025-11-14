import React, { useEffect, useState } from "react";
import ProductListCard from "../../components/cards/ProductListCard";
import { useNavigate } from "react-router-dom";



const ProductList = ({ isOpen, productData, productLengthdata }) => {

  const [product, setProduct] = useState([])

  // console.log(product, "productData in product list rrrrrrrrrrrrrr");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setProduct(productData.data);
    };

    fetchProducts();
  }, [productData]);


  useEffect(() => {
    if (product) {
      productLengthdata(product.length);
    }
  }, [product]);


  return (
    <div
  className={`w-full h-full pt-[3%]  grid  
  ${isOpen ? 'grid-cols-1 md:grid-cols-3 grid-rows-5 md:grid-rows-3 gap-[5vw] md:gap-[3vw] px-[10%] md:p-[0%]' : 'grid-cols-2  md:grid-cols-4 grid-rows-5 md:grid-rows-3 gap-[5vw] md:gap-[3vw]'} 
  justify-between items-stretch  pt-[7%] md:pt-[7%] lg:pt-[3%]`}
>
  {product?.slice(0, isOpen ? 9 : 12)?.map((product) => (
    <ProductListCard
      key={product._id}
      click={() => navigate(`/product/${product._id}`)}
      id={product._id}
      title={product.productName}
      image={product.images[0]}
      price={product.rate}
      isOpen={isOpen}
    />
  ))}

  {/* Fill remaining empty grid cells */}
  {Array.from({
    length: (isOpen ? 9 : 12) - (product?.length || 0),
  }).map((_, index) => (
    <div
      key={`empty-${index}`}
      className="bg-transparent"
    ></div>
  ))}
</div>


  );
};

export default ProductList;