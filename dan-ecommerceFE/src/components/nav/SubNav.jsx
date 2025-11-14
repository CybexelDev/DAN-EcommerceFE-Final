import React from 'react'
import { User, Phone } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const SubNav = ({subMinDiv}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    return (
        <>
            <div className={subMinDiv}>
                <a className='text-[#000] text-[13px] font-medium flex gap-1' href='tel:+9710509836868'>
                    <Phone className="w-3 h-3 text-[#000] mt-[6px]" /> +971 0509836868</a>
                <a className='text-[#000] text-[13px] font-medium flex gap-1' href='tel:+9710559688846'>
                    <Phone className="w-3 h-3 text-[#000] mt-[6px]" /> +971 0559688846</a>

                {token ?
                    <></>
                    :
                    <button onClick={() => navigate('/login')} className='flex items-center gap-1 h-[18px] p-[11px]  border-[2px] border-amber-400 text-amber-600 cursor-pointer text-[10px] rounded-3xl'>
                        <User className="w-3 h-3 text-amber-600" />Signin
                    </button>
                }

            </div>
        </>
    )
}

export default SubNav