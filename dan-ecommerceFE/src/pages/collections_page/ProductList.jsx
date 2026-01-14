// import React, { useEffect, useState } from "react";
// import ProductListCard from "../../components/cards/ProductListCard";
// import { useNavigate } from "react-router-dom";



// const ProductList = ({ isOpen, productData, productLengthdata }) => {

//   const [product, setProduct] = useState([])

//   // console.log(product, "productData in product list rrrrrrrrrrrrrr");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setProduct(productData.data);
//     };

//     fetchProducts();
//   }, [productData]);


//   useEffect(() => {
//     if (product) {
//       productLengthdata(product.length);
//     }
//   }, [product]);


//   return (
//     <div
//   className={`w-full h-full pt-[3%]  grid  
//   ${isOpen ? 'grid-cols-1 md:grid-cols-3 grid-rows-5 md:grid-rows-3 gap-[5vw] md:gap-[3vw] px-[10%] md:p-[0%]' : 'grid-cols-2  md:grid-cols-4 grid-rows-5 md:grid-rows-3 gap-[5vw] md:gap-[3vw]'} 
//   justify-between items-stretch  pt-[7%] md:pt-[7%] lg:pt-[3%]`}
// >
//    {product?.length > 0 ?  
//       (
//   product?.slice(0, isOpen ? 9 : 12)?.map((product) => (
//     <ProductListCard
//       key={product._id}
//       click={() => navigate(`/product/${product._id}`)}
//       id={product._id}
//       title={product.productName}
//       image={product.images[0]}
//       price={product.discountedRate}
//       isOpen={isOpen}
//     />
//   ))
// ):( <div className="col-span-full text-center text-gray-500">
//       No products found.
//     </div>)}
     

//   {/* Fill remaining empty grid cells */}
//   {Array.from({
//     length: (isOpen ? 9 : 12) - (product?.length || 0),
//   }).map((_, index) => (
//     <div
//       key={`empty-${index}`}
//       className="bg-transparent"
//     ></div>
//   ))}
// </div>


//   );
// };

// export default ProductList;



import React, { useEffect, useState } from "react";
import ProductListCard from "../../components/cards/ProductListCard";
import { useNavigate } from "react-router-dom";

const ProductList = ({ isOpen, productData, productLengthdata }) => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = isOpen ? 9 : 12;

  useEffect(() => {
    if (productData?.data) {
      setProduct(productData.data);
      setCurrentPage(1); // reset page on filter change
    }
  }, [productData]);

  useEffect(() => {
    if (product) {
      productLengthdata(product.length);
    }
  }, [product]);

  // Pagination logic
  const totalPages = Math.ceil((product?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = product?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
 
      <div
        className={`w-full h-full pt-[3%] grid  
        ${
          isOpen
            ? "grid-cols-1 md:grid-cols-3 grid-rows-5 md:grid-rows-3 gap-[5vw] md:gap-[3vw] px-[10%] md:p-[0%]"
            : "grid-cols-2 md:grid-cols-4 grid-rows-5 md:grid-rows-3 gap-[5vw] md:gap-[3vw]"
        } 
        justify-between items-stretch pt-[7%] md:pt-[7%] lg:pt-[3%]`}
      >
        {currentProducts?.length > 0 ? (
          currentProducts.map((product) => (
            <ProductListCard
              key={product._id}
              click={() => navigate(`/product/${product._id}`)}
              id={product._id}
              title={product.productName}
              image={product.images[0]}
              price={product.discountedRate}
              isOpen={isOpen}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}

        {/* Fill empty grid cells */}
        {Array.from({
          length: itemsPerPage - (currentProducts?.length || 0),
        }).map((_, index) => (
          <div key={`empty-${index}`} className="bg-transparent"></div>
        ))}


  {/* PAGINATION */}
  <div className="flex items-center justify-center w-full d-block col-span-full">
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md border text-sm font-medium 
            text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md border text-sm font-medium cursor-pointer
                ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md border text-sm font-medium 
            text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
      </div>
      </div>
  );
};

export default ProductList;

