import React, { useEffect, useState } from "react";
import ProductListCard from "../../components/cards/ProductListCard";
import drinkpurple from "../../assets/images/collections_page/drinkpurple.png";
import drinkgreen from "../../assets/images/collections_page/drinkgreen.png";
import drinkyellow from "../../assets/images/collections_page/drinkyellow.png";
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
    <div className="w-full h-full flex flex-wrap gap-5 justify-start">
      {product?.slice(0, isOpen ? 9 : 12)?.map((product) => (
        <ProductListCard
          key={product._id}
          click={() => navigate(`/product/${product._id}`)}
          id={product._id}
          title={product.productName}
          image={product.images[0]}
          price={product.rate}
          isOpen={isOpen} />

      ))}
    </div>
  );
};

export default ProductList;
