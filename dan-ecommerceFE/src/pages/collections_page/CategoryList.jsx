import React, { useEffect, useState } from 'react'
import { CgArrowTopRight } from 'react-icons/cg';
import { CgArrowBottomLeft } from "react-icons/cg";
import { getcategory, getCategorybasedProduct, getSubCategories, } from '../../API/userApi';

function CategoryList({ onFirstCategorySelect, id, sndSubcategoryId }) {
  const [category, setCategory] = useState([])

  const [openSubcategory, setOpenSubCategory] = useState(null)

  const [subcategoryId, setSubcategoryId] = useState(null);

  // const [displayCategory, setDisplayCategory] = useState('');
  const [firstCategoryId, setFirstCategoryId] = useState('');



  useEffect(() => {
    getcategory(setCategory);
  }, [])


  // const getSubCategory = async (subCategoryId) => {
  //   try {

  //     const data = await getSubCategories(subCategoryId);

  //     console.log(data, "subcategoryyyy");

  //   } catch (error) {

  //   }
  // }



  // Send default first category only once (when categories load)
  useEffect(() => {
    if (category.length > 0) {
      if (id) {
        const selectedCategory = category.find(item => item._id === id);
        onFirstCategorySelect(selectedCategory._id, selectedCategory.category);
      } else {

        const firstId = category[0]._id;
        const firstCategoryName = category[0].category
        onFirstCategorySelect(firstId, firstCategoryName);
      }
    }
  }, [category]);

  const handleCategoryClick = (id, category) => {
    setOpenSubCategory((prev) => (prev === id ? null : id));
    onFirstCategorySelect(id, category); // send clicked id to parent
  };


   const getSubCategory = (subCategoryId) => {
    try {
      const id = subCategoryId;
       sndSubcategoryId(id);
    } catch (error) {
      console.error("Error fetching subcategory:", error);
    }
  }


  const toggleSubCategory = (id) => {
    setOpenSubCategory((prev) => (prev === id ? null : id));
  }


  return (
    <div className='w-full h-full  px-[6.7%] pt-[2.54%]'>
      <div className="w-full  h-full">
        {category.map((item) => (
          <div key={item._id} onClick={() => handleCategoryClick(item._id, item.category)} className="relative w-full aspect-[350/71] bg-white rounded-[1vw] mb-[3.5%]">
            <div className="absolute top-0 right-0 w-[2.65vw] aspect-square bg-[#f4f4f4] rounded-bl-[.5vw] flex justify-center items-center">
              <button onClick={() => toggleSubCategory(item._id)} className="w-[70%] aspect-square flex justify-center items-center bg-[#EDE4FC] rounded-full
                        before:content-['']  before:absolute before:w-[1vw] before:h-[1vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_75%,_#f4f4f4_76%,_#f4f4f4_100%)] 
                        before:top-[0vw] before:-left-[1vw] before:mask-shape
                        after:content-[''] after:absolute after:w-[1vw] after:h-[1vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_75%,_#f4f4f4_76%,_#f4f4f4_100%)]
                        after:-bottom-[1vw] after:right-[0vw]">
                {openSubcategory === item._id ?
                  <CgArrowBottomLeft className='text-[1.4vw]' /> : <CgArrowTopRight className='text-[1.4vw]' />}
              </button>
            </div>
            <div className="w-full h-full pl-[5.14%] flex items-center text-[1.6vw] cursor-pointer transition-all duration-500  ease-in-out">
              <h5 className='text-[#F2591A] font-semibold'>{item.category}</h5>
            </div>
            <div className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${openSubcategory === item._id ? "max-h-[50vh] opacity-100" : "max-h-0 opacity-0"
              }`}>
              {openSubcategory === item._id ?
                <ul className="w-full  pl-[5.14%] flex flex-col justify-center items-center text-[1.6vw]">
                  {item.subCategories.map((sub, index) => (
                    <li onClick={() => getSubCategory(sub._id)} key={index} className='w-full h-[3vw] flex hover:text-[#F2591A] cursor-pointer'>{sub.name}</li>
                  ))}
                </ul> :
                <div className=""></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryList