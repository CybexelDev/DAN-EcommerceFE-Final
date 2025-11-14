const SignupRightInfo = () => (
  <div className="w-[43%] h-full flex flex-col justify-start gap-[1vw]">
    <div className="w-full aspect-[333/40] text-[#8F2A0B] font-semibold flex items-center text-[1.4vw]">
      Advantages of secure signup
    </div>
    <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
      <img src={trucktrack} className="w-[5.5%] aspect-square" alt="" />
      <div className="flex items-center text-[1vw]">
        Easily Track orders, Hassle Free returns
      </div>
    </div>
    <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
      <img src={alertbell} className="w-[5.5%] aspect-square" alt="" />
      <div className="flex items-center text-[1vw]">
        Get relevant alerts and recommendations
      </div>
    </div>
    <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
      <img src={reviewstar} className="w-[5.5%] aspect-square" alt="" />
      <div className="flex items-center text-[1vw]">
        Wishlist, Reviews, rating and more
      </div>
    </div>
    <div className="pt-[2vw] w-full aspect-[300/45] flex justify-between items-center">
      <div className="h-[60%] aspect-square">
        <img src={greentick} alt="" className="w-full h-full" />
      </div>
      <div className="w-[90%] h-full text-[1vw]">
        Safe and secure payments. Easy returns.
        <br />
        100% authentic products
      </div>
    </div>
  </div>
);

export default SignupRightInfo;