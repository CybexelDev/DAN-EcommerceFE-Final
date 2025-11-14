import React, { useEffect, useState } from 'react';
import { CgArrowTopRight, CgArrowBottomLeft } from 'react-icons/cg';
import { getcategory } from '../../API/userApi';

function CategoryList({ onFirstCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [openSubcategory, setOpenSubCategory] = useState(null);

  useEffect(() => {
    getcategory(setCategories);
  }, []);

  // Send default (first) category once on load
  useEffect(() => {
    if (categories.length > 0) {
      const firstId = categories[0]._id;
      const firstName = categories[0].category;
      onFirstCategorySelect(firstId, firstName);
    }
  }, [categories]);

  const handleCategoryClick = (id, name) => {
    setOpenSubCategory((prev) => (prev === id ? null : id));
    onFirstCategorySelect(id, name);
  };

  const toggleSubCategory = (e, id) => {
    e.stopPropagation(); // prevent parent click
    setOpenSubCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full h-full px-[6.7%] pt-[2.5%] overflow-y-auto">
      <div className="w-full h-full flex flex-col gap-[1.5vw]">
        {categories.map((item) => (
          <div
            key={item._id}
            onClick={() => handleCategoryClick(item._id, item.category)}
            className="relative w-full bg-white p-[3%] rounded-[1vw] cursor-pointer  transition-shadow duration-200"
          >
            {/* Arrow Button */}
            <div className="absolute top-0 right-0 w-[2.65vw] aspect-square bg-[#f4f4f4] rounded-bl-[.5vw] rounded-tr-[1vw] flex justify-center items-center
                                before:content-['']  before:absolute before:w-[1.1vw] before:h-[1.1vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_75%,_#f4f4f4_76%,_#f4f4f4_100%)] 
                                before:-top-[0vw] before:-left-[1.1vw] before:mask-shape
                                after:content-[''] after:absolute after:w-[1.1vw] after:h-[1.1vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_75%,_#f4f4f4_76%,_#f4f4f4_100%)]
                                 after:-bottom-[1.1vw] after:right-[0vw]
            ">
              <button
                onClick={(e) => toggleSubCategory(e, item._id)}
                className="relative w-[70%] aspect-square flex justify-center items-center bg-[#EDE4FC] rounded-full"
              >
                {openSubcategory === item._id ? (
                  <CgArrowBottomLeft className="text-[1.4vw]" />
                ) : (
                  <CgArrowTopRight className="text-[1.4vw]" />
                )}
              </button>
            </div>

            {/* Category Name */}
            <div className="pl-[5%] py-[0.3rem] text-[.9rem] md:text-[1.3rem] lg:text-[1.6rem]">
              <h5 className="text-[#F2591A] font-semibold truncate">{item?.category?.toUpperCase()}</h5>
            </div>

            {/* Subcategory List */}
            {openSubcategory === item._id && item.subCategories?.length > 0 && (
              <ul className="pl-[6%] mt-[vw] flex flex-col gap-[.3vw] text-[.8rem] md:text-[1.2rem] lg:text-[1.4rem] font-semibold  text-black/80">
                {item.subCategories.map((sub, index) => (
                  <li
                    key={index}
                    className="w-full flex items-center py-[0.3vw] "
                  >
                    {sub.name?.length > 20 ? sub.name.slice(0, 20) + '…' : sub.name.toUpperCase()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
