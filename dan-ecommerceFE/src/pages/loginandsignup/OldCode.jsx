import React from 'react'
import Nav from '../../components/nav/Nav'
import PaymentCard from '../../components/cards/PaymentCard'
import leftarrow from "../../assets/images/login/leftarrow.png"
import LoginForm from './LoginForm'

function LoginAndSignup() {
  return (
    <div className='w-full bg-white-55 min-h-[1440/1024] relative pt-[17%] pl-[2.43%] pr-[5.48%] pb-[11.23%] flex flex-col '>
        <Nav />
        <div className="w-full h-full flex justify-between ">
            <div className="w-[63.55%] flex flex-col justify-between pb-[8%]">

                {/* Login and Signup form section start */}
                <div className="relative w-full min-h-[75%]  rounded-[1.5vw] shadow-2xl ">

                    <div className="absolute w-[29.3%] aspect-[244/48] flex justify-center items-center bg-black/5 shadow rounded-br-[1.5vw]
                    before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_70%,_rgba(0,0,0,0.05)_71%,_rgba(0,0,0,0.05)_100%)] 
                    before:-top-[0vw] before:-right-[1.5vw] before:mask-shape
                    after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_70%,_rgba(0,0,0,0.05)_71%,_100%)]
                    after:-bottom-[1.5vw] after:-left-[0vw]"
                    >
                            <div className=" w-[85%] aspect-[207/28] flex justify-between ">
                                <div className="w-[15.45%] h-full flex items-center justify-center text-[1.5vw] font-semibold bg-[#E0E0E0] rounded-[.5vw]">
                                1  
                                </div>
                                <div className="w-[80.2%] h-full flex items-center justify-center text-[1.4vw] font-semibold text-[#F2591A]">
                                    LOGIN or SIGNUP
                                </div>
                            </div>
                    </div>

                    <div className="w-full h-full px-[3.48%] pt-[3.4vw]">
                        <div className=" w-full h-full flex justify-between">
                            <LoginForm />
                        </div>
                    </div>
                </div>
                {/* Login and Signup form section end */}
                <div className=" w-full h-[18%] rounded-[1.5vw] flex justify-start items-center gap-[1vw] px-[1.5vw]">
                    <div className="text-[1.5vw] font-semibold bg-[#E0E0E0] rounded-[.5vw] w-[2vw] aspect-square flex justify-center items-center">2</div>
                    <div className="text-[1.3vw] font-semibold">DELIVERY ADDRESS</div>
                </div>
            </div>
            <PaymentCard />
        </div>

        <div className="w-full h-[6vw] text-[2vw pt-[3%] px-[3%] flex gap-1 ">
            
            <a href="#"><img src={leftarrow} alt="" className='h-full aspect-square' />Continue shopping</a>
        </div>
    </div>
  )
}

export default LoginAndSignup 

